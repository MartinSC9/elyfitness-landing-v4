
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  X, Menu, ArrowRight, ChevronDown, ChevronLeft, ChevronRight,
  MessageCircle, Star, Check, Send, Copy, ExternalLink,
  Instagram, Heart, Sparkles, TrendingUp, Users, Download, Zap, Crown, Dumbbell, Apple,
  Shield, Clock, Award, Play, Phone, Mail, MapPin, CalendarCheck, Utensils, Video,
  Clipboard, CheckCircle, Target, Activity, Flame,
} from 'lucide-react';
import FlipWords from '@/components/FlipWords';
import NumberTicker from '@/components/NumberTicker';
import MagneticButton from '@/components/MagneticButton';

/* --- MEDIA --- */
const ELY_MODAL = 'https://static.wixstatic.com/media/4cd4b0_a7d6132da9c84d41a3bed4a1d5f77922~mv2.webp/v1/fill/w_800,h_1020,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/ELYFITNESS_MINIATURA_CAMPUS%20POWER%202025.webp';
const ELY_VIDEO = 'https://video.wixstatic.com/video/4cd4b0_9626817c7320447ea40f07a27ebc5934/720p/mp4/file.mp4';
const HERO_VIDEO_DESKTOP = '/hero-bg-1.mp4';
const ELY_HERO = [
  'https://static.wixstatic.com/media/4cd4b0_a5929837b21743188a6a099599458250~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4cd4b0_a5929837b21743188a6a099599458250~mv2.jpg',
  'https://static.wixstatic.com/media/4cd4b0_689e1c2af70a461f9250bd0e74036e3f~mv2.webp/v1/fill/w_1920,h_1080,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4cd4b0_689e1c2af70a461f9250bd0e74036e3f~mv2.webp',
];

const IMG = {
  food1: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400&q=85',
  food2: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=85',
  food3: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400&q=85',
  gym1: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=85',
  gym2: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1400&q=85',
  gym3: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1400&q=85',
  running: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1400&q=85',
  prep: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1400&q=85',
  results: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1400&q=85',
  lifestyle1: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&q=85',
  community: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=85',
};

/* --- ANIMATIONS --- */
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };
const slideLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };
const slideRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* --- WAVE DIVIDER (V4 - smoother, organic) --- */
function WaveDivider({ from = '#FCF3EF', to = '#ffffff', flip = false }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 80, backgroundColor: from, marginTop: -1 }}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: 80, transform: flip ? 'scaleX(-1)' : undefined }}>
        <path d="M0 30C180 55 360 65 540 50C720 35 900 15 1080 25C1260 35 1380 55 1440 45V80H0Z" fill={to} />
      </svg>
    </div>
  );
}

