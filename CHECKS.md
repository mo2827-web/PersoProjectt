# Phase 1 and Phase 2 checks

Run these manually in under three minutes before a checkpoint. Do not delete earlier checks in later phases.

1. Serve the folder locally, open `index.html`, and confirm there are no browser-console errors.
2. Confirm the initial sample assessment displays a title, recommendation, score, facts, evidence, transparency note, and original-page link.
3. Submit the product URL form and confirm a supported product URL returns a normalized assessment in Phase 2.
4. Select **Empty state** and confirm a readable empty message appears.
5. Select **Error state** and confirm a readable error message appears.
6. Select **Busy state** and confirm controls disable, the busy message appears, then controls re-enable.
7. At approximately 375px wide, confirm the URL input, controls, result card, and text remain readable and usable.
8. Confirm no tracked file contains a real secret and `.gitignore` includes `.env`, `.env.local`, `node_modules`, and `.DS_Store`.
9. Confirm `data/sample.json` retains every protected normalized-result key.
10. GitHub repository is connected and the Vercel smoke test passed on 2026-09-13. Public deployment: https://perso-projectt-ny5251rbl-zero-to-agent2.vercel.app
11. Confirm the Urban Revivo URL `https://global.urbanrevivo.com/collections/best-sellers-knitwear-nv030500/products/layered-twisted-hem-crew-neck-long-sleeve-knit-t-shirt-uwj960042` returns visible evidence, a score, a recommendation, and an original-page link. Passed on the public Vercel deployment on 2026-09-13; unverified price was omitted and unavailable facts were shown as unknown.
12. Submit an unsupported link and confirm the message says that only public Urban Revivo product pages are currently supported. Passed on 2026-09-13 with `https://www.google.com`.
13. Submit a malformed or empty link and confirm a readable message appears. Passed on 2026-09-13 with an empty submission.
14. Confirm a page with unavailable facts shows unknown factors and a Transparency Concern rather than invented claims.
15. Use the keyboard only: tab to the URL field and action button, submit a supported URL, and confirm focus moves to the assessment.
16. Confirm the button says “Checking item…” and all form controls disable while the request is in progress.
17. At 375px wide, confirm the URL field and full-width action button remain easy to use, and long product titles do not overflow.
18. Confirm the page clearly identifies Urban Revivo as the currently supported source and explains that missing facts are shown as unknown.
19. Confirm no comparison panel, account, saved history, or batch check is present.
20. Confirm the score guide links to `SOURCES.md`, explains that fiber type alone is not rated good or bad, and describes the four visible-evidence categories.
21. Confirm the single-item workflow remains the only available assessment flow; optional comparison is intentionally not included.
22. Confirm the first result section gives general fabric-property context without awarding extra score points, raw material composition appears only under visible page evidence, and the score guide lists the points earned for that page.

Phase 2 checks, retained here for the next phase: a supported product URL returns normalized evidence and a recommendation; invalid or unsupported URLs show readable errors; missing data produces a Transparency Concern rather than invented evidence. Phase 3 deliberately keeps the experience to one item at a time.
