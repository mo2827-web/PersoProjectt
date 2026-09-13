export const config = Object.freeze({
  phase: "Phase 1 - foundation",
  sampleDataPath: "./data/sample.json",
  supportedDomains: Object.freeze([]),
  resultLimit: 1,
  excerptLimit: 3,
  scoreMaximum: 100,
  timeoutMs: 4000,
  featureFlags: Object.freeze({
    productRetrieval: false,
    comparison: false,
    persistence: false
  }),
  messages: Object.freeze({
    ready: "Sample assessment ready. This foundation does not retrieve product pages yet.",
    loading: "Loading the sample assessment…",
    empty: "No sample assessment is available right now.",
    error: "The sample assessment could not be loaded. Please try again.",
    busy: "Loading state preview: the controls are temporarily disabled.",
    detailUnavailable: "Detail records are not part of the Phase 1 foundation.",
    persistenceUnavailable: "Saving is not part of this project."
  })
});
