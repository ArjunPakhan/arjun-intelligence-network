export const LAYERS = [
  { id: 0, name: 'HOME', label: 'Command Center', color: '#FF6B00', key: '0' },
  { id: 1, name: 'COMMAND', label: 'System Overview', color: '#9B59B6', key: '1' },
  { id: 2, name: 'SECURITY', label: 'SOC Operations', color: '#FF2020', key: '2' },
  { id: 3, name: 'RESEARCH', label: 'ML Lab', color: '#00FF88', key: '3' },
  { id: 4, name: 'THINKING', label: 'Reasoning', color: '#7FFF00', key: '4' },
  { id: 5, name: 'MEMORY', label: 'Knowledge Core', color: '#00D4FF', key: '5' },
  { id: 6, name: 'CLASSIFIED', label: 'Research Lab', color: '#E0E0E0', key: '6', hidden: true },
  { id: 7, name: 'UPLINK', label: 'Terminal', color: '#FFD700', key: '7' },
];

export const LIVE_METRICS = [
  { label: 'Research Papers', value: '3', suffix: '', color: '#FF6B00' },
  { label: 'ML Models Trained', value: '30', suffix: '+', color: '#00FF88' },
  { label: 'Network Flows Analyzed', value: '3.5', suffix: 'M', color: '#FF2020' },
  { label: 'IoT Samples Processed', value: '455', suffix: 'K+', color: '#00D4FF' },
  { label: 'Problems Solved', value: '200', suffix: '+', color: '#9B59B6' },
];

export const SYSTEM_ROLES = [
  { name: 'SECURITY', role: 'Threat Analysis Engine', model: 'Llama 3.1 405B via NVIDIA NIM', color: '#FF2020', icon: '🛡', realOutput: 'CRITICAL: Hardcoded API key detected in source', description: 'Monitors all code for vulnerabilities, exposed secrets, and attack vectors.' },
  { name: 'RESEARCH', role: 'Code Analysis Module', model: 'Nemotron-4 9B via NVIDIA NIM', color: '#00FF88', icon: '🔬', realOutput: 'Data leakage detected in XGBoost pipeline', description: 'Reviews every line for logical flaws, data leaks, and invalid assumptions.' },
  { name: 'STRATEGY', role: 'Decision Engine', model: 'Hermes 3 via Ollama local', color: '#7FFF00', icon: '🧠', realOutput: '3 assumptions invalid — rethink decision path', description: 'Questions every decision. Forces validation of assumptions.' },
  { name: 'ADVISOR', role: 'Task Orchestrator', model: 'Hermes 3 via Ollama local', color: '#FF6B00', icon: '📋', realOutput: 'Focus: adversarial ML + IEEE submission this week', description: 'Tracks deadlines, prioritizes tasks, maintains intelligence briefs.' },
  { name: 'MEMORY', role: 'Persistent Context Store', model: 'ChromaDB + SQLite', color: '#00D4FF', icon: '💾', realOutput: 'Retrieved 3 related past research sessions', description: 'Persistent memory across sessions. Retrieves relevant context.' },
  { name: 'COMMAND', role: 'Central Orchestrator', model: 'Routes all commands', color: '#FFD700', icon: '⚡', realOutput: '/security: threat flag detected in pipeline', description: 'Central intelligence. Routes commands, manages inter-module communication.' },
];

export const SYSTEM_OVERVIEW = {
  role: 'Computer Engineering Student',
  domains: ['Artificial Intelligence', 'Cybersecurity', 'Distributed Systems', 'ML Infrastructure'],
  currentFocus: ['CUDA', 'AI Agents', 'Anomaly Detection', 'GPU Computing'],
  careerDirection: ['NVIDIA', 'ML Systems Engineering', 'Security Research'],
};

export const CURRENT_MISSION = {
  codename: 'VANGUARD',
  name: 'Operation VANGUARD',
  objective: 'CUDA-Accelerated Transformer Engine',
  status: 'Research Phase',
  target: 'NVIDIA Internship',
  progress: 35,
  log: [
    { date: '2025-05', event: 'Architecture design complete', status: 'done' },
    { date: '2025-05', event: 'CUDA kernel benchmarks initiated', status: 'done' },
    { date: '2025-06', event: 'Mixed-precision compute pipeline', status: 'active' },
    { date: '2025-07', event: 'Transformer inference engine v1', status: 'pending' },
  ],
};

