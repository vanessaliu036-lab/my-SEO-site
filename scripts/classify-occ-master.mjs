const API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appJCcT41WRfKpWk2'
const TABLE = 'OCC_Blog_Posts'
const EXPECTED_COUNT = 1682
const EXPECTED_BRANCH = 'ops/classify-occ-1682'
const EXECUTE = process.argv.includes('--execute')

if (!API_KEY) throw new Error('Missing Airtable API key')
if (process.env.VERCEL && process.env.VERCEL_GIT_COMMIT_REF !== EXPECTED_BRANCH) {
  throw new Error(`Refusing to run classifier outside ${EXPECTED_BRANCH}`)
}

const FIELDS = ['title', 'summary', 'SEO_Keyword', 'Keywords', 'Legacy Keyword', 'Category']
const PRIMARY_CATEGORIES = [
  'Science & Processing',
  'Science & Quality',
  'Roasting Science',
  'How-To Guide',
  'Sustainability',
  'Sourcing',
  'B2B',
  'Market Analysis',
  'Origin Story',
  'Barista Training',
  'Recipe',
  'Specialty Coffee',
]

const ORIGIN_TERMS = [
  'cambodia','cambodian','mondulkiri','kampot','ratanakiri','phnom penh','siem reap',
  'vietnam','vietnamese','laos','lao coffee','indonesia','indonesian','uganda','ugandan',
  'brazil','brazilian','india','indian coffee','thailand','thai coffee','myanmar','ethiopia',
  'colombia','colombian','ecuador','central america','africa','asia origin','terroir','highland',
]

const RULES = {
  'Roasting Science': [
    ['roast profile',6],['roasting',5],['roaster',5],['roast degree',5],['roast level',5],
    ['first crack',6],['development time',6],['maillard',6],['charge temperature',6],
    ['roast curve',6],['light roast',4],['medium roast',4],['dark roast',4],['roasted robusta',3],
  ],
  'Science & Processing': [
    ['fermentation',6],['anaerobic',6],['carbonic maceration',6],['honey process',6],
    ['natural process',6],['washed process',6],['wet process',5],['dry process',5],['processing method',5],
    ['coffee processing',5],['post-harvest',5],['postharvest',5],['drying',4],['mucilage',5],
    ['depulp',5],['wet mill',5],['dry mill',5],['fermentation protocol',6],['processing',3],
  ],
  'Science & Quality': [
    ['cqi',6],['sca ',6],['sca standard',7],['fine robusta standard',7],['q grader',6],
    ['cupping',6],['cupping score',7],['sensory',5],['green grading',6],['grading',5],
    ['defect',5],['quality protocol',6],['quality standard',6],['coffee quality',4],['80+',5],
    ['flavor chemistry',6],['flavour chemistry',6],['chlorogenic',6],['caffeine',5],
    ['water activity',6],['moisture content',5],['genetic',5],['genetics',5],['cultivar',5],
    ['botanical',5],['coffea canephora',5],['species',4],['sensory profile',5],['flavor profile',3],
    ['flavour profile',3],['body and mouthfeel',4],['mouthfeel',3],['quality',2],
  ],
  'Sustainability': [
    ['climate change',7],['climate resilience',7],['climate',5],['drought',6],['water stress',6],
    ['agroforestry',7],['shade tree',6],['shade grown',6],['soil health',6],['soil',3],
    ['biodiversity',6],['regenerative',6],['sustainability',6],['sustainable',5],['carbon',5],
    ['environment',4],['ecology',5],['resilience',4],['rainfall',4],['flowering',3],['farm system',4],
  ],
  'Sourcing': [
    ['sourcing',7],['procurement',7],['direct trade',6],['traceability',6],['traceable',5],
    ['cooperative',5],['co-op',5],['exporter',6],['importer',6],['green coffee buying',7],
    ['buying green coffee',7],['supplier due diligence',7],['due diligence',5],['supply chain',5],
    ['logistics',5],['origin buying',6],['purchase contract',6],['coffee contract',5],['lot selection',5],
    ['farmer relationship',5],['producer relationship',5],['supplier',4],['farmers',2],['farmer',2],
  ],
  'B2B': [
    ['hotel coffee',7],['restaurant coffee',7],['office coffee',7],['horeca',7],['foodservice',6],
    ['wholesale',6],['cafe business',6],['café business',6],['coffee shop business',6],
    ['hospitality',5],['commercial account',6],['private label',6],['menu strategy',5],
    ['cafe owner',5],['café owner',5],['restaurant owner',5],['hotel buyer',5],['office buyer',5],
    ['b2b',6],['business buyer',5],['bulk coffee',5],['coffee program',4],['coffee service',4],
  ],
  'Market Analysis': [
    ['market analysis',7],['market outlook',7],['market trend',7],['market size',7],['market share',7],
    ['coffee market',6],['robusta market',6],['price outlook',6],['coffee price',5],['robusta price',5],
    ['economics',6],['economic',5],['demand',4],['forecast',5],['trade data',6],['futures',5],
    ['ice london',6],['production forecast',6],['production volume',5],['industry outlook',6],
    ['industry trend',6],['market growth',6],['category growth',5],['competitiveness',5],['global market',5],
  ],
  'How-To Guide': [
    ['how to brew',7],['brewing',5],['brew ratio',6],['brew guide',6],['espresso',5],
    ['french press',6],['cold brew',6],['pour over',6],['pour-over',6],['aeropress',6],['moka pot',6],
    ['grind size',6],['grinder',4],['extraction',5],['dial in',6],['dial-in',6],['brew temperature',6],
    ['coffee maker',5],['brewing temperature',6],['tds',4],['water recipe',4],['preparation guide',5],
  ],
  'Barista Training': [
    ['barista training',8],['barista workflow',7],['barista',5],['milk steaming',7],['latte art',7],
    ['espresso calibration',7],['calibration routine',6],['service workflow',5],['sensory training',5],
  ],
  'Recipe': [
    ['recipe',7],['coffee recipe',7],['drink recipe',7],['iced latte',5],['latte recipe',6],
    ['coffee mocktail',6],['coffee cocktail',6],['coffee pairing recipe',6],['how to make',4],
  ],
}

