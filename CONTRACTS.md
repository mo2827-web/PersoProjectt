# Mindful Fibers contracts

## Normalized product result

Every result uses this exact shape. Keys are never omitted: missing strings are `""`, missing numbers are `null`, and missing collections are `[]`.

```js
{
  id: "stable-id",
  title: "",
  brand: "",
  price: "",
  currency: "",
  url: "",
  sourceDomain: "",
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
}
```

## Stable HTML IDs

- `site-title`
- `product-form`
- `product-url`
- `check-button`
- `status-line`
- `result-container`
- `preview-title`

## `ui.js` exports

- `setBusy(isBusy)`
- `setStatus(message)`
- `showError(message)`
- `showEmpty(message)`
- `renderList(items)`
- `clearResults()`

## `source.js` methods

- `source.load(params)`
- `source.detail(id)`
- `source.save(record)`
- `source.list()`

## DO NOT CHANGE WITHOUT ASKING

Do not rename or remove the stable HTML IDs, the six `ui.js` exports, the four `source.js` methods, or any key in the normalized product-result shape. Do not change the missing-value conventions.
