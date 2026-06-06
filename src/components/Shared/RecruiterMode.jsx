import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SECURITY_PROJECTS, ML_RESEARCH } from '../../utils/constants';
import { ROLES, PERSONAS, CERT_CATEGORIES, ROLE_HIGHLIGHTS, CURRENT_BUILDING } from '../../data/resume-config';
import { usePortfolioData } from '../../hooks/usePortfolioData';

const skills = [
  { category: 'Cybersecurity', roles: ['cybersecurity'], items: [
    { name: 'Intrusion Detection', level: 'research' },
    { name: 'Network Security', level: 'research' },
    { name: 'Vulnerability Assessment', level: 'research' },
    { name: 'AES-256 Encryption', level: 'production' },
    { name: 'Penetration Testing', level: 'certified' },
  ]},
  { category: 'Machine Learning', roles: ['ml-engineer', 'ai-engineer', 'research'], items: [
    { name: 'XGBoost', level: 'production' },
    { name: 'Random Forest', level: 'production' },
    { name: 'Feature Engineering', level: 'research' },
    { name: 'SMOTE / Imbalance', level: 'research' },
    { name: 'Confusion Analysis', level: 'research' },
  ]},
  { category: 'Systems', roles: ['ai-engineer', 'backend'], items: [
    { name: 'CUDA', level: 'learning' },
    { name: 'Distributed Systems', level: 'production' },
    { name: 'Multi-Agent AI', level: 'production' },
    { name: 'Ollama / NIM', level: 'production' },
    { name: 'ChromaDB', level: 'production' },
  ]},
  { category: 'Languages & Tools', roles: ['backend', 'ml-engineer', 'cybersecurity', 'ai-engineer', 'research'], items: [
    { name: 'Java', level: 'production' },
    { name: 'Python', level: 'production' },
    { name: 'Flask', level: 'production' },
    { name: 'React', level: 'production' },
    { name: 'D3.js', level: 'research' },
    { name: 'SQL', level: 'production' },
  ]},
];

const levelStyles = {
  production: { label: 'Production', color: '#00FF88', bg: '#00FF8815' },
  research: { label: 'Research', color: '#00D4FF', bg: '#00D4FF15' },
  certified: { label: 'Certified', color: '#FFD700', bg: '#FFD70015' },
  learning: { label: 'In Progress', color: '#FF6B00', bg: '#FF6B0015' },
};

const personaStyles = {
  recruiter: { color: '#FFD700', accent: 'Focus: impact and business value' },
  'hiring-manager': { color: '#00FF88', accent: 'Focus: skills and measurable results' },
  founder: { color: '#FF6B00', accent: 'Focus: initiative and ownership' },
  researcher: { color: '#00D4FF', accent: 'Focus: methodology and publications' },
  engineer: { color: '#9B59B6', accent: 'Focus: technical depth and architecture' },
};

