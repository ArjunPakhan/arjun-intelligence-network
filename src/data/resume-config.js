export const ROLES = [
  { id: 'cybersecurity', label: 'Cybersecurity', color: '#FF2020', icon: '🛡' },
  { id: 'ml-engineer', label: 'ML Engineer', color: '#00FF88', icon: '🤖' },
  { id: 'ai-engineer', label: 'AI Engineer', color: '#9B59B6', icon: '🧠' },
  { id: 'backend', label: 'Backend Developer', color: '#FFD700', icon: '⚙' },
  { id: 'research', label: 'Research Scientist', color: '#00D4FF', icon: '🔬' },
];

export const PERSONAS = [
  { id: 'recruiter', label: 'Recruiter', description: 'Highlights impact and business value' },
  { id: 'hiring-manager', label: 'Hiring Manager', description: 'Focuses on skills and results' },
  { id: 'founder', label: 'Founder', description: 'Shows initiative and ownership' },
  { id: 'researcher', label: 'Researcher', description: 'Emphasizes methodology and publications' },
  { id: 'engineer', label: 'Engineer', description: 'Leans into technical depth' },
];

export const CERTIFICATIONS = [
  {
    id: 'ec-council-codered',
    title: 'EC-Council CodeRed — SQL Injection',
    issuer: 'EC-Council',
    date: '2024',
    certificateId: '#493668',
    category: 'security',
    roles: ['cybersecurity', 'backend'],
    description: 'SQL injection attack vectors, detection patterns, and prevention methodologies.',
  },
  {
    id: 'nvidia-deep-learning',
    title: 'NVIDIA Deep Learning Institute',
    issuer: 'NVIDIA',
    date: '2025',
    certificateId: null,
    category: 'ml',
    roles: ['ml-engineer', 'ai-engineer', 'research'],
    description: 'GPU-accelerated deep learning, CUDA programming, and neural network training.',
  },
  {
    id: 'google-python',
    title: 'Google Python Automation',
    issuer: 'Google / Coursera',
    date: '2024',
    certificateId: null,
    category: 'programming',
    roles: ['backend', 'ml-engineer'],
    description: 'Python scripting, automation, and data processing pipelines.',
  },
  {
    id: 'ibm-cybersecurity',
    title: 'IBM Cybersecurity Analyst',
    issuer: 'IBM / Coursera',
    date: '2024',
    certificateId: null,
    category: 'security',
    roles: ['cybersecurity'],
    description: 'Threat detection, incident response, and security information management.',
  },
  {
    id: 'microsoft-azure-ai',
    title: 'Microsoft Azure AI Fundamentals',
    issuer: 'Microsoft',
    date: '2024',
    certificateId: null,
    category: 'cloud',
    roles: ['ai-engineer', 'backend'],
    description: 'Azure AI services, cognitive APIs, and cloud ML deployment.',
  },
  {
    id: 'tensorflow-developer',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2025',
    certificateId: null,
    category: 'ml',
    roles: ['ml-engineer', 'ai-engineer'],
    description: 'Building and training neural networks using TensorFlow and Keras.',
  },
];

export const CERT_CATEGORIES = {
  security: { label: 'Security', color: '#FF2020' },
  ml: { label: 'Machine Learning', color: '#00FF88' },
  programming: { label: 'Programming', color: '#FFD700' },
  cloud: { label: 'Cloud & Infrastructure', color: '#00D4FF' },
};

export const ROLE_HIGHLIGHTS = {
  cybersecurity: {
    summary: 'Cybersecurity specialist with hands-on experience in distributed intrusion detection, malware classification, and vulnerability research.',
    topProjects: ['SENTINEL', 'CERBERUS', 'BREACH'],
    keySkills: ['Intrusion Detection', 'Malware Analysis', 'Penetration Testing', 'AES-256 Encryption', 'Network Security', 'Vulnerability Assessment'],
  },
  'ml-engineer': {
    summary: 'ML engineer specializing in classification pipelines, feature engineering, and production-ready model deployment.',
    topProjects: ['CERBERUS', 'ATHENA', 'SENTINEL'],
    keySkills: ['XGBoost', 'Random Forest', 'Feature Engineering', 'SMOTE', 'Model Evaluation', 'Data Pipelines'],
  },
  'ai-engineer': {
    summary: 'AI engineer building multi-agent orchestration systems with local and cloud inference routing.',
    topProjects: ['NEXUS', 'VANGUARD', 'CERBERUS'],
    keySkills: ['Multi-Agent Systems', 'LLM Orchestration', 'CUDA', 'Transformer Architecture', 'Prompt Engineering', 'RAG'],
  },
  backend: {
    summary: 'Backend developer experienced in distributed systems, API design, and real-time data processing.',
    topProjects: ['NEXUS', 'SENTINEL', 'ECHO'],
    keySkills: ['Java', 'Flask', 'Python', 'Distributed Systems', 'REST APIs', 'Database Design'],
  },
  research: {
    summary: 'Research scientist with published work in behavioral analytics and active submissions in IoT security and environmental sensing.',
    topProjects: ['CERBERUS', 'ATHENA', 'SENTINEL'],
    keySkills: ['Statistical Analysis', 'Experimental Design', 'Paper Writing', 'Data Visualization', 'Literature Review', 'Reproducible Research'],
  },
};

export const CURRENT_BUILDING = {
  title: 'Operation VANGUARD — CUDA Transformer Engine',
  description: 'Custom transformer inference engine optimized for NVIDIA GPUs with CUDA kernels, mixed-precision compute, and custom attention mechanisms.',
  status: 'Research Phase',
  progress: 35,
  stack: ['CUDA', 'C++', 'Python', 'NVIDIA Hopper Architecture'],
  goals: [
    'Custom CUDA attention kernels for transformer inference',
    'Mixed-precision (FP16/INT8) compute pipeline',
    'Benchmark against cuBERT and TensorRT',
    'Target: NVIDIA Internship submission',
  ],
};