export const OPERATIONS = [
  {
    id: 'sentinel',
    codename: 'SENTINEL',
    title: 'Distributed Intrusion Detection System',
    description: 'Multi-node IDS analyzing 3.5M network flows across 10 attack classes with 99.7% accuracy. AES-256 encrypted inter-node communication.',
    year: '2024',
    layer: 2,
    status: 'completed',
    stats: { flows: '3.5M', accuracy: '99.7%', nodes: '3', features: '79' },
    architecture: [
      { block: 'Client Nodes', tech: 'Java', purpose: 'Flow collection at network edges' },
      { block: 'AES-256 Encryption', tech: 'AES-256-CBC', purpose: 'Secure inter-node transport' },
      { block: 'Central Server', tech: 'Flask', purpose: 'Aggregation and preprocessing' },
      { block: 'ML Pipeline', tech: 'RF + XGBoost + IF', purpose: 'Ensemble classification' },
      { block: 'Dashboard', tech: 'React', purpose: 'Real-time threat visualization' },
    ],
  },
  {
    id: 'echo',
    codename: 'ECHO',
    title: 'IoMT Health Monitoring',
    description: 'Internet of Medical Things monitoring system. Real-time anomaly detection on medical device telemetry with sub-100ms inference latency.',
    year: '2025',
    layer: 2,
    status: 'active',
    stats: { devices: '50+', latency: '<100ms', uptime: '99.9%' },
  },
  {
    id: 'cerberus',
    codename: 'CERBERUS',
    title: 'IoT Malware Detection',
    description: 'Hybrid feature selection pipeline achieving 57% dimensionality reduction on 455K+ IoT malware samples. 8 malware families classified.',
    year: '2025',
    layer: 3,
    status: 'active',
    stats: { samples: '455K+', classes: '8', reduction: '57%', accuracy: '~88%' },
  },
  {
    id: 'athena',
    codename: 'ATHENA',
    title: 'HeatSense AI',
    description: 'Hyperlocal heat intelligence platform fusing satellite thermal imagery, smartphone sensors, and NDVI maps for urban India.',
    year: '2025',
    layer: 3,
    status: 'development',
    stats: { sources: '3', coverage: 'Urban India' },
  },
  {
    id: 'nexus',
    codename: 'NEXUS',
    title: 'Arjun Intelligence Network',
    description: 'Distributed AI orchestrator routing tasks across 6 specialized modules. Local + cloud inference. This system.',
    year: '2025',
    layer: 1,
    status: 'active',
    stats: { modules: '6', params: '405B+' },
  },
  {
    id: 'vanguard',
    codename: 'VANGUARD',
    title: 'CUDA Transformer Engine',
    description: 'Custom transformer inference engine optimized for NVIDIA GPUs. CUDA kernels, mixed-precision compute, custom attention mechanisms.',
    year: '2025',
    layer: 6,
    status: 'research',
    stats: { target: 'NVIDIA Internship' },
  },
  {
    id: 'titan',
    codename: 'TITAN',
    title: 'Large Scale AI Infrastructure',
    description: 'Future vision: distributed training and inference infrastructure at scale. Multi-node GPU clusters, federated learning.',
    year: '2026',
    layer: 6,
    status: 'planned',
    stats: { status: 'Planned' },
  },
];

