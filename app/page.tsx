'use client';

import { useState } from 'react';
import { site } from "../content/site";
import MouseGlow from "../components/MouseGlow";
import Image from "next/image";

export default function Home() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<string[] | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [minecraftMode, setMinecraftMode] = useState(false);

  return (
    <>
      <MouseGlow />
      
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
            style={{ color: 'white' }}
          >
            ✕
          </button>
          
          {/* Previous Button */}
          {galleryPhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
              }}
              className="absolute left-4 text-6xl hover:opacity-70 transition-opacity p-4"
              style={{ color: 'white', zIndex: 100, background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ‹
            </button>
          )}
          
          {/* Photo */}
          <div 
            className="relative max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryPhotos[currentPhotoIndex]}
              alt={`Photo ${currentPhotoIndex + 1}`}
              width={1200}
              height={800}
              className="rounded-lg object-contain"
              style={{ maxHeight: '80vh', width: 'auto' }}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {galleryPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPhotoIndex(index);
                  }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ 
                    background: index === currentPhotoIndex ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
                    transform: index === currentPhotoIndex ? 'scale(1.5)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Next Button */}
          {galleryPhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
              }}
              className="absolute right-4 text-6xl hover:opacity-70 transition-opacity p-4"
              style={{ color: 'white', zIndex: 100, background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)', overflowY: 'auto' }}
          onClick={() => setShowTimeline(false)}
        >
          <div 
            className="glass-card p-8 w-full max-w-2xl my-8"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: 'rgba(20, 20, 25, 0.95)',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto'
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">Hikayem</h2>
              <button 
                onClick={() => setShowTimeline(false)}
                className="text-2xl hover:opacity-70 transition-opacity"
                style={{ color: 'var(--muted)' }}
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              {(site as any).aboutTimeline?.map((item: any, index: number) => (
                <div key={index} className="relative pl-8 pb-6 border-l-2" style={{ borderColor: 'var(--accent)' }}>
                  <div 
                    className="absolute left-0 top-0 w-4 h-4 rounded-full transform -translate-x-1/2"
                    style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}
                  />
                  <span className="text-sm font-semibold px-2 py-1 rounded" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent)' }}>
                    📍 {item.year}
                  </span>
                  <h3 className="text-lg font-semibold mt-2 mb-2" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className={`min-h-screen ${minecraftMode ? 'minecraft-mode' : ''}`}>
        {/* Minecraft Mode Toggle */}
        <button
          onClick={() => setMinecraftMode(!minecraftMode)}
          className="fixed top-4 right-4 z-40 px-4 py-2 rounded-lg transition-all hover:scale-105"
          style={{
            background: minecraftMode ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--foreground)',
            fontSize: minecraftMode ? '9px' : '14px',
            fontFamily: minecraftMode ? 'var(--font-press-start)' : 'inherit'
          }}
        >
          🎮 {minecraftMode ? 'Normal Mod' : 'Minecraft Modu'}
        </button>
        <div className="mx-auto max-w-4xl px-6 py-20">
        
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

        {/* About Section - Clickable */}
        <section className="fade-in-up fade-in-up-delay-1">
          <h2 className="section-title">Hakkımda</h2>
          <div 
            className="glass-card p-6 cursor-pointer transition-all hover:scale-[1.02]"
            onClick={() => setShowTimeline(true)}
            style={{ position: 'relative' }}
          >
            <div className="space-y-3">
              {site.about.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: 'var(--accent)' }}>
              <span>📖 Hikayemi oku</span>
              <span>→</span>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Education Section */}
        {(site as any).education && (
          <section className="fade-in-up fade-in-up-delay-2">
            <h2 className="section-title">Eğitim</h2>
            <a 
              href={(site as any).education.link} 
              target="_blank" 
              rel="noreferrer"
              className="glass-card p-6 flex items-center gap-6 cursor-pointer"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
            >
              <div className="flex-shrink-0">
                <Image
                  src={(site as any).education.logo}
                  alt={(site as any).education.school}
                  width={80}
                  height={80}
                  className="rounded-lg"
                  style={{ 
                    background: 'white', 
                    padding: '8px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                  {(site as any).education.school}
                </h3>
                <p className="text-base mb-2" style={{ color: 'var(--muted)' }}>
                  {(site as any).education.department} - {(site as any).education.degree}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm" style={{ color: 'var(--accent)' }}>
                    📚 {(site as any).education.year}
                  </span>
                  <span className="text-sm px-3 py-1 rounded-full" style={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    GPA: {(site as any).education.gpa}
                  </span>
                </div>
              </div>
              <span className="text-xl" style={{ color: 'var(--accent)' }}>↗</span>
            </a>
          </section>
        )}

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
          <div className="grid grid-cols-1 gap-6">
            {site.skills.map((skill: any, index: number) => (
              <div 
                key={skill.name} 
                className="glass-card p-8 transition-all hover:scale-[1.01]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <span className="text-5xl">{skill.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold gradient-text mb-4">{skill.name}</h3>
                    <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                      {skill.description}
                    </p>
                    
                    {skill.sections ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                        {skill.sections.map((section: any) => (
                          <div key={section.title}>
                            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                              {section.title}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {section.items.map((item: string) => (
                                <span key={item} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : skill.subSkills && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {skill.subSkills.map((sub: string) => (
                          <span key={sub} className="text-xs font-medium px-2 py-1 rounded" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent)' }}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Projects Section */}
        <section className="fade-in-up fade-in-up-delay-4">
          <h2 className="section-title">Projeler</h2>
          <div className="space-y-6">
            {site.projects.map((project) => {
              const photos = (project as any).photos as string[] | undefined;
              const primaryLink = 
                project.links.kaggle || 
                (project.links as any).sample || 
                project.links.github || 
                project.links.demo || 
                (project.links as any).presentation || 
                '#';

              const handleClick = (e: React.MouseEvent) => {
                if (photos && photos.length > 0) {
                  e.preventDefault();
                  setCurrentPhotoIndex(0);
                  setGalleryPhotos(photos);
                }
              };

              return (
                <a 
                  key={project.name} 
                  href={photos ? '#' : primaryLink}
                  target={photos ? undefined : "_blank"}
                  rel={photos ? undefined : "noreferrer"}
                  className="project-card block"
                  style={{ 
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                  onClick={handleClick}
                >
                  <article>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold mb-2 gradient-text">
                        {project.name}
                      </h3>
                      {photos && (
                        <span className="text-sm px-2 py-1 rounded" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent)' }}>
                          📸 {photos.length} fotoğraf
                        </span>
                      )}
                    </div>
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
