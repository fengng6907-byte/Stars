const fs=require('fs'),vm=require('vm'),assert=require('assert');const context=vm.createContext({Date,console,Intl,libphonenumber:require('libphonenumber-js/mobile'),FormData:class{constructor(form){this.values=form}get(k){return this.values[k]}has(k){return Object.hasOwn(this.values,k)}},document:{addEventListener(){}}});vm.runInContext(fs.readFileSync('dist/phone.js','utf8'),context);vm.runInContext(fs.readFileSync('dist/profile.js','utf8'),context);
vm.runInContext(`
const complete={...talentDraft,name:'Demo Person',email:'demo@example.com',mobileCountry:'SG',mobileLocal:'8123 4567',job:'Administrator',salary:'3500',currency:'SGD',qualification:'Diploma',start:'2026-10-01',language:'English',living:'Stay in Singapore / 住新加坡',location:'Woodlands',terms:true,processing:true,history:[]};
if(profileErrors(complete).length)throw Error(profileErrors(complete).join(','));
if(!profileErrors({...complete,processing:false}).length)throw Error('Missing consent accepted');
if(!profileErrors({...complete,mobileLocal:''}).length)throw Error('Missing phone accepted');
if(!profileErrors({...complete,mobileLocal:'6123 4567'}).length)throw Error('Singapore landline accepted as mobile');
if(!profileErrors({...complete,mobileLocal:'123'}).length)throw Error('Invalid phone accepted');
if(!profileErrors({...complete,mobileLocal:'+65 8123 4567'}).length)throw Error('Duplicate dialling code accepted');
for(const [iso,local,want] of [['MY','12 345 6789','+60123456789'],['SG','9123 4567','+6591234567'],['AU','0412 345 678','+61412345678'],['US','(202) 555-0123','+12025550123'],['CN','138 0013 8000','+8613800138000'],['GB','7400 123456','+447400123456'],['HK','9123 4567','+85291234567']]){
 if(normalizedMobile(iso,local)!==want)throw Error('Normalization failed: '+iso);
 if(profileErrors({...complete,mobileCountry:iso,mobileLocal:local}).length)throw Error('Valid phone rejected: '+iso);
}
for(const query of ['Malaysia','MY','+60'])if(!phoneMatches(query).some(c=>c.iso==='MY'))throw Error('Country search failed: '+query);
if(phoneCountries.length<240)throw Error('International country list incomplete');
for(const [country,local,number] of [['MY','12 345 6789','+60123456789'],['SG','9123 4567','+6591234567'],['AU','0412 345 678','+61412345678']]){
 captureProfile({mobileCountry:country,mobileLocal:local});
 if(talentDraft.mobileE164!==number)throw Error('Canonical profile number not saved: '+country);
 if(talentDraft.phoneMY!==(country==='MY'?number:'')||talentDraft.phoneSG!==(country==='SG'?number:''))throw Error('Legacy MY/SG mapping incorrect: '+country);
}
if(!profileErrors({...complete,history:[{company:'Demo',position:'Admin',description:'Operations',from:'2025-01',to:'2024-01'}]}).length)throw Error('Reversed employment dates accepted');
if(!profileErrors({...complete,history:[{company:'Demo',position:'Admin',description:'Operations',from:'2025-01',to:'2025-02',current:true}]}).length)throw Error('Current job with end date accepted');
const preview=employerData({...complete,email:'private@example.com',religion:'private',phoneMY:'private',nationality:'private',history:[{company:'Demo',position:'Admin',description:'Work',from:'2020-01',to:'2022-01',basic:'secret',reason:'secret'}]});
if(JSON.stringify(preview).includes('private')||JSON.stringify(preview).includes('secret'))throw Error('Private data leaked into employer projection');
if(profileErrors({...complete,discovery:false}).length)throw Error('Private completion blocked');
console.log('PASS: international mobile search/normalization/validation, required fields, consent, employment dates, optional publicity and employer data exclusion.');
`,context);