export const SECURITY_PROJECTS = [
  {
    title: 'Secure Distributed IDS',
    codename: 'SENTINEL',
    plainSummary: 'Built a system that watches network traffic across multiple computers and catches hackers with 99.7% accuracy.',
    plainEnglish: 'Monitors network traffic in real time and detects cyberattacks before they cause damage.',
    impact: 'Could save organizations millions by detecting attacks before they cause damage.',
    stats: [
      { label: 'Network Flows', value: '3.5M+' },
      { label: 'Attack Classes', value: '10' },
      { label: 'Detection Accuracy', value: '99.7%' },
    ],
    stack: ['Java', 'Flask', 'Random Forest', 'XGBoost', 'Isolation Forest', 'AES-256'],
    description: 'Distributed intrusion detection system analyzing 3.5 million network flow records across 10 attack classes with near-perfect detection accuracy.',
    status: 'IEEE Paper Submitted',
  },
  {
    title: 'IoT Malware Detection',
    codename: 'CERBERUS',
    plainSummary: 'Created a tool that identifies viruses on smart devices by analyzing patterns in network data.',
    plainEnglish: 'Identifies malware on IoT devices by analyzing network behavior patterns.',
    impact: 'Makes IoT devices safer — critical as billions of smart devices come online.',
    stats: [
      { label: 'Dataset Samples', value: '455K+' },
      { label: 'Malware Classes', value: '8' },
      { label: 'Feature Reduction', value: '57%' },
      { label: 'Accuracy', value: '~88%' },
    ],
    stack: ['CIC-YNU-IoTMal 2026', 'XGBoost', 'Hybrid Feature Selection', 'SMOTE'],
    description: 'Hybrid feature selection achieving 57% dimensionality reduction on severely imbalanced IoT malware dataset while maintaining classification accuracy.',
    status: 'IEEE/Scopus Submission',
  },
  {
    title: 'SQL Injection Research',
    codename: 'BREACH',
    plainSummary: 'Studied how hackers break into websites through database queries and how to stop them.',
    plainEnglish: 'Certified research in how SQL injection attacks work and how to prevent them.',
    impact: 'Helps web developers build safer applications that protect user data.',
    stats: [
      { label: 'Certification', value: 'EC-Council CodeRed' },
      { label: 'Certificate #', value: '493668' },
    ],
    stack: ['SQL Injection', 'Web Security', 'Penetration Testing'],
    description: 'Certified research in SQL injection attack vectors, detection patterns, and prevention methodologies.',
    status: 'Certified — #493668',
  },
];

export const ATTACK_TYPES = [
  { id: 'portscan', name: 'Port Scan', severity: 'Medium', confidence: 95.1, color: '#FFD700' },
  { id: 'spoofing', name: 'Spoofing Attack', severity: 'Critical', confidence: 99.7, color: '#FF2020' },
  { id: 'botnet', name: 'Botnet Activity', severity: 'High', confidence: 98.3, color: '#FF6B00' },
  { id: 'ddos', name: 'DDoS Attack', severity: 'Critical', confidence: 99.2, color: '#FF2020' },
  { id: 'malware', name: 'Malware Propagation', severity: 'High', confidence: 97.8, color: '#FF6B00' },
];

export const THREAT_LOG = [
  { type: 'Spoofing', severity: 'Critical', confidence: 99.7, time: '2ms', node: 'Mumbai' },
  { type: 'Botnet', severity: 'High', confidence: 98.3, time: '5ms', node: 'Cloud Gateway' },
  { type: 'Port Scan', severity: 'Medium', confidence: 95.1, time: '1ms', node: 'Nagpur' },
  { type: 'DDoS', severity: 'Critical', confidence: 99.2, time: '3ms', node: 'IoT Cluster' },
  { type: 'Malware', severity: 'High', confidence: 97.8, time: '8ms', node: 'Edge Unit' },
];

export const IDS_NODES = [
  { id: 'mumbai', label: 'Mumbai Node', x: 0.12, y: 0.4, type: 'primary' },
  { id: 'nagpur', label: 'Nagpur Node', x: 0.3, y: 0.2, type: 'secondary' },
  { id: 'cloud', label: 'Cloud Gateway', x: 0.5, y: 0.5, type: 'gateway' },
  { id: 'iot', label: 'IoT Sensor Cluster', x: 0.7, y: 0.3, type: 'iot' },
  { id: 'edge', label: 'Edge Processing', x: 0.85, y: 0.55, type: 'edge' },
  { id: 'analysis', label: 'Analysis Engine', x: 0.75, y: 0.75, type: 'analysis' },
  { id: 'research', label: 'Research Network', x: 0.35, y: 0.75, type: 'research' },
];

