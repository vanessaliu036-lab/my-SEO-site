const API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appJCcT41WRfKpWk2'
const MASTER_TABLE = 'OCC_Blog_Posts'
const LEGACY_TABLE = 'Articles'
const EXPECTED_COUNT = 1682
const EXPECTED_BRANCH = 'ops/classify-occ-1682'
const EXECUTE = process.argv.includes('--execute')

if (!API_KEY) throw new Error('Missing Airtable API key')
if (process.env.VERCEL && process.env.VERCEL_GIT_COMMIT_REF !== EXPECTED_BRANCH) {
  throw new Error(`Refusing to run classifier outside ${EXPECTED_BRANCH}`)
}

const MASTER_FIELDS = ['title','summary','SEO_Keyword','Keywords','Legacy Keyword','Legacy Record ID','Category']
const LEGACY_FIELDS = ['title','Master Topic','category','keyword']
const CATEGORIES = [
  'Science & Processing','Science & Quality','Roasting Science','How-To Guide','Sustainability',
  'Sourcing','B2B','Market Analysis','Origin Story','GEO Travel','Barista Training','Recipe','Specialty Coffee',
]
const PRIORITY = [
  'Roasting Science','Science & Processing','Science & Quality','Sustainability','Sourcing','B2B',
  'Market Analysis','Barista Training','Recipe','How-To Guide','GEO Travel','Origin Story','Specialty Coffee',
]

