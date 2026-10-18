/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { X, ArrowUpRight, Upload, Image as ImageIcon, ChevronDown } from 'lucide-react';

interface ProjectData {
  id: string;
  client: string;
  title: string;
  season: string;
  location: string;
  year: string;
  description: string;
  slide1Image: string;
  slide2Image: string;
  accentGradient: string;
  nextProjectId: string;
}

const PROJECTS: Record<string, ProjectData> = {
  'thom-browne': {
    id: 'thom-browne',
    client: 'THOM BROWNE',
    title: 'WORKS,\nTHOM BROWNE S25',
    season: 'SPRING / SUMMER 2025',
    location: 'PARIS',
    year: '2025',
    description:
      'CAPTURED BACKSTAGE AT THOM BROWNE S25, THIS SERIES OFFERS AN INTIMATE LOOK BEHIND THE SCENES, DOCUMENTING THE DETAILS, CHARACTERS AND QUIET MOMENTS SURROUNDING THE SHOW; A STUDY OF CRAFTSMANSHIP, ATMOSPHERE AND THE DISTINCTIVE WORLD OF THOM BROWNE.',
    slide1Image: 'Man_wearing_jacket_and_sunglasses_2K_20261018054146-split.jpg',
    slide2Image: 'Man_wearing_jacket_and_sunglasses_2K_20261018054146-split (1).jpg',
    accentGradient: 'radial-gradient(circle at center, #ba6060 0%, #6e2727 60%, #1a0808 100%)',
    nextProjectId: 'after-hours',
  },
  'after-hours': {
    id: 'after-hours',
    client: 'AFTER HOURS',
    title: 'WORKS,\nAFTER HOURS',
    season: 'EDITORIAL MONOGRAPH',
    location: 'TOKYO & PARIS',
    year: '2025',
    description:
      'A CINEMATIC EXPLORATION OF NIGHTTIME METROPOLIS RUNWAYS AND PRIVATE SHOWROOM REVEALS AFTER MIDNIGHT. SHADOWS, SHARP REFLECTIONS, AND UNREHEARSED COUTURE SILHOUETTES AT REST.',
    slide1Image: 'slide-01.jpg',
    slide2Image: 'slide-02.jpg',
    accentGradient: 'radial-gradient(circle at center, #3f4e65 0%, #1a2233 60%, #080c14 100%)',
    nextProjectId: 'thom-browne',
  },
};

