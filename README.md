# Stars Collective

Interactive talent discovery prototype for marketing, business development, sales, HR and administration professionals.

## Features

- Talent discovery, role and availability filters, and saved profiles.
- Simulated employer introductions and candidate acceptance or decline.
- Bilingual candidate form with three employment-history entries and an international mobile selector.
- Draft privacy terms, separate employer-visibility consent, withdrawal and employer preview.
- Talent command centre with opportunity status, profile strength and activity.
- Career preferences, structured skills, achievements, and optional experience details.
- My Stars sample opportunity stages, decline feedback, and employer interest.
- Visibility previews including anonymous mode and a current-employer exclusion placeholder.
- Illustrative subscription plans.

## Local preview

Serve `dist` with a static HTTP server. Open `/#profile` for the candidate form.

## Validation

Requires Node.js. Run `npm ci` and `npm run check`. The deployed static files bundle the phone metadata and flag SVGs in `dist/vendor`; the library source versions are pinned in `package-lock.json` and their MIT licences are included beside the bundles.

## Vercel

Import this repository into Vercel. Use the Other framework preset and repository root. `vercel.json` sets `dist` as the output directory and disables the build step. No environment variables are required.

## Prototype limitations

All people and companies are samples. Enter only fictional information. Form values and consent history exist only in page memory and reset on refresh. There is no account database, authentication, payment processing, real messaging or enforceable employer access control. Subscription features and visibility are simulations. The opportunity card is an example, not a real job. No matching percentage is calculated. Résumé upload and Stars AI require future services.

The profile model retains `phoneMY` and `phoneSG` for existing demo compatibility and stores the selected country's validated number as `mobileE164` with `mobileCountry` and `mobileLocal`. Valid MY and SG numbers also populate their corresponding legacy property; numbers from other countries are never written to a misleading MY/SG field. There is no backend schema or persistence to migrate. If a real backend retains only MY/SG-specific columns, add one E.164 mobile column (and, if useful, a country ISO column), backfill existing numbers, and update API reads/writes before accepting live international registrations.

The privacy notice uses Star Collective as a mock operator name. Before collecting real personal data, confirm the legal operator and DPO contact, review the policy and job-related data collection, and implement secure storage, access controls, retention, withdrawal handling and consent audit records.