const SPECIFIC_ORDER = [
  'Roasting Science',
  'Science & Processing',
  'Science & Quality',
  'Sustainability',
  'Sourcing',
  'B2B',
  'Market Analysis',
  'Barista Training',
  'Recipe',
  'How-To Guide',
]

function normalize(value) {
  if (value == null) return ''
  if (typeof value === 'object' && value.name) return String(value.name).toLowerCase()
  return String(value).toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()
}

function includesTerm(text, term) {
  return text.includes(term)
}

function weightedCorpus(fields) {
  const title = normalize(fields.title)
  const seo = normalize(fields.SEO_Keyword)
  const keywords = normalize(fields.Keywords)
  const legacy = normalize(fields['Legacy Keyword'])
  const summary = normalize(fields.summary)
  return { title, seo, keywords, legacy, summary, all: [title, seo, keywords, legacy, summary].join(' | ') }
}

function scoreRules(parts, rules) {
  let score = 0
  for (const [term, points] of rules) {
    if (includesTerm(parts.title, term)) score += points * 4
    if (includesTerm(parts.seo, term)) score += points * 3
    if (includesTerm(parts.keywords, term)) score += points * 2
    if (includesTerm(parts.legacy, term)) score += points * 2
    if (includesTerm(parts.summary, term)) score += points
  }
  return score
}

function originScore(parts) {
  let score = 0
  for (const term of ORIGIN_TERMS) {
    if (includesTerm(parts.title, term)) score += 16
    if (includesTerm(parts.seo, term)) score += 12
    if (includesTerm(parts.keywords, term)) score += 8
    if (includesTerm(parts.legacy, term)) score += 8
    if (includesTerm(parts.summary, term)) score += 3
  }
  const historyGeo = ['origin','history','region','geography','terroir','province','highland','coffee culture','coffee industry in']
  if (historyGeo.some((term) => includesTerm(parts.all, term))) score += 7
  return score
}

function specialtyScore(parts) {
  let score = 1
  const terms = ['fine robusta','specialty robusta','specialty coffee','robusta vs arabica','arabica vs robusta','canephora','robusta coffee','coffee education','coffee guide']
  for (const term of terms) {
    if (includesTerm(parts.title, term)) score += 8
    if (includesTerm(parts.seo, term)) score += 6
    if (includesTerm(parts.keywords, term)) score += 4
    if (includesTerm(parts.legacy, term)) score += 4
    if (includesTerm(parts.summary, term)) score += 2
  }
  return score
}

function classify(fields) {
  const p = weightedCorpus(fields)
  const scores = Object.fromEntries(Object.entries(RULES).map(([cat, rules]) => [cat, scoreRules(p, rules)]))
  scores['Origin Story'] = originScore(p)
  scores['Specialty Coffee'] = specialtyScore(p)

  let best = 'Specialty Coffee'
  let bestScore = scores[best]
  for (const cat of SPECIFIC_ORDER) {
    const s = scores[cat] || 0
    if (s > bestScore) { best = cat; bestScore = s }
  }

  const specificMax = Math.max(...SPECIFIC_ORDER.map((c) => scores[c] || 0))
  const origin = scores['Origin Story'] || 0
  if (origin >= 12 && origin > specificMax * 1.15 && origin > bestScore) {
    best = 'Origin Story'; bestScore = origin
  }

  // A strong specific content intent always beats geography.
  if (specificMax >= 18) {
    for (const cat of SPECIFIC_ORDER) {
      if ((scores[cat] || 0) === specificMax) { best = cat; bestScore = specificMax; break }
    }
  }

  // Broad origin-only pieces should not fall through to generic Specialty Coffee.
  if (best === 'Specialty Coffee' && origin >= 16) best = 'Origin Story'
  return { category: best, score: bestScore, scores }
}

