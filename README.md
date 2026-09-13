# Mindful Fibers

Mindful Fibers is a transparent, evidence-based shopping aid for evaluating visible clothing-product information. It does not claim laboratory certainty or garment lifespan.

## Phase 2 status

Mindful Fibers now checks one public Urban Revivo product page at a time. The browser sends the URL to the same-origin `/api/check-product` route; the route uses Firecrawl server-side, normalizes visible facts, and applies local, explainable rules. It does not use an LLM, browser-side secrets, accounts, storage, or batch scraping.

## Configure Firecrawl

Create a local `.env.local` file containing `FIRECRAWL_API_KEY=your-key` for local Vercel development. Do not commit this file or paste its value into source code. In Vercel, add the same key as an Environment Variable for the Production environment, then redeploy.

## Run locally

From this folder, start any static web server and open the reported local URL. For example, with Python already installed:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` and follow [CHECKS.md](./CHECKS.md). To test the server route locally, use Vercel's local development command after you have configured `.env.local`.

## Project seams

- `app.js` orchestrates the form and calls `source` and `ui`.
- `ui.js` owns all visible states.
- `source.js` is the only browser data-entry boundary.
- `api/check-product.js` validates one allowed URL, calls Firecrawl, and applies local rules.
- `config.js` holds tunable values and Phase 2 feature flags.
- `data/sample.json` follows the protected result shape in [CONTRACTS.md](./CONTRACTS.md).

## Deploy

Push this folder to GitHub. Vercel automatically deploys the connected repository. Set `FIRECRAWL_API_KEY` in Vercel before testing a real product page, then record the tested product URL and deployment result in `CHECKS.md`.
