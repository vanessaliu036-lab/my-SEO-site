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
  'Sourcing','B2B','Market Analysis','Origin Story','Barista Training','Recipe','Specialty Coffee',
]
const PRIORITY = [
  'Roasting Science','Science & Processing','Science & Quality','Sustainability','Sourcing','B2B',
  'Market Analysis','Barista Training','Recipe','How-To Guide','Origin Story','Specialty Coffee',
]

const RULES = {
  'Roasting Science': [
    ['roast profile',9],['roasting',7],['roaster',6],['roast degree',8],['roast level',8],['first crack',10],
    ['development time',9],['maillard',10],['charge temperature',10],['roast curve',9],['light roast',6],
    ['medium roast',6],['dark roast',6],['post-roast',7],['rest after roasting',9],
  ],
  'Science & Processing': [
    ['fermentation',9],['anaerobic',10],['carbonic maceration',10],['honey process',10],['natural process',9],
    ['washed process',9],['wet process',7],['dry process',7],['processing method',8],['coffee processing',9],
    ['post-harvest',8],['postharvest',8],['drying',6],['rewetting',9],['mucilage',8],['depulp',8],
    ['wet mill',8],['dry mill',8],['fermentation protocol',10],['processing & drying',9],
  ],
  'Science & Quality': [
    ['cqi',10],['sca standard',11],['sca score',10],['fine robusta standard',11],['q grader',10],['cupping',9],
    ['cupping score',10],['sensory',8],['green grading',10],['grading',7],['defect',8],['quality protocol',10],
    ['quality standard',10],['coffee quality',7],['80+',8],['flavor chemistry',10],['flavour chemistry',10],
    ['chlorogenic',10],['caffeine',8],['water activity',10],['moisture content',8],['genetics',8],['genetic',8],
    ['cultivar',8],['botanical',8],['coffea canephora',7],['species',6],['sensory profile',8],['flavor profile',6],
    ['flavour profile',6],['mouthfeel',7],['bitterness',8],['harshness',8],['acidity',7],['sweetness',6],
    ['green coffee freshness',9],['green coffee stay fresh',9],['shelf life',8],['quality control',8],
  ],
  'Sustainability': [
    ['climate change',11],['climate resilience',11],['climate risk',10],['drought',10],['water stress',10],
    ['water risk',9],['agroforestry',11],['shade tree',9],['shade grown',9],['soil health',9],['biodiversity',10],
    ['regenerative',10],['sustainability',10],['sustainable',8],['carbon',8],['environment',7],['ecology',8],
    ['rainfall',7],['flowering water',9],['farm system',7],['deforestation',10],['adaptation',7],
  ],
  'Sourcing': [
    ['sourcing',11],['procurement',11],['direct trade',10],['traceability',10],['traceable',8],['cooperative',8],
    ['co-op',8],['exporter',10],['importer',10],['importing',9],['coffee imports',9],['green coffee buying',11],
    ['green coffee buyer',10],['supplier due diligence',11],['due diligence',9],['supply chain',8],['logistics',9],
    ['origin buying',10],['purchase contract',10],['coffee contract',9],['lot selection',8],['supplier evaluation',11],
    ['supplier',7],['export packing',11],['packing',5],['shipment',8],['shipping',7],['documentation',7],
    ['purchase',6],['procure',9],['buyer checklist',8],['technical data sheet',9],['specification',7],
  ],
  'B2B': [
    ['hotel coffee',11],['restaurant coffee',11],['office coffee',11],['horeca',11],['foodservice',10],
    ['wholesale',9],['cafe business',10],['café business',10],['coffee shop business',10],['hospitality',9],
    ['commercial account',9],['private label',9],['menu strategy',9],['menu application',10],['menu applications',10],
    ['cafe owner',8],['café owner',8],['restaurant owner',8],['hotel buyer',8],['office buyer',8],['b2b',7],
    ['business buyer',7],['bulk coffee',7],['coffee program',8],['coffee service',7],['for cafés',9],['for cafes',9],
    ['for hotels',9],['for restaurants',9],['commercial coffee',7],
  ],
  'Market Analysis': [
    ['market analysis',11],['market outlook',11],['market trend',11],['market size',11],['market share',11],
    ['coffee market',10],['robusta market',10],['price outlook',10],['coffee price',9],['robusta price',9],
    ['economics',10],['economic',8],['demand',7],['forecast',9],['trade data',10],['futures',9],['ice london',10],
    ['production forecast',10],['production volume',9],['industry outlook',10],['industry trend',10],['market growth',10],
    ['category growth',9],['competitiveness',8],['global market',9],['sector',7],['industry',5],['ton purchase',8],
    ['coffee purchase mean',9],['export volume',9],['production data',9],
  ],
  'How-To Guide': [
    ['how to brew',11],['brewing',8],['brew ratio',10],['brew guide',10],['espresso',7],['french press',10],
    ['cold brew',10],['pour over',10],['pour-over',10],['aeropress',10],['moka pot',10],['grind size',10],
    ['grinder',7],['extraction',9],['dial in',10],['dial-in',10],['brew temperature',10],['coffee maker',8],
    ['brewing temperature',10],['tds measurement',9],['brew strength',8],['preparation guide',8],
  ],
  'Barista Training': [
    ['barista training',12],['barista certification',12],['barista workflow',11],['milk steaming',11],['latte art',11],
    ['espresso calibration',11],['calibration routine',10],['sensory training',9],['vocational pathway',9],
  ],
  'Recipe': [
    ['recipe',11],['coffee recipe',12],['drink recipe',12],['iced latte',8],['latte recipe',10],['coffee mocktail',10],
    ['coffee cocktail',10],['coffee pairing recipe',10],['syrup',8],['make at home',8],['craft drink',7],
  ],
}

