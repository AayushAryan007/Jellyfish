// Every string, number and link on the site lives here.
// Edit this file to change copy without touching components.

export const links = {
  linkedin: 'https://www.linkedin.com/in/aayusharyan1287/',
  github: 'https://github.com/AayushAryan007',
  email: 'aayusharyan1210@gmail.com',
  resume: '/assets/docs/Aayush-Aryan-Resume.pdf',
}

// Drop generated Higgsfield clips into /public/assets/video and set the paths here.
// While a value is null, the site renders its live procedural fallback instead.
export const videos = {
  hero: null, // '/assets/video/hero-jellyfish.mp4'
}

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'craft', label: 'Craft' },
  { id: 'story', label: 'Story' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  chip: 'Backend Engineer at Zopper',
  lines: ['Built for', 'the deep', 'end.'],
  sideNote: ['Python · Django', 'Cloud · AI'],
  body: 'I build reliable backend systems, connect the APIs businesses run on, and solve the production problems that keep platforms awake at night.',
  build: ['Backends', 'APIs', 'AI'],
  cards: [
    { value: '10+', label: 'Insurer integrations' },
    { value: '#6', label: 'Global, CodeChef Starters 108' },
    { value: '1,845', label: 'LeetCode Knight' },
  ],
  featureA: { value: '100+', label: 'REST APIs shipped to production' },
  featureB: { value: '~90%', label: 'Faster reports, 30 s to under 3 s' },
}

export const stats = [
  { prefix: '', value: 100, suffix: '+', label: 'REST APIs delivered', detail: 'across 5+ insurance modules' },
  { prefix: '', value: 10, suffix: '+', label: 'Insurer integrations', detail: 'one config-driven interface' },
  { prefix: '~', value: 90, suffix: '%', label: 'Faster reporting', detail: '30 s down to 2–3 s' },
  { prefix: '#', value: 6, suffix: '', label: 'Global rank', detail: 'CodeChef Starters 108' },
  { prefix: '', value: 1, suffix: 'st', label: 'Of 450 coders', detail: 'HackerRank × GDSC ’22' },
]

// Words wrapped in [brackets] glow red.
export const mission = {
  statement:
    'I turn [complex problems] into systems that are [simple, secure,] and [built to last], software that creates real value for the people and businesses who depend on it.',
  note: 'Good engineering is invisible. When a system is designed well, nobody notices it at all. That’s the standard I hold my work to.',
}

export const pillars = [
  {
    title: 'Backend Engineering & System Design',
    body: 'Scalable, secure services in Python and Django: clean REST APIs, well-modelled databases, and asynchronous pipelines that keep working under real load.',
    tags: ['Python', 'Django', 'DRF', 'MySQL', 'PostgreSQL', 'Celery', 'Microservices'],
  },
  {
    title: 'API Integrations & Cloud DevOps',
    body: 'Turning many inconsistent third-party systems into one dependable workflow, then shipping it in containers with automated pipelines and the caching it needs to stay fast.',
    tags: ['REST', 'SAML 2.0', 'Docker', 'AWS', 'OCI', 'Redis', 'RabbitMQ', 'CI/CD'],
  },
  {
    title: 'AI Engineering & Intelligent Applications',
    body: 'Building practical AI products with LLMs, retrieval-augmented generation, vector databases and tool-calling agents, focused on what’s useful rather than what’s fashionable.',
    tags: ['LLMs', 'RAG', 'Vector DBs', 'Agents', 'Tool calling'],
  },
]

export const story = [
  {
    title: 'The curiosity',
    meta: 'Where it started',
    body: 'It began with wanting to know how things actually work, and the habit of not stopping until I did.',
  },
  {
    title: 'JSS Academy of Technical Education',
    meta: 'B.Tech · Noida · 2021–2025',
    body: 'Built my foundations in programming and sharpened problem-solving through competitive coding: 6th globally in a CodeChef Starters round, 1st of 450 in a HackerRank × GDSC contest.',
  },
  {
    title: 'Into production at Zopper',
    meta: 'Associate Software Engineer · Jan 2026',
    body: 'Started building real backend systems for insurance: complex business rules, revenue-critical workflows, and zero tolerance for duplicate charges or lost policies.',
  },
  {
    title: 'Ownership',
    meta: 'Backend SPOC · Equitas Bank',
    body: 'Led a cross-functional team on the bank’s insurance platform, and became the sole backend engineer on its policy data platform, owning everything from requirements to 2 a.m. incident fixes.',
  },
  {
    title: 'What’s next',
    meta: 'Backend depth × AI',
    body: 'Deepening system-design expertise while building with AI: systems that are technically strong and genuinely useful.',
  },
]

