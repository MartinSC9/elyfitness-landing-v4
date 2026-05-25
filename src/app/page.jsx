import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X, Menu, ArrowRight, ChevronDown, ChevronLeft, ChevronRight,
  MessageCircle, Star, Check, Send, Copy, ExternalLink,
  Instagram, Heart, Sparkles, TrendingUp, Users, Download, Crown, Dumbbell, Apple,
  Shield, Award, Play, Mail, MapPin, Utensils, Video, CalendarCheck,
  Clipboard, CheckCircle, Target, Flame, Zap, Clock, Lock, Gift,
} from 'lucide-react';
import NumberTicker from '@/components/NumberTicker';
import MagneticButton from '@/components/MagneticButton';
import FlipWords from '@/components/FlipWords';

/* --- MEDIA --- */
const ELY_VIDEO = 'https://video.wixstatic.com/video/4cd4b0_9626817c7320447ea40f07a27ebc5934/720p/mp4/file.mp4';
const APP_VIDEO = 'https://video.wixstatic.com/video/4cd4b0_d9ff65c4b76343a6988372fccb6cc847/720p/mp4/file.mp4';
const HERO_VIDEO_DESKTOP = '/hero-bg-1.mp4';
const ELY_MODAL = 'https://static.wixstatic.com/media/4cd4b0_a7d6132da9c84d41a3bed4a1d5f77922~mv2.webp/v1/fill/w_800,h_1020,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/ELYFITNESS_MINIATURA_CAMPUS%20POWER%202025.webp';

