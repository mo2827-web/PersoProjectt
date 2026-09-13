export const config = Object.freeze({
  phase: "Phase 2 - product check MVP",
  sampleDataPath: "./data/sample.json",
  apiPath: "/api/check-product",
  firecrawlEndpoint: "https://api.firecrawl.dev/v2/scrape",
  supportedDomains: Object.freeze(["global.urbanrevivo.com"]),
  supportedSources: Object.freeze({
    "global.urbanrevivo.com": "Urban Revivo"
  }),
  resultLimit: 1,
  excerptLimit: 6,
  lineMaxLength: 280,
  scoreMaximum: 100,
  timeoutMs: 20000,
  serverTimeoutMs: 30000,
  rules: Object.freeze({
    baseScore: 50,
    naturalMaterialPoints: 12,
    syntheticMaterialPoints: -10,
    easyCarePoints: 5,
    highMaintenancePoints: -5,
    constructionPoints: 8,
    transparencyPoints: 8,
    evidencePricePoints: 2,
    highPriceWithoutEvidencePoints: -8,
    highPriceThreshold: 150,
    minimumQualityEvidenceCount: 2,
    buyThreshold: 70,
    reconsiderThreshold: 45,
    importantUnknownCount: 2
  }),
  featureFlags: Object.freeze({
    productRetrieval: true,
    comparison: false,
    persistence: false
  }),
  messages: Object.freeze({
    ready: "Paste a supported Urban Revivo product-page link to begin.",
    assessmentReady: "Assessment ready. Read the evidence and uncertainty before deciding.",
    loading: "Reading the public product page and checking its visible quality signals…",
    empty: "No product information was returned for this page.",
    error: "We could not check that product page. Please try again.",
    busy: "Checking the product page. This can take a few seconds…",
    detailUnavailable: "Detail records are not part of this project.",
    persistenceUnavailable: "Saving is not part of this project."
  })
});
