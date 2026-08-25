import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";
import {
  Code2,
  Smartphone,
  Globe,
  Mail,
  Phone,
  ChevronDown,
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
  Search,
  Star,
  Quote,
  MessageSquare,
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
    { label: "Testimonials", href: "#testimonials" },
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
          MANIAC<span className="text-[#7b2ff7]">.</span>
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
            className="px-5 py-2 text-sm font-semibold bg-[#00e5ff] text-[#06060e] rounded-lg hover:bg-[#00e5ff]/90 transition-all duration-300 glow-cyan font-mono-tech glow-on-hover"
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
            Maniac Web Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-[#e8eaed]">Bold Ideas.</span>
          <br />
          <span className="text-[#00e5ff] text-glow">Brilliant Code.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#6b7280] text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          <span className="text-[#c0c4cc] font-semibold">Maniac Web Studio</span> crafts premium websites,
          mobile apps, and digital products that help businesses stand out and scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mb-12"
        >
          <p className="text-[#c0c4cc] text-sm font-mono-tech mb-2">Founded by</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#e8eaed]">
            Dinesh Kumar Bohara
          </h2>
          <p className="text-[#00e5ff]/70 text-sm font-mono-tech mt-1">
            Undergraduate Student & Full-Stack Developer
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
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00e5ff] text-[#06060e] font-bold rounded-xl hover:bg-[#00e5ff]/90 transition-all duration-300 glow-cyan font-display text-sm tracking-wider glow-on-hover"
          >
            Explore Our Services
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#1a1a3e] text-[#c0c4cc] font-semibold rounded-xl hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-300 font-display text-sm tracking-wider glow-on-hover-outline"
          >
            <Phone size={16} />
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

/* ─── Services Catalog ─── */
const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Custom-built, responsive websites using modern frameworks like React and Next.js — designed to convert visitors into customers.",
    color: "#00e5ff",
    tags: ["react", "next.js", "frontend", "responsive"],
    price: "From $500",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android, engineered for speed, reliability, and a seamless user experience.",
    color: "#7b2ff7",
    tags: ["ios", "android", "react native", "flutter"],
    price: "From $1,200",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    desc: "Intelligent systems, chatbots, and workflow automations powered by machine learning — built to save you time and reduce costs.",
    color: "#00ff88",
    tags: ["ai", "chatbot", "automation", "ml"],
    price: "From $800",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    desc: "Comprehensive security audits, vulnerability assessments, and hardening strategies to keep your business and data protected.",
    color: "#ff6b35",
    tags: ["security", "audit", "penetration testing"],
    price: "From $400",
  },
  {
    icon: Layers,
    title: "Cloud Solutions",
    desc: "Scalable cloud infrastructure, CI/CD pipelines, and serverless architectures on AWS, GCP, or Azure — optimized for performance and cost.",
    color: "#00e5ff",
    tags: ["aws", "gcp", "azure", "devops", "serverless"],
    price: "From $600",
  },
  {
    icon: Zap,
    title: "UI/UX Design",
    desc: "Research-driven interface design with pixel-perfect execution — wireframes, prototypes, and polished visuals that users love.",
    color: "#7b2ff7",
    tags: ["figma", "prototype", "wireframe", "design system"],
    price: "From $350",
  },
  {
    icon: Code2,
    title: "E-Commerce Solutions",
    desc: "End-to-end online stores with secure checkout, inventory management, and analytics — ready to launch and scale your business.",
    color: "#00ff88",
    tags: ["shopify", "stripe", "ecommerce", "payment"],
    price: "From $900",
  },
  {
    icon: Globe,
    title: "SEO & Performance",
    desc: "Technical SEO, Core Web Vitals optimization, and speed tuning to push your site to the top of search rankings.",
    color: "#ff6b35",
    tags: ["seo", "performance", "analytics", "speed"],
    price: "From $250",
  },
];