export const storyClose =
  'Growth comes from consistency, ownership, and the willingness to keep pushing past what you already know.'

export const principles = [
  { title: 'Own it end to end', body: 'From the first requirement to the production incident. If it ships with my name on it, I see it through.' },
  { title: 'Measure, then optimise', body: 'A 30-second report became 3 seconds because I found the N+1 query before I guessed at a fix.' },
  { title: 'Secure by default', body: 'SAML SSO with replay protection, encrypted fields behind blind indexes, and VAPT findings closed, not deferred.' },
  { title: 'Make the wrong thing impossible', body: 'A custom database router made writes to eight production databases structurally impossible, not just discouraged.' },
]

export const work = [
  {
    title: 'Equitas Bank Insurance Platform',
    role: 'Backend SPOC · Zopper',
    trace: ['POST /v1/policy/issue', 'idempotency-key  a91f…  ✓', 'premium.calculate()  ✓', '201 Created'],
    description: 'Led a cross-functional team delivering a bank’s insurance platform: Health, Life, Motor and Sachet modules behind one config-driven interface.',
    stack: 'Django · DRF · Celery · Redis · Docker · AWS · OCI',
    impact: '100+ APIs across 10+ insurers, with transactional, idempotent issuance that prevents duplicate charges.',
  },
  {
    title: 'Back Office Policy Data Platform',
    role: 'Sole backend engineer',
    trace: ['02:00  sftp.scan(16 insurers)', 'ingest → commercials → classify', 'payments → push-back → mis.email', '80 feeds → 1 canonical schema'],
    description: 'Nightly pipeline that pulls 80 file feeds from 16 insurers, normalises them into one 100-column schema and enriches them against 8 read-only production databases.',
    stack: 'Django · DRF · MySQL · Celery · Redis',
    impact: 'Sales reports from ~30 s to 2–3 s by removing an N+1 of cross-database lookups.',
  },
  {
    title: 'Health Monitoring & Adoption Analytics',
    role: 'Backend engineer',
    trace: ['leads.count()  74,672', 'cohort: MIN(created_at)', 'leads.count()  22,030', 'over-count fixed  −70%'],
    description: 'Adoption analytics and API health checks across a three-service Django architecture with no shared database: 25 endpoints, 56 tests.',
    stack: 'Django · Celery · MySQL',
    impact: 'Found and fixed a 70% over-count in production lead metrics, validated against 11,887 real quotes.',
  },
  {
    title: 'Azure AD SAML 2.0 Single Sign-On',
    role: 'Security & auth',
    trace: ['SAMLResponse  signature ✓', 'replay ledger  ✓', 'destination  host-independent ✓', 'identity  fail-closed'],
    description: 'SP-initiated SSO with MFA, a replay-protection ledger and an HMAC blind index over a Fernet-encrypted email column.',
    stack: 'Django · SAML 2.0 · Entra ID',
    impact: 'Secure enterprise login, plus the fix for a full-service outage caused by an xmlsec/lxml mismatch.',
  },
]

export const edge = {
  items: [
    { value: '6', suffix: 'th', label: 'Global, CodeChef Starters 108' },
    { value: '1', suffix: 'st', label: 'Of 450, HackerRank × GDSC' },
    { value: '2', suffix: 'nd', label: 'Of 690, Nibble Computer Society' },
    { value: '1,845', suffix: '', label: 'LeetCode, Knight badge' },
  ],
  note: 'Codeforces Round 926 (Div. 2): 2,290th of 43,000+, peak rating 1,399.',
}
