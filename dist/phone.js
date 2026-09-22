// The bundled mobile metadata includes every country supported by libphonenumber-js.
const phoneLibrary = libphonenumber;
const phoneNames = new Intl.DisplayNames(['en'], {type: 'region'});
const phoneCountries = phoneLibrary.getCountries().map(iso => ({
  iso,
  name: phoneNames.of(iso) || iso,
  code: '+' + phoneLibrary.getCountryCallingCode(iso),
  flag: [...iso].map(ch => String.fromCodePoint(127397 + ch.charCodeAt(0))).join('')
})).sort((a, b) => a.name.localeCompare(b.name));
let phoneTouched = false;
let phoneActive = 0;

function phoneCountry(iso) { return phoneCountries.find(c => c.iso === iso) || phoneCountries.find(c => c.iso === 'MY'); }
function phoneFlag(country) { return `<img class="phone-flag" src="vendor/flags/${country.iso}.svg" alt="" aria-hidden="true">`; }
function normalizedMobile(country, local) {
  if (!country || !local || !/^[\d\s().-]+$/.test(local)) return '';
  const parsed = phoneLibrary.parsePhoneNumberFromString(local, country);
  return parsed && parsed.country === country && parsed.isValid() &&
    ['MOBILE', 'FIXED_LINE_OR_MOBILE'].includes(parsed.getType()) ? parsed.number : '';
}
function phoneControl() {
  const country = phoneCountry(talentDraft.mobileCountry || (talentDraft.phoneSG && !talentDraft.phoneMY ? 'SG' : 'MY'));
  const oldPhone = talentDraft.phoneSG || talentDraft.phoneMY;
  const local = talentDraft.mobileCountry ? talentDraft.mobileLocal : (oldPhone.startsWith(country.code) ? oldPhone.slice(country.code.length).trim() : oldPhone);
  return `<div class="phone-field full"><span id="mobile-label">手机号码 / Mobile number <span class="required">*</span></span>
    <div class="phone-combined" role="group" aria-labelledby="mobile-label">
      <div class="phone-country"><input type="hidden" name="mobileCountry" value="${country.iso}">
        <button id="phone-country-button" class="phone-country-button" type="button" aria-label="Country and dialling code: ${country.name} ${country.code}" aria-haspopup="listbox" aria-expanded="false" onclick="togglePhoneCountries()">${phoneFlag(country)} ${country.code} <span aria-hidden="true">▾</span></button>
        <div id="phone-country-menu" class="phone-country-menu" hidden>
          <input id="phone-country-search" type="search" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="phone-country-options" aria-label="Search country name, ISO code or dialling code" placeholder="Search country or code" oninput="filterPhoneCountries()" onkeydown="phoneSearchKeydown(event)">
          <div id="phone-country-options" role="listbox" aria-label="Countries and dialling codes"></div>
        </div>
      </div>
      <input id="mobile-local" name="mobileLocal" type="tel" inputmode="tel" autocomplete="tel-national" value="${esc(local)}" placeholder="12 345 6789" aria-label="Mobile number without country code" aria-describedby="mobile-error" oninput="markPhoneTouched()" onblur="markPhoneTouched()">
    </div><p id="mobile-error" class="phone-error form-error" role="status" aria-live="polite" hidden>Please enter a valid mobile number.</p>
  </div>`;
}
function phoneMatches(query) {
  const q = query.trim().toLowerCase();
  return phoneCountries.filter(c => !q || c.name.toLowerCase().includes(q) || c.iso.toLowerCase().includes(q) || c.code.includes(q));
}
function renderPhoneOptions() {
  const search = document.querySelector('#phone-country-search');
  const list = document.querySelector('#phone-country-options');
  if (!search || !list) return;
  const matches = phoneMatches(search.value);
  phoneActive = Math.min(phoneActive, Math.max(0, matches.length - 1));
  list.innerHTML = matches.length ? matches.map((c, i) => `<button type="button" role="option" tabindex="-1" id="phone-option-${i}" aria-selected="${i === phoneActive}" onclick="selectPhoneCountry('${c.iso}')">${phoneFlag(c)} ${esc(c.name)} <span>${c.code}</span></button>`).join('') : '<p class="phone-no-results">No countries found.</p>';
  search.setAttribute('aria-activedescendant', matches.length ? `phone-option-${phoneActive}` : '');
  list.querySelector('[aria-selected="true"]')?.scrollIntoView({block:'nearest'});
}
function togglePhoneCountries(open) {
  const menu = document.querySelector('#phone-country-menu');
  const trigger = document.querySelector('#phone-country-button');
  if (!menu || !trigger) return;
  const show = open === undefined ? menu.hidden : open;
  menu.hidden = !show;
  trigger.setAttribute('aria-expanded', String(show));
  if (show) {
    const search = document.querySelector('#phone-country-search');
    search.value = '';
    phoneActive = 0;
    renderPhoneOptions();
    search.focus();
  }
}
function filterPhoneCountries() { phoneActive = 0; renderPhoneOptions(); }
function phoneSearchKeydown(event) {
  const matches = phoneMatches(event.currentTarget.value);
  if (event.key === 'Escape') { event.preventDefault(); togglePhoneCountries(false); document.querySelector('#phone-country-button').focus(); }
  else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    phoneActive = (phoneActive + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % (matches.length || 1);
    renderPhoneOptions();
  } else if (event.key === 'Enter') {
    event.preventDefault();
    if (matches[phoneActive]) selectPhoneCountry(matches[phoneActive].iso);
  }
}
function selectPhoneCountry(iso) {
  const country = phoneCountry(iso);
  const hidden = document.querySelector('[name="mobileCountry"]');
  hidden.value = country.iso;
  const trigger = document.querySelector('#phone-country-button');
  trigger.innerHTML = `${phoneFlag(country)} ${country.code} <span aria-hidden="true">▾</span>`;
  trigger.setAttribute('aria-label', `Country and dialling code: ${country.name} ${country.code}`);
  togglePhoneCountries(false);
  phoneTouched = true;
  captureProfile(document.querySelector('#talent-form'));
  updatePhoneError();
  document.querySelector('#mobile-local').focus();
}
function updatePhoneError() {
  const input = document.querySelector('#mobile-local');
  const error = document.querySelector('#mobile-error');
  if (!input || !error) return;
  const invalid = phoneTouched && !normalizedMobile(document.querySelector('[name="mobileCountry"]').value, input.value.trim());
  error.hidden = !invalid;
  input.setAttribute('aria-invalid', String(invalid));
}
function markPhoneTouched() { phoneTouched = true; updatePhoneError(); }
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('.phone-country')) togglePhoneCountries(false);
});