function ServicesSection() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    services.forEach((s) => s.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return services.filter((s) => {
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.tags.some((t) => t.includes(q));
      const matchesTag = !activeTag || s.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#7b2ff7]/30 bg-[#7b2ff7]/5 text-[#7b2ff7] text-xs font-mono-tech tracking-widest uppercase mb-6">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8eaed] mb-4">
            Our <span className="text-[#00e5ff] text-glow">Services</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Premium technology solutions built to help your business grow. Browse the full catalog below.
          </p>
        </FadeIn>

        {/* Search bar */}
        <FadeIn className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services (e.g. react, security, design)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0c0c18] border border-[#1a1a3e] text-[#e8eaed] text-sm focus:outline-none focus:border-[#00e5ff]/50 transition-colors placeholder:text-[#6b7280]/50 font-mono-tech"
            />
          </div>
        </FadeIn>

        {/* Tag filters */}
        <FadeIn className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all duration-300 ${
              !activeTag
                ? "bg-[#00e5ff]/10 border-[#00e5ff]/40 text-[#00e5ff]"
                : "border-[#1a1a3e] text-[#6b7280] hover:border-[#00e5ff]/30 hover:text-[#c0c4cc]"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all duration-300 glow-on-hover-outline ${
              activeTag === tag
                ? "bg-[#00e5ff]/10 border-[#00e5ff]/40 text-[#00e5ff]"
                : "border-[#1a1a3e] text-[#6b7280] hover:border-[#00e5ff]/30 hover:text-[#c0c4cc]"
            }`}
            >
              {tag}
            </button>
          ))}
        </FadeIn>

        {/* Results count */}
        <p className="text-[#6b7280] text-xs font-mono-tech text-center mb-8">
          {filtered.length} service{filtered.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="group relative p-8 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60 hover:border-[#00e5ff]/30 transition-all duration-500 h-full flex flex-col">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}15` }}
                >
                  <s.icon size={24} style={{ color: s.color }} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#e8eaed] mb-3">{s.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-5 pt-4 border-t border-[#1a1a3e]/60 flex items-center justify-between">
                  <span className="text-[#00e5ff] font-mono-tech text-xs font-semibold">{s.price}</span>
                  <a
                    href="#contact"
                    className="text-[#6b7280] hover:text-[#00e5ff] text-xs font-mono-tech transition-colors flex items-center gap-1 glow-on-hover-outline"
                  >
                    Inquire <ArrowRight size={12} />
                  </a>
                </div>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at 50% 50%, ${s.color}08, transparent 60%)`,
                  }}
                />
              </div>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6b7280] font-mono-tech text-sm">No services match your search.</p>
            <button
              onClick={() => { setQuery(""); setActiveTag(null); }}
              className="mt-4 px-4 py-2 text-xs font-mono-tech text-[#00e5ff] border border-[#00e5ff]/30 rounded-lg hover:bg-[#00e5ff]/5 transition-all duration-300 glow-on-hover-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
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
            A full-stack e-commerce platform showcasing our development capabilities.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="relative rounded-3xl overflow-hidden bg-[#0c0c18] border border-[#1a1a3e] p-1">
              <div className="rounded-2xl bg-gradient-to-br from-[#0c0c18] via-[#12122a] to-[#0c0c18] p-8 md:p-12">
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
                  platform with real-time inventory tracking, AI-powered recommendations, and a checkout
                  flow designed to maximize conversions.
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
                  href="https://maniacshop.freebuff.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00e5ff] text-[#06060e] font-bold rounded-xl hover:bg-[#00e5ff]/90 transition-all duration-300 glow-cyan font-display text-xs tracking-wider glow-on-hover"
                >
                  <Play size={14} />
                  View Live Demo
                </a>
                <a
                  href="https://github.com/MANlAC/modern-shop-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#1a1a3e] text-[#c0c4cc] rounded-xl hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-300 font-display text-xs tracking-wider glow-on-hover-outline"
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
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
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
          className="px-4 py-1.5 text-xs font-mono-tech border border-[#1a1a3e] text-[#6b7280] rounded-lg hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-300 glow-on-hover-outline"
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
        <p className="text-[#6b7280] text-xs font-mono-tech mb-4">
          Two-player local game — take turns on the same device
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-sm font-mono-tech font-semibold rounded-xl hover:bg-[#00e5ff]/20 hover:border-[#00e5ff]/50 transition-all duration-300 glow-on-hover-outline"
        >
          ↻ Reset Game & Play Again
        </button>
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
    alt: "Circuit Board Close-Up",
  },
  {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    alt: "Cybersecurity Concept",
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    alt: "Abstract Neon Lines",
  },
  {
    url: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80",
    alt: "Digital Data Streams",
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    alt: "Globe with Data Network",
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    alt: "Matrix-Style Code",
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#0c0c18]/80 border border-[#1a1a3e] flex items-center justify-center text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all duration-300 backdrop-blur glow-on-hover-outline"
          >
            <ChevronDown size={18} className="rotate-90" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#0c0c18]/80 border border-[#1a1a3e] flex items-center justify-center text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all duration-300 backdrop-blur glow-on-hover-outline"
          >
            <ChevronDown size={18} className="-rotate-90" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-12"
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

/* ─── Testimonials / Comments ─── */
const testimonials = [
  {
    name: "Anil Khanal",
    role: "Founder, Nexus Digital",
    text: "Maniac Web Studio delivered a stunning e-commerce platform that tripled our online sales within the first quarter. The attention to detail and performance is outstanding.",
    rating: 5,
  },
  {
    name: "Kaushal Khadka",
    role: "CEO, GreenLeaf Organics",
    text: "Working with Dinesh was a game-changer. He built us a custom inventory management system that saved countless hours every week. Professional, fast, and incredibly skilled.",
    rating: 5,
  },
  {
    name: "Pradip Dhungana",
    role: "CTO, HimalayaTech",
    text: "The mobile app they developed for us handles thousands of daily users with zero downtime. The code quality and architecture are top-notch. Highly recommended.",
    rating: 5,
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 text-[#00ff88] text-xs font-mono-tech tracking-widest uppercase mb-6">
            What Clients Say
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8eaed] mb-4">
            Client <span className="text-[#00e5ff] text-glow">Testimonials</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Real feedback from businesses we've helped transform through technology.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div className="p-8 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60 h-full flex flex-col">
                <Quote size={24} className="text-[#00e5ff]/30 mb-4" />
                <p className="text-[#c0c4cc] text-sm leading-relaxed flex-1 mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#ff6b35] fill-[#ff6b35]" />
                  ))}
                </div>
                <div className="pt-4 border-t border-[#1a1a3e]/60">
                  <p className="text-[#e8eaed] text-sm font-semibold">{t.name}</p>
                  <p className="text-[#6b7280] text-xs font-mono-tech">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const sendEmail = useAction(api.sendContactEmail.sendEmail);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) {
      errors.name = "Name is required.";
    } else if (formState.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }
    if (!formState.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formState.message.trim()) {
      errors.message = "Message is required.";
    } else if (formState.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError(null);
    try {
      await sendEmail({
        name: formState.name.trim(),
        email: formState.email.trim(),
        message: formState.message.trim(),
      });
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
        style: { background: "#0c0c18", border: "1px solid #00e5ff40", color: "#e8eaed" },
      });
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setFieldErrors({});
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setSendError(msg);
      toast.error("Something went wrong", {
        description: msg,
        style: { background: "#0c0c18", border: "1px solid #ff406040", color: "#e8eaed" },
      });
    } finally {
      setSending(false);
    }
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
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <FadeIn direction="right">
            <div className="space-y-6">
              {/* Email card */}
              <div className="p-6 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#00e5ff]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-xs font-mono-tech mb-1">Email</p>
                    <a
                      href="mailto:dineshbohara2073@gmail.com"
                      className="text-[#e8eaed] hover:text-[#00e5ff] transition-colors text-sm font-semibold"
                    >
                      dineshbohara2073@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone card */}
              <div className="p-6 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-[#00ff88]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-xs font-mono-tech mb-1">Phone</p>
                    <a
                      href="tel:+9779749419302"
                      className="text-[#e8eaed] hover:text-[#00e5ff] transition-colors text-sm font-semibold"
                    >
                      +977 9749419302
                    </a>
                  </div>
                </div>
              </div>

              {/* Creator card */}
              <div className="p-6 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#7b2ff7]/10 flex items-center justify-center shrink-0">
                    <Globe size={20} className="text-[#7b2ff7]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-xs font-mono-tech mb-1">Founded by</p>
                    <p className="text-[#e8eaed] text-sm font-semibold">Dinesh Kumar Bohara</p>
                    <p className="text-[#00e5ff]/60 text-xs font-mono-tech">Undergraduate Student</p>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div className="p-6 rounded-2xl bg-[#0c0c18] border border-[#1a1a3e]/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/10 flex items-center justify-center shrink-0">
                    <Zap size={20} className="text-[#ff6b35]" />
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
                    className="mt-4 px-4 py-2 text-xs font-mono-tech text-[#00e5ff] border border-[#00e5ff]/30 rounded-lg hover:bg-[#00e5ff]/5 transition-all duration-300 glow-on-hover-outline"
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
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={16} className="text-[#00e5ff]" />
                  <span className="text-[#e8eaed] text-sm font-semibold font-display">Send a Message</span>
                </div>
                <div>
                  <label className="block text-[#6b7280] text-xs font-mono-tech mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => { setFormState({ ...formState, name: e.target.value }); if (fieldErrors.name) setFieldErrors((p) => { const n = { ...p }; delete n.name; return n; }); }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#12122a] border text-[#e8eaed] text-sm focus:outline-none transition-colors placeholder:text-[#6b7280]/50 ${fieldErrors.name ? "border-red-500/60 focus:border-red-500/80" : "border-[#1a1a3e] focus:border-[#00e5ff]/50"}`}
                    placeholder="Your name"
                  />
                  {fieldErrors.name && <p className="text-red-400 text-xs mt-1.5 font-mono-tech">{fieldErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-[#6b7280] text-xs font-mono-tech mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => { setFormState({ ...formState, email: e.target.value }); if (fieldErrors.email) setFieldErrors((p) => { const n = { ...p }; delete n.email; return n; }); }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#12122a] border text-[#e8eaed] text-sm focus:outline-none transition-colors placeholder:text-[#6b7280]/50 ${fieldErrors.email ? "border-red-500/60 focus:border-red-500/80" : "border-[#1a1a3e] focus:border-[#00e5ff]/50"}`}
                    placeholder="you@email.com"
                  />
                  {fieldErrors.email && <p className="text-red-400 text-xs mt-1.5 font-mono-tech">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-[#6b7280] text-xs font-mono-tech mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => { setFormState({ ...formState, message: e.target.value }); if (fieldErrors.message) setFieldErrors((p) => { const n = { ...p }; delete n.message; return n; }); }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#12122a] border text-[#e8eaed] text-sm focus:outline-none transition-colors resize-none placeholder:text-[#6b7280]/50 ${fieldErrors.message ? "border-red-500/60 focus:border-red-500/80" : "border-[#1a1a3e] focus:border-[#00e5ff]/50"}`}
                    placeholder="Tell us about your project..."
                  />
                  {fieldErrors.message && <p className="text-red-400 text-xs mt-1.5 font-mono-tech">{fieldErrors.message}</p>}
                </div>
                {sendError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono-tech">
                    {sendError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00e5ff] text-[#06060e] font-bold rounded-xl hover:bg-[#00e5ff]/90 transition-all duration-300 glow-cyan font-display text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed glow-on-hover"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#06060e]/30 border-t-[#06060e] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
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
        <p className="font-display text-lg font-bold text-[#00e5ff] text-glow mb-3">
          MANIAC<span className="text-[#7b2ff7]">.</span>
        </p>
        <p className="text-[#6b7280] text-sm mb-4">
          Crafting premium digital experiences for forward-thinking businesses.
        </p>
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="mailto:dineshbohara2073@gmail.com"
            className="text-[#6b7280] hover:text-[#00e5ff] transition-colors"
          >
            <Mail size={18} />
          </a>
          <a
            href="tel:+9779749419302"
            className="text-[#6b7280] hover:text-[#00e5ff] transition-colors"
          >
            <Phone size={18} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#00e5ff] transition-colors"
          >
            <Github size={18} />
          </a>
        </div>
        <p className="text-[#6b7280]/60 text-xs font-mono-tech">
          &copy; {new Date().getFullYear()} Maniac Web Studio. Founded by{" "}
          <span className="text-[#c0c4cc]">Dinesh Kumar Bohara</span>.
        </p>
      </div>
    </footer>
  );
}

/* ─── Twinkling Stars ─── */
type StarShape = "dot" | "diamond" | "cross" | "line" | "ring";

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  shape: StarShape;
  color: string;
  rotate: number;
}

function renderStarShape(shape: StarShape, color: string, size: number) {
  switch (shape) {
    case "dot":
      return {
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 100%)`,
        boxShadow: `0 0 ${size * 3}px ${color}`,
      };
    case "diamond":
      return {
        borderRadius: "2px",
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      };
    case "cross":
      return {
        borderRadius: "0",
        background: "transparent",
        boxShadow: "none",
      };
    case "line":
      return {
        borderRadius: "1px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        boxShadow: `0 0 ${size}px ${color}`,
      };
    case "ring":
      return {
        borderRadius: "50%",
        background: "transparent",
        border: `1px solid ${color}`,
        boxShadow: `0 0 ${size}px ${color}, inset 0 0 ${size}px ${color}`,
      };
    default:
      return { borderRadius: "50%", background: color };
  }
}

function TwinklingStars() {
  const stars = useRef(
    Array.from({ length: 270 }, (_, i): StarData => {
      const shapes: StarShape[] = ["dot", "dot", "dot", "diamond", "cross", "line", "ring"];
      const colors = [
        "rgba(0, 229, 255, VAR)",
        "rgba(123, 47, 247, VAR)",
        "rgba(255, 255, 255, VAR)",
        "rgba(0, 255, 136, VAR)",
      ];
      const baseOpacity = Math.random() * 0.7 + 0.15;
      const colorTemplate = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.5,
        duration: Math.random() * 5 + 2,
        delay: Math.random() * 6,
        opacity: baseOpacity,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colorTemplate.replace("VAR", String(baseOpacity)),
        rotate: Math.random() * 360,
      };
    })
  ).current;

  const shootingStars = useRef(
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: Math.random() * 60 + 10,
      startY: Math.random() * 40,
      angle: Math.random() * 20 + 25,
      length: Math.random() * 80 + 60,
      duration: Math.random() * 1.5 + 1.5,
      delay: i * 4 + Math.random() * 3,
      repeatDelay: 8 + Math.random() * 6,
    }))
  ).current;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Static twinkling stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.shape === "line" ? s.size * 4 : s.shape === "cross" ? s.size * 2 : s.size,
            height: s.shape === "line" ? 1 : s.shape === "cross" ? s.size * 2 : s.size,
            transform: `rotate(${s.rotate}deg)`,
            ...renderStarShape(s.shape, s.color, s.size),
          }}
          animate={{
            opacity: [s.opacity * 0.2, s.opacity, s.opacity * 0.2],
            scale: s.shape === "ring" ? [0.8, 1.1, 0.8] : [0.6, 1.3, 0.6],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.shape === "cross" && (
            <>
              <div
                className="absolute top-1/2 left-0 -translate-y-1/2"
                style={{ width: "100%", height: 1, background: s.color }}
              />
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2"
                style={{ width: 1, height: "100%", background: s.color }}
              />
            </>
          )}
        </motion.div>
      ))}

      {/* Shooting stars */}
      {shootingStars.map((ss) => (
        <motion.div
          key={`shoot-${ss.id}`}
          className="absolute"
          style={{
            left: `${ss.startX}%`,
            top: `${ss.startY}%`,
            width: ss.length,
            height: 1.5,
            borderRadius: 1,
            background: `linear-gradient(90deg, rgba(0, 229, 255, 0), rgba(0, 229, 255, 0.8) 40%, rgba(255, 255, 255, 1))`,
            boxShadow: "0 0 8px rgba(0, 229, 255, 0.6), 0 0 20px rgba(0, 229, 255, 0.3)",
            transform: `rotate(${ss.angle}deg)`,
            transformOrigin: "left center",
          }}
          animate={{
            x: [0, 500],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: ss.duration,
            delay: ss.delay,
            repeat: Infinity,
            repeatDelay: ss.repeatDelay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Landing ─── */
export default function Landing() {
  return (
    <div className="dark min-h-screen bg-[#06060e] text-[#e8eaed] relative">
      <TwinklingStars />
      <div className="relative z-10">
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
        <TestimonialsSection />
        <div className="section-divider" />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