const RULES = {
  'Roasting Science': [
    ['roast profile',10],['roasting science',11],['roasting curve',10],['roast curve',10],['roast degree',9],
    ['roast level',9],['first crack',11],['development time',10],['maillard',11],['charge temperature',11],
    ['light roast',7],['medium roast',7],['dark roast',7],['rest after roasting',10],['post-roast',8],
    ['roasting equipment',9],['roasting considerations',9],
  ],
  'Science & Processing': [
    ['fermentation',10],['anaerobic',11],['carbonic maceration',11],['honey process',11],['natural process',10],
    ['washed process',10],['wet process',8],['dry process',8],['processing method',9],['coffee processing',10],
    ['post-harvest',9],['postharvest',9],['drying',7],['rewetting',10],['mucilage',9],['depulp',9],
    ['wet mill',9],['dry mill',9],['fermentation protocol',11],['processing & drying',10],
  ],
  'Science & Quality': [
    ['cqi',11],['sca standard',12],['sca score',11],['fine robusta standard',12],['q grader',11],['cupping',10],
    ['cupping score',11],['sensory',9],['green grading',11],['grading',8],['defect',9],['quality protocol',11],
    ['quality standard',11],['coffee quality',8],['80+',9],['flavor chemistry',11],['flavour chemistry',11],
    ['chlorogenic',11],['caffeine',9],['water activity',11],['moisture content',9],['genetics',9],['genetic',9],
    ['cultivar',9],['botanical',9],['coffea canephora',8],['species',7],['sensory profile',9],['flavor profile',7],
    ['flavour profile',7],['mouthfeel',8],['bitterness',9],['harshness',9],['acidity',8],['sweetness',7],
    ['green coffee freshness',10],['shelf life',9],['quality control',9],['cup point',8],['flavor notes',8],
    ['flavour notes',8],['earthy',6],['woody',6],['smoky',6],['consistency',5],
  ],
  'Sustainability': [
    ['climate change',12],['climate resilience',12],['climate risk',11],['drought',11],['water stress',11],
    ['water risk',10],['agroforestry',12],['shade tree',10],['shade grown',10],['soil health',10],['biodiversity',11],
    ['regenerative',11],['sustainability',11],['sustainable',9],['carbon',9],['environment',8],['ecology',9],
    ['rainfall',8],['flowering water',10],['farm system',8],['deforestation',11],['adaptation',8],
  ],
  'Sourcing': [
    ['sourcing',12],['procurement',12],['direct trade',11],['traceability',11],['traceable',9],['cooperative',9],
    ['co-op',9],['exporter',11],['importer',11],['importing',10],['coffee imports',10],['green coffee buying',12],
    ['green coffee buyer',11],['supplier due diligence',12],['due diligence',10],['supply chain',11],['logistics',10],
    ['origin buying',11],['purchase contract',11],['coffee contract',10],['lot selection',9],['supplier evaluation',12],
    ['supplier',8],['export packing',12],['shipment',9],['shipping',8],['documentation',8],['purchase',7],
    ['procure',10],['buyer checklist',9],['technical data sheet',10],['specification',8],['trading guide',10],
    ['trade guide',10],['farm to roaster',10],['from farm to roaster',11],['buyer-focused',6],
  ],
  'B2B': [
    ['hotel coffee',12],['restaurant coffee',12],['office coffee',12],['horeca',12],['foodservice',11],
    ['wholesale',10],['cafe business',11],['café business',11],['coffee shop business',11],['hospitality',10],
    ['commercial account',10],['private label',10],['menu strategy',10],['menu application',11],['menu applications',11],
    ['cafe owner',9],['café owner',9],['restaurant owner',9],['hotel buyer',9],['office buyer',9],['b2b',8],
    ['business buyer',8],['bulk coffee',8],['coffee program',9],['coffee service',8],['for cafés',10],['for cafes',10],
    ['for hotels',10],['for restaurants',10],['commercial coffee',8],
  ],
  'Market Analysis': [
    ['market analysis',12],['market outlook',12],['market trend',12],['market size',12],['market share',12],
    ['coffee market',11],['robusta market',11],['price outlook',11],['coffee price',10],['robusta price',10],
    ['economics',11],['economic',9],['demand',8],['forecast',10],['trade data',11],['futures',10],['ice london',11],
    ['production forecast',11],['production volume',10],['industry outlook',11],['industry trend',11],['market growth',11],
    ['category growth',10],['competitiveness',9],['global market',10],['sector',8],['industry',6],['export volume',10],
    ['production data',10],['more expensive',10],['why is arabica coffee more expensive',12],['price premium',10],
  ],
  'How-To Guide': [
    ['how to brew',12],['brewing',9],['brew ratio',11],['brew guide',11],['espresso',8],['french press',11],
    ['cold brew',11],['pour over',11],['pour-over',11],['aeropress',11],['moka pot',11],['grind size',11],
    ['grinder',8],['extraction',10],['dial in',11],['dial-in',11],['brew temperature',11],['coffee maker',9],
    ['brewing temperature',11],['tds measurement',10],['brew strength',9],['preparation guide',9],
  ],
  'Barista Training': [
    ['barista training',13],['barista certification',13],['barista workflow',12],['milk steaming',12],['latte art',12],
    ['espresso calibration',12],['calibration routine',11],['sensory training',10],['vocational pathway',10],
  ],
  'Recipe': [
    ['recipe',12],['coffee recipe',13],['drink recipe',13],['iced latte',9],['latte recipe',11],['coffee mocktail',11],
    ['coffee cocktail',11],['cocktails',10],['coffee pairing recipe',11],['syrup',9],['make at home',9],['craft drink',8],
  ],
  'GEO Travel': [
    ['souvenir',12],['souvenirs',12],['gift guide',12],['bring home',11],['bringing home',11],['what to buy',11],
    ['best coffee shops',11],['coffee shops',8],['cafe guide',10],['café guide',10],['travel guide',11],['traveler',9],
    ['traveller',9],['tourist',9],['where to buy coffee',10],['where to buy',8],['before you leave',10],
  ],
}

const ORIGINS = ['cambodia','cambodian','mondulkiri','kampot','ratanakiri','phnom penh','siem reap','vietnam','vietnamese','laos','indonesia','indonesian','uganda','ugandan','brazil','brazilian','india','indian coffee','thailand','thai coffee','myanmar','ethiopia','colombia','colombian','ecuador']
const ORIGIN_CONTEXT = ['origin story','coffee origin','origin guide','history of','coffee history','terroir','geography','region guide','coffee region','province','highland origin','coffee culture','where coffee grows','grown in','origin profile']
const SPECIALTY_TERMS = ['fine robusta','specialty robusta','specialty coffee','robusta vs arabica','arabica vs robusta','canephora','robusta coffee','coffee education']

function norm(v) {
  if (v == null) return ''
  if (typeof v === 'object' && v.name) return String(v.name).toLowerCase()
  return String(v).toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim()
}
function corpus(f) { return {title:norm(f.title),seo:norm(f.SEO_Keyword),keywords:norm(f.Keywords),legacy:norm(f['Legacy Keyword']),summary:norm(f.summary)} }
function termScore(p, term, points) {
  let s=0
  if (p.title.includes(term)) s+=points*6
  if (p.seo.includes(term)) s+=points*4
  if (p.keywords.includes(term)) s+=points*3
  if (p.legacy.includes(term)) s+=points*3
  if (p.summary.includes(term)) s+=points
  return s
}
function scoreRules(p,rules){return rules.reduce((s,[t,n])=>s+termScore(p,t,n),0)}