/* --- SCROLL PROGRESS --- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] scroll-progress z-50" style={{ scaleX }} />;
}

/* --- SECTION LABEL (V4 reusable) --- */
function SectionLabel({ children, dark = false }) {
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${dark ? 'bg-white/10 text-primary border border-white/10' : 'bg-primary/10 text-primary-dark border border-primary/15'}`}>
      {children}
    </span>
  );
}

/* =================== NAVBAR (V4 - active section, CTA button) =================== */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastDirectionY = useRef(0);
  const direction = useRef('up');

  useEffect(() => {
    const sections = ['cambios', 'coaching', 'app', 'sobre-mi', 'prozis', 'contacto'];
    const check = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const diff = y - lastDirectionY.current;
      if (diff > 15) { direction.current = 'down'; lastDirectionY.current = y; }
      else if (diff < -15) { direction.current = 'up'; lastDirectionY.current = y; }
      setHidden(y > 200 && direction.current === 'down');

      const navBottom = 64;
      const darkSections = document.querySelectorAll('#app');
      let dark = false;
      darkSections.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < navBottom && rect.bottom > 0) dark = true;
      });
      setOnDark(dark);

      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) { current = id; break; }
        }
      }
      setActiveSection(current);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const links = [
    { href: '#cambios', id: 'cambios', label: 'RESULTADOS' },
    { href: '#coaching', id: 'coaching', label: 'COACHING 1A1', badge: true },
    { href: '#app', id: 'app', label: 'APP FITNESS' },
    { href: '#sobre-mi', id: 'sobre-mi', label: 'SOBRE MI' },
    { href: '#prozis', id: 'prozis', label: 'PROZIS' },
    { href: '#contacto', id: 'contacto', label: 'CONTACTO' },
  ];
  const light = scrolled && !onDark;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${hidden ? '-translate-y-full' : 'translate-y-0'} ${onDark ? 'bg-dark/90 backdrop-blur-xl border-b border-white/5 shadow-sm' : scrolled ? 'bg-[#FCF3EF]/90 backdrop-blur-xl border-b border-dark/8 shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 group">
          <span className={`text-2xl font-black tracking-tight transition-colors duration-300 ${light ? 'text-dark' : 'text-white'}`}>ELY</span>
          <span className={`text-[8px] font-bold uppercase leading-tight transition-colors duration-300 ${light ? 'text-primary-dark' : 'text-primary'}`}>FITNESS<br />&amp; NUTRITION</span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`relative px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all duration-300 ${activeSection === l.id ? (light ? 'text-primary-dark bg-primary/10' : 'text-primary bg-primary/15') : (light ? 'text-dark/60 hover:text-dark hover:bg-dark/5' : 'text-white/70 hover:text-white hover:bg-white/10')}`}>
              {l.label}
              {l.badge && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full badge-pulse" />}
              {activeSection === l.id && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
              )}
            </a>
          ))}
          <a href="#contacto" className="ml-3 inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30">
            Empezar <ArrowRight size={11} />
          </a>
        </div>

        <div className={`flex items-center gap-3 lg:hidden transition-colors ${light ? 'text-dark' : 'text-white'}`}>
          <button onClick={() => setOpen(!open)} className="p-1">{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden bg-cream/98 backdrop-blur-xl border-t border-dark/8 px-6 pb-6">
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={`block font-bold text-sm uppercase py-3 border-b border-dark/8 last:border-0 ${activeSection === l.id ? 'text-primary-dark' : 'text-dark/70'}`}>{l.label}</motion.a>
            ))}
            <motion.a href="#contacto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-4 flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-bold text-sm uppercase">
              Empieza tu cambio <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* =================== HERO (V4 - Enhanced) =================== */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.05]);

  return (
    <section ref={ref} className="relative h-screen flex items-center overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover sm:hidden" src={ELY_VIDEO} />
        <video autoPlay muted loop playsInline className="w-full h-full object-cover hidden sm:block" src={HERO_VIDEO_DESKTOP} />
      </motion.div>
      <div className="absolute inset-0 bg-dark/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />

      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">
            <motion.div variants={fadeUp} className="mb-5">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 text-xs font-bold text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                Dietista & Entrenadora Personal IFBB
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-black text-white uppercase leading-[0.85] mb-5">
              Transforma<br />tu cuerpo con{' '}
              <span className="text-gradient">un plan<br />personalizado</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="mb-7 max-w-md">
              <p className="text-lg sm:text-xl text-white/80 font-medium">Soy Ely. Te ayudo a</p>
              <span className="block text-xl sm:text-2xl font-bold mt-1">
                <FlipWords
                  words={['transformar tu cuerpo', 'comer sin restricciones', 'sentirte fuerte', 'recuperar tu energia', 'amar tu proceso']}
                  duration={2800}
                  colors={['#D9A3FF']}
                />
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-10">
              <MagneticButton href="#coaching" className="group inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]">
                VER PLANES <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton href="#cambios" className="group inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm">
                VER RESULTADOS
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-10">
              {[
                { v: 13, s: '+', l: 'Anos exp.', icon: <Award size={14} /> },
                { v: 4, s: 'K+', l: 'Cambios', icon: <TrendingUp size={14} /> },
                { v: 400, s: 'K+', l: 'Comunidad', icon: <Users size={14} /> },
              ].map(s => (
                <div key={s.l}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary/60">{s.icon}</span>
                    <span className="text-2xl sm:text-3xl font-black text-white"><NumberTicker value={s.v} suffix={s.s} /></span>
                  </div>
                  <div className="text-white/35 text-[9px] font-semibold uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest">Scroll</span>
        <ChevronDown className="text-white/30" size={18} />
      </motion.div>
    </section>
  );
}

/* =================== SOCIAL PROOF (V4 - icons, dividers) =================== */
function SocialProof() {
  const stats = [
    { value: 4, suffix: 'K+', label: 'Transformaciones reales', icon: <TrendingUp size={18} /> },
    { value: 13, suffix: '+', label: 'Anos de experiencia', icon: <Award size={18} /> },
    { value: 400, suffix: 'K+', label: 'Comunidad activa', icon: <Users size={18} /> },
    { value: 5, suffix: '', label: 'Estrellas Google', icon: <Star size={18} /> },
  ];
  return (
    <section className="bg-dark py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} className="relative">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-primary">
                  {s.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-white/35 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mt-1">{s.label}</p>
              {i < 3 && <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/8" />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =================== TRUST STRIP (V4 - with icons) =================== */
function TrustStrip() {
  const items = [
    { text: 'NUTRICION DEPORTIVA', icon: <Apple size={12} /> },
    { text: 'PERSONAL TRAINER IFBB', icon: <Dumbbell size={12} /> },
    { text: 'PLAN ULTRA VIP', icon: <Crown size={12} /> },
    { text: 'METODO HIBRIDO', icon: <Activity size={12} /> },
    { text: '+ 13 ANOS EXPERIENCIA', icon: <Award size={12} /> },
    { text: 'APP EXCLUSIVA', icon: <Download size={12} /> },
    { text: '4K+ CAMBIOS REALES', icon: <TrendingUp size={12} /> },
    { text: 'COMUNIDAD 400K+', icon: <Users size={12} /> },
  ];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="bg-primary text-white py-4 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#D9A3FF] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#D9A3FF] to-transparent z-10 pointer-events-none" />
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase mx-6 tracking-wider text-white/90">
            <span className="text-white/50">{t.icon}</span>
            {t.text}
            <span className="text-white/30 mx-2">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* =================== PHOTO BANNER (V4 - parallax, better text) =================== */
function PhotoBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % ELY_HERO.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[55vh] sm:h-[60vh] overflow-hidden">
      {ELY_HERO.map((src, i) => (
        <img key={i} src={src} alt="" className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-[1.5s] ease-in-out" style={{ opacity: current === i ? 1 : 0 }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-xl">
          <motion.div variants={fadeUp}>
            <SectionLabel dark>Mi metodo</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white leading-[0.85] mt-5 mb-5">
            Tu pones el objetivo,<br />yo te guio en<br /><span className="text-gradient">el camino</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-sm sm:text-base mb-8 max-w-md leading-relaxed">
            Has puesto esfuerzo pero no ves resultados. Tu plan exclusivo te ayudara a lograr tus objetivos encontrando el equilibrio entre tu vida social, laboral y la salud.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a href="#coaching" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-primary/20">
              Ver planes <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#cambios" className="group inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all backdrop-blur-sm">
              Ver resultados
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 lg:left-12 z-10 flex gap-2">
        {ELY_HERO.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? 'w-10 bg-primary' : 'w-3 bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>
    </section>
  );
}

/* =================== TRANSFORMATIONS (V4 - filter tabs, better cards) =================== */
function MarqueeCard({ data }) {
  return (
    <div className="min-w-[300px] max-w-[300px] rounded-2xl overflow-hidden shrink-0 bg-white border border-dark/8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 card-shine relative">
      <div className="grid grid-cols-2 gap-0.5 bg-dark/10">
        <div className="relative h-44 overflow-hidden">
          <img src={data.before} alt="" className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-2 left-2 bg-white/90 text-dark text-[9px] font-bold uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">Antes</span>
        </div>
        <div className="relative h-44 overflow-hidden">
          <img src={data.after} alt="" className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-2 right-2 bg-primary text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm">Despues</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-[10px] font-black text-primary-dark">{data.name.charAt(0)}</span>
            </div>
            <span className="text-xs font-black text-dark uppercase">{data.name}</span>
          </div>
          <span className="bg-primary/10 text-primary-dark text-[9px] font-bold px-2.5 py-1 rounded-full">{data.time}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-0.5">{[1,2,3,4,5].map(j => <Star key={j} size={10} className="fill-yellow-400 text-yellow-400" />)}</div>
          <span className="text-primary font-bold text-[11px] ml-auto">{data.result}</span>
        </div>
        <p className="text-[11px] text-dark/50 leading-relaxed line-clamp-2">&quot;{data.text}&quot;</p>
      </div>
    </div>
  );
}

function Transformations() {
  const [filter, setFilter] = useState('todos');
  const data = [
    { name: 'C.B.', result: '-20 kg', text: 'He perdido mas de 20 kg de forma saludable. No paso hambre, no tengo ansiedad por comer y he vuelto a mirarme al espejo con orgullo.', before: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80', after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', time: 'Ultra Premium', tag: 'coaching' },
    { name: 'V.M.', result: 'Recomposicion', text: 'Baje muchisimo volumen en abdomen y piernas, y hoy me siento fuerte, segura y feliz.', before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', after: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80', time: 'Ultra Premium', tag: 'coaching' },
    { name: 'M.M.', result: 'Sin medicacion', text: 'Hoy vivo sin medicacion, con mas salud y autoestima. He bajado de peso mejorando masa muscular.', before: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80', after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', time: 'Ultra Premium', tag: 'coaching' },
    { name: 'T.H.', result: '-4.5 kg / 4 sem', text: 'He recuperado la menstruacion despues de mas de dos anos. He aprendido a comer y a disfrutar sin culpa.', before: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80', after: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80', time: 'Ultra Premium', tag: 'coaching' },
    { name: 'S.B.', result: 'Metodo Hibrido', text: 'Combinar fuerza y resistencia me ha dado un cuerpo mas eficiente y una mente mas fuerte.', before: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80', after: IMG.gym1, time: 'Ultra Running', tag: 'coaching' },
    { name: 'M.P.', result: 'Salud interior', text: 'Ha desaparecido la ansiedad por comer. He mejorado en salud interior que luego se refleja en salud exterior.', before: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', after: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&q=80', time: '+ 8 meses', tag: 'coaching' },
    { name: 'E.G.', result: 'ElyFitness APP', text: 'Nunca habia seguido un plan con tanta adherencia. La app es intuitiva y las recetas son un 10.', before: IMG.food3, after: IMG.food1, time: 'APP Fitness', tag: 'app' },
    { name: 'C.H.', result: 'Pack Duo', text: 'Nos apuntamos al Pack Duo y fue un antes y un despues. Recetas faciles y riquisimas.', before: IMG.gym2, after: IMG.running, time: 'Pack Duo', tag: 'app' },
  ];

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'coaching', label: 'Coaching 1a1' },
    { id: 'app', label: 'APP Fitness' },
  ];

  const filtered = filter === 'todos' ? data : data.filter(d => d.tag === filter);
  const row1 = filtered.slice(0, Math.ceil(filtered.length / 2));
  const row2 = filtered.slice(Math.ceil(filtered.length / 2));

  return (
    <section id="cambios" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.div variants={fadeUp}>
            <SectionLabel>+ 4.000 Transformaciones reales</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black uppercase leading-[0.9] mt-5">Cambios reales<br /><span className="text-gradient">de mis chic@s</span></motion.h2>
          <motion.p variants={fadeUp} className="text-dark/45 text-sm mt-3 max-w-md mx-auto">Resultados reales de personas que confiaron en mi metodo. Sin atajos, sin pastillas, solo constancia y un plan real.</motion.p>

          <motion.div variants={fadeUp} className="flex justify-center gap-2 mt-8">
            {filters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${filter === f.id ? 'bg-dark text-white shadow-md' : 'bg-white text-dark/50 border border-dark/10 hover:border-dark/20 hover:text-dark/70'}`}>
                {f.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mb-5">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee-cards flex gap-5" style={{ width: 'max-content' }}>
          {[...row1, ...row1, ...row1].map((t, i) => <MarqueeCard key={`r1-${i}`} data={t} />)}
        </div>
      </div>

      {row2.length > 0 && (
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee-cards-reverse flex gap-5" style={{ width: 'max-content' }}>
            {[...row2, ...row2, ...row2].map((t, i) => <MarqueeCard key={`r2-${i}`} data={t} />)}
          </div>
        </div>
      )}

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto px-4 mt-14">
        <div className="flex flex-wrap justify-center gap-3">
          {['Resultados reales, no stock', 'Sin atajos ni pastillas', 'Con seguimiento constante'].map(t => (
            <span key={t} className="inline-flex items-center gap-2 bg-white border border-dark/8 px-4 py-2 rounded-full text-[11px] font-medium text-dark/50">
              <CheckCircle size={12} className="text-[#34d399]" /> {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* =================== COACHING (V4 - better hierarchy, feature badges) =================== */
function CoachingPersonalizado() {
  const planes = [
    {
      n: '01', name: 'PREMIUM PLUS', popular: true, img: IMG.gym1,
      shortDesc: 'El plan mas completo. Coaching integral con Ely.',
      bullets: [
        'Plan de alimentacion, suplementacion y entrenamiento 100% personalizado conmigo.',
        'Chat VIP para asesoramiento diario y maxima cercania conmigo.',
        'Seguimiento y ajustes quincenales con revision de progreso.',
        'Beneficios: Mas energia, salud, mejor composicion corporal, menos dolor y resultados reales.',
      ],
      highlights: ['Alimentacion', 'Entreno', 'Suplementacion', 'Chat VIP'],
    },
    {
      n: '02', name: 'PREMIUM RUNNING', img: IMG.running,
      shortDesc: 'Para corredoras que quieren rendir mas.',
      bullets: [
        'Plan de alimentacion, suplementacion y entrenamiento 100% personalizado conmigo para carreras.',
        'Chat VIP para asesoramiento diario y maxima cercania conmigo.',
        'Seguimiento y ajustes quincenales con revision de progreso.',
        'Rendimiento y objetivos en carreras: 5K, 10K, Medio Maraton, Maraton, Ultras.',
      ],
      highlights: ['Alimentacion', 'Entreno', 'Running', 'Chat VIP'],
    },
    {
      n: '03', name: 'NUTRICION', img: IMG.food2,
      shortDesc: 'Solo alimentacion. Sin plan de entrenamiento.',
      bullets: [
        'Plan de alimentacion, suplementacion 100% personalizado conmigo.',
        'Chat VIP para asesoramiento diario y maxima cercania conmigo.',
        'Seguimiento y ajustes quincenales con revision de progreso.',
        'Beneficios en la gestion y orden de las comidas. Control senales de hambre y saciedad.',
      ],
      highlights: ['Alimentacion', 'Suplementacion', 'Chat VIP'],
    },
    {
      n: '04', name: 'TRAINING', img: IMG.gym2,
      shortDesc: 'Solo entrenamiento. Sin plan de nutricion.',
      bullets: [
        'Plan de entrenamiento, suplementacion 100% personalizado conmigo.',
        'Chat VIP para asesoramiento diario y maxima cercania conmigo.',
        'Seguimiento y ajustes quincenales con revision de progreso.',
        'Progreso en el entrenamiento. Readaptacion a lesiones.',
      ],
      highlights: ['Entreno', 'Suplementacion', 'Chat VIP'],
    },
  ];

  return (
    <section id="coaching" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-6">
          <motion.div variants={fadeUp}>
            <SectionLabel><Crown size={12} /> 100% PERSONALIZADO - 1 A 1 CON ELY</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black uppercase mt-5">Coaching <span className="text-gradient">Personalizado</span></motion.h2>
          <motion.p variants={fadeUp} className="text-dark/45 text-sm mt-3 max-w-lg mx-auto">Acompanamiento diario y cercano con Ely. Dieta, entreno y seguimiento VIP adaptado a ti.</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-2.5 bg-primary/8 border border-primary/12 rounded-full px-5 py-2.5">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span className="text-sm font-medium text-dark/55">Plazas limitadas para garantizar seguimiento de calidad</span>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {planes.map(p => (
            <motion.a key={p.name} href="#contacto" variants={fadeUp} className={`group text-center cursor-pointer block bg-white rounded-2xl border p-6 hover:shadow-xl transition-all duration-500 relative ${p.popular ? 'border-primary/30 shadow-lg shadow-primary/5 ring-1 ring-primary/10' : 'border-dark/8 hover:-translate-y-1'}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-lg shadow-primary/25">Mas popular</span>
                </div>
              )}

              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-5 mt-2">
                <div className={`w-full h-full rounded-full overflow-hidden border-[3px] transition-all duration-500 shadow-lg ${p.popular ? 'border-primary/40 glow-ring' : 'border-dark/10 group-hover:border-primary/30'}`}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute -top-1 -left-1 w-9 h-9 rounded-full bg-dark flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xs">{p.n}</span>
                </div>
              </div>

              <h3 className="font-black uppercase text-sm sm:text-base mb-2 text-dark leading-tight group-hover:text-primary-dark transition-colors">{p.name}</h3>
              <p className="text-[11px] text-dark/40 mb-4 leading-relaxed">{p.shortDesc}</p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                {p.highlights.map(h => (
                  <span key={h} className="inline-flex items-center gap-1 bg-cream text-dark/50 text-[9px] font-bold px-2.5 py-1 rounded-full">
                    <Check size={8} className="text-primary" /> {h}
                  </span>
                ))}
              </div>

              <ul className="text-left space-y-2.5 mx-auto mb-5">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] sm:text-[12px] text-dark/50 leading-relaxed">
                    <div className="w-4 h-4 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={8} className="text-primary" />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>

              <div className={`inline-flex items-center gap-1.5 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wide transition-all group-hover:gap-2.5 ${p.popular ? 'bg-primary hover:bg-primary-dark shadow-md shadow-primary/20' : 'bg-dark hover:bg-dark-soft'}`}>
                Empezar ahora <ArrowRight size={12} />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-14 flex flex-wrap justify-center gap-2.5">
          {[
            { text: 'Chat VIP diario con Ely', icon: <MessageCircle size={12} /> },
            { text: 'Todo en mi APP', icon: <Download size={12} /> },
            { text: 'Sin permanencia', icon: <Shield size={12} /> },
            { text: 'Adaptado a patologias', icon: <Heart size={12} /> },
          ].map(f => (
            <span key={f.text} className="inline-flex items-center gap-2 bg-white border border-dark/8 px-4 py-2.5 rounded-full text-xs font-medium text-dark/55">
              <span className="text-primary">{f.icon}</span> {f.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =================== APP (V4 - feature icons, dual CTA) =================== */
function ElyFitnessApp() {
  const APP_VIDEO = 'https://video.wixstatic.com/video/4cd4b0_d9ff65c4b76343a6988372fccb6cc847/720p/mp4/file.mp4';
  const features = [
    { text: 'Plan alimentacion personalizado', icon: <Utensils size={14} /> },
    { text: 'Entrenos en video gym y casa', icon: <Video size={14} /> },
    { text: 'Recetas nuevas cada mes', icon: <Flame size={14} /> },
    { text: 'Comunidad privada', icon: <Users size={14} /> },
    { text: 'Chat con nutri y soporte', icon: <MessageCircle size={14} /> },
    { text: 'Lista de la compra', icon: <Clipboard size={14} /> },
    { text: 'Clases dirigidas', icon: <Play size={14} /> },
    { text: 'Buscador de recetas', icon: <Target size={14} /> },
  ];

  return (
    <section id="app" className="py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.gym3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/88" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <SectionLabel dark><Download size={12} /> Tu APP de fitness</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white leading-[0.85] mt-5">ElyFitness <span className="text-gradient">APP</span></h2>
          <p className="text-white/35 text-sm mt-3 max-w-xl mx-auto">Disenada para quienes quieren cuidarse de forma economica, flexible y a su ritmo.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-dark/90 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-[1fr_auto] items-stretch">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-end gap-6 mb-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Individual</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-6xl font-black text-white">59&#8364;</span>
                    <span className="text-sm text-white/30 font-semibold">/ano</span>
                  </div>
                  <p className="text-sm text-white/35 mt-1 flex items-center gap-2">
                    Solo 4,92 &#8364;/mes
                    <span className="bg-[#34d399]/15 text-[#34d399] text-[9px] font-bold px-2 py-0.5 rounded-full">MEJOR PRECIO</span>
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-primary/15 border border-primary/25 rounded-2xl px-5 py-3 mb-1 pulse-glow"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Pack Duo</p>
                    <span className="bg-primary text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Popular</span>
                  </div>
                  <p className="text-2xl font-black text-white">69&#8364; <span className="text-sm font-semibold text-white/40">/2 personas</span></p>
                  <p className="text-[10px] text-white/30 mt-0.5">Solo 2,88 &#8364;/mes por persona</p>
                </motion.div>
              </div>

              <p className="text-white/40 text-sm mb-8">Pago unico. Sin permanencia. Descarga la APP al instante.</p>
              <div className="gradient-line mb-8" />

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10">
                {features.map((f, i) => (
                  <motion.div key={f.text} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary">{f.icon}</span>
                    </div>
                    <span className="text-sm text-white/60">{f.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <MagneticButton href="https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT" target="_blank" className="inline-flex items-center justify-center gap-2 bg-white text-dark px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-cream hover:shadow-lg transition-all group">
                  EMPIEZA YA <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <a href="#contacto" className="inline-flex items-center gap-2 border border-white/15 text-white/60 hover:text-white hover:border-white/30 px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wide transition-all">
                  Tengo dudas <MessageCircle size={13} />
                </a>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center px-10 py-10 bg-white/[0.03] gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Tu APP</p>
              <p className="text-[11px] text-white/40 -mt-2">Todo tu plan en el movil</p>
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, type: 'spring', damping: 20 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/15 blur-[40px] rounded-full scale-90 pointer-events-none" />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="relative w-48 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-sm rounded-[2rem] p-2.5 shadow-2xl border border-white/15">
                  <div className="rounded-[1.5rem] aspect-[9/16] overflow-hidden relative bg-[#1a1a1a]">
                    <video src={APP_VIDEO} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-black/30" />
                </motion.div>
              </motion.div>
              <p className="text-[10px] text-white/25 mt-2">Disponible en iOS y Android</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =================== MANIFESTO (V4 - bigger, dual CTA) =================== */
function Manifesto() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <video src={ELY_VIDEO} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-dark/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark/20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-6">
            <Sparkles size={28} className="text-primary mx-auto opacity-60" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase leading-tight text-white">
            Tu mejor version <span className="text-gradient">no se compra.</span>
          </motion.p>
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/45 mt-6 leading-relaxed max-w-lg mx-auto">
            Se construye. Con constancia, con un plan real y con alguien que te acompane en cada paso.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#coaching" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-all hover:shadow-[0_0_30px_rgba(217,163,255,0.3)]">
              Empieza tu cambio hoy <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://www.instagram.com/ely_fitness/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-all backdrop-blur-sm">
              <Instagram size={16} /> Sigueme
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* =================== ABOUT (V4 - floating cards, icons, YouTube) =================== */
function About() {
  const [expanded, setExpanded] = useState(false);
  const credentials = [
    { title: 'Dietista', desc: 'Formacion oficial en dietetica y nutricion', icon: <Utensils size={14} /> },
    { title: 'Entrenadora Personal IFBB', desc: 'Certificada por la federacion internacional', icon: <Dumbbell size={14} /> },
    { title: 'Nutricion Deportiva', desc: 'Especializacion en rendimiento y composicion corporal', icon: <Apple size={14} /> },
    { title: 'Auxiliar de Enfermeria', desc: '6 anos de experiencia en hospitales', icon: <Heart size={14} /> },
    { title: 'Tec. Sup. Documentacion Sanitaria', desc: 'Formacion sanitaria complementaria', icon: <Shield size={14} /> },
  ];

  return (
    <section id="sobre-mi" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                  <img src="https://static.wixstatic.com/media/daf224_b9030862d34e4fd4bfdb89872df3bdd3~mv2.jpg/v1/fill/w_488,h_974,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/daf224_b9030862d34e4fd4bfdb89872df3bdd3~mv2.jpg" alt="Ely Fitness" className="w-full h-full object-cover" />
                </div>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute -bottom-4 -right-4 sm:right-4 bg-white rounded-2xl p-4 shadow-lg border border-dark/8">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
                      <Heart size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-dark">+13 anos</p>
                      <p className="text-[10px] text-dark/50">de experiencia</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }} className="absolute top-6 -left-4 sm:-left-2 bg-white rounded-2xl px-4 py-3 shadow-lg border border-dark/8">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-[10px] font-bold text-dark/60">4K+ cambios</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:py-8">
            <motion.a href="https://www.instagram.com/ely_fitness/" target="_blank" rel="noopener noreferrer" variants={fadeUp} className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-400/10 hover:from-pink-500/15 hover:via-purple-500/15 hover:to-orange-400/15 border border-primary/15 rounded-full px-4 py-2 mb-5 transition-colors">
              <Instagram size={14} className="text-primary-dark" /> <span className="text-xs font-bold text-dark/70">@ely_fitness</span> <span className="text-[9px] text-dark/30">400K+</span>
            </motion.a>

            <motion.div variants={fadeUp}>
              <SectionLabel>Sobre mi</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase mb-4 leading-[0.85] mt-4">Soy <span className="text-gradient">Ely</span></motion.h2>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-primary-dark font-semibold italic mb-8">Mi pasion es sentirme vital y en forma</motion.p>

            <motion.p variants={fadeUp} className="text-dark/55 leading-relaxed mb-5 text-[15px]">
              Alimentarse es una necesidad, pero hacerlo de forma inteligente es un arte.
              Aprendi a nutrirme segun mis necesidades y objetivos, disfrutando del proceso sin renunciar
              a los pequenos placeres ni a los momentos especiales.
            </motion.p>

            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-dark/8 p-6 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40 mb-4">Credenciales</p>
              <div className="space-y-3">
                {credentials.map(c => (
                  <div key={c.title} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors">
                      <span className="text-primary-dark">{c.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">{c.title}</p>
                      <p className="text-[12px] text-dark/45">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="lg:hidden">
              <AnimatePresence>
                {expanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                    <p className="text-dark/55 leading-relaxed mb-5 text-[15px]">
                      Me apasiona sentirme fuerte, vital y en forma, sin vivir atada a la idea de &quot;estar a dieta&quot;.
                      Descubri el mundo de la nutricion como una herramienta poderosa para potenciar el rendimiento, la salud y la felicidad.
                    </p>
                    <p className="text-dark/75 leading-relaxed mb-8 font-semibold text-[15px]">
                      Mi mision: ensenarte a disfrutar de tu alimentacion y entrenamiento sin que se conviertan en un sacrificio.
                    </p>
                    <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-5 mb-8">
                      <p className="text-dark/70 leading-relaxed font-semibold text-base italic">
                        &ldquo;Comer bien no significa renunciar al placer. Significa aprender a disfrutar cuidandote.&rdquo;
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button onClick={() => setExpanded(!expanded)} className="inline-flex items-center gap-2 text-primary-dark text-sm font-bold mb-8 transition-colors hover:text-primary">
                {expanded ? 'Leer menos' : 'Leer mas sobre Ely'}
                <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="hidden lg:block">
              <motion.p variants={fadeUp} className="text-dark/55 leading-relaxed mb-5 text-[15px]">
                Me apasiona sentirme fuerte, vital y en forma, sin vivir atada a la idea de &quot;estar a dieta&quot;.
                Descubri el mundo de la nutricion como una herramienta poderosa para potenciar el rendimiento, la salud y la felicidad.
              </motion.p>
              <motion.p variants={fadeUp} className="text-dark/75 leading-relaxed mb-8 font-semibold text-[15px]">
                Mi mision: ensenarte a disfrutar de tu alimentacion y entrenamiento sin que se conviertan en un sacrificio.
              </motion.p>
              <motion.div variants={fadeUp} className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-5 mb-8">
                <p className="text-dark/70 leading-relaxed font-semibold text-base italic">
                  &ldquo;Comer bien no significa renunciar al placer. Significa aprender a disfrutar cuidandote.&rdquo;
                </p>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/ely_fitness/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-dark hover:bg-dark-soft text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
                <Instagram size={16} /> Instagram
              </a>
              <a href="https://www.youtube.com/@ely_fitness" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
                <Play size={16} /> YouTube
              </a>
              <a href="#contacto" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
                Contactar <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =================== FAQ (V4 - icons, extra question, CTA) =================== */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'Coaching vs APP — cual es para mi?', a: 'Coaching = seguimiento 1:1 conmigo, chat diario, ajustes constantes. Ideal si quieres resultados rapidos y guia personalizada. La APP = plan low cost con entrenos, recetas y comunidad a tu ritmo.', icon: <Target size={16} /> },
    { q: 'Cuando empiezo a ver resultados?', a: 'La mayoria nota cambios en 2-4 semanas: menos hinchazon, mas energia y mejor relacion con la comida. Resultados visibles significativos entre 2-3 meses.', icon: <Clock size={16} /> },
    { q: 'Tengo intolerancias o patologias, me sirve?', a: 'Adapto absolutamente todo: SIBO, SOP, tiroides, embarazo, lactancia, intolerancias. Reviso tus analiticas para personalizar al 100%.', icon: <Shield size={16} /> },
    { q: 'Hay permanencia o compromiso minimo?', a: 'No. El coaching no tiene permanencia — puedes cancelar cuando quieras. La APP es pago unico de 59 euros por todo el ano.', icon: <CheckCircle size={16} /> },
    { q: 'Que incluye la APP de Ely Fitness?', a: 'Entrenamientos grabados en video, recetas nuevas cada mes, seguimiento de tu progreso con fotos, comunidad privada de apoyo y chat directo.', icon: <Download size={16} /> },
    { q: 'Puedo combinar coaching + APP?', a: 'Si, de hecho muchas de mis chicas tienen la APP y luego quieren un extra de personalizacion con el coaching. Son servicios complementarios.', icon: <Sparkles size={16} /> },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.div variants={fadeUp}>
            <SectionLabel>Resolvemos tus dudas</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black uppercase mt-5">Preguntas <span className="text-gradient">frecuentes</span></motion.h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`bg-cream rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? 'shadow-md border-l-4 border-l-primary border-y border-r border-primary/25' : 'border border-dark/8 hover:shadow-sm'}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4">
                <div className="flex items-center gap-3">
                  <span className={`transition-colors duration-300 ${open === i ? 'text-primary' : 'text-dark/25'}`}>{f.icon}</span>
                  <span className="font-bold text-sm sm:text-[15px] text-dark">{f.q}</span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open === i ? 'bg-primary text-white rotate-180' : 'bg-peach-light text-dark/40'}`}>
                  <ChevronDown size={14} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-dark/55 leading-relaxed pl-14">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 text-center">
          <p className="text-dark/40 text-sm mb-3">No encuentras tu pregunta?</p>
          <a href="#contacto" className="inline-flex items-center gap-2 bg-dark hover:bg-dark-soft text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
            <MessageCircle size={14} /> Escribeme directamente
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* =================== CONTACT (V4 - WhatsApp, trust badges) =================== */
function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); };

  return (
    <section id="contacto" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.community} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/82" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <SectionLabel dark>Contacto</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black uppercase mb-3 text-white mt-5">Lista para<br /><span className="text-gradient">tu cambio?</span></motion.h2>
          <motion.p variants={fadeUp} className="text-white/45 mb-4">Elegi tu plan y escribime. Respondo en menos de 24h.</motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-10">
            <a href="mailto:contacta@elyfitness.es" className="inline-flex items-center gap-2 bg-white/10 border border-white/15 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all">
              <Mail size={14} /> Email
            </a>
            <a href="https://www.instagram.com/ely_fitness/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 border border-white/15 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all">
              <Instagram size={14} /> DM Instagram
            </a>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-10 sm:p-14 text-center shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-dark">Mensaje enviado!</h3>
              <p className="text-dark/55 text-sm">Te respondere en menos de 24 horas. Revisa tu email.</p>
              <a href="mailto:contacta@elyfitness.es" className="inline-flex items-center gap-2 mt-6 text-primary-dark text-sm font-bold hover:underline">
                <Send size={14} /> contacta@elyfitness.es
              </a>
            </motion.div>
          ) : (
            <motion.form key="form" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="bg-white rounded-2xl p-7 sm:p-10 space-y-4 text-left shadow-2xl" onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-2 mb-2">
                {['Respuesta < 24h', 'Sin compromiso', '+4K chicas confian'].map(t => (
                  <span key={t} className="inline-flex items-center gap-1 text-[10px] font-bold text-dark/35 bg-cream px-2.5 py-1 rounded-full">
                    <Check size={9} className="text-[#34d399]" /> {t}
                  </span>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.input variants={fadeUp} type="text" placeholder="Tu nombre" required className="bg-cream border border-dark/10 rounded-xl px-5 py-3.5 text-sm text-dark focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 w-full transition-all placeholder:text-dark/35" />
                <motion.input variants={fadeUp} type="email" placeholder="Tu e-mail" required className="bg-cream border border-dark/10 rounded-xl px-5 py-3.5 text-sm text-dark focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 w-full transition-all placeholder:text-dark/35" />
              </div>
              <motion.select variants={fadeUp} className="bg-cream border border-dark/10 rounded-xl px-5 py-3.5 text-sm text-dark/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 w-full transition-all">
                <option>Que plan te interesa?</option>
                <option>Premium Plus</option><option>Premium Running</option><option>Nutricion</option><option>Training</option>
                <option>ElyFitness APP (59&#8364;/ano)</option><option>Pack Duo (69&#8364;/ano)</option><option>Otra consulta</option>
              </motion.select>
              <motion.textarea variants={fadeUp} rows={4} placeholder="Cuentame tu objetivo..." className="bg-cream border border-dark/10 rounded-xl px-5 py-3.5 text-sm text-dark focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 w-full resize-none transition-all placeholder:text-dark/35" />
              <motion.div variants={fadeUp} className="text-center pt-2">
                <button type="submit" className="group bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-bold text-sm uppercase tracking-wide inline-flex items-center gap-2 transition-all shadow-lg shadow-primary/25 hover:shadow-[0_0_20px_rgba(217,163,255,0.3)]">
                  <Send size={14} /> Enviar mensaje <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Instagram', icon: <Instagram size={14} />, url: 'https://www.instagram.com/ely_fitness/' },
              { name: 'TikTok', icon: <Heart size={14} />, url: 'https://www.tiktok.com/@ely_fitness' },
              { name: 'YouTube', icon: <Play size={14} />, url: 'https://www.youtube.com/@ely_fitness' },
            ].map(r => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 bg-white/10 border border-white/15 hover:bg-white/20 hover:border-primary/40 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase transition-all duration-300 text-white/70 hover:text-white">
                <span className="text-primary">{r.icon}</span> {r.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =================== FOOTER (V4 - newsletter, better layout) =================== */
function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleNewsletter = (e) => { e.preventDefault(); setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 4000); };

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 border-b border-white/8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-black mb-1">Unete a la newsletter</h3>
              <p className="text-white/40 text-sm">Consejos de nutricion, entreno y bienestar cada semana.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full sm:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-[#34d399] text-sm font-bold">
                  <CheckCircle size={16} /> Suscrit@!
                </div>
              ) : (
                <>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Tu email" required className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/30 placeholder:text-white/30 w-full sm:w-64" />
                  <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shrink-0">Suscribir</button>
                </>
              )}
            </form>
          </div>
        </div>

        <div className="py-12 grid sm:grid-cols-3 gap-10 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black tracking-tight">ELY</span>
              <span className="text-[8px] font-bold uppercase leading-tight text-primary">FITNESS<br />&amp; NUTRITION</span>
            </div>
            <p className="text-white/45 text-xs leading-relaxed max-w-xs mb-4">Dietista y Entrenadora Personal IFBB. Nutricion deportiva y entrenamiento personalizado online desde hace mas de 13 anos.</p>
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <MapPin size={12} /> <span>Espana - Online worldwide</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-white/50 mb-4 tracking-widest">Secciones</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { href: '#cambios', label: 'Resultados' },
                { href: '#coaching', label: 'Coaching 1 a 1' },
                { href: '#app', label: 'ElyFitness APP' },
                { href: '#sobre-mi', label: 'Sobre mi' },
                { href: '#prozis', label: 'Prozis' },
                { href: '#contacto', label: 'Contacto' },
              ].map(l => (
                <a key={l.href} href={l.href} className="text-white/45 hover:text-white/70 text-xs transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-white/50 mb-4 tracking-widest">Conecta</p>
            <a href="mailto:contacta@elyfitness.es" className="text-white/50 hover:text-white/70 text-xs transition-colors flex items-center gap-2 mb-3">
              <Mail size={12} /> contacta@elyfitness.es
            </a>
            <div className="flex gap-2 mb-5">
              {[
                { label: 'IG', icon: <Instagram size={12} />, url: 'https://www.instagram.com/ely_fitness/' },
                { label: 'TK', icon: <Heart size={12} />, url: 'https://www.tiktok.com/@ely_fitness' },
                { label: 'YT', icon: <Play size={12} />, url: 'https://www.youtube.com/@ely_fitness' },
              ].map(r => (
                <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/8 hover:bg-primary/20 flex items-center justify-center transition-all text-white/55 hover:text-primary">{r.icon}</a>
              ))}
            </div>
            <p className="text-[10px] font-bold uppercase text-white/50 mb-2 tracking-widest">Patrocinador</p>
            <p className="text-white/35 text-xs">Codigo ELY 10% dto &rarr; <a href="https://www.prozis.com/es/es" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark transition-colors">Prozis</a></p>
          </div>
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap justify-center gap-5 text-[10px] text-white/40">
            <a href="#" className="hover:text-white/60 transition-colors">Condiciones</a>
            <a href="#" className="hover:text-white/60 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white/60 transition-colors">Cookies</a>
          </div>
          <p className="text-[10px] text-white/40">&copy; {new Date().getFullYear()} ELY FITNESS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

/* =================== STICKY CTA (V4) =================== */
function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => {
      const contacto = document.getElementById('contacto');
      const pastHero = window.scrollY > 600;
      const beforeContact = contacto ? contacto.getBoundingClientRect().top > 200 : true;
      setShow(pastHero && beforeContact);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-6 left-0 right-0 z-30 flex justify-center px-4">
          <a href="#coaching" className="sm:hidden flex items-center justify-center gap-2 w-full bg-primary text-white py-3.5 rounded-2xl font-bold uppercase text-sm shadow-xl shadow-primary/30">
            Ver planes desde 59&#8364;/ano <ArrowRight size={14} />
          </a>
          <a href="#coaching" className="hidden sm:inline-flex items-center gap-3 bg-dark/95 backdrop-blur-md text-white px-8 py-3.5 rounded-full font-bold uppercase text-sm shadow-xl border border-white/10 hover:border-primary/30 transition-all">
            <span className="text-white/60">Planes desde</span> <span className="text-primary font-black">59&#8364;/ano</span> <ArrowRight size={14} className="text-primary" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =================== NEWSLETTER MODAL (V4) =================== */
function NewsletterModal() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const close = () => { setShow(false); setDismissed(true); };
  const handleSubscribe = (e) => { e.preventDefault(); setSubscribed(true); setTimeout(close, 3000); };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-50" onClick={close} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-cream rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full grid sm:grid-cols-2 pointer-events-auto relative">
              <button onClick={close} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-peach-light transition-colors"><X size={16} /></button>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div key="thanks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <Check size={28} className="text-green-500" />
                      </div>
                      <h3 className="text-xl font-black mb-2 text-dark">Bienvenid@!</h3>
                      <p className="text-sm text-dark/45">Revisa tu email para confirmar la suscripcion.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles size={14} className="text-primary" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-dark">Exclusivo</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-4 text-dark">
                        Recupera tu energia, salud y bienestar
                      </h3>
                      <p className="text-sm text-dark/45 mb-6 leading-relaxed">
                        Apuntate a mi newsletter y recibe consejos reales y practicos sobre alimentacion, entrenamiento y autocuidado.
                      </p>
                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <input type="text" placeholder="Tu nombre" required className="w-full bg-white border border-dark/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/30 placeholder:text-dark/35" />
                        <input type="email" placeholder="Tu email" required className="w-full bg-white border border-dark/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/30 placeholder:text-dark/35" />
                        <button type="submit" className="w-full bg-dark hover:bg-dark-soft text-white py-3.5 rounded-xl font-bold text-sm uppercase transition-all flex items-center justify-center gap-2">
                          <Send size={13} /> SUSCRIBIRME
                        </button>
                      </form>
                      <p className="text-[10px] text-dark/20 mt-4 flex items-start gap-1.5">
                        <Shield size={10} className="text-primary shrink-0 mt-0.5" />
                        Sin spam. Puedes darte de baja cuando quieras.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="hidden sm:block relative">
                <img src={ELY_MODAL} alt="Ely Fitness" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* =================== PROZIS (V4 - copy code button) =================== */
const PROZIS_PRODUCTS = [
  { name: 'Creatina Micropure', desc: 'Para rendir mas, recuperarte mejor y tener mas foco cognitivo.', img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1698746_prozis_creatine-micronpure-300g_newin.webp', url: 'https://www.prozis.com/es/es/prozis/creatina-micronpure-300-g/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af&utm_content=product' },
  { name: 'Colageno Hidrolizado', desc: 'PeptiPlus 900g. Para articulaciones, piel y recuperacion muscular.', img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1708709_prozis_peptiplus-hydrolyzed-collagen-protein-900g_newin.webp', url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
  { name: 'Ely x Prozis', desc: 'Mi seleccion de suplementacion, snacks saludables y ropa deportiva favorita.', img: 'https://static.wixstatic.com/media/daf224_4c28ae1a03584cb6aea95c0817480351~mv2.png/v1/fill/w_358,h_478,q_90,enc_avif,quality_auto/daf224_4c28ae1a03584cb6aea95c0817480351~mv2.png', url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
  { name: 'Duffle Backpack 35L', desc: 'Mochila deportiva Core Workout. Ideal para llevar todo al gym.', img: 'https://static.sscontent.com/thumb/500/500/products/124/v1499995_prozis_core-workout-duffle-backpack-35l-black_single-size_black_other2.webp', url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
  { name: 'Guantes Minimalist', desc: 'Guantes acolchados para entrenamiento. Agarre y proteccion.', img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1498172_prozis_minimalist-padded-gloves-black_s_black_newin.webp', url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
  { name: 'Suplementacion Top', desc: 'Omega 3, magnesio, vitaminas y mas. Todo lo que uso a diario.', img: IMG.lifestyle1, url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
];

function ProzisCarousel() {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const checkScroll = () => { const el = scrollRef.current; if (!el) return; setCanLeft(el.scrollLeft > 10); setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10); };
  const scroll = (dir) => { const el = scrollRef.current; if (!el) return; el.scrollBy({ left: dir * 216, behavior: 'smooth' }); };
  useEffect(() => { const el = scrollRef.current; if (!el) return; checkScroll(); el.addEventListener('scroll', checkScroll, { passive: true }); window.addEventListener('resize', checkScroll); return () => { el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); }; }, []);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Suplementacion, ropa y accesorios</p>
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={() => scroll(-1)} disabled={!canLeft} className="w-9 h-9 rounded-full border border-dark/10 flex items-center justify-center hover:bg-dark hover:text-white disabled:opacity-20 transition-all"><ChevronLeft size={16} /></button>
          <button onClick={() => scroll(1)} disabled={!canRight} className="w-9 h-9 rounded-full border border-dark/10 flex items-center justify-center hover:bg-dark hover:text-white disabled:opacity-20 transition-all"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div ref={scrollRef} className="hidden sm:flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {PROZIS_PRODUCTS.map(p => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-2xl border border-dark/8 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shrink-0 w-[200px]">
            <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">-10%</div>
            </div>
            <div className="p-3">
              <h4 className="font-black text-sm text-dark mb-0.5 truncate">{p.name}</h4>
              <p className="text-[11px] text-dark/45 leading-relaxed line-clamp-2">{p.desc}</p>
              <span className="inline-flex items-center gap-1 text-primary-dark text-[10px] font-bold mt-2 group-hover:gap-1.5 transition-all">Ver producto <ExternalLink size={9} /></span>
            </div>
          </a>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {PROZIS_PRODUCTS.map(p => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-xl border border-dark/8 overflow-hidden active:scale-[0.98] transition-transform">
            <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-contain p-3" />
              <div className="absolute top-1.5 right-1.5 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">-10%</div>
            </div>
            <div className="p-2.5">
              <h4 className="font-bold text-xs text-dark mb-0.5 truncate">{p.name}</h4>
              <p className="text-[10px] text-dark/45 leading-snug line-clamp-2">{p.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function Prozis() {
  const [copied, setCopied] = useState(false);
  const copyCode = () => { navigator.clipboard.writeText('ELY').then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };

  return (
    <section id="prozis" className="py-12 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8">
          <div className="relative bg-dark rounded-2xl p-6 sm:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <SectionLabel dark><Sparkles size={10} /> Patrocinador oficial</SectionLabel>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-3">
                  <span className="text-gradient">10% dto</span> en Prozis
                </h2>
                <p className="text-white/45 text-sm mt-1">Suplementos, ropa y accesorios fitness con mi codigo exclusivo</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={copyCode} className={`bg-white/10 border-2 border-dashed border-primary/50 rounded-xl px-6 py-3 text-center hover:bg-white/15 transition-all group ${copied ? 'copy-pop' : ''}`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Codigo</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-black text-primary tracking-wider">ELY</p>
                    {copied ? <CheckCircle size={16} className="text-[#34d399]" /> : <Copy size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />}
                  </div>
                  <p className="text-[9px] text-white/25 mt-1">{copied ? 'Copiado!' : 'Click para copiar'}</p>
                </button>
                <a href="https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all group">
                  Ir a Prozis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        <ProzisCarousel />
      </div>
    </section>
  );
}

/* =================== CHAT WIDGET (V4 - typing dots, notification) =================== */
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const options = [
    { label: 'Quiero un cambio real', href: '#contacto', icon: <Sparkles size={12} /> },
    { label: 'Coaching Personalizado', href: '#coaching', icon: <Crown size={12} /> },
    { label: 'ElyFitness APP', href: '#app', icon: <Download size={12} /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-dark/10 overflow-hidden mb-2">
            <div className="bg-dark p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-black text-primary">E</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Hola! En que te puedo ayudar?</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                    <p className="text-white/40 text-[10px]">Online ahora</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pt-3 pb-1">
              <div className="inline-flex items-center gap-1 bg-cream rounded-full px-3 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-dark/30 typing-dot" />
                <div className="w-1.5 h-1.5 rounded-full bg-dark/30 typing-dot" />
                <div className="w-1.5 h-1.5 rounded-full bg-dark/30 typing-dot" />
              </div>
            </div>
            <div className="p-3 space-y-1.5">
              {options.map(o => (
                <a key={o.label} href={o.href} target={o.external ? '_blank' : undefined} rel={o.external ? 'noopener noreferrer' : undefined} onClick={() => { setOpen(false); setHasNotif(false); }} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cream hover:bg-primary/10 transition-colors group">
                  <span className="text-primary shrink-0">{o.icon}</span>
                  <span className="text-sm font-medium text-dark/70 group-hover:text-dark">{o.label}</span>
                  <ArrowRight size={10} className="text-dark/20 ml-auto group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => { setOpen(!open); setHasNotif(false); }} className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${open ? 'bg-dark text-white' : 'bg-primary text-white hover:bg-primary-dark shadow-primary/30'}`}>
        {open ? <X size={20} /> : <MessageCircle size={22} />}
        {!open && hasNotif && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#34d399] flex items-center justify-center badge-pulse">
            <span className="text-[8px] font-bold text-white">1</span>
          </span>
        )}
      </button>
    </div>
  );
}

/* =================== PAGE (V4) =================== */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <SocialProof />
      <TrustStrip />
      <WaveDivider from="#D9A3FF" to="#FCF3EF" />
      <Transformations />
      <PhotoBanner />
      <WaveDivider from="#323130" to="#FCF3EF" />
      <CoachingPersonalizado />
      <WaveDivider from="#FCF3EF" to="#323130" />
      <ElyFitnessApp />
      <WaveDivider from="#323130" to="#FCF3EF" />
      <About />
      <Manifesto />
      <Prozis />
      <WaveDivider from="#FCF3EF" to="#ffffff" />
      <FAQ />
      <WaveDivider from="#ffffff" to="#323130" />
      <Contact />
      <Footer />
      <StickyCTA />
      <ChatWidget />
      <NewsletterModal />
    </>
  );
}
