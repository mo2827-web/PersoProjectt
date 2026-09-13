# Phase 1 checks

Run these manually in under three minutes before a checkpoint. Do not delete earlier checks in later phases.

1. Serve the folder locally, open `index.html`, and confirm there are no browser-console errors.
2. Confirm the initial sample assessment displays a title, recommendation, score, facts, evidence, transparency note, and original-page link.
3. Submit the product URL form and confirm it returns the sample result in this phase.
4. Select **Empty state** and confirm a readable empty message appears.
5. Select **Error state** and confirm a readable error message appears.
6. Select **Busy state** and confirm controls disable, the busy message appears, then controls re-enable.
7. At approximately 375px wide, confirm the URL input, controls, result card, and text remain readable and usable.
8. Confirm no tracked file contains a real secret and `.gitignore` includes `.env`, `.env.local`, `node_modules`, and `.DS_Store`.
9. Confirm `data/sample.json` retains every protected normalized-result key.
10. GitHub repository is connected and the Vercel smoke test passed on 2026-09-13. Public deployment: https://perso-projectt-ny5251rbl-zero-to-agent2.vercel.app

Phase 2 checks, retained here for the next phase: a supported product URL returns normalized evidence and a recommendation; invalid or unsupported URLs show readable errors; missing data produces a Transparency Concern rather than invented evidence. Phase 3 retains the comparison check: comparison uses two existing results only.
