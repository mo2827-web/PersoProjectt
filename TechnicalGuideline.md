# Mindful Fibers - Technical Guideline

**Purpose:** Give Codex a stable technical contract for building Mindful Fibers without breaking earlier phases.  
**Relevant category:** Category 2 - web retrieval. Firecrawl is the retrieval service; interpretation is a small local rule system.

## 1. Fixed stack

Use:

- HTML;
- CSS with custom properties;
- plain browser JavaScript using ES modules;
- Vercel serverless API routes;
- Firecrawl Scrape API, one supported product URL at a time;
- Git and GitHub;
- Vercel.

Do not install a frontend framework, CSS framework, bundler, linter, test runner, UI library, state library, database, or additional AI service. If a dependency appears genuinely necessary, stop and explain why before installing it.

## 2. Required project structure

The foundation must contain exactly these named seams:

```text
index.html
style.css
app.js
ui.js
source.js
config.js
data/sample.json
CONTRACTS.md
CHECKS.md
README.md
.gitignore
```

Create `.gitignore` first. It must include `.env`, `.env.local`, `node_modules`, and `.DS_Store` before any secret exists.

## 3. Permanent module responsibilities

### `index.html`

Markup only. It must contain the Mindful Fibers header, product URL controls, status line, result container, and stable IDs recorded in `CONTRACTS.md`.

### `style.css`

All styling. Define CSS custom properties for colors, spacing, radius, and typography at `:root`. Include button disabled styling, status/error styles, result cards, and one mobile breakpoint. Avoid animation.

### `app.js`

Wiring only. It reads input, calls `source`, and calls `ui`. It must never use `innerHTML`, `textContent`, `classList`, query selectors, or other direct DOM rendering.

### `ui.js`

Every visible state lives here and nowhere else. Export these exact functions:

```js
setBusy(isBusy)
setStatus(message)
showError(message)
showEmpty(message)
renderList(items)
clearResults()
```

Each function must be reachable and visible during Phase 1 using sample data or a controlled string. A state that has not appeared on screen has not been tested.

### `source.js`

This is the only place data enters the browser application. Export an object named `source` with these async methods:

```js
source.load(params)   // main product-check result
source.detail(id)     // optional deeper result; throws if not used
source.save(record)   // throws: persistence is not used in this project
source.list()         // returns []: persistence is not used in this project
```

In Phase 1, use `data/sample.json` and local data only. In Phase 2, change the inside of `source.load()` to call the same-origin `/api/check-product` route. Do not move fetching into `app.js`, `ui.js`, or event handlers.

### `config.js`

Export one frozen configuration object containing every human-tunable value, including supported domains, result/excerpt limits, timeout values, sample-data path, feature flags, and phase settings. No magic number or URL may appear elsewhere.

## 4. Contracts

`CONTRACTS.md` must record the exact result shape. Keys are never omitted. A missing string is `""`, a missing number is `null`, and a missing collection is `[]`.

The normalized product result should use this shape:

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

`CONTRACTS.md` must also list the HTML IDs, the six `ui.js` functions, the four `source.js` methods, and a heading named **DO NOT CHANGE WITHOUT ASKING** containing all protected names and shapes.

## 5. Data and retrieval rules

The product workflow is:

```text
Browser URL input
  -> app.js calls source.load()
  -> source.load() calls same-origin /api/check-product
  -> server validates one supported public URL
  -> server reads FIRECRAWL_API_KEY
  -> server calls Firecrawl Scrape for one page
  -> server normalizes visible facts
  -> server applies explainable material/care/construction/transparency/price rules
  -> browser receives limited normalized JSON
  -> ui.js renders score, recommendation, evidence, and uncertainty
```

The frontend must not call Firecrawl directly, fetch arbitrary retailer pages, parse raw page content, or contain the secret.

The backend must:

- accept exactly one URL per action;
- allow only `http://` and `https://`;
- allow only configured tested domains;
- reject localhost, loopback, private-network, malformed, and login-required targets;
- limit returned excerpts and payload size;
- preserve empty values for unavailable facts;
- return readable structured errors;
- never log or return `FIRECRAWL_API_KEY`.

Use `FIRECRAWL_API_KEY` only server-side. Use `.env.local` locally and Vercel Environment Variables in production.

## 6. Rule-based assessment

The MVP must be explainable without an AI model. Rules may inspect normalized visible facts and assign a Quality Signals Score. They may not claim laboratory certainty or infer a garment’s actual lifespan.

Required distinctions:

- directly stated product facts;
- positive or negative quality signals;
- unknown or unavailable information;
- transparency concern caused by missing evidence.

Evidence shown to the user must come from the retrieved page or an explicitly documented supported-source configuration. Do not invent construction details, origin, certifications, durability, or brand practices.

## 7. Optional comparison rules

Comparison is allowed only in Phase 3 after the single-item workflow passes. It must:

- compare exactly two already-returned results;
- reuse existing result objects;
- show scores, recommendations, unknown factors, and evidence side by side;
- avoid a second data source, database, login, or batch scrape;
- preserve all existing single-item behavior.

## 8. Regression checklist

`CHECKS.md` must be runnable by hand in under three minutes and must never remove an earlier check. It must cover:

1. page loads with no console errors;
2. main action produces a result;
3. empty state appears when nothing is available;
4. readable error state appears when something fails;
5. busy state appears during work and clears afterward;
6. layout is usable at 375px wide;
7. no secret appears in tracked files;
8. a supported product URL returns normalized evidence and a recommendation;
9. an unsupported or invalid URL gives a readable message;
10. missing data creates a Transparency Concern rather than invented evidence;
11. optional comparison uses two existing results only.

At the end of each phase, add new relevant checks; never delete one.

## 9. Rules for every phase after the foundation

1. Read `ProjectGuideline.md`, `TechnicalGuideline.md`, `CONTRACTS.md`, and `CHECKS.md` before editing.
2. State the requested phase and the smallest expected file set.
3. Do not change protected contracts without stopping and asking.
4. Work additively; extend existing functions rather than renaming or reorganizing them.
5. Implement one phase only. Do not add later-phase features early.
6. Put every new tunable value in `config.js`.
7. Put every new data access operation inside an existing `source.js` method or the server implementation behind it.
8. Put every visible state through an existing `ui.js` function.
9. Keep secrets server-side and out of browser files, commits, logs, and JSON responses.
10. If something breaks, reproduce one symptom, change one thing, and retest. Do not redesign while debugging.
11. Run the complete `CHECKS.md` before committing.
12. Report changed files, dependencies, checks passed, and unresolved issues, then stop at the phase gate.

## 10. Explicit technical prohibitions

Do not add:

- image/vision analysis;
- retailer logins or private-page access;
- broad marketplace crawling;
- arbitrary extra APIs;
- multiple AI services;
- Firecrawl Crawl or Search;
- batch scraping or autonomous link following;
- accounts, authentication, profiles, database, or persistent history;
- LLM summarization, chat, or agent loops;
- analytics stack;
- hidden scoring inputs or pay-to-play ratings.