export const DATASETS = [
  {
    name: 'CICFlowMeter',
    rows: '3.5M',
    features: 79,
    attackClasses: 10,
    description: 'Network flow-based intrusion detection dataset. 79 engineered features per flow record spanning timing, volume, and behavioral metrics.',
    source: 'Canadian Institute for Cybersecurity',
  },
  {
    name: 'IoMT Health Data',
    rows: '850K+',
    features: 42,
    attackClasses: 6,
    description: 'Medical device telemetry data for anomaly detection in Internet of Medical Things environments.',
    source: 'Custom Collection',
  },
  {
    name: 'CIC-YNU-IoTMal 2026',
    rows: '455K+',
    features: 20,
    attackClasses: 8,
    description: 'IoT malware classification dataset with 8 malware families. Severely imbalanced — requires SMOTE handling.',
    source: 'CIC-YNU Partnership',
  },
];

export const MODEL_LEADERBOARD = [
  {
    name: 'XGBoost',
    accuracy: 88.1,
    precision: 87.5,
    recall: 86.9,
    f1: 87.2,
    notes: 'Best for IoT malware with hybrid features',
    status: 'primary',
  },
  {
    name: 'Random Forest',
    accuracy: 99.7,
    precision: 99.5,
    recall: 99.3,
    f1: 99.4,
    notes: 'Best for network flow IDS',
    status: 'primary',
  },
  {
    name: 'Isolation Forest',
    accuracy: 94.2,
    precision: 92.8,
    recall: 93.5,
    f1: 93.1,
    notes: 'Unsupervised anomaly detection baseline',
    status: 'baseline',
  },
  {
    name: 'Gradient Boosting',
    accuracy: 86.5,
    precision: 85.9,
    recall: 85.2,
    f1: 85.5,
    notes: 'Comparison baseline',
    status: 'baseline',
  },
  {
    name: 'Transformers',
    accuracy: null,
    precision: null,
    recall: null,
    f1: null,
    notes: 'Future: Operation VANGUARD',
    status: 'future',
  },
];

export const FEATURE_SETS = [
  {
    name: 'Full Feature Set',
    count: 20,
    accuracy: 82.3,
    reduction: 0,
    features: ['FlowDuration', 'TotalPackets', 'FwdPackets', 'BwdPackets', 'FlowBytes', 'FlowIAT Mean', 'FwdIAT Mean', 'BwdIAT Mean', 'FlowPkts/s', 'BwdPkts/s', 'FwdHeaderLen', 'BwdHeaderLen', 'FwdSegSize', 'BwdSegSize', 'Active Mean', 'Idle Mean', 'SubflowFwd', 'InitBwdWin', 'FwdActDataPkts', 'FlowActive Mean'],
  },
  {
    name: 'Hybrid Selection',
    count: 9,
    accuracy: 87.8,
    reduction: 55,
    features: ['FlowDuration', 'TotalPackets', 'FlowBytes', 'FlowIAT Mean', 'FlowPkts/s', 'FwdHeaderLen', 'FwdSegSize', 'InitBwdWin', 'FlowActive Mean'],
  },
  {
    name: 'Optimized Subset',
    count: 5,
    accuracy: 88.1,
    reduction: 75,
    features: ['FlowDuration', 'FlowBytes', 'FlowPkts/s', 'FwdSegSize', 'InitBwdWin'],
  },
];