async function apiFetch(url, options = {}, attempt = 0) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
  if ((response.status === 429 || response.status >= 500) && attempt < 6) {
    const wait = Math.min(5000, 400 * 2 ** attempt)
    await new Promise((r) => setTimeout(r, wait))
    return apiFetch(url, options, attempt + 1)
  }
  if (!response.ok) throw new Error(`Airtable ${response.status}: ${await response.text()}`)
  return response.json()
}

async function listRecords(fields = FIELDS) {
  const records = []
  let offset = ''
  do {
    const params = new URLSearchParams({ pageSize: '100' })
    for (const field of fields) params.append('fields[]', field)
    if (offset) params.set('offset', offset)
    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}?${params}`
    const data = await apiFetch(url)
    records.push(...data.records)
    offset = data.offset || ''
  } while (offset)
  return records
}

function summarize(plan) {
  const counts = Object.fromEntries(PRIMARY_CATEGORIES.map((c) => [c, 0]))
  const examples = Object.fromEntries(PRIMARY_CATEGORIES.map((c) => [c, []]))
  for (const item of plan) {
    counts[item.category] = (counts[item.category] || 0) + 1
    if (examples[item.category].length < 6) examples[item.category].push(item.title)
  }
  return { counts, examples }
}

async function updateBatch(batch) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`
  return apiFetch(url, {
    method: 'PATCH',
    body: JSON.stringify({
      records: batch.map((item) => ({ id: item.id, fields: { Category: item.category } })),
      typecast: false,
    }),
  })
}

const records = await listRecords()
console.log(`[OCC classify] fetched=${records.length} expected=${EXPECTED_COUNT} mode=${EXECUTE ? 'EXECUTE' : 'DRY_RUN'}`)
if (records.length !== EXPECTED_COUNT) throw new Error(`Corpus count changed: expected ${EXPECTED_COUNT}, got ${records.length}. Refusing to write.`)

const plan = records.map((record) => {
  const result = classify(record.fields)
  return {
    id: record.id,
    title: String(record.fields.title || ''),
    previous: normalize(record.fields.Category),
    category: result.category,
    score: result.score,
  }
})

const invalid = plan.filter((x) => !PRIMARY_CATEGORIES.includes(x.category))
if (invalid.length) throw new Error(`Classifier produced ${invalid.length} invalid categories`)
const { counts, examples } = summarize(plan)
console.log('[OCC classify] planned counts=' + JSON.stringify(counts))
for (const cat of PRIMARY_CATEGORIES) {
  if (counts[cat]) console.log(`[OCC classify] ${cat} (${counts[cat]}): ${examples[cat].join(' || ')}`)
}
console.log(`[OCC classify] wouldChange=${plan.filter((x) => x.previous !== x.category.toLowerCase()).length}`)

if (!EXECUTE) {
  console.log('[OCC classify] DRY RUN COMPLETE — no Airtable writes performed')
  process.exit(0)
}

let written = 0
for (let i = 0; i < plan.length; i += 10) {
  const batch = plan.slice(i, i + 10)
  await updateBatch(batch)
  written += batch.length
  if (written % 100 === 0 || written === plan.length) console.log(`[OCC classify] written=${written}/${plan.length}`)
  await new Promise((r) => setTimeout(r, 240))
}

const verify = await listRecords(['title', 'Category'])
if (verify.length !== EXPECTED_COUNT) throw new Error(`Verification count mismatch: ${verify.length}`)
const verifyCounts = Object.fromEntries(PRIMARY_CATEGORIES.map((c) => [c, 0]))
let blank = 0
let mismatch = 0
const plannedById = new Map(plan.map((x) => [x.id, x.category]))
for (const record of verify) {
  const category = typeof record.fields.Category === 'string' ? record.fields.Category : record.fields.Category?.name
  if (!category) { blank += 1; continue }
  verifyCounts[category] = (verifyCounts[category] || 0) + 1
  if (plannedById.get(record.id) !== category) mismatch += 1
}
const total = Object.values(verifyCounts).reduce((a, b) => a + b, 0)
console.log(`[OCC classify] VERIFY total=${total} blank=${blank} mismatch=${mismatch}`)
console.log('[OCC classify] verified counts=' + JSON.stringify(verifyCounts))
if (total !== EXPECTED_COUNT || blank !== 0 || mismatch !== 0) throw new Error('Post-write verification failed')
console.log('[OCC classify] COMPLETE — Category only; 1682/1682 verified')
