'use client';

import { useState } from 'react';
import { site } from "../content/site";
import { CommandLine, Output, TerminalDivider } from "../components/Terminal";
import ViewCounter from "../components/ViewCounter";
import Image from "next/image";

export default function Home() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<string[] | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  return (
    <>
      {/* Matrix Background */}
      <div className="matrix-bg" />
      
      {/* Photo Gallery Modal */}
      {galleryPhotos && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(10px)' }}
          onClick={() => setGalleryPhotos(null)}
        >
          <button 
            onClick={() => setGalleryPhotos(null)}
            className="absolute top-4 right-4 text-3xl hover:opacity-70 transition-opacity z-10"
            style={{ color: 'var(--terminal-green)' }}
          >
            ✕
          </button>
          
          {galleryPhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
              }}
              className="absolute left-4 text-4xl hover:opacity-70 transition-opacity"
              style={{ color: 'var(--terminal-green)' }}
            >
              ‹
            </button>
          )}
          
          <div className="relative max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryPhotos[currentPhotoIndex]}
              alt={`Photo ${currentPhotoIndex + 1}`}
              width={1200}
              height={800}
              className="rounded-lg object-contain"
              style={{ maxHeight: '80vh', width: 'auto', border: '2px solid var(--terminal-green)' }}
            />
          </div>
          
          {galleryPhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
              }}
              className="absolute right-4 text-4xl hover:opacity-70 transition-opacity"
              style={{ color: 'var(--terminal-green)' }}
            >
              ›
            </button>
          )}
        </div>
      )}

      {/* Timeline Modal */}
      {showTimeline && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(10px)', overflowY: 'auto' }}
          onClick={() => setShowTimeline(false)}
        >
          <div 
            className="terminal-window p-6 w-full max-w-2xl my-8"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title" style={{ marginBottom: 0 }}>yigitcan.hikaye()</h2>
              <button 
                onClick={() => setShowTimeline(false)}
                className="text-2xl hover:opacity-70 transition-opacity"
                style={{ color: 'var(--terminal-text-dim)' }}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {(site as any).aboutTimeline?.map((item: any, index: number) => (
                <div key={index} className="border-l-2 pl-4 pb-4" style={{ borderColor: 'var(--terminal-green)' }}>
                  <span className="text-sm px-2 py-1 rounded" style={{ 
                    background: 'rgba(34, 197, 94, 0.2)', 
                    color: 'var(--terminal-green)' 
                  }}>
                    [{item.year}]
                  </span>
                  <h3 className="text-lg font-semibold mt-2 mb-1" style={{ color: 'var(--terminal-green-bright)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--terminal-text-dim)' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen py-8 px-4">
        <div className="mx-auto max-w-4xl">
          
          {/* Terminal Window */}
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">Python 3.11.0 | yigitcan.py</span>
            </div>
            
            <div className="terminal-body">
              
              {/* import */}
              <CommandLine command="import yigitcan" delay={0} cellNumber={1}>
                <div className="flex items-center gap-6 mb-4">
                  <div className="profile-terminal">
                    <Image
                      src="/profile.png"
                      alt={site.name}
                      width={100}
                      height={100}
                      className="rounded-md"
                      priority
                    />
                  </div>
                  <div>
                    <Output>{site.name}</Output>
                    <Output dim>{site.title}</Output>
                    <Output dim>📍 {site.location}</Output>
                  </div>
                </div>
              </CommandLine>

              <TerminalDivider />

              {/* about() */}
              <CommandLine command="yigitcan.about()" delay={200} cellNumber={2}>
                <div 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowTimeline(true)}
                >
                  {site.about.map((paragraph, index) => (
                    <Output key={index}>{paragraph}</Output>
                  ))}
                  <div className="mt-2" style={{ color: 'var(--terminal-green)' }}>
                    {'>'} [Hikayemi okumak için tıkla] →
                  </div>
                </div>
              </CommandLine>

              <TerminalDivider />

              {/* education */}
              {(site as any).education && (
                <>
                  <CommandLine command="yigitcan.education.show()" delay={400} cellNumber={3}>
                    <a 
                      href={(site as any).education.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={(site as any).education.logo}
                          alt={(site as any).education.school}
                          width={60}
                          height={60}
                          className="rounded"
                          style={{ background: 'white', padding: '4px' }}
                        />
                        <div>
                          <Output>{(site as any).education.school}</Output>
                          <Output dim>{(site as any).education.department} - {(site as any).education.degree}</Output>
                          <Output dim>📚 {(site as any).education.year} | GPA: {(site as any).education.gpa}</Output>
                        </div>
                      </div>
                    </a>
                  </CommandLine>
                  <TerminalDivider />
                </>
              )}

              {/* skills */}
              <CommandLine command="yigitcan.skills.list()" delay={600} cellNumber={4}>
                <div className="space-y-4">
                  {site.skills.map((skill: any) => (
                    <div key={skill.name} className="glass-card p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{skill.icon}</span>
                        <span style={{ color: 'var(--terminal-green)' }}>{skill.name}</span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--terminal-text-dim)' }}>
                        {skill.description}
                      </p>
                      {skill.sections && (
                        <div className="flex flex-wrap gap-4">
                          {skill.sections.map((section: any) => (
                            <div key={section.title}>
                              <span className="text-xs" style={{ color: 'var(--terminal-text-dim)' }}>
                                {section.title}:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {section.items.map((item: string) => (
                                  <span key={item} className="tech-badge">{item}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CommandLine>

              <TerminalDivider />

              {/* experience */}
              {(site as any).experience && (
                <>
                  <CommandLine command="yigitcan.experience.show()" delay={700} cellNumber={5}>
                    {(site as any).experience.map((exp: any, index: number) => (
                      <div key={index} className="glass-card p-4 mb-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            {exp.link ? (
                              <a 
                                href={exp.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="terminal-link"
                                style={{ textDecoration: 'none' }}
                              >
                                🏢 {exp.company}
                              </a>
                            ) : (
                              <span style={{ color: 'var(--terminal-green)' }}>🏢 {exp.company}</span>
                            )}
                            <span className="text-sm ml-2" style={{ color: 'var(--terminal-text-dim)' }}>
                              | {exp.role}
                            </span>
                          </div>
                          <span className="text-xs" style={{ color: 'var(--terminal-green-dim)' }}>
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm mb-3" style={{ color: 'var(--terminal-text-dim)' }}>
                          {exp.description}
                        </p>
                        <div className="text-sm mb-3" style={{ color: 'var(--terminal-text)' }}>
                          {exp.highlights.map((h: string, i: number) => (
                            <div key={i}>→ {h}</div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {exp.tech.map((t: string) => (
                            <span key={t} className="tech-badge">{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CommandLine>
                  <TerminalDivider />
                </>
              )}

              {/* current status */}
              {site.currentlyWorking && (
                <>
                  <CommandLine command="yigitcan.current_status()" delay={800} cellNumber={6}>
                    <Output dim>// {site.currentlyWorking.title}</Output>
                    {site.currentlyWorking.items.map((item, index) => (
                      item.link ? (
                        <a 
                          key={index}
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="block terminal-link"
                          style={{ marginTop: '8px' }}
                        >
                          {'>'} {item.text}
                        </a>
                      ) : (
                        <Output key={index}>{item.text}</Output>
                      )
                    ))}
                    {/* MTA Program Details */}
                    {(site as any).mtaProgram && (
                      <div className="glass-card p-4 mt-4">
                        <div className="mb-2" style={{ color: 'var(--terminal-green)' }}>
                          🎓 {(site as any).mtaProgram.title}
                        </div>
                        <p className="text-sm mb-3" style={{ color: 'var(--terminal-text-dim)' }}>
                          {(site as any).mtaProgram.description}
                        </p>
                        <div className="text-sm" style={{ color: 'var(--terminal-text)' }}>
                          {(site as any).mtaProgram.highlights.map((h: string, i: number) => (
                            <div key={i}>✓ {h}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CommandLine>
                  <TerminalDivider />
                </>
              )}

              {/* projects */}
              <CommandLine command="yigitcan.projects.show()" delay={1000} cellNumber={7}>
                <div className="space-y-2">
                  {site.projects.map((project) => {
                    const photos = (project as any).photos as string[] | undefined;
                    const primaryLink = 
                      project.links.kaggle || 
                      (project.links as any).sample || 
                      project.links.github || 
                      project.links.demo || 
                      '#';

                    const handleClick = () => {
                      if (photos && photos.length > 0) {
                        setCurrentPhotoIndex(0);
                        setGalleryPhotos(photos);
                      }
                    };

                    return (
                      <div 
                        key={project.name}
                        className="glass-card p-4 cursor-pointer"
                        onClick={photos ? handleClick : undefined}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span style={{ color: 'var(--terminal-green)' }}>
                            📁 {project.name}
                          </span>
                          {(project as any).period && (
                            <span className="text-xs" style={{ color: 'var(--terminal-text-dim)' }}>
                              {(project as any).period}
                            </span>
                          )}
                        </div>
                        <p className="text-sm mb-3" style={{ color: 'var(--terminal-text-dim)' }}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tech.map((tech) => (
                            <span key={tech} className="tech-badge">{tech}</span>
                          ))}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--terminal-text-dim)' }}>
                          {project.highlights.map((highlight, i) => (
                            <div key={i}>→ {highlight}</div>
                          ))}
                        </div>
                        {photos && (
                          <div className="mt-2 text-sm" style={{ color: 'var(--terminal-green)' }}>
                            📸 {photos.length} fotoğraf - [görüntülemek için tıkla]
                          </div>
                        )}
                        {!photos && primaryLink !== '#' && (
                          <a 
                            href={primaryLink}
                            target="_blank"
                            rel="noreferrer"
                            className="terminal-link text-sm mt-2 inline-block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Projeye git
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CommandLine>

              <TerminalDivider />

              {/* links */}
              <CommandLine command="yigitcan.links()" delay={1200} cellNumber={8}>
                <div className="social-links">
                  <a className="social-link" href={site.links.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <a className="social-link" href={site.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                  <a className="social-link" href={site.links.kaggle} target="_blank" rel="noreferrer">
                    Kaggle
                  </a>
                </div>
              </CommandLine>

              {/* Footer */}
              <div className="terminal-footer">
                <p>© {new Date().getFullYear()} <span style={{ color: 'var(--terminal-green)' }}>{site.name}</span></p>
                <p style={{ marginTop: '8px' }}>{'>'} Built with Next.js 💚</p>
                {/* Hidden view counter for analytics */}
                <div style={{ display: 'none' }}>
                  <ViewCounter />
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </>
  );
}
