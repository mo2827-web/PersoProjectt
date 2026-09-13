export const config = Object.freeze({
  phase: "Phase 3 - reliability and optional comparison",
  sampleDataPath: "./data/sample.json",
  apiPath: "/api/check-product",
  firecrawlEndpoint: "https://api.firecrawl.dev/v2/scrape",
  supportedDomains: Object.freeze(["global.urbanrevivo.com"]),
  supportedSources: Object.freeze({
    "global.urbanrevivo.com": "Urban Revivo"
  }),
  fabricProperties: Object.freeze({
    wool: Object.freeze({
      label: "Wool",
      summary: "Its natural crimp can support insulation, elasticity, moisture management, and wrinkle recovery."
    }),
    cotton: Object.freeze({
      label: "Cotton",
      summary: "Its cellulose structure makes it absorbent; fabric construction and finishing still shape breathability, drape, and drying time."
    })
  }),
  resultLimit: 1,
  excerptLimit: 6,
  lineMaxLength: 280,
  productSectionMaxLength: 6000,
  scoreMaximum: 100,
  timeoutMs: 20000,
  serverTimeoutMs: 30000,
  rules: Object.freeze({
    materialDisclosurePoints: 30,
    careDisclosurePoints: 20,
    constructionDisclosurePoints: 25,
    transparencyDisclosurePoints: 25,
    buyThreshold: 75,
    reconsiderThreshold: 40,
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
    buttonIdle: "Check this item",
    buttonBusy: "Checking item…",
    scoreExplanation: "Quality Signals Score — measures disclosed materials, care, construction, and transparency evidence; it does not rank fiber types or predict lifespan.",
    scoreProofHeading: "How this score was supported",
    fabricPropertiesUnavailable: "No general fiber reference is available for the disclosed composition. The original page evidence is shown below.",
    evidenceHeading: "Visible page evidence",
    detailUnavailable: "Detail records are not part of this project.",
    persistenceUnavailable: "Saving is not part of this project."
  })
});
