# Mindful Fibers - Project Guideline

**Project type:** Category 2 - web retrieval with transparent rule-based interpretation  
**Build audience:** A sophomore learning to vibe code with Codex  
**Deployment:** GitHub + Vercel  
**Build rule:** Complete one phase, pass its gate, create a checkpoint, and stop.

## 1. Project purpose

Mindful Fibers helps people make more informed new-clothing purchases without researching every garment and brand themselves.

A shopper pastes a product-page URL from a limited set of tested retailers or brands. The application uses server-side Firecrawl extraction to read publicly visible information, applies explainable material, care, construction, transparency, and price rules, and returns a simple decision:

- **Buy**
- **Reconsider**
- **Avoid**

The result also includes a **Quality Signals Score**, the evidence used, and a separate **Transparency Concern** when important information is missing or cannot be verified.

This is an evidence-based shopping aid, not laboratory testing, a guarantee of garment lifespan, or a complete sustainability certification.

## 2. Product user story

> When I am considering buying clothing online, I want to quickly understand whether the materials, care requirements, construction signals, brand information, and price support the product’s claimed quality, so I can decide whether to buy, reconsider, or avoid it without doing extensive research myself.

## 3. MVP audience

Mindful Fibers is for general new-clothing buyers, especially:

- fast-fashion shoppers;
- students and budget-conscious shoppers;
- mainstream shoppers comparing price and quality;
- luxury shoppers questioning whether a high price reflects meaningful quality.

The MVP does not target secondhand or vintage shoppers.

## 4. MVP functions

### Product URL check

The shopper enters one product-page URL and presses **Check This Item**. The MVP supports a small, documented set of pre-tested public retailers or brands.

The system should reject empty, malformed, non-HTTP/HTTPS, unsupported, private-network, or login-required URLs with a readable explanation.

### Firecrawl extraction

The server retrieves one product page per action and extracts only publicly visible information, such as:

- product title and brand;
- price and currency;
- material composition;
- care instructions;
- visible construction details;
- country/origin or manufacturing statements;
- brand transparency claims;
- relevant factual excerpts;
- original product URL.

If a fact is not visible or cannot be verified, return an explicit empty value and report it as unknown. Never invent evidence.

### Quality Signals Score and recommendation

Use a small, explainable rule system. The score is a **Quality Signals Score**, not an objective laboratory measurement.

The rules consider:

1. material quality and likely durability signals;
2. care requirements and maintenance burden;
3. visible construction signals such as lining, seams, weave, weight, or finishing;
4. brand transparency and traceability;
5. price compared with the available quality evidence.

The interface shows **Buy**, **Reconsider**, or **Avoid**, plus evidence behind the decision. Missing evidence should trigger **Transparency Concern** rather than automatically proving poor quality.

### Optional two-item comparison

Only after the single-item workflow works reliably, the final phase may add a comparison of two individually checked products. It must reuse already-returned results rather than automatically scraping a batch of URLs.

## 5. Look and feel

The visual experience is:

- minimalist;
- calm;
- trustworthy;
- earthy and textile-inspired;
- practical and consumer-focused.

Use a restrained palette such as deep terracotta, camel, warm cream, natural brown, and charcoal. Use clear typography, generous spacing, subtle tactile references, and no superficial eco-marketing imagery, heavy animation, or glossy luxury styling.

## 6. Required page areas

1. **Header:** Mindful Fibers and a concise explanation.
2. **Product Check:** supported-source guidance, URL input, and check button.
3. **Status area:** loading, success, empty, unsupported, incomplete, and error states.
4. **Assessment panel:** recommendation, Quality Signals Score, Transparency Concern, product facts, evidence, and original-page link.
5. **How It Works:** a short explanation of retrieval, rules, and evidence.
6. **Optional comparison panel:** only in the final phase if the core workflow passes.

## 7. The three build phases

### Phase 1 - Foundation and deployment smoke test

Create the empty but well-shaped application foundation and visual shell. Do not add real scraping, API keys, product analysis, or future features.

Create and wire the stable seams:

- `index.html` for markup;
- `style.css` for all styling;
- `app.js` for orchestration only;
- `ui.js` for every visible state;
- `source.js` as the only data-entry boundary;
- `config.js` for tunable values;
- `data/sample.json` in the final result shape;
- `CONTRACTS.md`, `CHECKS.md`, `README.md`, and `.gitignore`.

Use sample data to make the main result, empty state, error state, and busy state visible and testable.

**Phase 1 gate:** the static site works locally and publicly through GitHub/Vercel, all visible states have been seen, `CHECKS.md` passes, and the checkpoint is named `Phase 1 - foundation`.

### Phase 2 - Product URL retrieval and evidence-based assessment

Add only the core product-check workflow:

- supported-domain configuration;
- one URL validation path;
- server-side `/api/check-product` route;
- server-side Firecrawl Scrape call;
- normalized product result;
- material, care, construction, transparency, and price rules;
- Quality Signals Score;
- Buy/Reconsider/Avoid recommendation;
- evidence display;
- Transparency Concern state;
- readable loading, incomplete, unsupported, and error states.

Keep the frontend secret-free. All new data access goes inside the existing `source.js` method boundary, with the server implementation behind the API route.

**Phase 2 gate:** a tested product URL produces a readable result and evidence; missing information is honest; the original link works; the secret is not exposed; previous foundation checks still pass; and the checkpoint is named `Phase 2 - product check MVP`.

### Phase 3 - Reliability, accessibility, and optional comparison

Improve the existing workflow without adding a new technology:

- mobile usability at approximately 375px width;
- accessible labels and focus behavior;
- clear disabled/loading controls;
- readable empty and error states;
- better evidence wording;
- supported-source guidance;
- visual hierarchy and spacing.

If and only if Phase 2 is stable, add optional two-item comparison. The comparison must operate on two individually checked results, show the two scores and evidence side by side, and not create batch scraping, accounts, or persistent storage.

**Phase 3 gate:** another student can check a supported item, understand the recommendation and evidence, recognize uncertainty, open the original page, and optionally compare two existing results. The checkpoint is named `Phase 3 - reliability and optional comparison`.

## 8. Explicit exclusions

Do not add:

- image or photo analysis;
- retailer logins or private pages;
- broad marketplace crawling;
- arbitrary universal web coverage;
- automatic brand research across many pages;
- batch URL scraping or background jobs;
- claims about actual garment lifespan;
- secondhand/vintage mode;
- accounts, profiles, a database, or saved history;
- payments or analytics;
- multiple AI services;
- LLM analysis, chat, or agent behavior;
- environmental or labor scoring in the MVP;
- personalized shopping recommendations;
- a frontend framework, CSS framework, bundler, linter, test runner, UI library, or state library.

## 9. Phase operating rule

At the start of every phase, Codex must read this file and `TechnicalGuideline.md`, identify the requested phase, list the smallest expected file changes, and stop for clarification if the request contradicts a protected contract.

At the end of every phase, Codex must run the full checks, report files changed, dependencies added, acceptance results, and unresolved issues, create the checkpoint, and stop.