export const ML_RESEARCH = [
  {
    title: 'UPI Gen Z Spending Behaviour',
    codename: 'CERBERUS',
    coAuthor: 'Aditya Jangid',
    advisor: 'Dr. Sugam Shivhare, NMIMS',
    year: '2024',
    plainSummary: 'Analyzed how young people spend money through mobile payments and found when fraud is most likely to happen.',
    impact: 'Banks can use this to protect customers during high-risk hours.',
    keyFindings: ['70% of transactions under ₹500', 'Peak fraud window: 7–10 PM', 'Neurofinance framework applied'],
    description: 'Comprehensive study on Gen Z UPI spending patterns using neurofinance frameworks. Identified critical fraud windows and spending behavior clusters.',
    status: 'Published 2024',
  },
  {
    title: 'IoT Malware Detection',
    codename: 'CERBERUS',
    coAuthor: 'Research Team',
    advisor: 'Independent Research',
    year: '2025',
    plainSummary: 'Used machine learning to identify malicious software on smart devices, cutting the data needed in half while keeping accuracy high.',
    impact: 'Faster, cheaper malware detection for IoT manufacturers and security teams.',
    keyFindings: ['57% feature reduction via hybrid selection', '~88% accuracy with XGBoost', 'Handled severe class imbalance with SMOTE'],
    description: 'ML perspective on IoT malware classification — feature engineering, model comparison, and SMOTE-based handling of severely imbalanced security datasets.',
    status: 'In Progress',
  },
  {
    title: 'HeatSense',
    codename: 'ATHENA',
    coAuthor: 'Research Team',
    advisor: 'Independent Research',
    year: '2025',
    plainSummary: 'Built a platform that combines satellite and phone data to create detailed heat maps of cities.',
    impact: 'Helps city planners understand urban heat islands and plan cooling strategies.',
    keyFindings: ['Satellite thermal data fusion', 'Smartphone sensor integration', 'NDVI map correlation'],
    description: 'Hyperlocal heat intelligence platform for urban India. Fuses satellite thermal imagery, smartphone sensor data, and NDVI vegetation maps.',
    status: 'Development',
  },
];

export const REASONING_TREE = {
  question: 'Why XGBoost for IoT Malware Detection?',
  nodes: [
    {
      id: 'assumptions',
      label: 'Assumptions',
      children: [
        { id: 'a1', label: 'Dataset is severely imbalanced (8 classes)', impact: 'high' },
        { id: 'a2', label: 'Features are heterogeneous (timing + volume)', impact: 'medium' },
        { id: 'a3', label: 'Inference must be fast (<100ms)', impact: 'high' },
      ],
    },
    {
      id: 'tradeoffs',
      label: 'Tradeoffs',
      children: [
        { id: 't1', label: 'RF: Fast but no boosting — misses complex patterns', impact: 'medium' },
        { id: 't2', label: 'NN: High accuracy but slow inference, needs GPU', impact: 'high' },
        { id: 't3', label: 'XGBoost: Balances speed + accuracy + handles imbalance', impact: 'high' },
      ],
    },
    {
      id: 'alternatives',
      label: 'Alternatives Considered',
      children: [
        { id: 'alt1', label: 'Random Forest — baseline, 82% accuracy', impact: 'medium' },
        { id: 'alt2', label: 'Isolation Forest — unsupervised, 94% on anomalies', impact: 'medium' },
        { id: 'alt3', label: 'Transformer — future, needs GPU infrastructure', impact: 'low' },
      ],
    },
    {
      id: 'decision',
      label: 'Final Decision',
      children: [
        { id: 'd1', label: 'XGBoost with hybrid feature selection', impact: 'high' },
        { id: 'd2', label: '57% feature reduction, 88% accuracy maintained', impact: 'high' },
        { id: 'd3', label: 'SMOTE for class imbalance handling', impact: 'high' },
      ],
    },
  ],
};