const ORIGINS = ['cambodia','cambodian','mondulkiri','kampot','ratanakiri','phnom penh','siem reap','vietnam','vietnamese','laos','indonesia','indonesian','uganda','ugandan','brazil','brazilian','india','indian coffee','thailand','thai coffee','myanmar','ethiopia','colombia','colombian','ecuador']
const ORIGIN_CONTEXT = ['origin story','coffee origin','origin guide','history of','coffee history','terroir','geography','region guide','coffee region','province','highland origin','coffee culture','where coffee grows','grown in']
const SPECIALTY_TERMS = ['fine robusta','specialty robusta','specialty coffee','robusta vs arabica','arabica vs robusta','canephora','robusta coffee','coffee education']

function norm(v) {
  if (v == null) return ''
  if (typeof v === 'object' && v.name) return String(v.name).toLowerCase()
  return String(v).toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim()
}
function corpus(f) {
  return {
    title:norm(f.title), seo:norm(f.SEO_Keyword), keywords:norm(f.Keywords), legacy:norm(f['Legacy Keyword']), summary:norm(f.summary),
  }
}
function termScore(p, term, points) {
  let s=0
  if (p.title.includes(term)) s += points*6
  if (p.seo.includes(term)) s += points*4
  if (p.keywords.includes(term)) s += points*3
  if (p.legacy.includes(term)) s += points*3
  if (p.summary.includes(term)) s += points
  return s
}
function scoreRules(p, rules) { return rules.reduce((s,[t,n])=>s+termScore(p,t,n),0) }

function mappedPrior(masterTopic, legacyCategory) {
  const x = `${norm(masterTopic)} | ${norm(legacyCategory)}`
  if (/processing/.test(x)) return ['Science & Processing',48]
  if (/standard|quality|flavor|flavour/.test(x)) return ['Science & Quality',44]
  if (/roast/.test(x)) return ['Roasting Science',48]
  if (/brewing|espresso/.test(x)) return ['How-To Guide',42]
  if (/climate|sustain/.test(x)) return ['Sustainability',48]
  if (/b2b sourcing|sourcing/.test(x)) return ['Sourcing',38]
  if (/market|robusta industry|econom/.test(x)) return ['Market Analysis',44]
  if (/cambodia origin|other origin|history/.test(x)) return ['Origin Story',34]
  if (/pepper pairing/.test(x)) return ['Specialty Coffee',18]
  if (/arabica.*fr|overview|specialty/.test(x)) return ['Specialty Coffee',30]
  return null
}