export default function RecruiterMode({ onClose }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState('recruiter');
  const { certifications: allCerts } = usePortfolioData();

  const persona = personaStyles[selectedPersona];
  const roleHighlight = selectedRole ? ROLE_HIGHLIGHTS[selectedRole] : null;

  const filteredSkills = selectedRole
    ? skills.filter(g => g.roles.includes(selectedRole))
    : skills;

  const filteredCerts = selectedRole
    ? allCerts.filter(c => c.roles.includes(selectedRole))
    : allCerts;

  const certsByCategory = filteredCerts.reduce((acc, cert) => {
    if (!acc[cert.category]) acc[cert.category] = [];
    acc[cert.category].push(cert);
    return acc;
  }, {});

  const filteredProjects = selectedRole
    ? [...SECURITY_PROJECTS, ...ML_RESEARCH].filter(p =>
        roleHighlight?.topProjects.includes(p.codename)
      )
    : [...SECURITY_PROJECTS, ...ML_RESEARCH];

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'r' || e.key === 'R') onClose?.();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen" style={{ background: '#06080F' }}>
      {/* Persistent indicator — hidden in print */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-between no-print" style={{ background: '#0A0E14', borderBottom: '1px solid #1C2030' }}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-wider" style={{ color: persona.color }}>RECRUITER MODE</span>
          <span className="font-mono text-[9px] text-gray-600">{persona.accent}</span>
        </div>
        <button onClick={onClose} className="font-mono text-[10px] text-gray-500 hover:text-sith-red transition-colors">PRESS R TO EXIT</button>
      </div>

      <div className="pt-14 pb-12 px-4 md:px-12 max-w-6xl mx-auto print:pt-0 print:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-display text-3xl text-ghost-white">Arjun Pakhan</h1>
          <p className="font-mono text-sm mt-1" style={{ color: persona.color }}>Intelligence Systems Engineer</p>
          <p className="text-body text-xs text-gray-500 mt-1">Computer Engineering — AI, Cybersecurity, Distributed Systems, ML Infrastructure</p>
        </div>

        {/* Role Selector — hidden in print */}
        <div className="flex flex-wrap gap-2 mb-6 no-print">
          <button
            onClick={() => setSelectedRole(null)}
            className="px-3 py-1.5 rounded font-mono text-[10px] border transition-all"
            style={{
              background: !selectedRole ? `${persona.color}15` : '#0D1117',
              borderColor: !selectedRole ? persona.color : '#2A3040',
              color: !selectedRole ? persona.color : '#666',
            }}
          >
            All Roles
          </button>
          {ROLES.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              className="px-3 py-1.5 rounded font-mono text-[10px] border transition-all"
              style={{
                background: selectedRole === r.id ? `${r.color}15` : '#0D1117',
                borderColor: selectedRole === r.id ? r.color : '#2A3040',
                color: selectedRole === r.id ? r.color : '#666',
              }}
            >
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        {/* Persona Selector — hidden in print */}
        <div className="flex flex-wrap gap-2 mb-8 no-print">
          <span className="font-mono text-[9px] text-gray-600 self-center mr-2">VIEW AS:</span>
          {PERSONAS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className="px-2 py-1 rounded font-mono text-[9px] border transition-all"
              style={{
                background: selectedPersona === p.id ? `${personaStyles[p.id].color}15` : 'transparent',
                borderColor: selectedPersona === p.id ? personaStyles[p.id].color : '#1C2030',
                color: selectedPersona === p.id ? personaStyles[p.id].color : '#555',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Role summary — only when a role is selected */}
        {roleHighlight && (
          <div className="mb-8 p-4 rounded-lg border" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
            <div className="font-mono text-[9px] uppercase tracking-wider mb-2" style={{ color: persona.color }}>
              {ROLES.find(r => r.id === selectedRole)?.icon} {ROLES.find(r => r.id === selectedRole)?.label} — {persona.accent}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">{roleHighlight.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Skills + Certifications + Education */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            {filteredSkills.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => {
                    const style = levelStyles[skill.level];
                    return (
                      <span
                        key={skill.name}
                        className="px-2 py-1 rounded font-mono text-[10px] flex items-center gap-1.5"
                        style={{ background: style.bg, color: style.color, border: `1px solid ${style.color}20` }}
                      >
                        {skill.name}
                        <span className="opacity-50 text-[8px]">{style.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Certifications — grouped by category */}
            <div>
              <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-3">Certifications</h3>
              <div className="space-y-3">
                {Object.entries(certsByCategory).map(([cat, certs]) => (
                  <div key={cat}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: CERT_CATEGORIES[cat]?.color }} />
                      <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: CERT_CATEGORIES[cat]?.color }}>
                        {CERT_CATEGORIES[cat]?.label}
                      </span>
                    </div>
                    {certs.map(c => (
                      <div key={c.id} className="ml-3.5 pl-3 border-l border-[#1C2030] mb-2">
                        <div className="text-xs text-ghost-white flex items-center gap-2">
                          {c.title}
                          {c.status === 'in-progress' && (
                            <span className="text-yellow-400 text-[8px] border border-yellow-400/30 px-1 rounded font-mono">IN PROGRESS</span>
                          )}
                        </div>
                        <div className="font-mono text-[9px] text-gray-500">
                          {c.issuer} {c.date && `· ${c.date}`} {(c.certificateId || c.credentialId) && `· ${c.certificateId || c.credentialId}`}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-1">Education</h3>
              <p className="text-body text-xs text-ghost-white">Computer Engineering — Current Student</p>
            </div>
          </div>

          {/* Right column: Current Building + Key Projects + Actions */}
          <div className="space-y-4">
            {/* Current Building */}
            <div>
              <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">Currently Building</h3>
              <div className="card-surface p-4">
                <div className="font-mono text-[9px] tracking-widest mb-1" style={{ color: persona.color }}>{CURRENT_BUILDING.status}</div>
                <div className="text-xs text-ghost-white font-medium mb-1">{CURRENT_BUILDING.title}</div>
                <p className="text-[10px] text-gray-500 mb-2">{CURRENT_BUILDING.description}</p>
                <div className="w-full bg-[#0A0E14] rounded-full h-1.5 mb-2">
                  <div className="h-1.5 rounded-full" style={{ width: `${CURRENT_BUILDING.progress}%`, background: persona.color }} />
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {CURRENT_BUILDING.stack.map(s => (
                    <span key={s} className="px-1.5 py-0.5 rounded font-mono text-[8px] text-gray-500" style={{ background: '#0A0E14' }}>{s}</span>
                  ))}
                </div>
                <ul className="space-y-0.5">
                  {CURRENT_BUILDING.goals.map((g, i) => (
                    <li key={i} className="text-[9px] text-gray-500 flex items-start gap-1">
                      <span style={{ color: persona.color }}>▸</span>{g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Projects */}
            <div>
              <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                {selectedRole ? `${ROLES.find(r => r.id === selectedRole)?.label} Projects` : 'Key Projects'}
              </h3>
              {filteredProjects.slice(0, 4).map((p) => (
                <div key={p.codename} className="card-surface p-3 mb-2">
                  <div className="font-mono text-[9px] text-gray-600 mb-0.5">{p.codename}</div>
                  <div className="text-xs text-ghost-white">{p.title}</div>
                  {p.plainSummary && (
                    <p className="text-[10px] text-gray-500 mt-1">{p.plainSummary}</p>
                  )}
                  {p.stats && (
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {p.stats.slice(0, 3).map(s => (
                        <span key={s.label} className="font-mono text-[9px]" style={{ color: persona.color }}>
                          {s.value} <span className="text-gray-600">{s.label}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions — hidden in print */}
            <div className="space-y-2 pt-4 no-print">
              <button
                onClick={handlePrint}
                className="block w-full text-center py-2.5 rounded font-mono text-xs text-navy font-medium transition-colors"
                style={{ background: persona.color }}
              >
                Download Resume (PDF)
              </button>
              <div className="flex gap-2">
                <a href="https://github.com/arjunpakhan" className="flex-1 text-center py-2 rounded font-mono text-[10px] text-gray-500 border border-[#1C2030] hover:text-ghost-white hover:border-gray-600 transition-colors">GitHub</a>
                <a href="https://linkedin.com/in/arjunpakhan" className="flex-1 text-center py-2 rounded font-mono text-[10px] text-gray-500 border border-[#1C2030] hover:text-ghost-white hover:border-gray-600 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
