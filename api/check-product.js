import { config } from "../config.js";

const emptyResult = (url, sourceDomain) => ({
  id: "",
  title: "",
  brand: "",
  price: "",
  currency: "",
  url,
  sourceDomain,
  materials: [],
  careSignals: [],
  constructionSignals: [],
  transparencyEvidence: [],
  productClaims: [],
  evidence: [],
  qualitySignalsScore: null,
  recommendation: "",
  transparencyConcern: false,
  unknownFactors: []
});

const textPatterns = Object.freeze({
  materials: /material|composition|cotton|linen|wool|silk|cashmere|viscose|polyester|nylon|acrylic|elastane|spandex/i,
  care: /care|wash|dry clean|tumble dry|iron|bleach|hand wash/i,
  construction: /knit|woven|lining|lined|seam|stitch|hem|ribbed|gauge|weight|finish/i,
  transparency: /made in|country of origin|origin|factory|traceab|certif|organic|recycled/i,
  price: /(?:US\$|USD|\$|€|£|CNY|¥)\s?\d[\d,.]*/i
});

function respond(response, status, body) {
  response.status(status).json(body);
}

function readBody(request) {
  if (typeof request.body === "string") {
    return JSON.parse(request.body);
  }

  return request.body || {};
}

function isPrivateTarget(hostname) {
  return hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "::1" || /^127\./.test(hostname) || /^10\./.test(hostname) || /^192\.168\./.test(hostname) || /^169\.254\./.test(hostname) || /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname);
}

function validateUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return { error: "Paste a public Urban Revivo product-page link first." };
  }

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return { error: "That does not look like a complete web link." };
  }

  if (!/^https?:$/.test(parsed.protocol)) {
    return { error: "Use a link that starts with http:// or https://." };
  }

  if (isPrivateTarget(parsed.hostname)) {
    return { error: "Local or private-network links cannot be checked." };
  }

  if (!config.supportedDomains.includes(parsed.hostname)) {
    return { error: "For now, Mindful Fibers supports public Urban Revivo product pages only." };
  }

  if (/login|account|signin/i.test(parsed.pathname)) {
    return { error: "Login-required pages cannot be checked." };
  }

  return { url: parsed.toString(), hostname: parsed.hostname };
}

