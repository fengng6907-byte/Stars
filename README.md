# Stars Collective

Interactive talent discovery prototype for marketing, business development, sales, HR and administration professionals.

## Features

- Talent discovery, role and availability filters, and saved profiles.
- Simulated employer introductions and candidate acceptance or decline.
- Bilingual candidate form with three employment-history entries.
- Draft privacy terms, separate employer-visibility consent, withdrawal and employer preview.
- Illustrative subscription plans.

## Local preview

Serve `dist` with a static HTTP server. Open `/#profile` for the candidate form.

## Validation

Requires Node.js. Run `node --check dist/app.js`, `node --check dist/profile.js`, and `node scripts/test-profile.cjs`.

## Vercel

Import this repository into Vercel. Use the Other framework preset and repository root. `vercel.json` sets `dist` as the output directory and disables the build step. No environment variables or installation are required.

## Prototype limitations

All people and companies are samples. Enter only fictional information. Form values and consent history exist only in page memory and reset on refresh. There is no account database, authentication, payment processing, real messaging or enforceable employer access control. Subscription features and visibility are simulations.

The privacy notice uses Star Collective as a mock operator name. Before collecting real personal data, confirm the legal operator and DPO contact, review the policy and job-related data collection, and implement secure storage, access controls, retention, withdrawal handling and consent audit records.