function classify(fields, legacyFields={}) {
  const p=corpus(fields)
  const scores=Object.fromEntries(CATEGORIES.map(c=>[c,0]))
  for (const [cat,rules] of Object.entries(RULES)) scores[cat]=scoreRules(p,rules)

  let origin=0
  for (const t of ORIGINS) {
    if (p.title.includes(t)) origin+=7
    if (p.seo.includes(t)) origin+=5
    if (p.keywords.includes(t)) origin+=3
    if (p.legacy.includes(t)) origin+=3
    if (p.summary.includes(t)) origin+=1
  }
  for (const t of ORIGIN_CONTEXT) origin += termScore(p,t,7)
  scores['Origin Story']=origin

  let specialty=2
  for (const t of SPECIALTY_TERMS) specialty += termScore(p,t,3)
  scores['Specialty Coffee']=specialty

  const prior=mappedPrior(legacyFields['Master Topic'],legacyFields.category)
  if (prior) scores[prior[0]] += prior[1]

  // Source-topic evidence helps, but explicit title intent must win when it is strong.
  const title = p.title
  if (/export packing|supplier evaluation|sourcing|procurement|importer|exporter|due diligence|technical data sheet/.test(title)) scores.Sourcing += 70
  if (/bitterness|harshness|acidity|cupping|grading|defect|quality|sensory|flavor|flavour|freshness|shelf life/.test(title)) scores['Science & Quality'] += 55
  if (/market|price|industry|sector|forecast|demand|production volume|trade data/.test(title)) scores['Market Analysis'] += 50
  if (/hotel|restaurant|office|horeca|foodservice|menu|for cafés|for cafes|wholesale program/.test(title)) scores.B2B += 55
  if (/fermentation|honey process|natural process|washed process|processing|drying/.test(title)) scores['Science & Processing'] += 55
  if (/climate|drought|agroforestry|biodiversity|water risk|water stress|sustainab|carbon/.test(title)) scores.Sustainability += 55
  if (/roast|roasting|roaster/.test(title)) scores['Roasting Science'] += 45
  if (/brew|espresso|french press|cold brew|pour-over|pour over|aeropress|moka|extraction|grind/.test(title)) scores['How-To Guide'] += 40
  if (/barista training|barista certification|latte art|milk steaming/.test(title)) scores['Barista Training'] += 75
  if (/recipe|cocktail|mocktail|syrup|make at home/.test(title)) scores.Recipe += 65
  if (/origin|history|terroir|coffee culture|region guide/.test(title)) scores['Origin Story'] += 45

  let best='Specialty Coffee', bestScore=scores[best]
  for (const cat of PRIORITY) {
    if (scores[cat] > bestScore) { best=cat; bestScore=scores[cat] }
  }
  return {category:best,score:bestScore,scores}
}

async function apiFetch(url, options={}, attempt=0) {
  const r=await fetch(url,{...options,headers:{Authorization:`Bearer ${API_KEY}`,'Content-Type':'application/json',...(options.headers||{})}})
  if ((r.status===429 || r.status>=500) && attempt<6) {
    await new Promise(res=>setTimeout(res,Math.min(5000,400*2**attempt)))
    return apiFetch(url,options,attempt+1)
  }
  if (!r.ok) throw new Error(`Airtable ${r.status}: ${await r.text()}`)
  return r.json()
}
async function listRecords(table, fields) {
  const out=[]; let offset=''
  do {
    const q=new URLSearchParams({pageSize:'100'})
    fields.forEach(f=>q.append('fields[]',f)); if(offset) q.set('offset',offset)
    const d=await apiFetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}?${q}`)
    out.push(...d.records); offset=d.offset||''
  } while(offset)
  return out
}
async function updateBatch(batch) {
  return apiFetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(MASTER_TABLE)}`,{
    method:'PATCH', body:JSON.stringify({records:batch.map(x=>({id:x.id,fields:{Category:x.category}})),typecast:false})
  })
}

