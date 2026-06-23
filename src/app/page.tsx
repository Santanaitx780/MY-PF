"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const NAV = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    title: "HATOMedia",
    desc: "Movie streaming platform with a vast collection of films, smooth playback, and personalized recommendations.",
    tags: ["Next.js", "Streaming", "Media"],
    href: "https://hatofmedia.store",
    icon: "https://hatofmedia.store/favicon.ico",
  },
  {
    title: "BazaFilm",
    desc: "Film streaming service featuring curated movie collections, high-quality video, and user-friendly browsing.",
    tags: ["Next.js", "Streaming", "Film"],
    href: "https://bazafilm.store",
    icon: "https://bazafilm.store/favicon.ico",
  },
];

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/uwimpuhwe" },
  { name: "LinkedIn", href: "https://linkedin.com/in/uwimpuhwe" },
  { name: "Twitter", href: "https://twitter.com/uwimpuhwe" },
  { name: "Email", href: "mailto:santanadox349@gmail.com" },
];

const TITLES = ["Full-Stack Developer", "UI Engineer", "Open Source Contributor", "Tech Enthusiast"];

const STATS = [
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "+", label: "Open Source" },
];

const SKILLS = [
  { name: "Next.js", level: 95 },
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "PostgreSQL", level: 80 },
  { name: "Docker", level: 75 },
  { name: "GraphQL", level: 80 },
];

// ── Hooks ─────────────────────────────────────

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

// ── Components ────────────────────────────────

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button onClick={toggle} className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm" aria-label="Toggle theme">
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
      )}
    </button>
  );
}

function ScrollBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-100 dark:bg-gray-900"><div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-[width]" style={{ width: `${progress}%` }} /></div>;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href="#hero" className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
    </a>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((p) => (p + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }, deleting ? 40 : 80);
    }
    return () => clearTimeout(timeout);
  }, [text, wordIdx, deleting, words]);

  return (
    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
      {text}
      <span className="inline-block w-[3px] h-[1.1em] bg-emerald-600 dark:bg-emerald-400 ml-1 align-middle animate-pulse rounded-sm" />
    </span>
  );
}

