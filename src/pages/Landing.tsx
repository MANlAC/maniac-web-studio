import { useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Smartphone,
  Globe,
  Mail,
  ChevronDown,
  ExternalLink,
  Play,
  Github,
  Cpu,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  Send,
  Menu,
  X,
} from "lucide-react";

/* ─── Reusable scroll-trigger wrapper ─── */
function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Navigation ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Showcase", href: "#showcase" },
    { label: "Game", href: "#game" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#06060e]/80 backdrop-blur-xl border-b border-[#1a1a3e]/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold tracking-wider text-[#00e5ff] text-glow">
          MANIAC
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#6b7280] hover:text-[#00e5ff] transition-colors duration-300 font-mono-tech"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-semibold bg-[#00e5ff] text-[#06060e] rounded-lg hover:bg-[#00e5ff]/90 transition-all duration-300 glow-cyan font-mono-tech"
          >
            Get in Touch
          </a>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#00e5ff]"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#06060e]/95 backdrop-blur-xl border-b border-[#1a1a3e] px-6 py-4"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-[#c0c4cc] hover:text-[#00e5ff] transition-colors font-mono-tech text-sm"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ─── Hero / About Dinesh ─── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#7b2ff7]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff] text-xs font-mono-tech tracking-widest uppercase">
            Future Tech Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-[#e8eaed]">We Build</span>
          <br />
          <span className="text-[#00e5ff] text-glow">The Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#6b7280] text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          <span className="text-[#c0c4cc] font-semibold">MANIAC</span> is a next-gen technology studio crafting
          world-class websites, apps, and digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mb-12"
        >
          <p className="text-[#c0c4cc] text-sm font-mono-tech mb-2">Created by</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#e8eaed]">
            Dinesh Kumar Bohara
          </h2>
          <p className="text-[#00e5ff]/70 text-sm font-mono-tech mt-1">
            Undergraduate Student
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00e5ff] text-[#06060e] font-bold rounded-xl hover:bg-[#00e5ff]/90 transition-all duration-300 glow-cyan font-display text-sm tracking-wider"
          >
            Explore Our Work
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#1a1a3e] text-[#c0c4cc] font-semibold rounded-xl hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-300 font-display text-sm tracking-wider"
          >
            <Mail size={16} />
            Contact Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#services" className="text-[#00e5ff]/40 hover:text-[#00e5ff]/80 transition-colors">
            <ChevronDown size={28} className="animate-bounce" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Services ─── */
const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Cutting-edge, responsive websites built with the latest frameworks and stunning design.",
    color: "#00e5ff",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Native and cross-platform mobile applications engineered for performance and delight.",
    color: "#7b2ff7",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    desc: "Intelligent systems and workflows that supercharge your operations with machine learning.",
    color: "#00ff88",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    desc: "Enterprise-grade security auditing, penetration testing, and hardening for your stack.",
    color: "#ff6b35",
  },
  {
    icon: Layers,
    title: "Cloud Solutions",
    desc: "Scalable cloud infrastructure, DevOps pipelines, and serverless architecture design.",
    color: "#00e5ff",
  },
  {
    icon: Zap,
    title: "UI/UX Design",
    desc: "Research-driven interfaces with pixel-perfect aesthetics and seamless user journeys.",
    color: "#7b2ff7",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#7b2ff7]/30 bg-[#7b2ff7]/5 text-[#7b2ff7] text-xs font-mono-tech tracking-widest uppercase mb-6">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8eaed] mb-4">
            Our <span className="text-[#00e5ff] text-glow">Services</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            End-to-end technology solutions tailored for the future of business.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="group relative p-8 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60 hover:border-[#00e5ff]/30 transition-all duration-500 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}15` }}
                >
                  <s.icon size={24} style={{ color: s.color }} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#e8eaed] mb-3">{s.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{s.desc}</p>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${s.color}08, transparent 60%)`,
                  }}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Modern Shop App Showcase ─── */