const [master,legacy]=await Promise.all([listRecords(MASTER_TABLE,MASTER_FIELDS),listRecords(LEGACY_TABLE,LEGACY_FIELDS)])
console.log(`[OCC classify v2] master=${master.length} legacyEvidence=${legacy.length} expected=${EXPECTED_COUNT} mode=${EXECUTE?'EXECUTE':'DRY_RUN'}`)
if(master.length!==EXPECTED_COUNT) throw new Error(`Corpus count changed: expected ${EXPECTED_COUNT}, got ${master.length}. Refusing to write.`)
const legacyById=new Map(legacy.map(r=>[r.id,r.fields]))
const plan=master.map(r=>{
  const legacyId=String(r.fields['Legacy Record ID']||'')
  const result=classify(r.fields,legacyById.get(legacyId)||{})
  return {id:r.id,title:String(r.fields.title||''),previous:norm(r.fields.Category),category:result.category,score:result.score,legacyTopic:norm(legacyById.get(legacyId)?.['Master Topic'])}
})
const invalid=plan.filter(x=>!CATEGORIES.includes(x.category)); if(invalid.length) throw new Error(`Invalid categories=${invalid.length}`)
const counts=Object.fromEntries(CATEGORIES.map(c=>[c,0])); const examples=Object.fromEntries(CATEGORIES.map(c=>[c,[]]))
for(const x of plan){counts[x.category]++;if(examples[x.category].length<8)examples[x.category].push(x.title)}
console.log('[OCC classify v2] planned counts='+JSON.stringify(counts))
for(const c of CATEGORIES) if(counts[c]) console.log(`[OCC classify v2] ${c} (${counts[c]}): ${examples[c].join(' || ')}`)
const changes=plan.filter(x=>x.previous!==x.category.toLowerCase()).length
console.log(`[OCC classify v2] wouldChange=${changes} sourceTopicMatched=${plan.filter(x=>x.legacyTopic).length}`)
if(!EXECUTE){console.log('[OCC classify v2] DRY RUN COMPLETE — no Airtable writes performed');process.exit(0)}

let written=0
for(let i=0;i<plan.length;i+=10){const b=plan.slice(i,i+10);await updateBatch(b);written+=b.length;if(written%100===0||written===plan.length)console.log(`[OCC classify v2] written=${written}/${plan.length}`);await new Promise(r=>setTimeout(r,240))}

const verify=await listRecords(MASTER_TABLE,['title','Category'])
const verifyCounts=Object.fromEntries(CATEGORIES.map(c=>[c,0]));let blank=0,mismatch=0;const expectedById=new Map(plan.map(x=>[x.id,x.category]))
for(const r of verify){const cat=typeof r.fields.Category==='string'?r.fields.Category:r.fields.Category?.name;if(!cat){blank++;continue}verifyCounts[cat]=(verifyCounts[cat]||0)+1;if(expectedById.get(r.id)!==cat)mismatch++}
const total=Object.values(verifyCounts).reduce((a,b)=>a+b,0)
console.log(`[OCC classify v2] VERIFY total=${total} blank=${blank} mismatch=${mismatch}`)
console.log('[OCC classify v2] verified counts='+JSON.stringify(verifyCounts))
if(verify.length!==EXPECTED_COUNT||total!==EXPECTED_COUNT||blank||mismatch) throw new Error('Post-write verification failed')
console.log('[OCC classify v2] COMPLETE — Category only; 1682/1682 verified')