function mappedPrior(masterTopic,legacyCategory){
  const x=`${norm(masterTopic)} | ${norm(legacyCategory)}`
  if(/processing/.test(x))return['Science & Processing',48]
  if(/standard|quality|flavor|flavour/.test(x))return['Science & Quality',44]
  if(/roast/.test(x))return['Roasting Science',42]
  if(/brewing|espresso/.test(x))return['How-To Guide',42]
  if(/climate|sustain/.test(x))return['Sustainability',48]
  if(/b2b sourcing|sourcing/.test(x))return['Sourcing',38]
  if(/market|robusta industry|econom/.test(x))return['Market Analysis',44]
  if(/travel|souvenir|gift/.test(x))return['GEO Travel',48]
  if(/cambodia origin|other origin|history/.test(x))return['Origin Story',32]
  if(/pepper pairing/.test(x))return['Specialty Coffee',18]
  if(/arabica.*fr|overview|specialty/.test(x))return['Specialty Coffee',30]
  return null
}

function classify(fields,legacyFields={}){
  const p=corpus(fields)
  const scores=Object.fromEntries(CATEGORIES.map(c=>[c,0]))
  for(const[cat,rules]of Object.entries(RULES))scores[cat]=scoreRules(p,rules)

  let origin=0
  for(const t of ORIGINS){
    if(p.title.includes(t))origin+=3
    if(p.seo.includes(t))origin+=2
    if(p.keywords.includes(t))origin+=1
    if(p.legacy.includes(t))origin+=1
  }
  for(const t of ORIGIN_CONTEXT)origin+=termScore(p,t,8)
  scores['Origin Story']=origin

  let specialty=3
  for(const t of SPECIALTY_TERMS)specialty+=termScore(p,t,3)
  scores['Specialty Coffee']=specialty

  const prior=mappedPrior(legacyFields['Master Topic'],legacyFields.category)
  if(prior)scores[prior[0]]+=prior[1]

  const t=p.title
  if(/export packing|supplier evaluation|sourcing|procurement|importer|exporter|due diligence|technical data sheet|trading guide|trade guide|supply chain|farm to roaster|from farm to roaster/.test(t))scores.Sourcing+=90
  if(/bitterness|harshness|acidity|cupping|grading|defect|quality|sensory|flavor science|flavour science|flavor notes|flavour notes|freshness|shelf life|cup point|earthy|woody|smoky/.test(t))scores['Science & Quality']+=75
  if(/market|price|expensive|industry|sector|forecast|demand|production volume|trade data|price premium/.test(t))scores['Market Analysis']+=65
  if(/hotel|restaurant|office|horeca|foodservice|menu application|menu strategy|for cafés|for cafes|private label/.test(t))scores.B2B+=70
  if(/fermentation|honey process|natural process|washed process|processing|drying|rewetting/.test(t))scores['Science & Processing']+=70
  if(/climate|drought|agroforestry|biodiversity|water risk|water stress|sustainab|carbon/.test(t))scores.Sustainability+=70
  if(/roast profile|roasting science|roasting curve|roast curve|roast degree|roast level|first crack|development time|maillard|charge temperature|rest after roasting|roasting equipment/.test(t))scores['Roasting Science']+=65
  if(/brew|espresso|french press|cold brew|pour-over|pour over|aeropress|moka|extraction|grind/.test(t))scores['How-To Guide']+=50
  if(/barista training|barista certification|latte art|milk steaming/.test(t))scores['Barista Training']+=95
  if(/recipe|cocktail|mocktail|syrup|make at home/.test(t))scores.Recipe+=85
  if(/souvenir|gift guide|bring home|bringing home|what to buy|best coffee shops|coffee shops|travel guide|where to buy coffee|before you leave/.test(t))scores['GEO Travel']+=95
  if(/origin story|coffee origin|history of|coffee history|terroir|region guide|coffee region|origin profile/.test(t))scores['Origin Story']+=75

  let best='Specialty Coffee',bestScore=scores[best]
  for(const cat of PRIORITY){if(scores[cat]>bestScore){best=cat;bestScore=scores[cat]}}
  return{category:best,score:bestScore}
}