function linesFrom(markdown, pattern) {
  return markdown
    .split("\n")
    .map(cleanLine)
    .filter((line) => line.length > 0 && line.length <= config.lineMaxLength && !/^https?:\/\//i.test(line) && pattern.test(line));
}

function cleanLine(line) {
  return line
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/^\s*[-*#>]+\s*/, "")
    .replace(/[*_`]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function unique(values) {
  return [...new Set(values)];
}

function limited(values) {
  return unique(values).slice(0, config.excerptLimit);
}

function firstTitle(markdown, metadata) {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return metadata?.title || heading?.[1] || "";
}

function productSection(markdown, title) {
  const titlePosition = title ? markdown.toLowerCase().indexOf(title.toLowerCase()) : -1;
  return titlePosition === -1 ? markdown : markdown.slice(titlePosition, titlePosition + config.productSectionMaxLength);
}

function scoreResult(result) {
  const rules = config.rules;
  const allMaterials = result.materials.join(" ").toLowerCase();
  const allCare = result.careSignals.join(" ").toLowerCase();
  let score = rules.baseScore;
  const hasNaturalMaterial = /cotton|linen|wool|silk|cashmere|hemp/.test(allMaterials);
  const hasSyntheticMaterial = /polyester|nylon|acrylic/.test(allMaterials);
  const hasEasyCare = /machine wash|hand wash/.test(allCare);
  const hasHighMaintenance = /dry clean|do not wash/.test(allCare);

  if (hasNaturalMaterial) score += rules.naturalMaterialPoints;
  if (hasSyntheticMaterial) score += rules.syntheticMaterialPoints;
  if (hasEasyCare) score += rules.easyCarePoints;
  if (hasHighMaintenance) score += rules.highMaintenancePoints;
  if (result.constructionSignals.length) score += rules.constructionPoints;
  if (result.transparencyEvidence.length) score += rules.transparencyPoints;

  const numericPrice = Number.parseFloat(result.price.replace(/,/g, ""));
  const qualityEvidenceCount = result.materials.length + result.constructionSignals.length + result.transparencyEvidence.length;
  if (Number.isFinite(numericPrice) && numericPrice > 0 && qualityEvidenceCount >= rules.minimumQualityEvidenceCount) score += rules.evidencePricePoints;
  if (Number.isFinite(numericPrice) && numericPrice >= rules.highPriceThreshold && qualityEvidenceCount === 0) score += rules.highPriceWithoutEvidencePoints;

  result.qualitySignalsScore = Math.max(0, Math.min(config.scoreMaximum, score));
  result.recommendation = result.qualitySignalsScore >= rules.buyThreshold ? "Buy" : result.qualitySignalsScore >= rules.reconsiderThreshold ? "Reconsider" : "Avoid";
  result.transparencyConcern = result.unknownFactors.length >= rules.importantUnknownCount;
  return result;
}

function normalizePage(url, hostname, data) {
  const markdown = typeof data?.markdown === "string" ? data.markdown : "";
  const result = emptyResult(url, hostname);

  result.id = data?.metadata?.sourceURL || url;
  result.title = firstTitle(markdown, data?.metadata);
  result.brand = config.supportedSources[hostname] || "";
  const productMarkdown = productSection(markdown, result.title);
  const materialLines = linesFrom(productMarkdown, textPatterns.materials);
  const careLines = linesFrom(productMarkdown, textPatterns.care);
  const constructionLines = linesFrom(productMarkdown, textPatterns.construction);
  const transparencyLines = linesFrom(productMarkdown, textPatterns.transparency);
  result.materials = limited(materialLines);
  result.careSignals = limited(careLines);
  result.constructionSignals = limited(constructionLines);
  result.transparencyEvidence = limited(transparencyLines);
  result.productClaims = limited([result.title].filter(Boolean));
  result.evidence = limited([...materialLines, ...careLines, ...constructionLines, ...transparencyLines]);

  if (!result.title) result.unknownFactors.push("Product title was not visible on the retrieved page.");
  if (!result.price) result.unknownFactors.push("Price was not visible on the retrieved page.");
  if (!result.materials.length) result.unknownFactors.push("Material composition was not visible on the retrieved page.");
  if (!result.careSignals.length) result.unknownFactors.push("Care instructions were not visible on the retrieved page.");
  if (!result.constructionSignals.length) result.unknownFactors.push("Construction details were not visible on the retrieved page.");
  if (!result.transparencyEvidence.length) result.unknownFactors.push("Origin or traceability information was not visible on the retrieved page.");

  return scoreResult(result);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    respond(response, 405, { error: "Use a product link to make this check." });
    return;
  }

  let body;
  try {
    body = readBody(request);
  } catch {
    respond(response, 400, { error: "The product link could not be read." });
    return;
  }

  const target = validateUrl(body.url);
  if (target.error) {
    respond(response, 400, { error: target.error });
    return;
  }

  if (!process.env.FIRECRAWL_API_KEY) {
    respond(response, 500, { error: "The product checker is not configured yet. Please try again later." });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.serverTimeoutMs);

  try {
    const firecrawlResponse = await fetch(config.firecrawlEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: target.url,
        formats: ["markdown"],
        onlyMainContent: true,
        timeout: config.serverTimeoutMs
      }),
      signal: controller.signal
    });
    const firecrawlPayload = await firecrawlResponse.json();

    if (!firecrawlResponse.ok || !firecrawlPayload.success) {
      respond(response, 502, { error: "The product page could not be retrieved right now. Please try again later." });
      return;
    }

    const result = normalizePage(target.url, target.hostname, firecrawlPayload.data);
    respond(response, 200, { result });
  } catch {
    respond(response, 502, { error: "The product page could not be retrieved right now. Please try again later." });
  } finally {
    clearTimeout(timeout);
  }
}
