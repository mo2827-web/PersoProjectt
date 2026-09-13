# Mindful Fibers

Mindful Fibers is a transparent, evidence-based shopping aid for evaluating visible clothing-product information. It does not claim laboratory certainty or garment lifespan.

## Phase 1 status

This foundation is a static HTML, CSS, and browser-JavaScript site. It uses `data/sample.json` only; it does not retrieve product pages, use API keys, analyze real products, or store data.

## Run locally

From this folder, start any static web server and open the reported local URL. For example, with Python already installed:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` and follow [CHECKS.md](./CHECKS.md).

## Project seams

- `app.js` orchestrates the form and calls `source` and `ui`.
- `ui.js` owns all visible states.
- `source.js` is the only browser data-entry boundary.
- `config.js` holds tunable values and Phase 1 feature flags.
- `data/sample.json` follows the protected result shape in [CONTRACTS.md](./CONTRACTS.md).

## Deploy the static foundation

Push this folder to a GitHub repository, import that repository into Vercel as a static site, then record the public URL in `CHECKS.md` when the smoke test has passed. Do not add environment variables in Phase 1.