export const KNOWLEDGE_GRAPH = {
  nodes: [
    { id: 'ids', label: 'Distributed IDS', group: 'security', size: 40 },
    { id: 'ml', label: 'ML Pipeline', group: 'research', size: 35 },
    { id: 'iot', label: 'IoT Security', group: 'security', size: 30 },
    { id: 'cuda', label: 'CUDA Computing', group: 'systems', size: 25 },
    { id: 'agents', label: 'Multi-Agent AI', group: 'research', size: 35 },
    { id: 'upi', label: 'UPI Research', group: 'research', size: 20 },
    { id: 'heat', label: 'HeatSense', group: 'research', size: 20 },
    { id: 'crypto', label: 'AES-256', group: 'security', size: 15 },
    { id: 'xgboost', label: 'XGBoost', group: 'ml', size: 25 },
    { id: 'rf', label: 'Random Forest', group: 'ml', size: 20 },
    { id: 'smote', label: 'SMOTE', group: 'ml', size: 15 },
    { id: 'flask', label: 'Flask API', group: 'systems', size: 15 },
    { id: 'chroma', label: 'ChromaDB', group: 'systems', size: 15 },
    { id: 'ollama', label: 'Ollama', group: 'systems', size: 20 },
  ],
  edges: [
    { from: 'ids', to: 'ml' }, { from: 'ids', to: 'crypto' }, { from: 'ids', to: 'flask' },
    { from: 'ml', to: 'xgboost' }, { from: 'ml', to: 'rf' }, { from: 'ml', to: 'smote' },
    { from: 'iot', to: 'ids' }, { from: 'iot', to: 'ml' }, { from: 'iot', to: 'xgboost' },
    { from: 'agents', to: 'ollama' }, { from: 'agents', to: 'chroma' },
    { from: 'upi', to: 'ml' }, { from: 'heat', to: 'ml' },
    { from: 'cuda', to: 'agents' }, { from: 'cuda', to: 'ml' },
  ],
};

export const SYSTEMS_THINKING = [
  { title: 'CAP Theorem of Life', content: 'You can have Consistency, Availability, and Partition tolerance in life — but at most two at a time.', category: 'Mental Model' },
  { title: 'Trust Without Verification', content: 'Trust without verification is a vulnerability. In code, in security, in systems, in people.', category: 'Security Principle' },
  { title: 'Anomaly Detection', content: 'Anomaly detection is a moving target. The baseline shifts. What was normal yesterday is suspicious today.', category: 'Systems Thinking' },
  { title: 'The Distributed Mind', content: 'A multi-agent system outperforms a single genius — not because agents are smarter, but because they are parallel.', category: 'Architecture' },
];

export const LINKEDIN_POSTS = [
  { title: 'Why I Built a Multi-Agent Intelligence System Instead of Using ChatGPT', excerpt: 'Single-model AI is a bottleneck. Here\'s how distributing intelligence across specialized modules changes the game.', date: '2025', url: '#' },
  { title: 'The CAP Theorem of Career Decisions', excerpt: 'You can\'t optimize for learning, salary, and impact simultaneously. Here\'s how I choose which two to sacrifice.', date: '2025', url: '#' },
  { title: 'What 3.5M Network Flows Taught Me About Anomaly Detection', excerpt: 'Building a distributed IDS taught me that security isn\'t about firewalls — it\'s about pattern recognition at scale.', date: '2024', url: '#' },
  { title: 'Trust Without Verification Is a Vulnerability', excerpt: 'In code, in security, in systems, in people. Why "trust but verify" is the most underrated engineering principle.', date: '2024', url: '#' },
];

export const BOOT_SEQUENCE_LINES = [
  { text: 'ARJUN INTELLIGENCE NETWORK v3.0 — INITIALIZING...', delay: 0 },
  { text: 'POST check: Neural processing unit [OK]', delay: 200 },
  { text: 'POST check: GPU compute cores [OK]', delay: 350 },
  { text: 'POST check: Distributed memory bus [OK]', delay: 500 },
  { text: 'Loading system modules...', delay: 700 },
  { text: '  [1/8] COMMAND — Central Orchestrator ............ ONLINE', delay: 900 },
  { text: '  [2/8] SECURITY — Threat Analysis Engine ......... ONLINE', delay: 1100 },
  { text: '  [3/8] RESEARCH — ML Pipeline .................. ONLINE', delay: 1300 },
  { text: '  [4/8] THINKING — Reasoning Engine ............. ONLINE', delay: 1500 },
  { text: '  [5/8] MEMORY — Knowledge Core ................ ONLINE', delay: 1700 },
  { text: '  [6/8] CLASSIFIED — Research Lab ............... LOCKED', delay: 1900 },
  { text: '  [7/8] UPLINK — Command Terminal ............... ONLINE', delay: 2100 },
  { text: 'Loading 7 modules... [████████████████████] 100%', delay: 2300 },
  { text: 'All systems nominal. Intelligence Network online.', delay: 2500 },
  { text: 'Awaiting command.', delay: 2700 },
];