function Counter({ value, suffix, label, visible }: { value: number; suffix: string; label: string; visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) { setCount(0); return; }
    let current = 0;
    const step = Math.ceil(value / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= value) { setCount(value); clearInterval(interval); } else setCount(current);
    }, 40);
    return () => clearInterval(interval);
  }, [visible, value]);

  return (
    <div className="text-center relative">
      <div className="text-4xl md:text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">{count}{suffix}</div>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ── Page ───────────────────────────────────────

export default function Home() {
  const { dark, toggle } = useTheme();
  const activeSection = useActiveSection();
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* ── Navbar ──────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_rgba(255,255,255,0.03)]" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="relative text-lg font-black tracking-tighter">
            <span className="text-emerald-700 dark:text-emerald-400">UR</span>
            <span className="text-gray-200 dark:text-gray-800 font-light">/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">Regis</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeSection === n.href.slice(1) ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50"}`}>
                {n.label}
                {activeSection === n.href.slice(1) && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
              </a>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-800">
              <ThemeToggle dark={dark} toggle={toggle} />
            </div>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle dark={dark} toggle={toggle} />
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300" aria-label="Menu">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 dark:bg-gray-950/98 backdrop-blur-2xl flex items-center justify-center md:hidden">
          <nav className="flex flex-col items-center gap-6">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)} className={`text-3xl font-bold tracking-tight transition-colors ${activeSection === n.href.slice(1) ? "text-emerald-600 dark:text-emerald-400" : "text-gray-300 dark:text-gray-700 hover:text-gray-600 dark:hover:text-gray-400"}`}>
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <ScrollBar />
      <BackToTop />

      {/* ── Hero ─────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-emerald-100/40 dark:bg-emerald-900/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-emerald-200/30 dark:bg-emerald-800/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(5,150,105,0.03)_0%,transparent_70%)]" />
          </div>
        </div>

        <div className="relative z-10 px-6 py-20 max-w-5xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200/50 dark:border-emerald-800/50 animate-fade-up shadow-sm">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="relative rounded-full bg-emerald-500 w-2 h-2" />
                </span>
                Available for work
              </div>

              <h1 className="animate-fade-up animate-fade-up-delay-1">
                <span className="block text-sm font-medium text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-3">Full-stack Developer</span>
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight block text-gray-900 dark:text-white">
                  UWIMPUHWE
                </span>
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight block text-emerald-700 dark:text-emerald-400 mt-1">
                  Regis
                </span>
              </h1>

              <div className="text-base sm:text-lg text-gray-500 dark:text-gray-400 animate-fade-up animate-fade-up-delay-2 h-8">
                <Typewriter words={TITLES} />
              </div>

              <p className="text-gray-400 dark:text-gray-500 max-w-md leading-relaxed animate-fade-up animate-fade-up-delay-3">
                I build high-performance web applications with clean architecture,
                thoughtful design, and pixel-perfect attention to detail.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 animate-fade-up animate-fade-up-delay-4">
                <a href="#work" className="group relative px-7 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">View My Work</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#contact" className="px-7 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300">Get In Touch</a>
                <a href="/MY-PF/resume.pdf" download className="px-7 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 font-semibold text-sm hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300">Resume</a>
              </div>
            </div>

              <div className="hidden lg:flex justify-center animate-fade-up animate-fade-up-delay-3">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-emerald-300/10 dark:from-emerald-500/10 dark:to-emerald-300/5 rounded-[32px] blur-2xl" />
                  <div className="relative w-72 h-80 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/30 overflow-hidden shadow-2xl shadow-emerald-900/10">
                    <img src="/MY-PF/profile.jpg" alt="UWIMPUHWE Regis" className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-900/80 via-emerald-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white text-sm font-bold">UWIMPUHWE Regis</p>
                      <p className="text-emerald-200/80 text-xs">Full-Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────── */}
      <section ref={statsRef} className="relative py-16 px-6 bg-gray-50 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((s) => (<Counter key={s.label} {...s} visible={statsVisible} />))}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────── */}
      <section id="about" className="py-28 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="reveal relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-emerald-200/50 dark:border-emerald-800/30 rounded-2xl -z-10" />
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-emerald-100/50 dark:border-emerald-800/30 relative shadow-xl shadow-emerald-900/5">
                <img src="/MY-PF/profile.jpg" alt="UWIMPUHWE Regis" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-900/80 via-emerald-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-lg font-bold">UWIMPUHWE Regis</p>
                  <p className="text-emerald-200/80 text-sm">Full-Stack Developer</p>
                  <div className="mt-3 pt-3 border-t border-emerald-200/20">
                    <p className="text-[11px] text-emerald-200/60 tracking-wider uppercase">Based</p>
                    <p className="text-sm text-emerald-100 mt-0.5">Remote / Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal space-y-6">
              <div>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">About Me</p>
                <h2 className="text-4xl md:text-5xl font-black leading-[1.1] text-gray-900 dark:text-white">
                  Crafting digital<br />
                  <span className="text-emerald-700 dark:text-emerald-400">experiences</span>
                </h2>
              </div>
              <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                <p>I&apos;m a full-stack developer with 6+ years of experience building modern web applications. My expertise spans the entire development lifecycle — from architecting scalable backends to crafting pixel-perfect, responsive frontends.</p>
                <p>I specialize in Next.js, React, TypeScript, and Node.js, and I&apos;m passionate about writing clean, maintainable code that delivers real business value.</p>
              </div>
              <div className="pt-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  50+ Projects
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  30+ Clients
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  6+ Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────── */}
      <section id="skills" className="relative py-28 md:py-36 px-6 bg-gray-50 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Skills & Expertise</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Tech Stack</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 max-w-lg mx-auto">Technologies I work with on a daily basis to build modern web applications.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="reveal group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xl hover:shadow-emerald-900/5 dark:hover:shadow-emerald-900/20 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{skill.name}</span>
                  <span className="text-xs font-mono text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 group-hover:from-emerald-600 group-hover:to-emerald-500" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work ──────────────────────────────── */}
      <section id="work" className="py-28 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Featured Work</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Projects</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 max-w-lg mx-auto">A selection of projects I&apos;ve built and contributed to.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((p) => (
              <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="reveal group block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/10 dark:hover:shadow-emerald-900/30 hover:-translate-y-1 transition-all duration-500">
                <div className="aspect-[16/10] bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img src={p.icon} alt="" className="w-16 h-16 rounded-xl shadow-xl shadow-black/10 object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-lg">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Live</span>
                    <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t) => (<span key={t} className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-100 dark:border-emerald-800/30">{t}</span>))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 dark:from-gray-950 dark:via-emerald-950 dark:to-gray-950" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white reveal">Let&apos;s Build Something Great</h2>
          <p className="text-emerald-200/70 mt-4 text-sm max-w-lg mx-auto leading-relaxed reveal">Have a project in mind? I&apos;d love to hear about it. Let&apos;s work together to create something amazing.</p>
          <a href="#contact" className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl bg-white text-emerald-900 font-bold text-sm hover:bg-emerald-50 shadow-2xl shadow-black/20 hover:shadow-emerald-600/30 transition-all reveal group">
            Start a Conversation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </section>

      {/* ── Contact ───────────────────────────── */}
      <section id="contact" className="py-28 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Contact</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Get In Touch</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 max-w-lg mx-auto">Have a question or want to work together? Drop me a message.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
            <div className="reveal space-y-8">
              <div>
                <p className="text-xs font-semibold text-gray-300 dark:text-gray-600 tracking-widest uppercase mb-4">Contact Info</p>
                <div className="space-y-6">
                  {[
                    { label: "Email", value: "santanadox349@gmail.com", href: "mailto:santanadox349@gmail.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                    { label: "Location", value: "Remote / Worldwide", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/50">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-800/30">
                        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{item.label}</p>
                        {item.href ? <a href={item.href} className="text-sm text-gray-800 dark:text-gray-200 font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{item.value}</a> : <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold">{item.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-300 dark:text-gray-600 tracking-widest uppercase mb-3">Social</p>
                <div className="flex flex-wrap gap-2">
                  {SOCIALS.slice(0, 3).map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/50 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all">{s.name}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal">
              <p className="text-xs font-semibold text-gray-300 dark:text-gray-600 tracking-widest uppercase mb-4">Send a Message</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target as HTMLFormElement);
                const name = (fd.get("name") as string).trim();
                const email = (fd.get("email") as string).trim();
                const message = (fd.get("message") as string).trim();
                if (!name || !email || !message) return;
                window.location.href = `mailto:santanadox349@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
                showToast("Message sent! Redirecting to your email client.");
              }} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input name="name" type="text" required placeholder="Your Name" className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all" />
                  <input name="email" type="email" required placeholder="your@email.com" className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all" />
                </div>
                <textarea name="message" rows={4} required placeholder="Tell me about your project..." className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all resize-none" />
                <button type="submit" className="group w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-2">
                  Send Message
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-gray-100 dark:border-gray-800/30 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">&copy; 2026 UWIMPUHWE Regis. All rights reserved.</p>
          <div className="flex gap-6">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">{s.name}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Toast ─────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium shadow-2xl animate-fade-up flex items-center gap-2.5">
          <svg className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {toast}
        </div>
      )}
    </div>
  );
}
