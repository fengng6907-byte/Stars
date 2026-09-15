const fs=require('fs'),vm=require('vm'),assert=require('assert');const context=vm.createContext({Date,console});vm.runInContext(fs.readFileSync('dist/profile.js','utf8'),context);
vm.runInContext(`
const complete={...talentDraft,name:'Demo Person',email:'demo@example.com',phoneSG:'+65 8123 4567',job:'Administrator',salary:'3500',currency:'SGD',qualification:'Diploma',start:'2026-10-01',language:'English',living:'Stay in Singapore / 住新加坡',location:'Woodlands',terms:true,processing:true,history:[]};
if(profileErrors(complete).length)throw Error(profileErrors(complete).join(','));
if(!profileErrors({...complete,processing:false}).length)throw Error('Missing consent accepted');
if(!profileErrors({...complete,phoneSG:''}).length)throw Error('Missing phone accepted');
if(!profileErrors({...complete,history:[{company:'Demo',position:'Admin',description:'Operations',from:'2025-01',to:'2024-01'}]}).length)throw Error('Reversed employment dates accepted');
if(!profileErrors({...complete,history:[{company:'Demo',position:'Admin',description:'Operations',from:'2025-01',to:'2025-02',current:true}]}).length)throw Error('Current job with end date accepted');
const preview=employerData({...complete,email:'private@example.com',religion:'private',phoneMY:'private',nationality:'private',history:[{company:'Demo',position:'Admin',description:'Work',from:'2020-01',to:'2022-01',basic:'secret',reason:'secret'}]});
if(JSON.stringify(preview).includes('private')||JSON.stringify(preview).includes('secret'))throw Error('Private data leaked into employer projection');
if(profileErrors({...complete,discovery:false}).length)throw Error('Private completion blocked');
console.log('PASS: required fields, consent gating, phone requirement, employment dates, optional publicity, employer data exclusion.');
`,context);
