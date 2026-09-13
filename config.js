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
    }),
    linen: Object.freeze({
      label: "Linen",
      summary: "A strong, absorbent plant fibre that is often cool to wear, but has low elasticity and wrinkles easily."
    }),
    silk: Object.freeze({
      label: "Silk",
      summary: "A light, smooth natural fibre with strength and absorption, but it is delicate and sensitive to care."
    }),
    cashmere: Object.freeze({
      label: "Cashmere",
      summary: "A soft animal-hair fibre. Its final feel and durability depend strongly on fibre quality, yarn, blend, and knit."
    }),
    acetate: Object.freeze({
      label: "Acetate",
      summary: "A regenerated-cellulose fibre that can feel light and silky and dry quickly, but is comparatively weak when wet."
    }),
    viscose: Object.freeze({
      label: "Viscose",
      summary: "A regenerated-cellulose fibre with fluid drape and good moisture absorption, but it can lose strength when wet."
    }),
    modal: Object.freeze({
      label: "Modal",
      summary: "A regenerated-cellulose fibre with a soft feel, absorption, and better dimensional stability than standard viscose."
    }),
    lyocell: Object.freeze({
      label: "Lyocell / Tencel",
      summary: "A regenerated-cellulose fibre that is absorbent and soft, with stronger wet performance than viscose; it can fibrillate."
    }),
    tencel: Object.freeze({
      label: "Lyocell / Tencel",
      summary: "A regenerated-cellulose fibre that is absorbent and soft, with stronger wet performance than viscose; it can fibrillate."
    }),
    polyester: Object.freeze({
      label: "Polyester",
      summary: "A durable, quick-drying synthetic fibre that resists wrinkling, but absorbs little moisture and may pill in some blends."
    }),
    polyamide: Object.freeze({
      label: "Polyamide",
      summary: "A strong, abrasion-resistant synthetic fibre that dries quickly, but absorbs very little moisture and can build static."
    }),
    nylon: Object.freeze({
      label: "Nylon",
      summary: "A strong, abrasion-resistant synthetic fibre that dries quickly, but absorbs very little moisture and can build static."
    }),
    acrylic: Object.freeze({
      label: "Acrylic",
      summary: "A light, insulating synthetic fibre that resists shrinking and wrinkles, but can pill and absorbs very little moisture."
    }),
    elastane: Object.freeze({
      label: "Elastane",
      summary: "A stretch fibre normally used in a small percentage of a blend; the other fibres and construction determine most fabric behaviour."
    }),
    spandex: Object.freeze({
      label: "Elastane (spandex)",
      summary: "A stretch fibre normally used in a small percentage of a blend; the other fibres and construction determine most fabric behaviour."
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
    scoreProofHeading: "Why this page received this score",
    fabricPropertiesUnavailable: "No general fiber reference is available for the disclosed composition. The original page evidence is shown below.",
    evidenceHeading: "Visible page evidence",
    detailUnavailable: "Detail records are not part of this project.",
    persistenceUnavailable: "Saving is not part of this project."
  })
});