export default function App() {
  const [currentProjectKey, setCurrentProjectKey] = useState<'thom-browne' | 'after-hours'>('thom-browne');
  const project = PROJECTS[currentProjectKey];

  // Custom user image slots (allows user to upload or paste image URLs)
  const [slide1CustomUrl, setSlide1CustomUrl] = useState<string>('');
  const [slide2CustomUrl, setSlide2CustomUrl] = useState<string>('');
  const [showWireframeOnly, setShowWireframeOnly] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isWorksOpen, setIsWorksOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [copiedIg, setCopiedIg] = useState<boolean>(false);
  const [copiedContact, setCopiedContact] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // References
  const nextSectionRef = useRef<HTMLElement>(null);
  const viewBtnRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Active slide image sources (prioritize custom url if set, otherwise the uploaded files)
  const activeSlide1 = slide1CustomUrl || project.slide1Image;
  const activeSlide2 = slide2CustomUrl || project.slide2Image;

  // 1. Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', (e: { progress: number }) => {
      setScrollProgress(Math.round(e.progress * 100));
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // 2. Magnetic "VIEW" Cursor Tracking
  useEffect(() => {
    const nextSection = nextSectionRef.current;
    const viewBtn = viewBtnRef.current;
    if (!nextSection || !viewBtn) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nextSection.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      viewBtn.style.left = `${mouseX}px`;
      viewBtn.style.top = `${mouseY}px`;
    };

    const handleMouseLeave = () => {
      viewBtn.style.left = '70%';
      viewBtn.style.top = '55%';
    };

    nextSection.addEventListener('mousemove', handleMouseMove);
    nextSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      nextSection.removeEventListener('mousemove', handleMouseMove);
      nextSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [currentProjectKey]);

  // Handle switching to Next Project
  const handleNextProjectClick = () => {
    const nextKey = project.nextProjectId as 'thom-browne' | 'after-hours';
    setCurrentProjectKey(nextKey);
    // Smooth scroll back to top with Lenis
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Instagram copy / interaction
  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText('@almirakho');
    setCopiedIg(true);
    setTimeout(() => setCopiedIg(false), 2500);
  };

  // Image upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, slideNum: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (slideNum === 1) setSlide1CustomUrl(result);
        if (slideNum === 2) setSlide2CustomUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextProjectInfo = PROJECTS[project.nextProjectId];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Background Film Grain */}
      <div className="film-grain" />

      {/* ==========================================================================
          FIXED TOP NAVIGATION (SHOP / HOME / CONTAC / ABOUT)
          ========================================================================== */}
      <header className="site-nav">
        <button
          onClick={() => setIsShopOpen(true)}
          className="nav-shop text-left font-bold tracking-widest cursor-pointer hover:opacity-75 transition-opacity"
        >
          SHOP
        </button>

        <button
          onClick={() => {
            if (lenisRef.current) lenisRef.current.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="nav-home text-left tracking-widest cursor-pointer hover:opacity-75 transition-opacity"
        >
          HOME
        </button>

        <button
          onClick={() => setIsContactOpen(true)}
          className="nav-contac tracking-widest cursor-pointer hover:opacity-75 transition-opacity"
        >
          CONTAC
        </button>

        <button
          onClick={() => setIsAboutOpen(true)}
          className="nav-about tracking-widest cursor-pointer hover:opacity-75 transition-opacity flex items-center justify-end"
        >
          ABOUT
        </button>
      </header>

      {/* ==========================================================================
          SHOWCASE CONTAINER (2 FULL-SCREEN SLIDES + PINNED EDITORIAL TEXT)
          ========================================================================== */}
      <main className="showcase-container">
        {/* Sticky Editorial Overlay (Pinned over Image 1 & Image 2) */}
        <aside className="sticky-editorial-overlay">
          <div className="project-header">
            <h1 className="whitespace-pre-line tracking-tight">
              {project.title}
            </h1>
            <div className="mt-3 text-[10px] tracking-widest opacity-60 font-medium">
              {project.season} · {project.location} · {project.year}
            </div>
          </div>

          <div className="project-description flex flex-col gap-4">
            <p className="max-w-[380px] leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-3 text-[9px] tracking-widest opacity-50 font-mono">
              <span>EXIF: 35MM F/1.4</span>
              <span>·</span>
              <span>ISO 400</span>
              <span>·</span>
              <span>SCROLL {scrollProgress}%</span>
            </div>
          </div>
        </aside>

        {/* 2 Full Screen Slides */}
        <div className="slides-wrapper">
          {/* SLIDE 01 (FULL SCREEN: 100VW x 100VH) - Top Half of Split Portrait */}
          <section className="fullscreen-slide slide-1 relative bg-white">
            {!showWireframeOnly ? (
              <img
                src={activeSlide1}
                alt="Thom Browne S25 Image 01 - Man wearing sunglasses"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-bottom"
                onError={(e) => {
                  // Fallback to local svg asset if needed
                  const target = e.currentTarget;
                  if (!target.src.includes('slide-01.svg')) {
                    target.src = '/slide-01.svg';
                  }
                }}
              />
            ) : (
              /* Wireframe Label Container */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#121212]">
                <div className="media-label z-10 flex flex-col items-center gap-2">
                  <div className="font-semibold text-white/90">
                    [ IMAGE 01: FULL SCREEN (100VW x 100VH) ]
                  </div>
                  <div className="text-[10px] text-white/50 tracking-wider font-mono">
                    Man_wearing_jacket_and_sunglasses_2K_20261018054146-split.jpg
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SLIDE 02 (FULL SCREEN: 100VW x 100VH) - Bottom Half of Split Portrait */}
          <section className="fullscreen-slide slide-2 relative bg-white">
            {!showWireframeOnly ? (
              <img
                src={activeSlide2}
                alt="Thom Browne S25 Image 02 - Man wearing pleated jacket"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback to local svg asset if needed
                  const target = e.currentTarget;
                  if (!target.src.includes('slide-02.svg')) {
                    target.src = '/slide-02.svg';
                  }
                }}
              />
            ) : (
              /* Wireframe Label Container */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#1a1a1a]">
                <div className="media-label z-10 flex flex-col items-center gap-2">
                  <div className="font-semibold text-white/90">
                    [ IMAGE 02: FULL SCREEN (100VW x 100VH) ]
                  </div>
                  <div className="text-[10px] text-white/50 tracking-wider font-mono">
                    Man_wearing_jacket_and_sunglasses_2K_20261018054146-split (1).jpg
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ==========================================================================
          NEXT PROJECT TRANSITION (FULL SCREEN)
          ========================================================================== */}
      <section
        ref={nextSectionRef}
        className="next-project-section"
        id="nextProject"
        onClick={handleNextProjectClick}
        aria-label={`Navigate to next project: ${nextProjectInfo.client}`}
      >
        <div
          className="next-project-bg"
          style={{ background: project.accentGradient }}
        />

        <div className="next-meta">
          NEXT PROJECT
        </div>

        <div className="next-title-container">
          <h2 className="next-title">{nextProjectInfo.client}</h2>
        </div>

        <div ref={viewBtnRef} className="view-button" id="viewBtn">
          VIEW
        </div>
      </section>

      {/* ==========================================================================
          BOTTOM QUICK CONTROLS (IMAGE TESTER & DRAWER TOGGLES)
          ========================================================================== */}
      <div className="fixed bottom-6 right-8 z-50 flex items-center gap-2 text-[10px] font-mono tracking-wider">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="bg-black/80 hover:bg-white hover:text-black text-white px-3 py-2 border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer rounded-xs"
          title="Image Controls & Settings"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>IMAGE CONTROLS</span>
        </button>

        <button
          onClick={() => {
            if (lenisRef.current) {
              const currentY = window.scrollY;
              const nextTarget = currentY < window.innerHeight ? window.innerHeight : window.innerHeight * 2;
              lenisRef.current.scrollTo(nextTarget);
            }
          }}
          className="bg-black/80 hover:bg-white hover:text-black text-white px-3 py-2 border border-white/20 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer rounded-xs"
          title="Scroll down"
        >
          <ChevronDown className="w-3.5 h-3.5" />
          <span>SCROLL</span>
        </button>
      </div>

      {/* ==========================================================================
          MODAL: IMAGE CONTROLS (TEST REAL IMAGES INSTANTLY)
          ========================================================================== */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className="bg-[#0f0f0f] border border-white/20 w-full max-w-lg p-6 sm:p-8 text-white relative flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="text-xs font-bold tracking-widest">
                EDITORIAL IMAGE SETTINGS
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 hover:text-neutral-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-neutral-300 normal-case leading-relaxed font-sans flex flex-col gap-2">
              <p>
                <strong>Current Active Images:</strong>
              </p>
              <ul className="list-disc pl-4 font-mono text-[11px] text-neutral-400 flex flex-col gap-1">
                <li>Image 01: <code>Man_wearing_jacket_and_sunglasses_2K_20261018054146-split.jpg</code></li>
                <li>Image 02: <code>Man_wearing_jacket_and_sunglasses_2K_20261018054146-split (1).jpg</code></li>
              </ul>
              <p className="pt-2 text-neutral-400">
                You can override them with any custom URL or file upload below:
              </p>
            </div>

            {/* Slide 1 Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold tracking-wider flex items-center justify-between">
                <span>IMAGE 01 OVERRIDE</span>
                {slide1CustomUrl && (
                  <button
                    onClick={() => setSlide1CustomUrl('')}
                    className="text-[10px] text-red-400 hover:underline cursor-pointer"
                  >
                    RESET TO DEFAULT
                  </button>
                )}
              </label>
              <input
                type="text"
                value={slide1CustomUrl}
                onChange={(e) => setSlide1CustomUrl(e.target.value)}
                placeholder="Paste Image URL (https://...)"
                className="bg-black/60 border border-white/20 px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-hidden focus:border-white"
              />
              <div className="flex items-center gap-2">
                <label className="cursor-pointer border border-white/20 px-3 py-1.5 text-[10px] font-mono hover:bg-white hover:text-black transition-colors flex items-center gap-1.5">
                  <Upload className="w-3 h-3" />
                  <span>UPLOAD FILE</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 1)}
                    className="hidden"
                  />
                </label>
                <span className="text-[10px] text-neutral-400 lowercase">override slide 01</span>
              </div>
            </div>

            {/* Slide 2 Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold tracking-wider flex items-center justify-between">
                <span>IMAGE 02 OVERRIDE</span>
                {slide2CustomUrl && (
                  <button
                    onClick={() => setSlide2CustomUrl('')}
                    className="text-[10px] text-red-400 hover:underline cursor-pointer"
                  >
                    RESET TO DEFAULT
                  </button>
                )}
              </label>
              <input
                type="text"
                value={slide2CustomUrl}
                onChange={(e) => setSlide2CustomUrl(e.target.value)}
                placeholder="Paste Image URL (https://...)"
                className="bg-black/60 border border-white/20 px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-hidden focus:border-white"
              />
              <div className="flex items-center gap-2">
                <label className="cursor-pointer border border-white/20 px-3 py-1.5 text-[10px] font-mono hover:bg-white hover:text-black transition-colors flex items-center gap-1.5">
                  <Upload className="w-3 h-3" />
                  <span>UPLOAD FILE</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 2)}
                    className="hidden"
                  />
                </label>
                <span className="text-[10px] text-neutral-400 lowercase">override slide 02</span>
              </div>
            </div>

            {/* Toggle wireframe badges */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-wider">SHOW WIREFRAME LABELS</span>
              <button
                onClick={() => setShowWireframeOnly(!showWireframeOnly)}
                className={`px-3 py-1 text-[10px] font-mono border transition-colors cursor-pointer ${
                  showWireframeOnly
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-white/30'
                }`}
              >
                {showWireframeOnly ? 'ON' : 'OFF'}
              </button>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="mt-2 w-full py-2.5 bg-white text-black text-xs font-bold tracking-widest hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              DONE
            </button>
          </div>
        </div>
      )}

      {/* ==========================================================================
          DRAWER: WORKS INDEX
          ========================================================================== */}
      {isWorksOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex justify-end"
          onClick={() => setIsWorksOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0a0a0a] border-l border-white/15 h-full p-8 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-8">
                <div className="text-xs font-bold tracking-widest">
                  SELECTED ARCHIVE // WORKS
                </div>
                <button
                  onClick={() => setIsWorksOpen(false)}
                  className="p-1 hover:text-neutral-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {/* Work 01 */}
                <div
                  onClick={() => {
                    setCurrentProjectKey('thom-browne');
                    setIsWorksOpen(false);
                    if (lenisRef.current) lenisRef.current.scrollTo(0);
                  }}
                  className={`group cursor-pointer pb-6 border-b border-white/10 transition-colors ${
                    currentProjectKey === 'thom-browne' ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5 opacity-60">
                    <span>01 / EDITORIAL</span>
                    <span>2025</span>
                  </div>
                  <div className="text-xl font-bold tracking-tight group-hover:translate-x-1 transition-transform">
                    THOM BROWNE S25
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    PARIS FASHION WEEK · BACKSTAGE DOCUMENTATION
                  </div>
                </div>

                {/* Work 02 */}
                <div
                  onClick={() => {
                    setCurrentProjectKey('after-hours');
                    setIsWorksOpen(false);
                    if (lenisRef.current) lenisRef.current.scrollTo(0);
                  }}
                  className={`group cursor-pointer pb-6 border-b border-white/10 transition-colors ${
                    currentProjectKey === 'after-hours' ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5 opacity-60">
                    <span>02 / MONOGRAPH</span>
                    <span>2025</span>
                  </div>
                  <div className="text-xl font-bold tracking-tight group-hover:translate-x-1 transition-transform">
                    AFTER HOURS
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    TOKYO & PARIS · NIGHT RUNWAYS & PRIVATE REVEALS
                  </div>
                </div>

                {/* Work 03 (Archival) */}
                <div className="group opacity-50 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span>03 / CAMPAIGN</span>
                    <span>2024</span>
                  </div>
                  <div className="text-xl font-bold tracking-tight">
                    CELINE WINTER 24
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    SALLE PLEYEL ARCHIVAL SERIES
                  </div>
                </div>

                {/* Work 04 (Archival) */}
                <div className="group opacity-50 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span>04 / SPECIAL PROJECT</span>
                    <span>2024</span>
                  </div>
                  <div className="text-xl font-bold tracking-tight">
                    MONCLER GENIUS
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    CITY OF GENIUS SHANGHAI
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-[10px] text-neutral-500 font-mono flex items-center justify-between">
              <span>ALMIRA KHO STUDIO</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          DRAWER: SHOP
          ========================================================================== */}
      {isShopOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex justify-end"
          onClick={() => setIsShopOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0a0a0a] border-l border-white/15 h-full p-8 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-8">
                <div className="text-xs font-bold tracking-widest">
                  EDITIONS // SHOP
                </div>
                <button
                  onClick={() => setIsShopOpen(false)}
                  className="p-1 hover:text-neutral-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {/* Product 01 */}
                <div className="pb-6 border-b border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>EDITION 01 / FOLIO</span>
                    <span>€350 EUR</span>
                  </div>
                  <div className="text-base font-bold tracking-tight">
                    THOM BROWNE S25 RUNWAY FOLIO
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans normal-case">
                    Custom linen box containing 12 signed 35mm archival plates documenting the backstage collection. Hand-numbered edition of 50.
                  </p>
                  <a
                    href="mailto:studio@almirakho.com?subject=Inquiry:%20Thom%20Browne%20S25%20Runway%20Folio"
                    className="mt-2 text-center py-2 px-3 bg-white text-black text-[10px] font-mono font-bold tracking-widest hover:bg-neutral-200 transition-colors"
                  >
                    INQUIRE / ACQUIRE
                  </a>
                </div>

                {/* Product 02 */}
                <div className="pb-6 border-b border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>PRINT 01 / ARCHIVAL</span>
                    <span>€220 EUR</span>
                  </div>
                  <div className="text-base font-bold tracking-tight">
                    ORANGE SHIELD EYEWEAR (24×36")
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans normal-case">
                    Museum-grade Hahnemühle Photo Rag archival pigment print. Limited run of 25 copies, signed and stamped.
                  </p>
                  <a
                    href="mailto:studio@almirakho.com?subject=Inquiry:%20Orange%20Shield%20Eyewear%20Print"
                    className="mt-2 text-center py-2 px-3 border border-white/30 text-white text-[10px] font-mono font-bold tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    ORDER PRINT
                  </a>
                </div>

                {/* Product 03 */}
                <div className="pb-6 border-b border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>PRINT 02 / ARCHIVAL</span>
                    <span>€220 EUR</span>
                  </div>
                  <div className="text-base font-bold tracking-tight">
                    PLEATED JACKET DETAIL (24×36")
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans normal-case">
                    Close-up study of the hand-stitched vertical pleats and high mandarin collar. Edition of 25.
                  </p>
                  <a
                    href="mailto:studio@almirakho.com?subject=Inquiry:%20Pleated%20Jacket%20Detail%20Print"
                    className="mt-2 text-center py-2 px-3 border border-white/30 text-white text-[10px] font-mono font-bold tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    ORDER PRINT
                  </a>
                </div>

                {/* Product 04 */}
                <div className="pb-6 border-b border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>BOOK / PRE-ORDER</span>
                    <span>€95 EUR</span>
                  </div>
                  <div className="text-base font-bold tracking-tight">
                    AFTER HOURS MONOGRAPH
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans normal-case">
                    160 pages, hardcover Japanese cloth binding. Foreword by Olivier Zahm. Shipping Autumn 2025.
                  </p>
                  <a
                    href="mailto:studio@almirakho.com?subject=Pre-Order:%20After%20Hours%20Monograph"
                    className="mt-2 text-center py-2 px-3 border border-white/30 text-white text-[10px] font-mono font-bold tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    PRE-ORDER COPY
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 text-[10px] text-neutral-500 font-mono flex items-center justify-between">
              <span>WORLDWIDE INSURED DISPATCH</span>
              <span>PARIS / NYC</span>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          DRAWER: CONTAC
          ========================================================================== */}
      {isContactOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex justify-end"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0a0a0a] border-l border-white/15 h-full p-8 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-8">
                <div className="text-xs font-bold tracking-widest">
                  COMMUNICATIONS // CONTAC
                </div>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="p-1 hover:text-neutral-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-xs text-neutral-300 normal-case leading-relaxed font-sans">
                <p>
                  For commissions, editorial assignments, advertising, and print acquisitions, please contact the studio directly or through regional representation.
                </p>

                <div className="p-4 bg-white/5 border border-white/10 flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Direct Studio Contact</span>
                  <a
                    href="mailto:studio@almirakho.com"
                    className="text-sm font-mono text-white font-semibold hover:underline"
                  >
                    studio@almirakho.com
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText('studio@almirakho.com');
                      setCopiedContact(true);
                      setTimeout(() => setCopiedContact(false), 2000);
                    }}
                    className="mt-1 self-start text-[10px] font-mono px-2.5 py-1 bg-white/10 hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    {copiedContact ? 'EMAIL COPIED' : 'COPY EMAIL'}
                  </button>
                </div>

                <div className="pt-2 border-t border-white/10 uppercase font-mono text-[11px] flex flex-col gap-4">
                  <div>
                    <div className="text-neutral-400 text-[10px]">Commercial & Fashion (Paris)</div>
                    <div className="text-white mt-1">Art & Commerce Europe</div>
                    <div className="text-neutral-500 text-[10px]">paris@artandcommerce.com</div>
                  </div>

                  <div>
                    <div className="text-neutral-400 text-[10px]">Commercial & Fashion (New York)</div>
                    <div className="text-white mt-1">Management + Artists NY</div>
                    <div className="text-neutral-500 text-[10px]">contact@managementartists.com</div>
                  </div>

                  <div>
                    <div className="text-neutral-400 text-[10px]">Syndication & Press</div>
                    <div className="text-white mt-1">press@almirakho.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <a
                href="mailto:studio@almirakho.com"
                className="hover:underline flex items-center gap-1"
              >
                <span>OPEN EMAIL CLIENT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-neutral-500">AVAILABLE WORLDWIDE</span>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          DRAWER: ABOUT ALMIRA KHO
          ========================================================================== */}
      {isAboutOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex justify-end"
          onClick={() => setIsAboutOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0a0a0a] border-l border-white/15 h-full p-8 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-8">
                <div className="text-xs font-bold tracking-widest">
                  BIOGRAPHY // ALMIRA KHO
                </div>
                <button
                  onClick={() => setIsAboutOpen(false)}
                  className="p-1 hover:text-neutral-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-xs text-neutral-300 normal-case leading-relaxed font-sans">
                <p>
                  <span className="text-white font-semibold uppercase tracking-wider block mb-1">
                    Editorial Photographer & Visual Director
                  </span>
                  Almira Kho is a contemporary fashion and documentary photographer operating between Paris, New York, and Tokyo. Her work explores the tension between rigorous tailoring, intimate backstage access, and raw cinematic atmosphere.
                </p>

                <p>
                  Specializing in 35mm and medium-format film documentations, she captures the quiet choreography behind high-fashion presentations, focusing on materiality, hand-stitched tailoring, and candid portraiture.
                </p>

                <div className="pt-4 border-t border-white/10 uppercase font-mono text-[11px] flex flex-col gap-3">
                  <div className="text-neutral-400">Selected Clients</div>
                  <div className="text-white">
                    Thom Browne · Celine · Moncler · Dazed · Vogue Runway · Self Service · The Gentlewoman
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 uppercase font-mono text-[11px] flex flex-col gap-3">
                  <div className="text-neutral-400">Representation & Inquiries</div>
                  <div className="text-white flex flex-col gap-1">
                    <span>Studio: studio@almirakho.com</span>
                    <span>Press: press@almirakho.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <a
                href="mailto:studio@almirakho.com"
                className="hover:underline flex items-center gap-1"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-neutral-500">PARIS / NEW YORK</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
