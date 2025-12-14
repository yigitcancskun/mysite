'use client';

import { site } from "../content/site";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <div className="mx-auto max-w-2xl px-6 py-20">
        
        {/* Hero Section */}
        <header className="fade-in-up">
          <p className="text-sm tracking-wide mb-6" style={{ color: 'var(--muted)' }}>
            📍 {site.location}
          </p>
          <div className="flex items-center gap-6 mb-4">
            <div className="profile-image relative">
              <Image
                src="/profile.png"
                alt={site.name}
                width={120}
                height={120}
                className="rounded-full"
                style={{
                  border: '3px solid rgba(139, 92, 246, 0.5)',
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
                }}
                priority
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight gradient-text mb-2">
                {site.name}
              </h1>
              <p className="text-lg font-light" style={{ color: 'var(--muted)' }}>
                {site.title}
              </p>
            </div>
          </div>
          <p className="text-base leading-relaxed mt-4" style={{ color: 'var(--muted)' }}>
            {site.tagline}
          </p>

          {/* Social Links */}
          <nav className="flex flex-wrap gap-3 mt-8">
            <a className="link-hover text-sm" href={site.links.github} target="_blank" rel="noreferrer">
              🐙 GitHub
            </a>
            <a className="link-hover text-sm" href={site.links.linkedin} target="_blank" rel="noreferrer">
              💼 LinkedIn
            </a>
            <a className="link-hover text-sm" href={site.links.kaggle} target="_blank" rel="noreferrer">
              🏆 Kaggle
            </a>
          </nav>
        </header>

        <div className="divider" />

        {/* About Section */}
        <section className="fade-in-up fade-in-up-delay-1">
          <h2 className="section-title">Hakkımda</h2>
          <div className="glass-card p-6">
            <div className="space-y-3">
              {site.about.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Currently Working Section */}
        {site.currentlyWorking && (
          <>
            <section className="fade-in-up fade-in-up-delay-2">
              <h2 className="section-title">{site.currentlyWorking.title}</h2>
              <div className="space-y-3">
                {site.currentlyWorking.items.map((item, index) => {
                  const CardContent = (
                    <div key={index} className="activity-card" style={{ cursor: item.link ? 'pointer' : 'default' }}>
                      <span className="text-base">{item.text}</span>
                      {item.link && <span className="ml-2 text-xs" style={{ color: 'var(--accent)' }}>↗</span>}
                    </div>
                  );
                  
                  return item.link ? (
                    <a key={index} href={item.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {CardContent}
                    </a>
                  ) : (
                    CardContent
                  );
                })}
              </div>
            </section>

            <div className="divider" />
          </>
        )}

        {/* Skills Section */}
        <section className="fade-in-up fade-in-up-delay-3">
          <h2 className="section-title">Yetenekler</h2>
          <div className="flex flex-wrap gap-3">
            {site.skills.map((skill, index) => (
              <span 
                key={skill} 
                className="skill-badge"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Projects Section */}
        <section className="fade-in-up fade-in-up-delay-4">
          <h2 className="section-title">Projeler</h2>
          <div className="space-y-6">
            {site.projects.map((project) => {
              const primaryLink = 
                project.links.kaggle || 
                (project.links as any).sample || 
                project.links.github || 
                project.links.demo || 
                (project.links as any).presentation || 
                '#';

              return (
                <a 
                  key={project.name} 
                  href={primaryLink}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card block"
                  style={{ 
                    cursor: primaryLink === '#' ? 'default' : 'pointer',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <article>
                    <h3 className="text-xl font-semibold mb-2 gradient-text">
                      {project.name}
                    </h3>
                    {(project as any).period && (
                      <p className="text-xs mb-3" style={{ color: 'var(--accent)' }}>
                        📅 {(project as any).period}
                      </p>
                    )}
                    <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="text-sm space-y-2" style={{ color: 'var(--muted)' }}>
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2">
                          <span style={{ color: 'var(--accent)' }}>→</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                </a>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 text-sm text-center fade-in-up fade-in-up-delay-5" 
          style={{ color: 'var(--muted)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <p className="mb-2">
            © {new Date().getFullYear()} <span className="gradient-text font-medium">{site.name}</span>
          </p>
          <p style={{ opacity: 0.6 }}>
            Next.js ile 💜 yapıldı
          </p>
        </footer>

        </div>
      </main>
    </>
  );
}
