# Stars Collective

Interactive talent discovery prototype for marketing, business development, sales, HR and administration professionals.

## Features

- Talent discovery, role and availability filters, and saved profiles.
- Simulated employer introductions and candidate acceptance or decline.
- Bilingual candidate form with three employment-history entries.
- Draft privacy terms, separate employer-visibility consent, withdrawal and employer preview.
- Talent command centre with opportunity status, profile strength and activity.
- Career preferences, structured skills, achievements, and optional experience details.
- My Stars sample opportunity stages, decline feedback, and employer interest.
- Visibility previews including anonymous mode and a current-employer exclusion placeholder.
- Illustrative subscription plans.

## Local preview

Serve `dist` with a static HTTP server. Open `/#profile` for the candidate form.

## Validation

Requires Node.js. Run `node --check dist/app.js`, `node --check dist/profile.js`, `node --check dist/talent-v2.js`, `node scripts/test-profile.cjs`, and `node scripts/test-talent-v2.cjs`.

## Vercel

Import this repository into Vercel. Use the Other framework preset and repository root. `vercel.json` sets `dist` as the output directory and disables the build step. No environment variables or installation are required.

## Prototype limitations

All people and companies are samples. Enter only fictional information. Form values and consent history exist only in page memory and reset on refresh. There is no account database, authentication, payment processing, real messaging or enforceable employer access control. Subscription features and visibility are simulations. The opportunity card is an example, not a real job. No matching percentage is calculated. Résumé upload and Stars AI require future services.

The privacy notice uses Star Collective as a mock operator name. Before collecting real personal data, confirm the legal operator and DPO contact, review the policy and job-related data collection, and implement secure storage, access controls, retention, withdrawal handling and consent audit records.
