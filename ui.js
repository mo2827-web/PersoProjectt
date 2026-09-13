import { config } from "./config.js?v=phase3-proof";

const elements = {
  status: document.getElementById("status-line"),
  results: document.getElementById("result-container"),
  form: document.getElementById("product-form"),
  button: document.getElementById("check-button"),
  controls: document.querySelectorAll("button, input")
};

function element(tagName, className, text) {
  const node = document.createElement(tagName);
  node.className = className;
  node.textContent = text;
  return node;
}

function factsList(label, values) {
  const section = element("section", "fact-group");
  section.append(element("h3", "fact-title", label));
  const list = document.createElement("ul");
  const entries = values.length ? values : ["Not available"];

  entries.forEach((value) => list.append(element("li", "fact-item", value)));
  section.append(list);
  return section;
}

function scoreGuide(item) {
  const note = element("div", "score-guide");
  note.append(element("p", "score-summary", config.messages.scoreExplanation));
  note.append(element("strong", "score-proof-title", config.messages.scoreProofHeading));
  const proof = document.createElement("ul");
  const categories = [
    [item.materials.length, "Material composition disclosed", config.rules.materialDisclosurePoints],
    [item.careSignals.length, "Care instructions disclosed", config.rules.careDisclosurePoints],
    [item.constructionSignals.length, "Construction detail disclosed", config.rules.constructionDisclosurePoints],
    [item.transparencyEvidence.length, "Origin or transparency detail disclosed", config.rules.transparencyDisclosurePoints]
  ];

  categories.forEach(([isPresent, label, points]) => {
    proof.append(element("li", "score-proof-item", isPresent ? `${label}: +${points}` : `${label}: not shown`));
  });

  const sources = document.createElement("a");
  sources.href = "./SOURCES.md";
  sources.className = "score-sources";
  sources.textContent = "Read the research, sources, and score limits";
  note.append(proof, sources);
  return note;
}

function fabricProperties(materials) {
  const materialText = materials.join(" ").toLowerCase();
  const properties = Object.entries(config.fabricProperties)
    .filter(([fiber]) => materialText.includes(fiber))
    .map(([, property]) => `${property.label}: ${property.summary}`);

  return properties.length ? properties : [config.messages.fabricPropertiesUnavailable];
}

function revealResults() {
  elements.results.scrollIntoView({ block: "start" });
}

export function setBusy(isBusy) {
  elements.controls.forEach((control) => {
    control.disabled = isBusy;
  });
  elements.form.setAttribute("aria-busy", String(isBusy));
  elements.button.textContent = isBusy ? config.messages.buttonBusy : config.messages.buttonIdle;

  if (isBusy) {
    elements.results.replaceChildren(element("div", "state-card busy-state", config.messages.busy));
    revealResults();
  }
}

export function setStatus(message) {
  elements.status.textContent = message;
}

export function showError(message) {
  clearResults();
  elements.results.setAttribute("aria-live", "assertive");
  elements.results.append(element("div", "state-card error-state", message));
  revealResults();
}

export function showEmpty(message) {
  clearResults();
  elements.results.setAttribute("aria-live", "polite");
  elements.results.append(element("div", "state-card empty-state", message));
  revealResults();
}

export function renderList(items) {
  clearResults();
  elements.results.setAttribute("aria-live", "polite");
  const list = element("div", "assessment-list");

  items.forEach((item) => {
    const card = element("article", "assessment-card");
    card.tabIndex = -1;
    const top = element("div", "assessment-top");
    const identity = element("div", "product-identity");
    identity.append(element("p", "brand", item.brand || "Brand unavailable"));
    identity.append(element("h2", "product-title", item.title || "Product title unavailable"));
    if (item.price) {
      identity.append(element("p", "price", `${item.currency} ${item.price}`));
    }

    const verdict = element("div", "verdict");
    verdict.append(element("p", "verdict-label", "Recommendation"));
    verdict.append(element("strong", "recommendation", item.recommendation || "Unknown"));
    verdict.append(element("span", "score", item.qualitySignalsScore === null ? "Score unavailable" : `${item.qualitySignalsScore} / ${config.scoreMaximum}`));
    top.append(identity, verdict);
    card.append(top);
    card.append(scoreGuide(item));

    card.append(factsList("Fabric properties", fabricProperties(item.materials)));
    card.append(factsList("Care signals", item.careSignals));
    card.append(factsList("Construction signals", item.constructionSignals));
    card.append(factsList("Transparency evidence", item.transparencyEvidence));
    card.append(factsList("Product claims", item.productClaims));
    card.append(factsList(config.messages.evidenceHeading, item.evidence));
    card.append(factsList("Unknown factors", item.unknownFactors));

    const concern = item.transparencyConcern
      ? "Transparency concern: important product information is unavailable."
      : "Transparency concern: none in this sample assessment.";
    card.append(element("p", "transparency-note", concern));

    const sourceLink = document.createElement("a");
    sourceLink.className = "source-link";
    sourceLink.href = item.url;
    sourceLink.target = "_blank";
    sourceLink.rel = "noreferrer";
    sourceLink.textContent = "Open original product page";
    card.append(sourceLink);
    list.append(card);
  });

  elements.results.append(list);

  revealResults();
  list.firstElementChild?.focus({ preventScroll: true });
}

export function clearResults() {
  elements.results.replaceChildren();
}