export const RESEARCH_TIMELINE = [
  { id: 'sentinel', codename: 'SENTINEL', title: 'Distributed IDS', year: '2024', layer: 2, status: 'completed' },
  { id: 'cerberus', codename: 'CERBERUS', title: 'IoT Malware', year: '2025', layer: 3, status: 'active' },
  { id: 'athena', codename: 'ATHENA', title: 'HeatSense AI', year: '2025', layer: 3, status: 'development' },
  { id: 'nexus', codename: 'NEXUS', title: 'AIN System', year: '2025', layer: 1, status: 'active' },
  { id: 'vanguard', codename: 'VANGUARD', title: 'CUDA Engine', year: '2025', layer: 6, status: 'research' },
  { id: 'titan', codename: 'TITAN', title: 'AI Infrastructure', year: '2026', layer: 6, status: 'planned' },
];

export const UPLINK_COMMANDS = {
  '/help': { output: ['Commands:', '', '  /projects         List all operations', '  /missions          Show current missions', '  /research          View research papers', '  /security          Open SOC dashboard', '  /ask <topic>       Ask about a domain', '  /contact --email   Send a message', '  /resume            Download resume', '  /github            Open GitHub', '  /linkedin          Open LinkedIn', '  /sudo              Easter egg', '', 'Or press 0-7 to navigate layers.'], color: '#FFD700' },
  '/sudo': { output: ['Permission denied.', '', 'Nice try. You lack root clearance.', '...but I respect the attempt.'], color: '#FF2020' },
  '/resume': { output: ['Initiating secure transfer...', 'Resume_Pakhan_Arjun.pdf — preparing download.'], color: '#00FF88', action: 'download' },
  '/github': { output: ['Opening GitHub profile...'], color: '#E0E0E0', action: 'open', url: 'https://github.com/arjunpakhan' },
  '/linkedin': { output: ['Opening LinkedIn profile...'], color: '#00D4FF', action: 'open', url: 'https://linkedin.com/in/arjunpakhan' },
  '/ask': {
    color: '#9B59B6',
    responses: {
      'ids': 'SENTINEL: Distributed IDS, 3.5M flows, 10 attack classes, 99.7% accuracy. Java + Flask + RF/XGBoost/IF ensemble.',
      'ml': 'Three tracks: UPI behavioral analysis (neurofinance), IoT malware (57% feature reduction), HeatSense (satellite + sensor fusion).',
      'security': 'EC-Council CodeRed certified (#493668). SQL injection vectors, distributed IDS, IoT malware classification.',
      'cuda': 'Operation VANGUARD: Custom transformer inference engine for NVIDIA GPUs. CUDA kernels + mixed-precision compute.',
      'research': 'Published: UPI Gen Z (2024). Active: IoT Malware (IEEE), HeatSense. All with real datasets and quantified results.',
      'iot': 'IoT: CIC-YNU-IoTMal 2026, 455K+ samples, 8 classes, 57% feature reduction, ~88% accuracy with XGBoost.',
      'upi': 'UPI research: Aditya Jangid co-author, Dr. Sugam Shivhare advisor. 70% transactions <₹500, peak fraud 7-10 PM.',
      'distributed': 'Philosophy: specialized modules, not generalists. Local (Ollama) for privacy, cloud (NVIDIA NIM) for scale.',
      'default': 'Ask about: ids, ml, security, cuda, research, iot, upi, distributed.',
    },
  },
  '/projects': { output: ['Operations:', '', '  SENTINEL — Distributed IDS (completed)', '  ECHO — IoMT Health Monitoring (active)', '  CERBERUS — IoT Malware Detection (active)', '  ATHENA — HeatSense AI (development)', '  NEXUS — Intelligence Network (active)', '  VANGUARD — CUDA Engine (research)', '  TITAN — AI Infrastructure (planned)'], color: '#FF6B00' },
};