async function apiFetch(url,options={},attempt=0){
  const r=await fetch(url,{...options,headers:{Authorization:`Bearer ${API_KEY}`,'Content-Type':'application/json',...(options.headers||{})}})
  if((r.status===429||r.status>=500)&&attempt<6){await new Promise(res=>setTimeout(res,Math.min(5000,400*2**attempt)));return apiFetch(url,options,attempt+1)}
  if(!r.ok)throw new Error(`Airtable ${r.status}: ${await r.text()}`)
  return r.json()
}
async function listRecords(table,fields){
  const out=[];let offset=''
  do{const q=new URLSearchParams({pageSize:'100'});fields.forEach(f=>q.append('fields[]',f));if(offset)q.set('offset',offset);const d=await apiFetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}?${q}`);out.push(...d.records);offset=d.offset||''}while(offset)
  return out
}
async function updateBatch(batch){return apiFetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(MASTER_TABLE)}`,{method:'PATCH',body:JSON.stringify({records:batch.map(x=>({id:x.id,fields:{Category:x.category}})),typecast:false})})}

const[master,legacy]=await Promise.all([listRecords(MASTER_TABLE,MASTER_FIELDS),listRecords(LEGACY_TABLE,LEGACY_FIELDS)])
console.log(`[OCC classify v3] master=${master.length} legacyEvidence=${legacy.length} expected=${EXPECTED_COUNT} mode=${EXECUTE?'EXECUTE':'DRY_RUN'}`)
if(master.length!==EXPECTED_COUNT)throw new Error(`Corpus count changed: expected ${EXPECTED_COUNT}, got ${master.length}. Refusing to write.`)
const legacyById=new Map(legacy.map(r=>[r.id,r.fields]))
const plan=master.map(r=>{const legacyId=String(r.fields['Legacy Record ID']||'');const result=classify(r.fields,legacyById.get(legacyId)||{});return{id:r.id,title:String(r.fields.title||''),previous:norm(r.fields.Category),category:result.category,score:result.score,legacyTopic:norm(legacyById.get(legacyId)?.['Master Topic'])}})
const invalid=plan.filter(x=>!CATEGORIES.includes(x.category));if(invalid.length)throw new Error(`Invalid categories=${invalid.length}`)
const counts=Object.fromEntries(CATEGORIES.map(c=>[c,0]));const examples=Object.fromEntries(CATEGORIES.map(c=>[c,[]]))
for(const x of plan){counts[x.category]++;if(examples[x.category].length<8)examples[x.category].push(x.title)}
console.log('[OCC classify v3] planned counts='+JSON.stringify(counts))
for(const c of CATEGORIES)if(counts[c])console.log(`[OCC classify v3] ${c} (${counts[c]}): ${examples[c].join(' || ')}`)
console.log(`[OCC classify v3] wouldChange=${plan.filter(x=>x.previous!==x.category.toLowerCase()).length} sourceTopicMatched=${plan.filter(x=>x.legacyTopic).length}`)
if(!EXECUTE){console.log('[OCC classify v3] DRY RUN COMPLETE — no Airtable writes performed');process.exit(0)}

let written=0
for(let i=0;i<plan.length;i+=10){const b=plan.slice(i,i+10);await updateBatch(b);written+=b.length;if(written%100===0||written===plan.length)console.log(`[OCC classify v3] written=${written}/${plan.length}`);await new Promise(r=>setTimeout(r,240))}

const verify=await listRecords(MASTER_TABLE,['title','Category'])
const verifyCounts=Object.fromEntries(CATEGORIES.map(c=>[c,0]));let blank=0,mismatch=0;const expectedById=new Map(plan.map(x=>[x.id,x.category]))
for(const r of verify){const cat=typeof r.fields.Category==='string'?r.fields.Category:r.fields.Category?.name;if(!cat){blank++;continue}verifyCounts[cat]=(verifyCounts[cat]||0)+1;if(expectedById.get(r.id)!==cat)mismatch++}
const total=Object.values(verifyCounts).reduce((a,b)=>a+b,0)
console.log(`[OCC classify v3] VERIFY total=${total} blank=${blank} mismatch=${mismatch}`)
console.log('[OCC classify v3] verified counts='+JSON.stringify(verifyCounts))
if(verify.length!==EXPECTED_COUNT||total!==EXPECTED_COUNT||blank||mismatch)throw new Error('Post-write verification failed')
console.log('[OCC classify v3] COMPLETE — Category only; 1682/1682 verified')