const WIX_API_BASE = '';
async function submitToWix(endpoint, data) {
  if (!WIX_API_BASE) {
    console.log('[WIX] Not configured yet. Data:', data);
    return { ok: false, reason: 'api_not_configured' };
  }
  try {
    const res = await fetch(`${WIX_API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false, reason: 'network_error' };
  }
}

const IMG = {
  food2: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=85',
  gym1: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=85',
  gym2: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1400&q=85',
  gym3: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1400&q=85',
  running: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1400&q=85',
  lifestyle1: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&q=85',
  community: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=85',
};

/* --- ANIMATIONS --- */
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const scaleUp = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } };

/* ============================== WAVE DIVIDER ============================== */
function WaveDivider({ from = '#FCF3EF', to = '#ffffff' }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 60, backgroundColor: from, marginTop: -1 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: 60 }}>
        <path d="M0 25C240 50 480 55 720 40C960 25 1200 10 1440 20V60H0Z" fill={to} />
      </svg>
    </div>
  );
}

/* ============================== NAVBAR ============================== */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { href: '#plan-ultra', label: 'SERVICIOS' },
    { href: '#resultados', label: 'RESULTADOS' },
    { href: '#sobre-mi', label: 'SOBRE MI' },
    { href: '#prozis', label: 'PROZIS', badge: '-10%' },
    { href: '#contacto', label: 'CONTACTO' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled || open ? 'bg-[#FCF3EF]/92 sticky-blur border-b border-dark/8 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <a href="#" className="flex items-center">
          <svg className={`h-12 sm:h-14 w-auto transition-all ${scrolled || open ? '[&_path]:fill-[#1d1d1b]' : '[&_path]:fill-white'}`} preserveAspectRatio="xMidYMid meet" viewBox="58.667 144.7 383.471 210.7" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M58.667 312.597v-123h49.3v23.8h-24.2v23.9h23.2v23.2h-23.2v28.2h25.8v23.9h-50.9z" />
              <path d="M117.666 312.597v-123h49.3v23.9h-24.6v19.6h23.2v23.7h-23.2v56h-24.8v-.2z" />
              <path d="M106.8 144.7v24.9h-1.1v-24.9h1.1z" />
              <path d="M194.3 215.9c.4-1.8-.1-3.4-2.5-3.6-1-.1-1.9.2-2.8.4-1.8.4-3.4 1.3-4.7 2.6-.6.4-1 .9-1.7 1.4-.1-.3-.1-.4-.2-.6-.3-1.5-1-3-2.1-4.2-.4-.6-1-1-1.7-1.5-.2-.2-.7-.2-.9-.2-1 .3-1.8.9-2.1 1.9-.2.7-.4 1.4-.4 2.1-.1 3.1.1 6.1 1.5 8.9.7 1.2 1.2 2.4 1.8 3.6s1.2 2.3 2.1 3.4c.8 1 1.4 1.1 2.3.2.9-.8 1.7-1.7 2.5-2.5 2-2 3.6-4.1 5.3-6.4.9-1.2 1.7-2.5 2.5-3.7.5-.6 1-1.1 1.1-1.8z" />
              <path d="M227.258 269.115v1.8h-13.3v-19.8h13.1v1.6h-11.1v7.2h9.7v1.6h-9.7v7.5h11.3z" />
              <path d="M250.826 270.915v-19.8h2v18h11.5v1.8h-13.5z" />
              <path d="m287.063 251.115 6.4 10.6 6.6-10.6h2.1l-7.7 12.4v7.4h-2v-7.4l-7.7-12.3h2.3v-.1z" />
              <path d="M214.021 313.415v-19.8h12.9v1.6h-11v7.2h9.3v1.6h-9.3v9.2h-2v.2z" />
              <path d="M250.234 313.415v-19.8h2v19.8h-2z" />
              <path d="M290.9 295.415h-7v18h-2v-18h-7v-1.6H291v1.6z" />
              <path d="M315.78 297.415v16.2h-2v-20h1.5l13.1 16.4v-16.4h2v19.8h-1.6l-13-16z" />
              <path d="M368.427 311.615v1.8h-13.3v-19.8h13.1v1.6h-11.1v7.2h9.7v1.6h-9.7v7.5h11.3z" />
              <path d="M403.596 297.415c-.5-.7-1.3-1.1-2.3-1.5-1-.3-2-.7-3.1-.7-1.8 0-2.9.3-3.8 1-.8.7-1.1 1.6-1.1 2.6 0 .7.2 1.1.3 1.5.2.3.5.7 1 1 .5.3 1 .5 1.6.7.7.2 1.5.3 2.5.7 1 .2 2 .5 2.8.8s1.6.7 2.1 1c.7.3 1 1 1.3 1.5.3.7.5 1.3.5 2.3 0 1-.2 1.6-.5 2.5-.3.7-.8 1.1-1.5 1.6s-1.5.8-2.3 1c-.8.2-1.8.3-2.8.3-3.1 0-5.7-1-8-2.9l1-1.6c.3.3.8.8 1.3 1.1s1 .7 1.6.8c.7.3 1.3.5 2 .7.7.2 1.5.2 2.1.2 1.6 0 2.8-.3 3.6-.8.8-.5 1.3-1.5 1.3-2.6 0-.7-.2-1.1-.3-1.5-.3-.5-.7-.8-1.1-1.1-.5-.3-1.1-.7-1.8-.8-.7-.2-1.6-.5-2.6-.7-1-.3-2-.5-2.8-.8-.8-.3-1.5-.5-2-1-.5-.3-1-.8-1.1-1.5-.3-.5-.3-1.1-.3-2 0-1 .2-1.6.5-2.5.3-.7.8-1.3 1.5-1.8s1.3-.8 2.3-1.1c.8-.3 1.8-.3 2.9-.3 1.3 0 2.5.2 3.4.7 1 .3 2 1 2.8 1.6l-1 1.6z" />
              <path d="M440.338 297.415c-.5-.7-1.3-1.1-2.3-1.5-1-.3-2-.7-3.1-.7-1.8 0-2.9.3-3.8 1-.8.7-1.1 1.6-1.1 2.6 0 .7.2 1.1.3 1.5.2.3.5.7 1 1 .5.3 1 .5 1.6.7.7.2 1.5.3 2.5.7 1 .2 2 .5 2.8.8s1.6.7 2.1 1c.7.3 1 1 1.3 1.5.3.7.5 1.3.5 2.3 0 1-.2 1.6-.5 2.5-.3.7-.8 1.1-1.5 1.6s-1.5.8-2.3 1c-.8.2-1.8.3-2.8.3-3.1 0-5.7-1-8-2.9l1-1.6c.3.3.8.8 1.3 1.1s1 .7 1.6.8c.7.3 1.3.5 2 .7.7.2 1.5.2 2.1.2 1.6 0 2.8-.3 3.6-.8.8-.5 1.3-1.5 1.3-2.6 0-.7-.2-1.1-.3-1.5-.3-.5-.7-.8-1.1-1.1-.5-.3-1.1-.7-1.8-.8-.7-.2-1.6-.5-2.6-.7-1-.3-2-.5-2.8-.8-.8-.3-1.5-.5-2-1-.5-.3-1-.8-1.1-1.5-.3-.5-.3-1.1-.3-2 0-1 .2-1.6.5-2.5.3-.7.8-1.3 1.5-1.8s1.3-.8 2.3-1.1c.8-.3 1.8-.3 2.9-.3 1.3 0 2.5.2 3.4.7 1 .3 2 1 2.8 1.6l-1 1.6z" />
              <path d="M106.8 330.5v24.9h-1.1v-24.9h1.1z" />
            </g>
          </svg>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all ${scrolled ? 'text-dark/55 hover:text-dark hover:bg-dark/5' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              {l.label}
              {l.badge && <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none shadow-sm">{l.badge}</span>}
            </a>
          ))}
          <a href="#plan-ultra" className="shine-sweep ml-2 inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all shadow-sm shadow-primary/20">
            Empezar ahora <ArrowRight size={11} />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className={`md:hidden p-1 transition-colors ${scrolled || open ? 'text-dark' : 'text-white'}`}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden bg-cream/98 sticky-blur border-t border-dark/8 px-6 pb-5 overflow-hidden">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); setOpen(false); const el = document.querySelector(l.href); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100); }} className="relative inline-flex items-center gap-2 font-bold text-sm uppercase py-3 border-b border-dark/8 last:border-0 text-dark/70 w-full">{l.label}{l.badge && <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">{l.badge}</span>}</a>
            ))}
            <a href="#plan-ultra" onClick={(e) => { e.preventDefault(); setOpen(false); const el = document.querySelector('#plan-ultra'); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100); }} className="mt-3 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold text-sm uppercase">
              Empieza tu cambio <ArrowRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ============================== HERO — Full impact ============================== */
function Hero() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = ELY_VIDEO;
    video.addEventListener('canplay', () => setVideoLoaded(true), { once: true });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-dark">
        <video ref={videoRef} autoPlay muted loop playsInline className={`w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/60 to-dark/80" />

      <div className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Trust badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 text-xs font-bold text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                +4.000 personas ya cambiaron su vida
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-black text-white uppercase leading-[0.88] mb-5">
              Deja de pensar<br />
              <span className="text-gradient">empieza hoy.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/50 text-base sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              2 opciones, 1 objetivo: <span className="text-white/80 font-semibold">tu mejor version.</span> Coaching 1:1 con Ely o APP de entrenamiento. Elige lo que va contigo.
            </motion.p>

            {/* Dual CTA */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
              <MagneticButton href="#plan-ultra" className="shine-sweep group inline-flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-4.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-[1.02]">
                <Crown size={16} /> COACHING 1:1 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton href="#app" className="group inline-flex items-center justify-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white px-8 py-4.5 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white/25 transition-all">
                <Download size={16} /> APP DESDE 4,92&#8364;/MES <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex justify-center gap-12 sm:gap-16">
              {[
                { v: 13, s: '+', l: 'Anos exp.' },
                { v: 4, s: 'K+', l: 'Cambios' },
                { v: 400, s: 'K+', l: 'Seguidores' },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-white"><NumberTicker value={s.v} suffix={s.s} /></div>
                  <div className="text-white/25 text-[9px] font-semibold uppercase tracking-widest mt-0.5">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown size={20} className="text-white/25" />
      </motion.div>
    </section>
  );
}

/* ============================== SOCIAL PROOF BAR ============================== */
function SocialProofBar() {
  return (
    <div className="bg-dark py-3 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[10px] sm:text-xs text-white/40">
        {[
          { icon: <Shield size={12} />, t: 'Sin permanencia' },
          { icon: <CheckCircle size={12} />, t: 'Resultados desde 2 semanas' },
          { icon: <Star size={12} className="fill-yellow-400 text-yellow-400" />, t: '4.9/5 valoracion media' },
          { icon: <Users size={12} />, t: '+4.000 clientes satisfechos' },
          { icon: <Lock size={12} />, t: 'Pago seguro' },
        ].map(b => (
          <span key={b.t} className="inline-flex items-center gap-1.5 font-medium">{b.icon} {b.t}</span>
        ))}
      </div>
    </div>
  );
}

/* ============================== PLAN CARD BODIES (collapsible) ============================== */
function CoachingCardBody() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6 sm:p-8 flex flex-col flex-1">
      <p className="text-dark/70 text-sm leading-relaxed mb-4">
        Ely diseña tu plan de nutricion y entrenamiento 100% a tu medida. Chat diario, revisiones quincenales, ajustes constantes. Tu entrenadora personal contigo cada dia.
      </p>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {[
          { name: 'Premium Plus', desc: 'Dieta + entreno + suplementacion', hot: true },
          { name: 'Premium Running', desc: 'De 5K a ultramaratones' },
          { name: 'Nutricion', desc: 'Tu dieta 100% a medida' },
          { name: 'Training', desc: 'Fuerza, hibrido o casa' },
        ].map(p => (
          <div key={p.name} className={`rounded-xl p-3.5 border transition-all ${p.hot ? 'bg-primary/8 border-primary/20' : 'bg-cream border-dark/8 hover:border-primary/15'}`}>
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`text-sm font-black ${p.hot ? 'text-primary-dark' : 'text-dark/75'}`}>{p.name}</span>
              {p.hot && <Flame size={10} className="text-primary" />}
            </div>
            <p className="text-xs text-dark/55 leading-snug">{p.desc}</p>
          </div>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-2 mb-4">
              {[
                'Alimentacion 100% personalizada (vegana, vegetariana, antiinflamatoria, intolerancias)',
                'Gestion metabolica: glucosa, resistencia a insulina, SOP, tiroides, SIBO',
                'Revision de analiticas y ajustes de tu plan acorde a resultados',
                'Calculo de macros personalizado',
                'Plan de entrenamiento a medida (gym o casa) + prevencion de lesiones',
                'Tu plan de entreno en video. Apunta tus pesos y marcas',
                'Asesoramiento en suplementacion para tu caso',
                'Seguimiento quincenal con Ely',
                'Chat y maxima cercania conmigo via APP',
                'Running: de 5K a ultramaratones (Metodo Hibrido)',
              ].map(t => (
                <div key={t} className="flex items-start gap-2">
                  <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-dark/60 leading-snug">{t}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-dark/40 italic mb-4">Modalidades: mensual, trimestral o semestral. Tu eliges.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setOpen(!open)} className="flex items-center justify-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors mb-4">
        {open ? 'Ocultar detalles' : 'Ver detalles'}
        <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className="space-y-3 mt-auto">
        <a href="https://calendar.app.google/LINK-VIDEOLLAMADA" target="_blank" rel="noopener noreferrer" className="shine-sweep w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.01]">
          <CalendarCheck size={16} /> VIDEOLLAMADA GRATUITA <ArrowRight size={14} />
        </a>
        <p className="text-center text-[10px] text-dark/30 flex items-center justify-center gap-1.5">
          <Clock size={10} /> 15 min, sin compromiso, te cuento todo
        </p>
      </div>
    </div>
  );
}

function AppCardBody() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6 sm:p-8 flex flex-col flex-1">
      <p className="text-white/70 text-sm leading-relaxed mb-4">
        Entrenos en video, recetas saludables, lista de la compra, comunidad privada y chat con nutricionista. Todo en una app. Pago unico anual, sin sorpresas.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/8 border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/35 mb-1">1 persona</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-white">59&#8364;</span>
            <span className="text-sm text-white/30 font-semibold">/ano</span>
          </div>
          <p className="text-[10px] text-white/25 mt-0.5">4,92&#8364;/mes</p>
        </div>
        <div className="bg-primary/15 border-2 border-primary/30 rounded-2xl p-4 text-center relative pulse-glow">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase">Mejor precio</span>
          <p className="text-[9px] font-bold uppercase tracking-widest text-primary mb-1">Pack Duo</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-white">69&#8364;</span>
            <span className="text-sm text-white/30 font-semibold">/ano</span>
          </div>
          <p className="text-[10px] text-white/40 mt-0.5">2 personas &middot; solo 10&#8364; mas</p>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Nutricion adaptada</p>
              <div className="space-y-1.5 mb-4">
                {[
                  'Plan alimentacion personalizado',
                  'Buscador y recetas nuevas cada mes',
                  'Chat directo con la nutri y soporte',
                  'Lista de la compra',
                ].map(t => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/50 leading-snug">{t}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Metodo Hibrido en video</p>
              <div className="space-y-1.5 mb-4">
                {[
                  'Entrenamiento en video para gym y casa',
                  'Clases dirigidas: cardio, hipopresivos, estiramientos, movilidad, abdomen',
                  'Alternativas de ejercicios',
                ].map(t => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/50 leading-snug">{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2">
                <Users size={12} className="text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-white/50 leading-snug">Comunidad privada donde nos apoyamos dia a dia</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setOpen(!open)} className="flex items-center justify-center gap-1.5 text-xs font-bold text-white/40 hover:text-white/60 transition-colors mb-4">
        {open ? 'Ocultar detalles' : 'Ver detalles'}
        <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className="space-y-3 mt-auto">
        <a href="https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT" target="_blank" rel="noopener noreferrer" className="shine-sweep w-full flex items-center justify-center gap-2.5 bg-white text-dark py-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all hover:bg-cream hover:shadow-lg hover:scale-[1.01] group">
          RESERVA TU PLAZA <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <div className="flex items-center justify-center gap-4 text-[10px] text-white/25">
          <span className="flex items-center gap-1"><Apple size={10} /> iOS</span>
          <span className="flex items-center gap-1"><Dumbbell size={10} /> Android</span>
          <span className="flex items-center gap-1"><Lock size={10} /> Pago seguro</span>
        </div>
      </div>
    </div>
  );
}

/* ============================== CHOOSE YOUR PATH ============================== */
function ChooseYourPath() {
  return (
    <section id="plan-ultra" className="py-16 sm:py-24 scroll-mt-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/choose-path-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-cream/85" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/15 rounded-full px-4 py-1.5 mb-5">
            <Sparkles size={12} className="text-primary-dark" />
            <span className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">2 caminos, 1 objetivo</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black uppercase leading-tight">
            Elige tu <span className="text-gradient">plan ideal</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-dark/40 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            No importa donde estes: hay un plan perfecto para ti.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {/* COACHING CARD */}
          <motion.div id="coaching" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleUp} className="flex">
            <div className="card-lift relative bg-white rounded-3xl border-2 border-primary/25 overflow-hidden shadow-lg group flex flex-col w-full">
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 bg-primary text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg shadow-primary/30 badge-pulse">
                  <Crown size={10} /> Mas resultados
                </span>
              </div>

              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img src="/coaching-bg.jpg" alt="Coaching" className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown size={14} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Premium</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Coaching 1:1</h3>
                  <p className="text-white/50 text-xs">con Ely, personalizado para ti</p>
                </div>
              </div>

              <CoachingCardBody />
            </div>
          </motion.div>

          {/* APP CARD */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleUp} className="flex">
            <div id="plan-anual" className="card-lift relative bg-dark rounded-3xl overflow-hidden shadow-lg group border-2 border-white/10 scroll-mt-16 flex flex-col w-full">
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 bg-white text-dark text-[9px] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg">
                  <Zap size={10} className="text-primary" /> Solo 4,92&#8364;/mes
                </span>
              </div>

              <div className="relative h-48 sm:h-56 overflow-hidden bg-dark">
                <img src="/app-banner.webp" alt="APP" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="absolute bottom-3 right-5 w-24 sm:w-28 bg-gradient-to-b from-white/12 to-white/5 backdrop-blur-sm rounded-[1.2rem] p-1.5 shadow-2xl border border-white/12 hidden sm:block">
                  <div className="rounded-[0.9rem] aspect-[9/16] overflow-hidden bg-[#1a1a1a]">
                    <video src={APP_VIDEO} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  </div>
                </motion.div>

                <div className="absolute bottom-4 left-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Download size={14} className="text-white/50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">App Fitness</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">ElyFitness APP</h3>
                  <p className="text-white/40 text-xs">Entrena a tu ritmo, donde quieras</p>
                </div>
              </div>

              <AppCardBody />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================== COMPARISON ============================== */
function QuickComparison() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.12, 1.02]);

  const rows = [
    { label: 'Personalizacion', coaching: '100% a tu medida', app: 'Rutinas + recetas profesionales' },
    { label: 'Seguimiento', coaching: 'Chat diario + revision quincenal', app: 'Comunidad + app' },
    { label: 'Incluye', coaching: 'Nutricion + entreno + suplementacion', app: 'Entrenos + recetas + comunidad' },
    { label: 'Ideal para', coaching: 'Resultados rapidos, maximo apoyo', app: 'Autonomia, presupuesto flexible' },
    { label: 'Precio', coaching: 'Consulta gratis, sin compromiso', app: '59 EUR/ano · Pack Duo 69 EUR/ano' },
  ];

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative">
          <motion.img src="/comparison-training.jpg" alt="" className="w-full h-full object-cover origin-center" style={{ scale: bgScale }} />
        </div>
        <div className="w-1/2 h-full relative">
          <motion.img src="/comparison-bg.webp" alt="" className="w-full h-full object-cover origin-center" style={{ scale: bgScale }} />
        </div>
        <div className="absolute inset-0 bg-white/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-8">
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-black uppercase">Coaching vs APP <span className="text-gradient">de un vistazo</span></motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/95 backdrop-blur-md rounded-2xl border border-primary/15 overflow-hidden shadow-lg">
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-primary/20">
            <div className="px-4 py-2.5 sm:px-5 sm:py-3" />
            <div className="px-4 py-2.5 sm:px-5 sm:py-3 text-center border-l border-primary/12 bg-primary/10">
              <div className="inline-flex items-center gap-2">
                <Crown size={14} className="text-primary-dark" />
                <span className="text-sm font-black uppercase text-primary-dark">Coaching</span>
              </div>
            </div>
            <div className="px-4 py-2.5 sm:px-5 sm:py-3 text-center border-l border-primary/12 bg-primary/5">
              <div className="inline-flex items-center gap-2">
                <Download size={14} className="text-dark/70" />
                <span className="text-sm font-black uppercase text-dark/80">APP</span>
              </div>
            </div>
          </div>

          {rows.map((r, i) => (
            <div key={r.label} className={`grid grid-cols-[1fr_1fr_1fr] ${i < rows.length - 1 ? 'border-b border-primary/10' : ''}`}>
              <div className="px-4 py-2.5 sm:px-5 sm:py-3 flex items-center">
                <span className="text-xs sm:text-sm font-bold text-dark/70 uppercase tracking-wide">{r.label}</span>
              </div>
              <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-l border-primary/10 bg-primary/[0.05]">
                <span className="text-xs sm:text-sm text-dark/75 leading-snug">{r.coaching}</span>
              </div>
              <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-l border-primary/10">
                <span className="text-xs sm:text-sm text-dark/75 leading-snug">{r.app}</span>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-[1fr_1fr_1fr] border-t border-primary/20 bg-primary/5">
            <div className="px-2 py-2.5 sm:px-5 sm:py-3 flex items-center">
              <span className="text-[10px] sm:text-xs font-bold text-dark/60 uppercase">Empezar</span>
            </div>
            <div className="px-1.5 py-2.5 sm:px-5 sm:py-3 border-l border-primary/12 text-center">
              <a href="https://calendar.app.google/LINK-VIDEOLLAMADA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 sm:gap-1.5 bg-primary hover:bg-primary-dark text-white px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-bold uppercase transition-all">
                <CalendarCheck size={11} className="shrink-0" /> <span className="hidden xs:inline">Videollamada</span><span className="xs:hidden">Llamada</span>
              </a>
            </div>
            <div className="px-1.5 py-2.5 sm:px-5 sm:py-3 border-l border-primary/12 text-center">
              <a href="https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 sm:gap-1.5 bg-dark hover:bg-dark-soft text-white px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-bold uppercase transition-all">
                59&#8364;/ano <ArrowRight size={11} className="shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center text-sm text-dark/50 mt-5 flex items-center justify-center gap-1.5">
          <MessageCircle size={14} className="text-primary" />
          ¿No sabes cual elegir? <a href="#contacto" className="text-primary-dark font-bold hover:underline">Pregunta sin compromiso</a>
        </motion.p>
      </div>
    </section>
  );
}

/* ============================== WHY IT WORKS ============================== */

/* ============================== TRANSFORMATIONS ============================== */
function Transformations() {
  const [filter, setFilter] = useState('todos');
  const coaching = [
    { name: 'C.B.', result: '-20 kg', text: 'He perdido mas de 20 kg de forma saludable. No paso hambre y he vuelto a mirarme al espejo con orgullo.', img: '/cambios/carla.png', plan: 'coaching' },
    { name: 'V.M.', result: 'Recomposicion', text: 'Baje muchisimo volumen en abdomen y piernas, y hoy me siento fuerte, segura y feliz.', img: '/cambios/vane-m.png', plan: 'coaching' },
    { name: 'M.M.', result: 'Sin medicacion', text: 'Hoy vivo sin medicacion, con mas salud y autoestima. He bajado de peso mejorando masa muscular.', img: '/cambios/monica.png', plan: 'coaching' },
    { name: 'T.H.', result: '-4.5 kg / 4 sem', text: 'He recuperado la menstruacion. He aprendido a comer y a disfrutar sin culpa.', img: '/cambios/tami.png', plan: 'coaching' },
    { name: 'S.B.', result: 'Hibrido', text: 'Combinar fuerza y resistencia me ha dado un cuerpo mas eficiente y una mente mas fuerte.', img: '/cambios/sandra-buitra.png', plan: 'coaching' },
    { name: 'R.R.', result: 'Recomposicion', text: 'He logrado un fisico que me gusta y que puedo mantener sin esfuerzo. Mis compañeros me lo dicen constantemente.', img: '/cambios/rafa-ruiz.png', plan: 'coaching' },
    { name: 'A.C.', result: 'Confianza', text: 'Me miro al espejo y por fin me reconozco: fuerte, segura y llena de energia.', img: '/cambios/andrea-caijao.png', plan: 'coaching' },
  ];
  const app = [
    { name: 'K.G.', result: 'Campus + App', text: 'Combinar el Campus con la App ha sido espectacular. Hoy entreno mejor, como mejor y entiendo lo que hago.', img: '/cambios/kat-campus.png', plan: 'app' },
    { name: 'A.P.', result: 'Habitos', text: 'Pase de ir a trompicones a tener un metodo claro. Ahora tengo herramientas reales para vivir mejor.', img: '/cambios/ap.png', plan: 'app' },
    { name: 'E.G.', result: 'Adherencia', text: 'Nunca habia seguido un plan con tanta adherencia. La app es intuitiva y las recetas son un 10.', img: '/cambios/elena-gasto.png', plan: 'app' },
    { name: 'C.H.', result: 'Pack Duo', text: 'Nos apuntamos al Pack Duo y fue un antes y un despues. Variedad de entrenos y recetas riquísimas.', img: '/cambios/carlos-hdz.png', plan: 'app' },
    { name: 'L.J.', result: 'Comunidad', text: 'No es solo una app; es la comunidad que inspira. Los entrenos en casa realmente funcionan.', img: '/cambios/laura-juanos.png', plan: 'app' },
    { name: 'M.S.', result: 'Flexibilidad', text: 'Lo que me convencio fue la flexibilidad. Se que entrenar y que comer, sin complicarme.', img: '/cambios/marisa.png', plan: 'app' },
    { name: 'I.C.', result: '18 años', text: 'Tengo 18 años y ya noto cambios: entrenos claros y recetas faciles. Estoy construyendo habitos.', img: '/cambios/itzi.png', plan: 'app' },
  ];
  // "Todos" interleaves: 1:1, APP, 1:1, APP, 1:1, 1:1, APP...
  const mixed = [];
  const max = Math.max(coaching.length, app.length);
  for (let i = 0; i < max; i++) {
    if (i < coaching.length) mixed.push(coaching[i]);
    if (i < app.length) mixed.push(app[i]);
  }
  const data = filter === 'todos' ? mixed : filter === 'coaching' ? coaching : app;

  const filtered = data;
  const tabs = [
    { key: 'todos', label: 'Todos' },
    { key: 'coaching', label: '1:1' },
    { key: 'app', label: 'APP' },
  ];

  return (
    <section id="resultados" className="scroll-mt-16 py-14 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-black uppercase">+4.000 cambios <span className="text-gradient">reales</span></motion.h2>
            <motion.p variants={fadeUp} className="text-dark/40 text-sm mt-1">Sin atajos. Solo constancia y un plan real.</motion.p>
          </div>
          <motion.div variants={fadeUp} className="flex gap-1.5">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setFilter(tab.key)} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${filter === tab.key ? 'bg-dark text-white shadow-sm' : 'bg-cream border border-dark/10 text-dark/40 hover:text-dark/60'}`}>
                {tab.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div key={filter} className="animate-marquee-cards flex gap-4" style={{ width: 'max-content' }}>
          {[...filtered, ...filtered].map((t, i) => (
            <div key={i} className="min-w-[280px] max-w-[280px] rounded-2xl overflow-hidden shrink-0 bg-cream border border-dark/8 shadow-sm hover:shadow-lg transition-all group">
              <div className="relative h-52 overflow-hidden">
                <img src={t.img} alt={`Transformación ${t.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className={`absolute top-2.5 right-2.5 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md ${t.plan === 'coaching' ? 'bg-primary text-white' : 'bg-dark text-white'}`}>{t.plan === 'coaching' ? '1:1' : 'APP'}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-dark uppercase">{t.name}</span>
                  </div>
                  <span className="text-primary font-bold text-xs">{t.result}</span>
                </div>
                <div className="flex gap-0.5 mb-1.5">{[1,2,3,4,5].map(j => <Star key={j} size={10} className="fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-[11px] text-dark/45 leading-relaxed line-clamp-2">&quot;{t.text}&quot;</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 text-center">
        <Link to="/cambios" className="group inline-flex items-center gap-2 bg-dark hover:bg-dark-soft text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-sm">
          Ver todos los cambios <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ============================== ABOUT ============================== */
function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-16 py-14 sm:py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/15 rounded-full px-4 py-1.5 mb-4">
              <Award size={12} className="text-primary-dark" />
              <span className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">Sobre Ely</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase">Quien esta <span className="text-gradient">detras</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src="/ely-about-1.jpg" alt="Ely estirando" className="w-full h-52 sm:h-64 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src="/ely-about-3.jpg" alt="Ely en el gym" className="w-full h-36 sm:h-44 object-cover" />
                </div>
              </div>
              <div className="pt-6">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src="/ely-about-2.webp" alt="Ely fitness" className="w-full h-72 sm:h-80 object-cover" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-xl sm:text-2xl font-black text-dark mb-3">Dietista y Entrenadora Personal IFBB</h3>
              <p className="text-sm text-dark/65 leading-relaxed mb-4">
                Soy Ely, y llevo +13 anos ayudando a miles de personas a transformar su cuerpo y su salud de forma real y sostenible. No soy una influencer mas: soy profesional titulada y certificada IFBB.
              </p>
              <p className="text-sm text-dark/65 leading-relaxed mb-5">
                Especializada en nutricion deportiva, patologias digestivas (SIBO, SOP, tiroides), adaptacion a intolerancias, embarazo y lactancia. Tambien preparo corredores desde 5K hasta ultramaratones.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { num: '+13', label: 'Anos experiencia' },
                  { num: '+4K', label: 'Cambios reales' },
                  { num: '400K+', label: 'Seguidores' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-dark/8">
                    <span className="text-xl font-black text-primary-dark">{s.num}</span>
                    <p className="text-[10px] text-dark/45 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {[
                  'Nutricion deportiva y clinica',
                  'Entrenamiento personalizado (gym, casa, running)',
                  'Acompanamiento diario via chat',
                  'Online desde Espana para todo el mundo',
                ].map(t => (
                  <div key={t} className="flex items-center gap-2.5">
                    <CheckCircle size={14} className="text-primary shrink-0" />
                    <span className="text-sm text-dark/60">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== MI MÉTODO ============================== */
const ELY_METODO = ['/ely-metodo-1.jpg', '/ely-metodo-2.webp'];

function MiMetodo() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % ELY_METODO.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
      {ELY_METODO.map((src, i) => (
        <img key={i} src={src} alt="Ely Fitness" className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-[1.5s] ease-in-out" style={{ opacity: current === i ? 1 : 0 }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-dark/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-xl">
          <motion.p variants={fadeUp} className="text-primary font-bold text-xs uppercase tracking-widest mb-3">Mi método</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black uppercase text-white leading-[0.9] mb-4">
            Tú pones el objetivo,<br />yo te guío en<br /><span className="text-primary">el camino</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/55 text-sm sm:text-base mb-6 max-w-md">
            Has puesto esfuerzo pero no ves resultados. Tu plan exclusivo te ayudará a lograr tus objetivos encontrando el equilibrio entre tu vida social, laboral y la salud.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a href="#planes" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-primary/20">
              Ver planes <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-6 lg:left-12 z-10 flex gap-2">
        {ELY_METODO.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-1 rounded-full transition-all duration-500 ${current === i ? 'w-8 bg-primary' : 'w-2.5 bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>
    </section>
  );
}

/* ============================== FINAL CTA ============================== */
function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <video src={ELY_VIDEO} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-primary text-xs font-bold uppercase tracking-widest mb-4">El momento es ahora</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight mb-4">
            Tu futuro yo<br /><span className="text-gradient">te lo agradecera.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 text-sm sm:text-base mb-10 max-w-lg mx-auto">
            Cada dia que pospones es un dia menos para sentirte bien. No necesitas estar lista: solo necesitas empezar.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="https://calendar.app.google/LINK-VIDEOLLAMADA" target="_blank" rel="noopener noreferrer" className="shine-sweep group inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-[1.02]">
              <Crown size={16} /> COACHING — Videollamada gratis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white/25 transition-all">
              <Download size={16} /> PLAN ANUAL — 59&#8364;/ano <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== PROZIS ============================== */
const PROZIS_PRODUCTS = [
  { name: 'Creatina Micropure', desc: 'Rendimiento, recuperacion y foco.', img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1698746_prozis_creatine-micronpure-300g_newin.webp', url: 'https://www.prozis.com/es/es/prozis/creatina-micronpure-300-g/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af&utm_content=product' },
  { name: 'Colageno PeptiPlus', desc: 'Articulaciones, piel y recuperacion.', img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1708709_prozis_peptiplus-hydrolyzed-collagen-protein-900g_newin.webp', url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
  { name: 'Ely x Prozis', desc: 'Mi seleccion favorita.', img: 'https://static.wixstatic.com/media/daf224_4c28ae1a03584cb6aea95c0817480351~mv2.png/v1/fill/w_358,h_478,q_90,enc_avif,quality_auto/daf224_4c28ae1a03584cb6aea95c0817480351~mv2.png', url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
  { name: 'Duffle Backpack 35L', desc: 'Mochila deportiva ideal gym.', img: 'https://static.sscontent.com/thumb/500/500/products/124/v1499995_prozis_core-workout-duffle-backpack-35l-black_single-size_black_other2.webp', url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
  { name: 'Guantes Minimalist', desc: 'Agarre y proteccion.', img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1498172_prozis_minimalist-padded-gloves-black_s_black_newin.webp', url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
  { name: 'Suplementacion Top', desc: 'Omega 3, magnesio, vitaminas.', img: IMG.lifestyle1, url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af' },
];

function Prozis() {
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);
  const copyCode = () => { navigator.clipboard.writeText('ELY').then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const scroll = (dir) => { scrollRef.current?.scrollBy({ left: dir * 216, behavior: 'smooth' }); };

  return (
    <section id="prozis" className="scroll-mt-16 py-12 sm:py-16 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-between py-8 pointer-events-none select-none opacity-[0.06]">
        <img src="/prozis-logo.png" alt="" className="w-[300px] sm:w-[450px] -rotate-12" />
        <img src="/prozis-logo.png" alt="" className="w-[350px] sm:w-[500px] rotate-6" />
        <img src="/prozis-logo.png" alt="" className="w-[300px] sm:w-[450px] -rotate-12" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-6">
          <div className="bg-dark rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-primary/8 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white flex items-center gap-3 flex-wrap justify-center sm:justify-start"><span className="text-gradient">10% dto</span> en <img src="/prozis-logo.png" alt="Prozis" className="h-6 sm:h-7 invert" /></h2>
                <p className="text-white/40 text-xs sm:text-sm mt-1">Suplementos, ropa y accesorios con mi codigo exclusivo</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={copyCode} className={`bg-white/10 border-2 border-dashed border-primary/50 rounded-xl px-5 py-3 text-center hover:bg-white/15 transition-all ${copied ? 'copy-pop' : ''}`}>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/35 mb-0.5">Codigo</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-primary tracking-wider">ELY</span>
                    {copied ? <CheckCircle size={14} className="text-[#34d399]" /> : <Copy size={12} className="text-white/25" />}
                  </div>
                  <p className="text-[8px] text-white/20 mt-0.5">{copied ? 'Copiado!' : 'Click para copiar'}</p>
                </button>
                <a href="https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-full font-bold text-sm uppercase transition-all group">
                  Ir a Prozis <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="hidden sm:flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-dark/35">Productos recomendados</p>
            <div className="flex gap-1.5">
              <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center hover:bg-dark hover:text-white transition-all"><ChevronLeft size={14} /></button>
              <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center hover:bg-dark hover:text-white transition-all"><ChevronRight size={14} /></button>
            </div>
          </div>

          <div ref={scrollRef} className="hidden sm:flex gap-3 overflow-x-auto scroll-smooth pb-1 scrollbar-hide">
            {PROZIS_PRODUCTS.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-xl border border-dark/8 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0 w-[180px]">
                <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                  <div className="absolute top-1.5 right-1.5 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">-10%</div>
                </div>
                <div className="p-2.5">
                  <h4 className="font-bold text-xs text-dark truncate">{p.name}</h4>
                  <p className="text-[10px] text-dark/40 leading-snug line-clamp-1">{p.desc}</p>
                  <span className="inline-flex items-center gap-0.5 text-primary-dark text-[9px] font-bold mt-1">Ver <ExternalLink size={8} /></span>
                </div>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:hidden">
            {PROZIS_PRODUCTS.slice(0, 6).map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg border border-dark/8 overflow-hidden active:scale-[0.97] transition-transform">
                <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100">
                  <img src={p.img} alt={p.name} className="w-full h-full object-contain p-2" loading="lazy" />
                  <div className="absolute top-1 right-1 bg-primary text-white text-[7px] font-bold px-1 py-0.5 rounded-full">-10%</div>
                </div>
                <div className="p-1.5">
                  <h4 className="font-bold text-[10px] text-dark truncate">{p.name}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== FAQ ============================== */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: '¿Coaching vs APP, cual es para mi?', a: 'Coaching = seguimiento 1:1 conmigo, chat diario, ajustes constantes. Ideal si quieres resultados rapidos y personalizados. La APP = plan economico con entrenos, recetas y comunidad a tu ritmo (59 euros/ano).' },
    { q: '¿Cuando empiezo a ver resultados?', a: 'La mayoria nota cambios en 2-4 semanas: menos hinchazon, mas energia. Resultados visibles significativos entre 2-3 meses.' },
    { q: '¿Hay permanencia?', a: 'No. El coaching no tiene permanencia, puedes cancelar cuando quieras. La APP es pago unico anual.' },
    { q: '¿Como empiezo?', a: 'Completa el formulario de contacto justo abajo o agenda una videollamada gratuita si te interesa el coaching 1 a 1. Indicame que plan te interesa y tu objetivo. Te respondo en menos de 24 horas.' },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/faq-bg.webp" alt="" className="w-full h-full object-cover object-right" />
        <div className="absolute inset-0 bg-white/70" />
      </div>
      <div className="relative z-10 max-w-xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-black uppercase text-center mb-8">Preguntas <span className="text-gradient">frecuentes</span></h2>
        <div className="space-y-2.5">
          {faqs.map((f, i) => (
            <div key={i} className={`bg-cream rounded-xl overflow-hidden transition-all ${open === i ? 'shadow-md border-l-3 border-l-primary border border-primary/20' : 'border border-dark/8'}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left gap-3">
                <span className="font-bold text-sm text-dark">{f.q}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${open === i ? 'bg-primary text-white rotate-180' : 'bg-white text-dark/30'}`}>
                  <ChevronDown size={13} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm text-dark/50 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== CONTACT ============================== */
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    const data = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      plan: form.elements.plan.value,
      message: form.elements.message.value,
    };
    await submitToWix('/contact', data);
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contacto" className="scroll-mt-16 py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/contact-bg.jpg" alt="" className="w-full h-full object-cover blur-[6px] scale-105" />
        <div className="absolute inset-0 bg-cream/80" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-8">
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-black uppercase text-dark">Empieza tu <span className="text-gradient">cambio</span></motion.h2>
          <motion.p variants={fadeUp} className="text-dark/50 text-sm mt-2">Escribeme y te respondo en menos de 24h. Sin compromiso.</motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mt-4">
            <a href="mailto:contacta@elyfitness.es" aria-label="Email" className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-primary hover:bg-dark-soft transition-all">
              <Mail size={16} />
            </a>
            <a href="https://www.instagram.com/ely_fitness/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-primary hover:bg-dark-soft transition-all">
              <Instagram size={16} />
            </a>
            <a href="https://www.youtube.com/@ely_fitness" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-primary hover:bg-dark-soft transition-all">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@ely_fitness" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-primary hover:bg-dark-soft transition-all">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M15.9453 8.68918V15.6727C15.9453 19.1598 13.1048 22.0004 9.6177 22.0004C8.27369 22.0004 7.01685 21.5717 5.99251 20.8525C4.35796 19.7047 3.29004 17.8085 3.29004 15.6727C3.29004 12.1783 6.12333 9.34505 9.6104 9.34505C9.90101 9.34505 10.1843 9.36685 10.4676 9.40318V12.9121H10.4386C10.3151 12.8758 10.1843 12.8394 10.0536 12.8177H9.9954C9.86466 12.8032 9.74114 12.7813 9.60309 12.7813C8.00491 12.7813 6.70448 14.0817 6.70448 15.6799C6.70448 17.2782 8.00491 18.5786 9.60309 18.5786C11.2014 18.5786 12.5018 17.2782 12.5018 15.6799V2.00037H15.938C15.938 2.29822 15.9671 2.58881 16.0179 2.87213C16.2649 4.1798 17.035 5.30584 18.1175 6.01053C18.873 6.50452 19.7593 6.78785 20.7182 6.78785V10.2241C18.9416 10.2241 17.288 9.65222 15.9453 8.68918Z"/></svg>
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-dark/8 overflow-hidden grid lg:grid-cols-2">
          {/* Foto de Ely — izquierda en desktop, oculta en mobile */}
          <div className="hidden lg:block relative">
            <img src="/ely-contact.jpg" alt="Ely Fitness" className="absolute inset-0 w-full h-full object-cover object-top" />
          </div>

          {/* Formulario — derecha en desktop, full en mobile */}
          <div>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-8 sm:p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">¡Mensaje enviado!</h3>
                  <p className="text-dark/50 text-sm">Te respondere en menos de 24 horas.</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="p-6 sm:p-8 space-y-4 text-left" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {['Respuesta < 24h', 'Sin compromiso', '+4.000 confian en Ely'].map(t => (
                      <span key={t} className="inline-flex items-center gap-1 text-[10px] font-bold text-dark/60 bg-primary/10 px-2.5 py-1 rounded-full">
                        <Check size={8} className="text-primary" /> {t}
                      </span>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <motion.input variants={fadeUp} name="name" type="text" placeholder="Tu nombre" required className="bg-cream border border-dark/10 rounded-xl px-4 py-3.5 text-sm text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all placeholder:text-dark/35" />
                    <motion.input variants={fadeUp} name="email" type="email" placeholder="Tu e-mail" required className="bg-cream border border-dark/10 rounded-xl px-4 py-3.5 text-sm text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all placeholder:text-dark/35" />
                  </div>
                  <motion.select variants={fadeUp} name="plan" className="bg-cream border border-dark/10 rounded-xl px-4 py-3.5 text-sm text-dark/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all">
                    <option>¿Que plan te interesa?</option>
                    <option>Coaching — Premium Plus</option>
                    <option>Coaching — Premium Running</option>
                    <option>Coaching — Nutricion</option>
                    <option>Coaching — Training</option>
                    <option>ElyFitness APP (59&#8364;/ano)</option>
                    <option>Pack Duo (69&#8364;/ano)</option>
                    <option>No se cual elegir — ayudame</option>
                    <option>Otra consulta</option>
                  </motion.select>
                  <motion.textarea variants={fadeUp} name="message" rows={3} placeholder="Cuentame tu objetivo..." className="bg-cream border border-dark/10 rounded-xl px-4 py-3.5 text-sm text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full resize-none transition-all placeholder:text-dark/35" />
                  <motion.div variants={fadeUp} className="text-center pt-1">
                    <button type="submit" disabled={sending} className="shine-sweep group bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-bold text-sm uppercase inline-flex items-center gap-2 transition-all shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed">
                      <Send size={14} /> {sending ? 'Enviando...' : 'Enviar mensaje'}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================== */
function Footer() {
  const [email, setEmail] = useState('');
  const [sub, setSub] = useState(false);
  const handleSub = async (e) => { e.preventDefault(); await submitToWix('/newsletter', { email }); setSub(true); setEmail(''); setTimeout(() => setSub(false), 3000); };

  return (
    <footer className="text-white pt-12 sm:pt-16 bg-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/20 rounded-2xl p-6 sm:p-8 mt-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-black text-white flex items-center gap-2 justify-center sm:justify-start"><Mail size={16} className="text-primary" /> Newsletter de Ely</h3>
              <p className="text-white/60 text-sm mt-1">Consejos de nutricion y entreno cada semana. Gratis.</p>
            </div>
            <form onSubmit={handleSub} className="flex gap-2 w-full sm:w-auto">
              {sub ? (
                <span className="text-[#34d399] text-sm font-bold flex items-center gap-1.5"><CheckCircle size={14} /> Suscrit@!</span>
              ) : (
                <>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Tu email" required className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 placeholder:text-white/40 w-full sm:w-60" />
                  <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shrink-0">OK</button>
                </>
              )}
            </form>
          </div>
        </div>

        <div className="py-8 grid grid-cols-2 sm:grid-cols-3 gap-8 border-b border-white/8">
          <div>
            <div className="mb-3">
              <svg className="h-7 w-auto [&_path]:fill-white/80" preserveAspectRatio="xMidYMid meet" viewBox="58.667 144.7 383.471 210.7" xmlns="http://www.w3.org/2000/svg"><g><path d="M58.667 312.597v-123h49.3v23.8h-24.2v23.9h23.2v23.2h-23.2v28.2h25.8v23.9h-50.9z"/><path d="M117.666 312.597v-123h49.3v23.9h-24.6v19.6h23.2v23.7h-23.2v56h-24.8v-.2z"/><path d="M106.8 144.7v24.9h-1.1v-24.9h1.1z"/><path d="M194.3 215.9c.4-1.8-.1-3.4-2.5-3.6-1-.1-1.9.2-2.8.4-1.8.4-3.4 1.3-4.7 2.6-.6.4-1 .9-1.7 1.4-.1-.3-.1-.4-.2-.6-.3-1.5-1-3-2.1-4.2-.4-.6-1-1-1.7-1.5-.2-.2-.7-.2-.9-.2-1 .3-1.8.9-2.1 1.9-.2.7-.4 1.4-.4 2.1-.1 3.1.1 6.1 1.5 8.9.7 1.2 1.2 2.4 1.8 3.6s1.2 2.3 2.1 3.4c.8 1 1.4 1.1 2.3.2.9-.8 1.7-1.7 2.5-2.5 2-2 3.6-4.1 5.3-6.4.9-1.2 1.7-2.5 2.5-3.7.5-.6 1-1.1 1.1-1.8z"/><path d="M227.258 269.115v1.8h-13.3v-19.8h13.1v1.6h-11.1v7.2h9.7v1.6h-9.7v7.5h11.3z"/><path d="M250.826 270.915v-19.8h2v18h11.5v1.8h-13.5z"/><path d="m287.063 251.115 6.4 10.6 6.6-10.6h2.1l-7.7 12.4v7.4h-2v-7.4l-7.7-12.3h2.3v-.1z"/><path d="M214.021 313.415v-19.8h12.9v1.6h-11v7.2h9.3v1.6h-9.3v9.2h-2v.2z"/><path d="M250.234 313.415v-19.8h2v19.8h-2z"/><path d="M290.9 295.415h-7v18h-2v-18h-7v-1.6H291v1.6z"/><path d="M315.78 297.415v16.2h-2v-20h1.5l13.1 16.4v-16.4h2v19.8h-1.6l-13-16z"/><path d="M368.427 311.615v1.8h-13.3v-19.8h13.1v1.6h-11.1v7.2h9.7v1.6h-9.7v7.5h11.3z"/><path d="M403.596 297.415c-.5-.7-1.3-1.1-2.3-1.5-1-.3-2-.7-3.1-.7-1.8 0-2.9.3-3.8 1-.8.7-1.1 1.6-1.1 2.6 0 .7.2 1.1.3 1.5.2.3.5.7 1 1 .5.3 1 .5 1.6.7.7.2 1.5.3 2.5.7 1 .2 2 .5 2.8.8s1.6.7 2.1 1c.7.3 1 1 1.3 1.5.3.7.5 1.3.5 2.3 0 1-.2 1.6-.5 2.5-.3.7-.8 1.1-1.5 1.6s-1.5.8-2.3 1c-.8.2-1.8.3-2.8.3-3.1 0-5.7-1-8-2.9l1-1.6c.3.3.8.8 1.3 1.1s1 .7 1.6.8c.7.3 1.3.5 2 .7.7.2 1.5.2 2.1.2 1.6 0 2.8-.3 3.6-.8.8-.5 1.3-1.5 1.3-2.6 0-.7-.2-1.1-.3-1.5-.3-.5-.7-.8-1.1-1.1-.5-.3-1.1-.7-1.8-.8-.7-.2-1.6-.5-2.6-.7-1-.3-2-.5-2.8-.8-.8-.3-1.5-.5-2-1-.5-.3-1-.8-1.1-1.5-.3-.5-.3-1.1-.3-2 0-1 .2-1.6.5-2.5.3-.7.8-1.3 1.5-1.8s1.3-.8 2.3-1.1c.8-.3 1.8-.3 2.9-.3 1.3 0 2.5.2 3.4.7 1 .3 2 1 2.8 1.6l-1 1.6z"/><path d="M440.338 297.415c-.5-.7-1.3-1.1-2.3-1.5-1-.3-2-.7-3.1-.7-1.8 0-2.9.3-3.8 1-.8.7-1.1 1.6-1.1 2.6 0 .7.2 1.1.3 1.5.2.3.5.7 1 1 .5.3 1 .5 1.6.7.7.2 1.5.3 2.5.7 1 .2 2 .5 2.8.8s1.6.7 2.1 1c.7.3 1 1 1.3 1.5.3.7.5 1.3.5 2.3 0 1-.2 1.6-.5 2.5-.3.7-.8 1.1-1.5 1.6s-1.5.8-2.3 1c-.8.2-1.8.3-2.8.3-3.1 0-5.7-1-8-2.9l1-1.6c.3.3.8.8 1.3 1.1s1 .7 1.6.8c.7.3 1.3.5 2 .7.7.2 1.5.2 2.1.2 1.6 0 2.8-.3 3.6-.8.8-.5 1.3-1.5 1.3-2.6 0-.7-.2-1.1-.3-1.5-.3-.5-.7-.8-1.1-1.1-.5-.3-1.1-.7-1.8-.8-.7-.2-1.6-.5-2.6-.7-1-.3-2-.5-2.8-.8-.8-.3-1.5-.5-2-1-.5-.3-1-.8-1.1-1.5-.3-.5-.3-1.1-.3-2 0-1 .2-1.6.5-2.5.3-.7.8-1.3 1.5-1.8s1.3-.8 2.3-1.1c.8-.3 1.8-.3 2.9-.3 1.3 0 2.5.2 3.4.7 1 .3 2 1 2.8 1.6l-1 1.6z"/><path d="M106.8 330.5v24.9h-1.1v-24.9h1.1z"/></g></svg>
            </div>
            <p className="text-white/35 text-[11px] leading-relaxed max-w-[200px]">Dietista y Entrenadora Personal IFBB. +13 anos ayudando online.</p>
            <div className="flex items-center gap-1.5 text-white/25 text-[10px] mt-2"><MapPin size={10} /> Espana - Online</div>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase text-white/40 mb-3 tracking-widest">Links</p>
            <div className="space-y-1.5">
              {[
                { href: '#plan-ultra', label: 'Servicios' },
                { href: '#plan-anual', label: 'APP Fitness' },
                { href: '#resultados', label: 'Resultados' },
                { href: '#prozis', label: 'Prozis' },
                { href: '#contacto', label: 'Contacto' },
              ].map(l => <a key={l.href} href={l.href} className="block text-white/40 hover:text-white/60 text-xs transition-colors">{l.label}</a>)}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase text-white/40 mb-3 tracking-widest">Redes</p>
            <div className="flex gap-2 mb-4">
              {[
                { icon: <Mail size={12} />, url: 'mailto:contacta@elyfitness.es' },
                { icon: <Instagram size={12} />, url: 'https://www.instagram.com/ely_fitness/' },
                { icon: <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, url: 'https://www.youtube.com/@ely_fitness' },
                { icon: <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><path d="M15.9453 8.68918V15.6727C15.9453 19.1598 13.1048 22.0004 9.6177 22.0004C8.27369 22.0004 7.01685 21.5717 5.99251 20.8525C4.35796 19.7047 3.29004 17.8085 3.29004 15.6727C3.29004 12.1783 6.12333 9.34505 9.6104 9.34505C9.90101 9.34505 10.1843 9.36685 10.4676 9.40318V12.9121H10.4386C10.3151 12.8758 10.1843 12.8394 10.0536 12.8177H9.9954C9.86466 12.8032 9.74114 12.7813 9.60309 12.7813C8.00491 12.7813 6.70448 14.0817 6.70448 15.6799C6.70448 17.2782 8.00491 18.5786 9.60309 18.5786C11.2014 18.5786 12.5018 17.2782 12.5018 15.6799V2.00037H15.938C15.938 2.29822 15.9671 2.58881 16.0179 2.87213C16.2649 4.1798 17.035 5.30584 18.1175 6.01053C18.873 6.50452 19.7593 6.78785 20.7182 6.78785V10.2241C18.9416 10.2241 17.288 9.65222 15.9453 8.68918Z"/></svg>, url: 'https://www.tiktok.com/@ely_fitness' },
              ].map((r, i) => (
                <a key={i} href={r.url} target={r.url.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/8 hover:bg-primary/20 flex items-center justify-center text-white/50 hover:text-primary transition-all">{r.icon}</a>
              ))}
            </div>
            <p className="text-[9px] font-bold uppercase text-white/40 mb-2 tracking-widest">Colaboraciones</p>
            <div className="space-y-1">
              {[
                { label: 'Prozis — Código ELY 10%', url: 'https://www.prozis.com/1DTPL' },
                { label: "Women's Best — Código ELY 10%", url: 'https://womens.best/ElyFitness' },
                { label: 'Matchaflix — Código ELY 26%', url: 'https://matchaflix.com/ELY' },
              ].map(l => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="block text-white/40 hover:text-white/60 text-[11px] transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-white/30">
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/50">Condiciones</a>
            <a href="#" className="hover:text-white/50">Privacidad</a>
            <a href="#" className="hover:text-white/50">Cookies</a>
          </div>
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()}</span>
            <svg className="h-4 w-auto [&_path]:fill-white/30" preserveAspectRatio="xMidYMid meet" viewBox="58.667 144.7 383.471 210.7" xmlns="http://www.w3.org/2000/svg"><g><path d="M58.667 312.597v-123h49.3v23.8h-24.2v23.9h23.2v23.2h-23.2v28.2h25.8v23.9h-50.9z"/><path d="M117.666 312.597v-123h49.3v23.9h-24.6v19.6h23.2v23.7h-23.2v56h-24.8v-.2z"/><path d="M106.8 144.7v24.9h-1.1v-24.9h1.1z"/><path d="M194.3 215.9c.4-1.8-.1-3.4-2.5-3.6-1-.1-1.9.2-2.8.4-1.8.4-3.4 1.3-4.7 2.6-.6.4-1 .9-1.7 1.4-.1-.3-.1-.4-.2-.6-.3-1.5-1-3-2.1-4.2-.4-.6-1-1-1.7-1.5-.2-.2-.7-.2-.9-.2-1 .3-1.8.9-2.1 1.9-.2.7-.4 1.4-.4 2.1-.1 3.1.1 6.1 1.5 8.9.7 1.2 1.2 2.4 1.8 3.6s1.2 2.3 2.1 3.4c.8 1 1.4 1.1 2.3.2.9-.8 1.7-1.7 2.5-2.5 2-2 3.6-4.1 5.3-6.4.9-1.2 1.7-2.5 2.5-3.7.5-.6 1-1.1 1.1-1.8z"/><path d="M227.258 269.115v1.8h-13.3v-19.8h13.1v1.6h-11.1v7.2h9.7v1.6h-9.7v7.5h11.3z"/><path d="M250.826 270.915v-19.8h2v18h11.5v1.8h-13.5z"/><path d="m287.063 251.115 6.4 10.6 6.6-10.6h2.1l-7.7 12.4v7.4h-2v-7.4l-7.7-12.3h2.3v-.1z"/><path d="M214.021 313.415v-19.8h12.9v1.6h-11v7.2h9.3v1.6h-9.3v9.2h-2v.2z"/><path d="M250.234 313.415v-19.8h2v19.8h-2z"/><path d="M290.9 295.415h-7v18h-2v-18h-7v-1.6H291v1.6z"/><path d="M315.78 297.415v16.2h-2v-20h1.5l13.1 16.4v-16.4h2v19.8h-1.6l-13-16z"/><path d="M368.427 311.615v1.8h-13.3v-19.8h13.1v1.6h-11.1v7.2h9.7v1.6h-9.7v7.5h11.3z"/><path d="M403.596 297.415c-.5-.7-1.3-1.1-2.3-1.5-1-.3-2-.7-3.1-.7-1.8 0-2.9.3-3.8 1-.8.7-1.1 1.6-1.1 2.6 0 .7.2 1.1.3 1.5.2.3.5.7 1 1 .5.3 1 .5 1.6.7.7.2 1.5.3 2.5.7 1 .2 2 .5 2.8.8s1.6.7 2.1 1c.7.3 1 1 1.3 1.5.3.7.5 1.3.5 2.3 0 1-.2 1.6-.5 2.5-.3.7-.8 1.1-1.5 1.6s-1.5.8-2.3 1c-.8.2-1.8.3-2.8.3-3.1 0-5.7-1-8-2.9l1-1.6c.3.3.8.8 1.3 1.1s1 .7 1.6.8c.7.3 1.3.5 2 .7.7.2 1.5.2 2.1.2 1.6 0 2.8-.3 3.6-.8.8-.5 1.3-1.5 1.3-2.6 0-.7-.2-1.1-.3-1.5-.3-.5-.7-.8-1.1-1.1-.5-.3-1.1-.7-1.8-.8-.7-.2-1.6-.5-2.6-.7-1-.3-2-.5-2.8-.8-.8-.3-1.5-.5-2-1-.5-.3-1-.8-1.1-1.5-.3-.5-.3-1.1-.3-2 0-1 .2-1.6.5-2.5.3-.7.8-1.3 1.5-1.8s1.3-.8 2.3-1.1c.8-.3 1.8-.3 2.9-.3 1.3 0 2.5.2 3.4.7 1 .3 2 1 2.8 1.6l-1 1.6z"/><path d="M440.338 297.415c-.5-.7-1.3-1.1-2.3-1.5-1-.3-2-.7-3.1-.7-1.8 0-2.9.3-3.8 1-.8.7-1.1 1.6-1.1 2.6 0 .7.2 1.1.3 1.5.2.3.5.7 1 1 .5.3 1 .5 1.6.7.7.2 1.5.3 2.5.7 1 .2 2 .5 2.8.8s1.6.7 2.1 1c.7.3 1 1 1.3 1.5.3.7.5 1.3.5 2.3 0 1-.2 1.6-.5 2.5-.3.7-.8 1.1-1.5 1.6s-1.5.8-2.3 1c-.8.2-1.8.3-2.8.3-3.1 0-5.7-1-8-2.9l1-1.6c.3.3.8.8 1.3 1.1s1 .7 1.6.8c.7.3 1.3.5 2 .7.7.2 1.5.2 2.1.2 1.6 0 2.8-.3 3.6-.8.8-.5 1.3-1.5 1.3-2.6 0-.7-.2-1.1-.3-1.5-.3-.5-.7-.8-1.1-1.1-.5-.3-1.1-.7-1.8-.8-.7-.2-1.6-.5-2.6-.7-1-.3-2-.5-2.8-.8-.8-.3-1.5-.5-2-1-.5-.3-1-.8-1.1-1.5-.3-.5-.3-1.1-.3-2 0-1 .2-1.6.5-2.5.3-.7.8-1.3 1.5-1.8s1.3-.8 2.3-1.1c.8-.3 1.8-.3 2.9-.3 1.3 0 2.5.2 3.4.7 1 .3 2 1 2.8 1.6l-1 1.6z"/><path d="M106.8 330.5v24.9h-1.1v-24.9h1.1z"/></g></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================== CHAT WIDGET ============================== */
function ChatWidget({ onNewsletter }) {
  const [open, setOpen] = useState(false);
  const options = [
    { label: 'Videollamada gratuita', desc: 'Coaching 1:1', href: 'https://calendar.app.google/LINK-VIDEOLLAMADA', external: true, icon: <CalendarCheck size={13} /> },
    { label: 'Plan Anual (59EUR)', href: 'https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT', external: true, icon: <Download size={13} /> },
    { label: 'Ver servicios', href: '#plan-ultra', icon: <Crown size={13} /> },
    { label: 'Contactar', href: '#contacto', icon: <Send size={13} /> },
    { label: 'Newsletter', desc: 'Consejos gratis cada semana', icon: <Mail size={13} />, action: 'newsletter' },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-dark/10 overflow-hidden mb-2">
            <div className="bg-dark p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                  <img src={ELY_MODAL} alt="Ely" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Ely Fitness</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                    <span className="text-white/35 text-[10px]">Online ahora</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2.5 space-y-1">
              {options.map(o => o.action ? (
                <button key={o.label} onClick={() => { setOpen(false); onNewsletter?.(); }} className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-cream hover:bg-primary/10 transition-colors w-full text-left">
                  <span className="text-primary">{o.icon}</span>
                  <div>
                    <span className="text-sm font-semibold text-dark/70 block">{o.label}</span>
                    {o.desc && <span className="text-[9px] text-dark/30">{o.desc}</span>}
                  </div>
                </button>
              ) : (
                <a key={o.label} href={o.href} target={o.external ? '_blank' : undefined} rel={o.external ? 'noopener noreferrer' : undefined} onClick={() => setOpen(false)} className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-cream hover:bg-primary/10 transition-colors">
                  <span className="text-primary">{o.icon}</span>
                  <div>
                    <span className="text-sm font-semibold text-dark/70 block">{o.label}</span>
                    {o.desc && <span className="text-[9px] text-dark/30">{o.desc}</span>}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${open ? 'bg-dark text-white scale-90' : 'bg-primary text-white hover:bg-primary-dark shadow-primary/30 hover:scale-105'}`}>
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

/* ============================== NEWSLETTER MODAL ============================== */
function NewsletterModal({ forceOpen, onClose }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (forceOpen) setShow(true);
  }, [forceOpen]);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 18000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const close = () => { setShow(false); setDismissed(true); onClose?.(); };
  const handleSubscribe = async (e) => {
    e.preventDefault();
    const form = e.target;
    await submitToWix('/newsletter', { name: form.elements.nlname.value, email: form.elements.nlemail.value });
    setSubscribed(true);
    setTimeout(close, 3000);
  };

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
            <div className="bg-cream rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full grid sm:grid-cols-2 pointer-events-auto relative">
              <button onClick={close} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-dark/5 transition-colors"><X size={16} /></button>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div key="thanks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <Check size={28} className="text-green-500" />
                      </div>
                      <h3 className="text-xl font-black mb-2 text-dark">Bienvenid@!</h3>
                      <p className="text-sm text-dark/45">Revisa tu email para confirmar.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Gift size={14} className="text-primary" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-dark">Exclusivo</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-4 text-dark">
                        Consejos reales para tu transformacion
                      </h3>
                      <p className="text-sm text-dark/45 mb-6 leading-relaxed">
                        Apuntate a mi newsletter: alimentacion, entrenamiento y autocuidado. Gratis.
                      </p>
                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <input name="nlname" type="text" placeholder="Tu nombre" required className="w-full bg-white border border-dark/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/30 placeholder:text-dark/35" />
                        <input name="nlemail" type="email" placeholder="Tu email" required className="w-full bg-white border border-dark/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/30 placeholder:text-dark/35" />
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

/* ============================== STICKY CTA BAR (mobile only) ============================== */
function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-dark/95 sticky-blur border-t border-white/10 py-3 px-4 sm:hidden"
        >
          <div className="flex gap-2">
            <a href="https://calendar.app.google/LINK-VIDEOLLAMADA" target="_blank" rel="noopener noreferrer" className="shine-sweep flex-1 flex items-center justify-center gap-1.5 bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase">
              <Crown size={12} /> Coaching
            </a>
            <a href="https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-white text-dark py-3 rounded-xl font-bold text-xs uppercase">
              <Download size={12} /> APP 59&#8364;
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================== PAGE ============================== */
export default function Home() {
  const [nlOpen, setNlOpen] = useState(false);
  return (
    <>
      <Navbar />
      <Hero />
      <MiMetodo />
      <SocialProofBar />
      <WaveDivider from="#323130" to="#FCF3EF" />
      <ChooseYourPath />
      <WaveDivider from="#FCF3EF" to="#ffffff" />
      <QuickComparison />
      <Transformations />
      <WaveDivider from="#ffffff" to="#FCF3EF" />
      <About />
      <WaveDivider from="#FCF3EF" to="#323130" />
      <FinalCTA />
      <WaveDivider from="#323130" to="#FCF3EF" />
      <Prozis />
      <WaveDivider from="#FCF3EF" to="#ffffff" />
      <FAQ />
      <WaveDivider from="#ffffff" to="#FCF3EF" />
      <Contact />
      <WaveDivider from="#FCF3EF" to="#323130" />
      <Footer />
      <ChatWidget onNewsletter={() => setNlOpen(true)} />
      <NewsletterModal forceOpen={nlOpen} onClose={() => setNlOpen(false)} />
      <StickyCTA />
    </>
  );
}
