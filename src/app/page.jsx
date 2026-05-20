
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  X, Menu, ArrowRight, ChevronDown, ChevronLeft, ChevronRight,
  MessageCircle, Star, Check, Send,
  Instagram, Heart, Sparkles, TrendingUp, Users, Download, Zap, Crown, Dumbbell, Apple,
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
const slideLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const slideRight = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* --- WAVE DIVIDER --- */
function WaveDivider({ from = '#FCF3EF', to = '#ffffff' }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 60, backgroundColor: from, marginTop: -1 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: 60 }}>
        <path d="M0 25C240 50 480 55 720 40C960 25 1200 10 1440 20V60H0Z" fill={to} />
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

/* =================== NAVBAR =================== */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastDirectionY = useRef(0);
  const direction = useRef('up');
  useEffect(() => {
    const check = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Hide on scroll down, show on scroll up (with 15px threshold to avoid flicker)
      const diff = y - lastDirectionY.current;
      if (diff > 15) {
        direction.current = 'down';
        lastDirectionY.current = y;
      } else if (diff < -15) {
        direction.current = 'up';
        lastDirectionY.current = y;
      }
      setHidden(y > 200 && direction.current === 'down');
      const navBottom = 64;
      const darkSections = document.querySelectorAll('#app');
      let dark = false;
      darkSections.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < navBottom && rect.bottom > 0) dark = true;
      });
      setOnDark(dark);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  const links = [
    { href: '#cambios', label: 'RESULTADOS' },
    { href: '#coaching', label: 'COACHING 1A1', badge: true },
    { href: '#app', label: 'APP FITNESS' },
    { href: '#sobre-mi', label: 'SOBRE MÍ' },
    { href: '#prozis', label: 'PROZIS' },
    { href: '#contacto', label: 'CONTACTO' },
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
            <a key={l.href} href={l.href} className={`relative px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all duration-300 ${light ? 'text-dark/60 hover:text-dark hover:bg-dark/5' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              {l.label}
              {l.badge && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full" />}
            </a>
          ))}
        </div>
        <div className={`flex items-center gap-3 lg:hidden transition-colors ${light ? 'text-dark' : 'text-white'}`}>
          <button onClick={() => setOpen(!open)} className="p-1">{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden bg-cream/98 backdrop-blur-xl border-t border-dark/8 px-6 pb-6">
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="block font-bold text-sm uppercase py-3 border-b border-dark/8 last:border-0 text-dark/70">{l.label}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* =================== HERO (V2 - Single, powerful) =================== */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Mobile: Wix video | Desktop: local v1 video */}
        <video autoPlay muted loop playsInline className="w-full h-full object-cover sm:hidden" src={ELY_VIDEO} />
        <video autoPlay muted loop playsInline className="w-full h-full object-cover hidden sm:block" src={HERO_VIDEO_DESKTOP} />
      </div>
      <div className="absolute inset-0 bg-dark/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/30 to-transparent" />

      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">
            <motion.p variants={fadeUp} className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Dietista & Entrenadora Personal IFBB</motion.p>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-[0.9] mb-4">
              Transforma<br />tu cuerpo con{' '}
              <span className="text-primary">un plan<br />personalizado</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="mb-6 max-w-md">
              <p className="text-xl sm:text-2xl text-white font-semibold">Soy Ely. Te ayudo a</p>
              <span className="block text-xl sm:text-2xl font-semibold">
                <FlipWords
                  words={['transformar tu cuerpo', 'comer sin restricciones', 'sentirte fuerte', 'recuperar tu energia', 'amar tu proceso']}
                  duration={2800}
                  colors={['#D9A3FF']}
                />
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-8">
              <MagneticButton href="#coaching" className="group inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wide transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]">
                VER PLANES <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton href="#cambios" className="group inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wide hover:bg-white/10 transition-all">
                VER RESULTADOS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-8">
              {[
                { v: 13, s: '+', l: 'Años exp.' },
                { v: 4, s: 'K+', l: 'Cambios' },
                { v: 400, s: 'K+', l: 'Comunidad' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-black text-white"><NumberTicker value={s.v} suffix={s.s} /></div>
                  <div className="text-white/40 text-[9px] font-semibold uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="text-white/30" size={22} />
      </motion.div>
    </section>
  );
}

/* =================== SOCIAL PROOF STRIP =================== */
function SocialProof() {
  const stats = [
    { value: 4, suffix: 'K+', label: 'Transformaciones reales' },
    { value: 13, suffix: '+', label: 'Años de experiencia' },
    { value: 400, suffix: 'K+', label: 'Comunidad activa' },
    { value: 5, suffix: '', label: 'Estrellas Google' },
  ];
  return (
    <section className="bg-dark py-10">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <motion.div key={s.label} variants={fadeUp}>
              <div className="text-3xl sm:text-4xl font-black text-white">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =================== TRUST STRIP (marquee) =================== */
function TrustStrip() {
  const items = ['NUTRICIÓN DEPORTIVA', 'PERSONAL TRAINER IFBB', 'PLAN ULTRA VIP', 'MÉTODO HÍBRIDO', '+ 13 AÑOS EXPERIENCIA', 'APP EXCLUSIVA', '4K+ CAMBIOS REALES', 'COMUNIDAD 400K+'];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="bg-primary text-white py-3.5 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#D9A3FF] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#D9A3FF] to-transparent z-10 pointer-events-none" />
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((t, i) => (
          <span key={i} className="text-xs sm:text-sm font-semibold uppercase mx-6 tracking-wider text-white/90">{t} <span className="text-white/40 mx-4">·</span></span>
        ))}
      </div>
    </div>
  );
}

/* =================== PHOTO BANNER =================== */
function PhotoBanner() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % ELY_HERO.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[50vh] sm:h-[55vh] overflow-hidden">
      {ELY_HERO.map((src, i) => (
        <img key={i} src={src} alt="" className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-[1.5s] ease-in-out" style={{ opacity: current === i ? 1 : 0 }} />
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
            <a href="#coaching" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-primary/20">
              Ver planes <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-6 lg:left-12 z-10 flex gap-2">
        {ELY_HERO.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-1 rounded-full transition-all duration-500 ${current === i ? 'w-8 bg-primary' : 'w-2.5 bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>
    </section>
  );
}

/* =================== TRANSFORMATIONS =================== */
function MarqueeCard({ data }) {
  return (
    <div className="min-w-[280px] max-w-[280px] rounded-2xl overflow-hidden shrink-0 bg-white border border-dark/8 shadow-sm">
      <div className="grid grid-cols-2 gap-0.5 bg-dark/10">
        <div className="relative h-40 overflow-hidden">
          <img src={data.before} alt="" className="w-full h-full object-cover" />
          <span className="absolute top-2 left-2 bg-white/90 text-dark text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">Antes</span>
        </div>
        <div className="relative h-40 overflow-hidden">
          <img src={data.after} alt="" className="w-full h-full object-cover" />
          <span className="absolute top-2 right-2 bg-primary/90 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">Después</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-dark uppercase">{data.name}</span>
            <span className="bg-primary/10 text-primary-dark text-[9px] font-bold px-2 py-0.5 rounded-full">{data.time}</span>
          </div>
          <span className="text-primary font-bold text-[11px]">{data.result}</span>
        </div>
        <div className="flex gap-0.5 mb-1.5">{[1,2,3,4,5].map(j => <Star key={j} size={10} className="fill-yellow-400 text-yellow-400" />)}</div>
        <p className="text-[11px] text-dark/55 leading-relaxed line-clamp-2">&quot;{data.text}&quot;</p>
      </div>
    </div>
  );
}

function Transformations() {
  const data = [
    { name: 'C.B.', result: '-20 kg', text: 'He perdido más de 20 kg de forma saludable. No paso hambre, no tengo ansiedad por comer y he vuelto a mirarme al espejo con orgullo.', before: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80', after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', time: 'Ultra Premium' },
    { name: 'V.M.', result: 'Recomposición', text: 'Bajé muchísimo volumen en abdomen y piernas, y hoy me siento fuerte, segura y feliz.', before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', after: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80', time: 'Ultra Premium' },
    { name: 'M.M.', result: 'Sin medicación', text: 'Hoy vivo sin medicación, con más salud y autoestima. He bajado de peso mejorando masa muscular.', before: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80', after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', time: 'Ultra Premium' },
    { name: 'T.H.', result: '-4.5 kg / 4 sem', text: 'He recuperado la menstruación después de más de dos años. He aprendido a comer y a disfrutar sin culpa.', before: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80', after: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80', time: 'Ultra Premium' },
    { name: 'S.B.', result: 'Método Híbrido', text: 'Combinar fuerza y resistencia me ha dado un cuerpo más eficiente y una mente más fuerte.', before: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80', after: IMG.gym1, time: 'Ultra Running' },
    { name: 'M.P.', result: 'Salud interior', text: 'Ha desaparecido la ansiedad por comer. He mejorado en salud interior que luego se refleja en salud exterior.', before: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', after: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&q=80', time: '+ 8 meses' },
    { name: 'E.G.', result: 'ElyFitness APP', text: 'Nunca había seguido un plan con tanta adherencia. La app es intuitiva y las recetas son un 10.', before: IMG.food3, after: IMG.food1, time: 'APP Fitness' },
    { name: 'C.H.', result: 'Pack Duo', text: 'Nos apuntamos al Pack Duo y fue un antes y un después. Recetas fáciles y riquísimas.', before: IMG.gym2, after: IMG.running, time: 'Pack Duo' },
  ];
  const row1 = data.slice(0, 4);
  const row2 = data.slice(4);

  return (
    <section id="cambios" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.p variants={fadeUp} className="text-primary-dark font-bold text-xs uppercase tracking-widest mb-3">+ 4.000 Transformaciones reales</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black uppercase leading-[0.9]">Cambios reales<br /><span className="text-primary">de mis chic@s</span></motion.h2>
        </motion.div>
      </div>

      <div className="relative mb-5">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee-cards flex gap-5" style={{ width: 'max-content' }}>
          {[...row1, ...row1, ...row1].map((t, i) => <MarqueeCard key={`r1-${i}`} data={t} />)}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee-cards-reverse flex gap-5" style={{ width: 'max-content' }}>
          {[...row2, ...row2, ...row2].map((t, i) => <MarqueeCard key={`r2-${i}`} data={t} />)}
        </div>
      </div>
    </section>
  );
}

/* =================== HOW IT WORKS (V2 - moved up, prominent) =================== */
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Elegí tu plan', desc: 'Mirá los planes y elegí el que mejor se adapte a tu objetivo. Si no sabés cuál, me escribís y te ayudo.', icon: <Sparkles size={22} />, img: IMG.lifestyle1 },
    { n: '02', title: 'Descargá la APP', desc: 'Accedé a tu plan personalizado, recetas, entrenos en vídeo y seguimiento desde mi app exclusiva.', icon: <Download size={22} />, img: IMG.prep },
    { n: '03', title: 'Transformate con Ely', desc: 'Seguimiento constante, ajustes y chat diario hasta que logres tu objetivo. Resultados desde las primeras semanas.', icon: <TrendingUp size={22} />, img: IMG.results },
  ];
  return (
    <section id="como-funciona" className="py-20 bg-dark relative overflow-hidden">
      <video src={ELY_VIDEO} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="absolute inset-0 bg-dark/85" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-primary font-bold text-xs uppercase tracking-widest mb-3">3 pasos simples</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black uppercase text-white">
            Así de <span className="text-primary">fácil</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.n} variants={fadeUp} className="relative group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                      {s.icon}
                    </div>
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[9px] font-black text-dark">{s.n}</span>
                  </div>
                </div>
                <div className="p-6 text-center flex-1 flex flex-col justify-center">
                  <h3 className="font-black uppercase text-base mb-2 text-white">{s.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </div>
              {i < 2 && (
                <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight size={14} className="text-white/20" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* =================== PLAN COMPARISON BANNER =================== */
/* =================== COACHING PERSONALIZADO (ex Plan Ultra) =================== */
function CoachingPersonalizado() {
  const planes = [
    {
      n: '01', name: 'PREMIUM PLUS', popular: true, img: IMG.gym1,
      bullets: [
        'Plan de alimentación, suplementación y entrenamiento 100% personalizado conmigo.',
        'Chat VIP para asesoramiento diario y máxima cercanía conmigo.',
        'Seguimiento y ajustes quincenales con revisión de progreso.',
        'Beneficios: Más energía, salud, mejor composición corporal, menos dolor y resultados reales.',
      ],
    },
    {
      n: '02', name: 'PREMIUM RUNNING', img: IMG.running,
      bullets: [
        'Plan de alimentación, suplementación y entrenamiento 100% personalizado conmigo para carreras.',
        'Chat VIP para asesoramiento diario y máxima cercanía conmigo.',
        'Seguimiento y ajustes quincenales con revisión de progreso.',
        'Rendimiento y objetivos en carreras: 5K, 10K, Medio Maratón, Maratón, Ultras.',
      ],
    },
    {
      n: '03', name: 'NUTRICIÓN', img: IMG.food2,
      bullets: [
        'Plan de alimentación, suplementación 100% personalizado conmigo.',
        'Chat VIP para asesoramiento diario y máxima cercanía conmigo.',
        'Seguimiento y ajustes quincenales con revisión de progreso.',
        'Beneficios en la gestión y orden de las comidas. Control señales de hambre y saciedad.',
      ],
    },
    {
      n: '04', name: 'TRAINING', img: IMG.gym2,
      bullets: [
        'Plan de entrenamiento, suplementación 100% personalizado conmigo.',
        'Chat VIP para asesoramiento diario y máxima cercanía conmigo.',
        'Seguimiento y ajustes quincenales con revisión de progreso.',
        'Progreso en el entrenamiento. Readaptación a lesiones.',
      ],
    },
  ];

  return (
    <section id="coaching" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-6">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/15 rounded-full px-4 py-1.5 mb-4">
            <Crown size={14} className="text-primary-dark" />
            <span className="text-xs font-bold text-primary-dark">100% PERSONALIZADO · 1 A 1 CON ELY</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black uppercase">Coaching <span className="text-primary">Personalizado</span></motion.h2>
          <motion.p variants={fadeUp} className="text-dark/50 text-sm mt-3 max-w-lg mx-auto">Acompañamiento diario y cercano con Ely. Dieta, entreno y seguimiento VIP adaptado a ti.</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-2.5 bg-primary/10 border border-primary/15 rounded-full px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-dark/60">Plazas limitadas para garantizar seguimiento de calidad</span>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {planes.map(p => (
            <motion.a key={p.name} href="#contacto" variants={fadeUp} className="group text-center cursor-pointer block bg-white rounded-2xl border border-dark/8 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-5">
                <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-dark/10 group-hover:border-primary/40 transition-all duration-500 shadow-lg">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full bg-dark flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-sm">{p.n}</span>
                </div>
                {p.popular && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-md">Popular</span>
                )}
              </div>
              <h3 className="font-black uppercase text-sm sm:text-base mb-4 text-dark leading-tight group-hover:text-primary-dark transition-colors">{p.name}</h3>
              <ul className="text-left space-y-2.5 mx-auto mb-5">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] sm:text-[12px] text-dark/55 leading-relaxed">
                    <span className="text-primary mt-0.5 shrink-0">▪️</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all group-hover:gap-2.5">
                Empezar ahora <ArrowRight size={12} />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-14 flex flex-wrap justify-center gap-2.5">
          {['Chat VIP diario con Ely', 'Todo en mi APP', 'Sin permanencia', 'Adaptado a patologías'].map(f => (
            <span key={f} className="inline-flex items-center gap-2 bg-white border border-dark/8 px-4 py-2 rounded-full text-xs font-medium text-dark/60">
              <Check size={12} className="text-primary" /> {f}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =================== ELYFITNESS APP (ex Plan Anual) =================== */
function ElyFitnessApp() {
  const APP_VIDEO = 'https://video.wixstatic.com/video/4cd4b0_d9ff65c4b76343a6988372fccb6cc847/720p/mp4/file.mp4';
  const features = [
    'Plan alimentación personalizado',
    'Entrenos en vídeo gym y casa',
    'Recetas nuevas cada mes',
    'Comunidad privada',
    'Chat con nutri y soporte',
    'Lista de la compra',
    'Clases dirigidas',
    'Buscador de recetas',
  ];

  return (
    <section id="app" className="py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.gym3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/85" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">Tu APP de fitness · Entrenos, recetas y planes a tu ritmo</p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white leading-[0.85]">ElyFitness <span className="text-primary">APP</span></h2>
          <p className="text-white/40 text-sm mt-3 max-w-xl mx-auto">Diseñada para quienes quieren cuidarse de forma económica, flexible y a su ritmo.</p>
        </motion.div>

        {/* Single pricing block with phone mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-dark/90 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-[1fr_auto] items-stretch">
            {/* Left — pricing content */}
            <div className="p-8 sm:p-10 lg:p-12">
              {/* Price row */}
              <div className="flex flex-wrap items-end gap-6 mb-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Individual</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-6xl font-black text-white">59€</span>
                    <span className="text-sm text-white/30 font-semibold">/año</span>
                  </div>
                  <p className="text-sm text-white/35 mt-1">Solo 4,92 €/mes</p>
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
                  <p className="text-2xl font-black text-white">69€ <span className="text-sm font-semibold text-white/40">/2 personas</span></p>
                </motion.div>
              </div>

              <p className="text-white/40 text-sm mb-8">Pago único. Sin permanencia. Descargá la APP al instante.</p>

              <div className="h-px bg-white/8 mb-8" />

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10">
                {features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-md bg-primary/15 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-primary" />
                    </div>
                    <span className="text-sm text-white/60">{f}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <MagneticButton href="https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT" target="_blank" className="inline-flex items-center justify-center gap-2 bg-white text-dark px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-cream hover:shadow-lg transition-all group">
                EMPIEZA YA <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>

            {/* Right — phone mockup */}
            <div className="hidden lg:flex flex-col items-center justify-center px-10 py-10 bg-white/[0.03] gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Tu APP</p>
              <p className="text-[11px] text-white/40 -mt-2">Todo tu plan en el móvil</p>
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, type: 'spring', damping: 20 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/15 blur-[40px] rounded-full scale-90 pointer-events-none" />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="relative w-48 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-sm rounded-[2rem] p-2.5 shadow-2xl border border-white/15"
                >
                  <div className="rounded-[1.5rem] aspect-[9/16] overflow-hidden relative bg-[#1a1a1a]">
                    <video src={APP_VIDEO} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =================== MANIFESTO (video background) =================== */
function Manifesto() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <video src={ELY_VIDEO} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-dark/75" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight text-white">
            Tu mejor versión <span className="text-primary">no se compra.</span>
          </motion.p>
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/50 mt-4 leading-relaxed max-w-lg mx-auto">
            Se construye. Con constancia, con un plan real y con alguien que te acompañe en cada paso.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <a href="#contacto" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-all hover:shadow-[0_0_20px_rgba(217,163,255,0.3)]">
              Empieza tu cambio hoy <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* =================== ABOUT =================== */
function About() {
  const [expanded, setExpanded] = useState(false);
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
                      <p className="text-sm font-black text-dark">+13 años</p>
                      <p className="text-[10px] text-dark/50">de experiencia</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:py-8">
            <motion.a href="https://www.instagram.com/ely_fitness/" target="_blank" rel="noopener noreferrer" variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/15 rounded-full px-4 py-1.5 mb-5 transition-colors">
              <Instagram size={14} className="text-primary-dark" /> <span className="text-xs font-bold text-dark/70">@ely_fitness</span>
            </motion.a>
            <motion.p variants={fadeUp} className="text-primary-dark font-bold text-xs uppercase tracking-widest mb-3">Sobre mí</motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase mb-4 leading-[0.85]">Soy <span className="text-primary">Ely</span></motion.h2>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-primary-dark font-semibold italic mb-8">Mi pasión es sentirme vital y en forma</motion.p>

            <motion.p variants={fadeUp} className="text-dark/60 leading-relaxed mb-5 text-[15px]">
              Alimentarse es una necesidad, pero hacerlo de forma inteligente es un arte.
              Aprendí a nutrirme según mis necesidades y objetivos, disfrutando del proceso sin renunciar
              a los pequeños placeres ni a los momentos especiales.
            </motion.p>

            {/* Credentials — always visible */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-dark/8 p-6 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40 mb-4">Credenciales</p>
              <div className="space-y-3">
                {[
                  { title: 'Dietista', desc: 'Formación oficial en dietética y nutrición' },
                  { title: 'Entrenadora Personal IFBB', desc: 'Certificada por la federación internacional' },
                  { title: 'Nutrición Deportiva', desc: 'Especialización en rendimiento y composición corporal' },
                  { title: 'Auxiliar de Enfermería', desc: '6 años de experiencia en hospitales' },
                  { title: 'Téc. Sup. Documentación Sanitaria', desc: 'Formación sanitaria complementaria' },
                ].map(c => (
                  <div key={c.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-primary-dark" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">{c.title}</p>
                      <p className="text-[12px] text-dark/50">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Expandable content — only on mobile */}
            <div className="lg:hidden">
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="text-dark/60 leading-relaxed mb-5 text-[15px]">
                      Me apasiona sentirme fuerte, vital y en forma, sin vivir atada a la idea de &quot;estar a dieta&quot;.
                      Descubrí el mundo de la nutrición como una herramienta poderosa para potenciar el rendimiento, la salud y la felicidad.
                    </p>
                    <p className="text-dark/80 leading-relaxed mb-8 font-semibold text-[15px]">
                      Mi misión: enseñarte a disfrutar de tu alimentación y entrenamiento sin que se conviertan en un sacrificio.
                    </p>
                    <p className="text-dark/80 leading-relaxed font-semibold text-base italic border-l-4 border-primary pl-5 mb-8">
                      &ldquo;Comer bien no significa renunciar al placer. Significa aprender a disfrutar cuidándote.&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 text-primary-dark text-sm font-bold mb-8 transition-colors hover:text-primary"
              >
                {expanded ? 'Leer menos' : 'Leer más sobre Ely'}
                <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Full content — always visible on desktop */}
            <div className="hidden lg:block">
              <motion.p variants={fadeUp} className="text-dark/60 leading-relaxed mb-5 text-[15px]">
                Me apasiona sentirme fuerte, vital y en forma, sin vivir atada a la idea de &quot;estar a dieta&quot;.
                Descubrí el mundo de la nutrición como una herramienta poderosa para potenciar el rendimiento, la salud y la felicidad.
              </motion.p>
              <motion.p variants={fadeUp} className="text-dark/80 leading-relaxed mb-8 font-semibold text-[15px]">
                Mi misión: enseñarte a disfrutar de tu alimentación y entrenamiento sin que se conviertan en un sacrificio.
              </motion.p>
              <motion.p variants={fadeUp} className="text-dark/80 leading-relaxed font-semibold text-base italic border-l-4 border-primary pl-5 mb-8">
                &ldquo;Comer bien no significa renunciar al placer. Significa aprender a disfrutar cuidándote.&rdquo;
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/ely_fitness/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-dark hover:bg-dark-soft text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
                <Instagram size={16} /> Sígueme en Instagram
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

/* =================== FAQ =================== */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'Coaching vs APP — ¿cuál es para mí?', a: 'Coaching = seguimiento 1:1 conmigo, chat diario, ajustes constantes. Ideal si quieres resultados rápidos y guía personalizada. La APP = plan low cost con entrenos, recetas y comunidad a tu ritmo.' },
    { q: '¿Cuándo empiezo a ver resultados?', a: 'La mayoría nota cambios en 2-4 semanas: menos hinchazón, más energía y mejor relación con la comida. Resultados visibles significativos entre 2-3 meses.' },
    { q: '¿Tengo intolerancias o patologías, me sirve?', a: 'Adapto absolutamente todo: SIBO, SOP, tiroides, embarazo, lactancia, intolerancias. Reviso tus analíticas para personalizar al 100%.' },
    { q: '¿Hay permanencia o compromiso mínimo?', a: 'No. El coaching no tiene permanencia — puedes cancelar cuando quieras. La APP es pago único de 59€ por todo el año.' },
    { q: '¿Qué incluye la APP de Ely Fitness?', a: 'Entrenamientos grabados en vídeo, recetas nuevas cada mes, seguimiento de tu progreso con fotos, comunidad privada de apoyo y chat directo.' },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.p variants={fadeUp} className="text-primary-dark font-bold text-xs uppercase tracking-widest mb-3">Resolvemos tus dudas</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black uppercase">Preguntas <span className="text-primary">frecuentes</span></motion.h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`bg-cream rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? 'shadow-md border-l-4 border-l-primary border-y border-r border-primary/25' : 'border border-dark/8 hover:shadow-sm'}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4">
                <span className="font-bold text-sm sm:text-[15px] text-dark">{f.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open === i ? 'bg-primary text-white rotate-180' : 'bg-peach-light text-dark/40'}`}>
                  <ChevronDown size={14} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-dark/60 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== CONTACT =================== */
function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); };
  return (
    <section id="contacto" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.community} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-primary font-bold text-xs uppercase tracking-widest mb-3">Contacto</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black uppercase mb-3 text-white">¿Lista para<br /><span className="text-primary">tu cambio?</span></motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 mb-10">Elegí tu plan y escribime. Respondo en menos de 24h.</motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-10 sm:p-14 text-center shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-dark">¡Mensaje enviado!</h3>
              <p className="text-dark/55 text-sm">Te responderé en menos de 24 horas. Revisa tu email.</p>
              <a href="mailto:contacta@elyfitness.es" className="inline-flex items-center gap-2 mt-6 text-primary-dark text-sm font-bold hover:underline">
                <Send size={14} /> contacta@elyfitness.es
              </a>
            </motion.div>
          ) : (
            <motion.form key="form" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="bg-white rounded-2xl p-7 sm:p-10 space-y-4 text-left shadow-2xl" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.input variants={fadeUp} type="text" placeholder="Tu nombre" required className="bg-cream border border-dark/10 rounded-xl px-5 py-3.5 text-sm text-dark focus:outline-none focus:border-[#D9A3FF] focus:ring-2 focus:ring-[#D9A3FF]/30 w-full transition-all placeholder:text-dark/40" />
                <motion.input variants={fadeUp} type="email" placeholder="Tu e-mail" required className="bg-cream border border-dark/10 rounded-xl px-5 py-3.5 text-sm text-dark focus:outline-none focus:border-[#D9A3FF] focus:ring-2 focus:ring-[#D9A3FF]/30 w-full transition-all placeholder:text-dark/40" />
              </div>
              <motion.select variants={fadeUp} className="bg-cream border border-dark/10 rounded-xl px-5 py-3.5 text-sm text-dark/60 focus:outline-none focus:border-[#D9A3FF] focus:ring-2 focus:ring-[#D9A3FF]/30 w-full transition-all">
                <option>¿Qué plan te interesa?</option>
                <option>Premium</option><option>Running</option><option>Nutrición</option><option>Training</option>
                <option>ElyFitness APP (59€/año)</option><option>Pack Duo (69€/año)</option><option>Otra consulta</option>
              </motion.select>
              <motion.textarea variants={fadeUp} rows={4} placeholder="Cuéntame tu objetivo..." className="bg-cream border border-dark/10 rounded-xl px-5 py-3.5 text-sm text-dark focus:outline-none focus:border-[#D9A3FF] focus:ring-2 focus:ring-[#D9A3FF]/30 w-full resize-none transition-all placeholder:text-dark/40" />
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
              { name: 'YouTube', icon: <Zap size={14} />, url: 'https://www.youtube.com/@ely_fitness' },
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

/* =================== FOOTER (V2 - Shop & Brands as links) =================== */
function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid sm:grid-cols-3 gap-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black tracking-tight">ELY</span>
              <span className="text-[8px] font-bold uppercase leading-tight text-primary">FITNESS<br />&amp; NUTRITION</span>
            </div>
            <p className="text-white/55 text-xs leading-relaxed max-w-xs">Dietista y Entrenadora Personal IFBB. Nutrición deportiva y entrenamiento personalizado online desde hace más de 13 años.</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-white/55 mb-4 tracking-widest">Secciones</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '#cambios', label: 'Resultados' },
                { href: '#coaching', label: 'Coaching 1 a 1' },
                { href: '#app', label: 'ElyFitness APP' },
                { href: '#sobre-mi', label: 'Sobre mí' },
                { href: '#prozis', label: 'Prozis' },
                { href: '#contacto', label: 'Contacto' },
              ].map(l => (
                <a key={l.href} href={l.href} className="text-white/50 hover:text-white/70 text-xs transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-white/55 mb-4 tracking-widest">Conecta</p>
            <p className="text-white/55 text-xs mb-3">contacta@elyfitness.es</p>
            <div className="flex gap-2 mb-5">
              {[
                { label: 'IG', icon: <Instagram size={12} />, url: 'https://www.instagram.com/ely_fitness/' },
                { label: 'TK', icon: <Heart size={12} />, url: 'https://www.tiktok.com/@ely_fitness' },
                { label: 'YT', icon: <Zap size={12} />, url: 'https://www.youtube.com/@ely_fitness' },
              ].map(r => (
                <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/8 hover:bg-primary/20 flex items-center justify-center transition-all text-white/55 hover:text-primary">{r.icon}</a>
              ))}
            </div>
            {/* Prozis */}
            <p className="text-[10px] font-bold uppercase text-white/55 mb-2 tracking-widest">Patrocinador</p>
            <p className="text-white/40 text-xs">Código ELY 10% dto → <a href="https://www.prozis.com/es/es" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark transition-colors">Prozis</a></p>
          </div>
        </div>
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap justify-center gap-5 text-[10px] text-white/50">
            <a href="#" className="hover:text-white/70 transition-colors">Condiciones</a>
            <a href="#" className="hover:text-white/70 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white/70 transition-colors">Cookies</a>
          </div>
          <p className="text-[10px] text-white/50">&copy; {new Date().getFullYear()} ELY FITNESS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

/* =================== STICKY CTA (V2 - smarter, shows plan pricing) =================== */
function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => {
      const planesEl = document.getElementById('planes');
      const anualEl = document.getElementById('anual');
      if (!planesEl) return;
      const planesBottom = planesEl.getBoundingClientRect().bottom;
      const pastHero = window.scrollY > 600;
      const beforePlanes = planesBottom > 0;
      setShow(pastHero && beforePlanes);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-6 left-0 right-0 z-30 flex justify-center px-4">
          {/* Mobile — full width bar */}
          <a href="#coaching" className="sm:hidden flex items-center justify-center gap-2 w-full bg-primary text-white py-3.5 rounded-2xl font-bold uppercase text-sm shadow-xl shadow-primary/30">
            Ver planes desde 59€/año <ArrowRight size={14} />
          </a>
          {/* Desktop — floating pill */}
          <a href="#coaching" className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold uppercase text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all">
            Ver planes desde 59€/año <ArrowRight size={14} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =================== NEWSLETTER MODAL =================== */
function NewsletterModal() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 3000);
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
                      <h3 className="text-xl font-black mb-2 text-dark">¡Bienvenid@!</h3>
                      <p className="text-sm text-dark/45">Revisa tu email para confirmar la suscripción.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form">
                      <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-4 text-dark">
                        Recupera tu energía, salud y bienestar
                      </h3>
                      <p className="text-sm text-dark/45 mb-6 leading-relaxed">
                        Apúntate a mi newsletter y recibe consejos reales y prácticos sobre alimentación, entrenamiento y autocuidado.
                      </p>
                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <input type="text" placeholder="Tu nombre" required className="w-full bg-white border border-dark/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/30 placeholder:text-dark/35" />
                        <input type="email" placeholder="Tu email" required className="w-full bg-white border border-dark/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/30 placeholder:text-dark/35" />
                        <button type="submit" className="w-full bg-dark hover:bg-dark-soft text-white py-3.5 rounded-xl font-bold text-sm uppercase transition-all">
                          SUSCRIBIRME
                        </button>
                      </form>
                      <p className="text-[10px] text-dark/20 mt-4 flex items-start gap-1.5">
                        <Sparkles size={10} className="text-primary shrink-0 mt-0.5" />
                        Serás de las primeras en enterarte de novedades y descuentos exclusivos.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden sm:block relative">
                <img src={ELY_MODAL} alt="Ely Fitness" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* =================== PROZIS SECTION =================== */
const PROZIS_PRODUCTS = [
  {
    name: 'Creatina Micropure',
    desc: 'Para rendir más, recuperarte mejor y tener más foco cognitivo.',
    img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1698746_prozis_creatine-micronpure-300g_newin.webp',
    url: 'https://www.prozis.com/es/es/prozis/creatina-micronpure-300-g/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af&utm_content=product',
  },
  {
    name: 'Colágeno Hidrolizado',
    desc: 'PeptiPlus 900g. Para articulaciones, piel y recuperación muscular.',
    img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1708709_prozis_peptiplus-hydrolyzed-collagen-protein-900g_newin.webp',
    url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af',
  },
  {
    name: 'Ely x Prozis',
    desc: 'Mi selección de suplementación, snacks saludables y ropa deportiva favorita.',
    img: 'https://static.wixstatic.com/media/daf224_4c28ae1a03584cb6aea95c0817480351~mv2.png/v1/fill/w_358,h_478,q_90,enc_avif,quality_auto/daf224_4c28ae1a03584cb6aea95c0817480351~mv2.png',
    url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af',
  },
  {
    name: 'Duffle Backpack 35L',
    desc: 'Mochila deportiva Core Workout. Ideal para llevar todo al gym.',
    img: 'https://static.sscontent.com/thumb/500/500/products/124/v1499995_prozis_core-workout-duffle-backpack-35l-black_single-size_black_other2.webp',
    url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af',
  },
  {
    name: 'Guantes Minimalist',
    desc: 'Guantes acolchados para entrenamiento. Agarre y protección.',
    img: 'https://static.sscontent.com/thumb/1000/1000/products/124/v1498172_prozis_minimalist-padded-gloves-black_s_black_newin.webp',
    url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af',
  },
  {
    name: 'Suplementación Top',
    desc: 'Omega 3, magnesio, vitaminas y más. Todo lo que uso a diario.',
    img: IMG.lifestyle1,
    url: 'https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af',
  },
];

function ProzisCarousel() {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('a')?.offsetWidth || 220;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => { el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); };
  }, []);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Suplementación, ropa y accesorios</p>
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={() => scroll(-1)} disabled={!canLeft} className="w-9 h-9 rounded-full border border-dark/10 flex items-center justify-center hover:bg-dark hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-dark transition-all">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scroll(1)} disabled={!canRight} className="w-9 h-9 rounded-full border border-dark/10 flex items-center justify-center hover:bg-dark hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-dark transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Desktop: horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="hidden sm:flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {PROZIS_PRODUCTS.map(p => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl border border-dark/8 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 shrink-0 w-[200px]"
          >
            <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full">-10%</div>
            </div>
            <div className="p-3">
              <h4 className="font-black text-sm text-dark mb-0.5 truncate">{p.name}</h4>
              <p className="text-[11px] text-dark/45 leading-relaxed line-clamp-2">{p.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile: vertical 2-column grid */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {PROZIS_PRODUCTS.map(p => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-xl border border-dark/8 overflow-hidden active:scale-[0.98] transition-transform"
          >
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
  return (
    <section id="prozis" className="py-12 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Discount banner */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8">
          <div className="relative bg-dark rounded-2xl p-6 sm:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                  <span className="text-primary">10% dto</span> en Prozis
                </h2>
                <p className="text-white/50 text-sm mt-1">Suplementos, ropa y accesorios fitness con mi código exclusivo</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-white/10 border-2 border-dashed border-primary/50 rounded-xl px-6 py-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Código</p>
                  <p className="text-3xl font-black text-primary tracking-wider">ELY</p>
                </div>
                <a
                  href="https://www.prozis.com/es/es/?ot=AFFES2777&utm_source=prz_affiliate&utm_medium=referral&utm_campaign=el_es_ib_pr_af"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all group"
                >
                  Ir a Prozis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product carousel */}
        <ProzisCarousel />
      </div>
    </section>
  );
}

/* =================== CHAT WIDGET =================== */
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const options = [
    { label: 'Quiero un cambio real', href: '#contacto' },
    { label: 'Coaching Personalizado', href: '#coaching' },
    { label: 'ElyFitness APP', href: '#app' },
    { label: 'Contactar por WhatsApp', href: 'https://wa.me/message', external: true },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-dark/10 overflow-hidden mb-2"
          >
            <div className="bg-dark p-4">
              <p className="text-white font-bold text-sm">Hola! ¿En qué te puedo ayudar?</p>
              <p className="text-white/50 text-xs mt-0.5">Ely Fitness</p>
            </div>
            <div className="p-3 space-y-1.5">
              {options.map(o => (
                <a
                  key={o.label}
                  href={o.href}
                  target={o.external ? '_blank' : undefined}
                  rel={o.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cream hover:bg-primary/10 transition-colors group"
                >
                  <ArrowRight size={12} className="text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  <span className="text-sm font-medium text-dark/70 group-hover:text-dark">{o.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${open ? 'bg-dark text-white rotate-0' : 'bg-primary text-white hover:bg-primary-dark shadow-primary/30'}`}
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

/* =================== PAGE (V3 - Restructured) =================== */
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
      <ChatWidget />
      <NewsletterModal />
    </>
  );
}