function ShowcaseSection() {
  return (
    <section id="showcase" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff] text-xs font-mono-tech tracking-widest uppercase mb-6">
            Featured Project
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8eaed] mb-4">
            Modern <span className="text-[#00e5ff] text-glow">Shop App</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            A full-stack e-commerce experience built with cutting-edge tech.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="relative rounded-3xl overflow-hidden bg-[#0c0c18] border border-[#1a1a3e] p-1">
              <div className="rounded-2xl bg-gradient-to-br from-[#0c0c18] via-[#12122a] to-[#0c0c18] p-8 md:p-12">
                {/* Fake app screen */}
                <div className="bg-[#06060e] rounded-2xl border border-[#1a1a3e] overflow-hidden">
                  <div className="p-4 border-b border-[#1a1a3e] flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff4060]/60" />
                    <div className="w-3 h-3 rounded-full bg-[#ff6b35]/60" />
                    <div className="w-3 h-3 rounded-full bg-[#00ff88]/60" />
                    <span className="ml-3 text-[#6b7280] text-xs font-mono-tech">modernshop.app</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-[#6b7280] text-xs font-mono-tech">Welcome back</p>
                        <p className="text-[#e8eaed] font-display font-bold">ModernShop</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 flex items-center justify-center text-[#00e5ff] text-sm font-bold">
                        M
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {["$12,840", "2,430", "98.2%"].map((v, i) => (
                        <div key={i} className="bg-[#12122a] rounded-xl p-3 text-center">
                          <p className="text-[#00e5ff] font-display font-bold text-sm">{v}</p>
                          <p className="text-[#6b7280] text-[10px] font-mono-tech mt-1">
                            {["Revenue", "Orders", "Uptime"][i]}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {["Nike Air Max 270", "iPhone 15 Pro", "MacBook Pro M3"].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-[#12122a] rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#7b2ff7]/10 flex items-center justify-center">
                              <Code2 size={14} className="text-[#7b2ff7]" />
                            </div>
                            <span className="text-[#c0c4cc] text-xs font-mono-tech">{item}</span>
                          </div>
                          <span className="text-[#00ff88] text-xs font-mono-tech">In Stock</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-3xl font-bold text-[#e8eaed] mb-4">
                  A Complete Digital Storefront
                </h3>
                <p className="text-[#6b7280] leading-relaxed">
                  ModernShop is our flagship demo — a blazing-fast, fully responsive e-commerce
                  platform with real-time inventory, AI-powered recommendations, and a checkout
                  experience that converts.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { label: "React + TypeScript", pct: 95 },
                  { label: "Real-time Backend", pct: 88 },
                  { label: "Payment Integration", pct: 92 },
                  { label: "Performance Score", pct: 99 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[#c0c4cc] font-mono-tech text-xs">{item.label}</span>
                      <span className="text-[#00e5ff] font-mono-tech text-xs">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#12122a] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-[#00e5ff] to-[#7b2ff7] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00e5ff] text-[#06060e] font-bold rounded-xl hover:bg-[#00e5ff]/90 transition-all duration-300 glow-cyan font-display text-xs tracking-wider"
                >
                  <Play size={14} />
                  View Live Demo
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#1a1a3e] text-[#c0c4cc] rounded-xl hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-300 font-display text-xs tracking-wider"
                >
                  <Github size={14} />
                  Source Code
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Tic Tac Toe ─── */
type Cell = "X" | "O" | null;
const WINNING = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diags
];

function checkWinner(board: Cell[]): Cell | "draw" {
  for (const [a, b, c] of WINNING) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every((c) => c !== null) ? "draw" : null;
}

function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [result, setResult] = useState<{ winner: Cell | "draw" } | null>(null);

  const play = (i: number) => {
    if (board[i] || result) return;
    const next = [...board];
    next[i] = turn;
    setBoard(next);
    const w = checkWinner(next);
    if (w) setResult({ winner: w });
    else setTurn(turn === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6b7280] font-mono-tech text-sm">
          {result
            ? result.winner === "draw"
              ? "It's a Draw!"
              : `Player ${result.winner} Wins!`
            : `Player ${turn}'s Turn`}
        </p>
        <button
          onClick={reset}
          className="px-4 py-1.5 text-xs font-mono-tech border border-[#1a1a3e] text-[#6b7280] rounded-lg hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-300"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            disabled={!!cell || !!result}
            className={`aspect-square rounded-xl border flex items-center justify-center text-3xl font-display font-bold transition-all duration-300 ${
              cell === "X"
                ? "border-[#00e5ff]/40 bg-[#00e5ff]/10 text-[#00e5ff] text-glow"
                : cell === "O"
                ? "border-[#7b2ff7]/40 bg-[#7b2ff7]/10 text-[#7b2ff7] text-glow-purple"
                : "border-[#1a1a3e] bg-[#12122a] hover:border-[#00e5ff]/30 hover:bg-[#1a1a3e]/60 text-transparent"
            }`}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-[#6b7280] text-xs font-mono-tech">
          Two-player local game — take turns on the same device
        </p>
      </div>
    </div>
  );
}

function GameSection() {
  return (
    <section id="game" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7b2ff7]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 text-[#00ff88] text-xs font-mono-tech tracking-widest uppercase mb-6">
            Interactive
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8eaed] mb-4">
            Play <span className="text-[#00ff88] text-glow">Tic Tac Toe</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            A quick two-player game. Challenge a friend right here.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#0c0c18] border border-[#1a1a3e]/60">
            <TicTacToe />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Aesthetic Gallery ─── */
const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    alt: "Circuit board close-up",
  },
  {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    alt: "Cybersecurity concept",
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    alt: "Abstract neon lines",
  },
  {
    url: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80",
    alt: "Digital data streams",
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    alt: "Globe with data network",
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    alt: "Matrix-style code",
  },
];

function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 360, behavior: "smooth" });
    }
  }, []);

  return (
    <section id="gallery" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff] text-xs font-mono-tech tracking-widest uppercase mb-6">
            Visual Identity
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8eaed] mb-4">
            Tech <span className="text-[#00e5ff] text-glow">Gallery</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Glimpses of the digital world that inspires our craft.
          </p>
        </FadeIn>

        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#0c0c18]/80 border border-[#1a1a3e] flex items-center justify-center text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all duration-300 backdrop-blur"
          >
            <ChevronDown size={18} className="rotate-90" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#0c0c18]/80 border border-[#1a1a3e] flex items-center justify-center text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all duration-300 backdrop-blur"
          >
            <ChevronDown size={18} className="-rotate-90" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-12 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {galleryImages.map((img, i) => (
              <FadeIn key={i} delay={i * 0.08} className="flex-shrink-0 snap-center">
                <div className="relative w-72 h-80 rounded-2xl overflow-hidden group border border-[#1a1a3e]/60">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[#e8eaed] text-sm font-display font-bold">{img.alt}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formState;
    window.open(
      `mailto:dineshbohara2073@gmail.com?subject=MANIAC Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      )}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7b2ff7]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#7b2ff7]/30 bg-[#7b2ff7]/5 text-[#7b2ff7] text-xs font-mono-tech tracking-widest uppercase mb-6">
            Let's Talk
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8eaed] mb-4">
            Get in <span className="text-[#00e5ff] text-glow">Touch</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Ready to build something extraordinary? We'd love to hear from you.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <FadeIn direction="right">
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center">
                    <Mail size={20} className="text-[#00e5ff]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-xs font-mono-tech mb-1">Email Us</p>
                    <a
                      href="mailto:dineshbohara2073@gmail.com"
                      className="text-[#e8eaed] hover:text-[#00e5ff] transition-colors text-sm font-semibold"
                    >
                      dineshbohara2073@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#7b2ff7]/10 flex items-center justify-center">
                    <Globe size={20} className="text-[#7b2ff7]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-xs font-mono-tech mb-1">Created By</p>
                    <p className="text-[#e8eaed] text-sm font-semibold">Dinesh Kumar Bohara</p>
                    <p className="text-[#00e5ff]/60 text-xs font-mono-tech">Undergraduate Student</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center">
                    <Zap size={20} className="text-[#00ff88]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-xs font-mono-tech mb-1">Response Time</p>
                    <p className="text-[#e8eaed] text-sm font-semibold">Within 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            {submitted ? (
              <div className="h-full flex items-center justify-center p-8 rounded-2xl bg-[#0c0c18] border border-[#00e5ff]/20">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00e5ff]/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-[#00e5ff]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#e8eaed] mb-2">
                    Message Ready!
                  </h3>
                  <p className="text-[#6b7280] text-sm">
                    Your email client should open shortly. Thank you!
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", message: "" }); }}
                    className="mt-4 px-4 py-2 text-xs font-mono-tech text-[#00e5ff] border border-[#00e5ff]/30 rounded-lg hover:bg-[#00e5ff]/5 transition-all duration-300"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60"
              >
                <div>
                  <label className="block text-[#6b7280] text-xs font-mono-tech mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#12122a] border border-[#1a1a3e] text-[#e8eaed] text-sm focus:outline-none focus:border-[#00e5ff]/50 transition-colors placeholder:text-[#6b7280]/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[#6b7280] text-xs font-mono-tech mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#12122a] border border-[#1a1a3e] text-[#e8eaed] text-sm focus:outline-none focus:border-[#00e5ff]/50 transition-colors placeholder:text-[#6b7280]/50"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[#6b7280] text-xs font-mono-tech mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#12122a] border border-[#1a1a3e] text-[#e8eaed] text-sm focus:outline-none focus:border-[#00e5ff]/50 transition-colors resize-none placeholder:text-[#6b7280]/50"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00e5ff] text-[#06060e] font-bold rounded-xl hover:bg-[#00e5ff]/90 transition-all duration-300 glow-cyan font-display text-sm tracking-wider"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-[#1a1a3e]/60 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-display text-lg font-bold text-[#00e5ff] text-glow mb-3">MANIAC</p>
        <p className="text-[#6b7280] text-sm mb-2">
          Building the future of technology — one pixel at a time.
        </p>
        <p className="text-[#6b7280]/60 text-xs font-mono-tech">
          &copy; {new Date().getFullYear()} MANIAC. Created by{" "}
          <span className="text-[#c0c4cc]">Dinesh Kumar Bohara</span>.
        </p>
      </div>
    </footer>
  );
}

/* ─── Main Landing ─── */
export default function Landing() {
  return (
    <div className="dark min-h-screen bg-[#06060e] text-[#e8eaed]">
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <ServicesSection />
      <div className="section-divider" />
      <ShowcaseSection />
      <div className="section-divider" />
      <GameSection />
      <div className="section-divider" />
      <GallerySection />
      <div className="section-divider" />
      <ContactSection />
      <Footer />
    </div>
  );
}
