import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Filter, Crown, Download, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const CAMBIOS = [
  {
    name: 'C.B.', result: '-20 kg', plan: 'coaching',
    text: 'Empece el plan ultra con muchas dudas y miedo a entrenar con pesas, pensaba que me veria mas grande. Nunca imagine que podia conseguirlo. Gracias a Ely he perdido mas de 20 kg de forma saludable, entreno cinco dias por semana y me siento fuerte, constante y feliz. No paso hambre, no tengo ansiedad por comer y he vuelto a mirarme al espejo con orgullo.',
    before: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
  },
  {
    name: 'N.T.', result: 'Competicion', plan: 'coaching',
    text: 'He podido avanzar mi ilusion de competir. Ha sido un proceso que me ha hecho crecer, dentro y fuera del entreno. Ahora me apetece reconectar con mi cuerpo desde otro enfoque, mas consciente y duradero. Se que con Ely lo hare bien, con ganas y equilibrio.',
    before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
  },
  {
    name: 'V.M.', result: 'Recomposicion', plan: 'coaching',
    text: 'Empece con Ely con muchas ganas, pero tambien con muchas dudas. Su apoyo fue tan cercano que senti que me acompanaba en cada paso. Al principio solo queria recuperar habitos y confianza, pero acabe transformando mi cuerpo y mi mentalidad. Baje muchisimo volumen en abdomen y piernas, y hoy me siento fuerte, segura y feliz.',
    before: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
  },
  {
    name: 'M.M.', result: 'Sin medicacion', plan: 'coaching',
    text: 'Nunca imagine que la mujer a la que admiraba por redes sociales dispusiera tanta fuerza y motivacion real para superar mi desanimo. Llegue al plan luchando con fibromialgia, artrosis, diverticulitis, tinnitus y una psoriasis muy agresiva. Desde el primer momento me volque al 200% en el Plan Ultra Premium, hoy vivo sin medicacion, con mas salud, autoestima y una relacion preciosa con mi cuerpo.',
    before: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80',
  },
  {
    name: 'V.G.', result: '-4.5 kg / 4 sem', plan: 'coaching',
    text: 'Dormia pocas horas por mi hija pequena, y aun asi no he dejado de entrenar ni un solo dia. Nunca me habia sentido tan bien por dentro y por fuera. Alucino cuando comparo mis fotos del inicio con las de ahora. He eliminado el azucar sin echarla de menos, entreno con energia y hasta me he marcado como reto hacer mi primera dominada.',
    before: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
  },
  {
    name: 'T.H.', result: 'Recuperacion', plan: 'coaching',
    text: 'Despues de mis dos partos, turnos de noche, lactancia y poco descanso... sentia que habia perdido un poco a mi misma. No buscaba tener un cuerpo de portada, solo volver a sentirme bien y con energia. He bajado 4,5 kg en 4 semanas, pero lo que mas me emociona es todo lo que he ganado en seguridad y alegria. He recuperado la menstruacion, y eso para mi lo dice todo.',
    before: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80',
  },
  {
    name: 'E.A.', result: 'Recomposicion', plan: 'coaching',
    text: 'Entreno desde casa y gimnasio, compaginando mi trabajo como terapeuta ocupacional en USA con una vida activa y equilibrada. Estoy profundamente agradecida por todo lo que he logrado con el Plan Ultra Premium.',
    before: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80',
  },
  {
    name: 'L.R.', result: '+Fuerza', plan: 'app',
    text: 'Con la APP entreno 4 veces por semana. He ganado fuerza y confianza sin gastar mucho. Los entrenos en video son claros y faciles de seguir. La comunidad me motiva a no faltar nunca.',
    before: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
  },
  {
    name: 'A.G.', result: '-8 kg', plan: 'app',
    text: 'El plan anual de la APP me cambio la vida. Recetas faciles y entrenos que puedo seguir desde casa. He bajado 8 kg en 5 meses sin pasar hambre y sin necesitar un coach personal.',
    before: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80',
  },
  {
    name: 'I.R.', result: 'Habitos', plan: 'app',
    text: 'Aprendi que no se trata de ser perfecta, sino constante. Me organizo mejor, entiendo mi cuerpo y lo respeto. La APP me dio estructura sin presion, y eso es lo que necesitaba.',
    before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
  },
  {
    name: 'N.C.', result: '-6 kg', plan: 'app',
    text: 'He aprendido a sumar, a organizarme con los peques y a disfrutar incluso en vacaciones sin culpa. Hoy me siento mas fuerte, con el abdomen y la espalda mas definidos, y con una paz que hacia mucho no sentia.',
    before: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
  },
  {
    name: 'P.S.', result: 'Masa muscular', plan: 'coaching',
    text: 'Siempre pense que comer mas significaba engordar. Ely me enseno a nutrirme bien, a ganar masa muscular y a dejar de tener miedo a la comida. Ha sido el mejor cambio de mi vida.',
    before: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
  },
];

export default function CambiosPage() {
  const [filter, setFilter] = useState('todos');
  const [selected, setSelected] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = filter === 'todos' ? CAMBIOS : CAMBIOS.filter(c => c.plan === filter);
  const tabs = [
    { key: 'todos', label: 'Todos', count: CAMBIOS.length },
    { key: 'coaching', label: 'Coaching', count: CAMBIOS.filter(c => c.plan === 'coaching').length },
    { key: 'app', label: 'APP', count: CAMBIOS.filter(c => c.plan === 'app').length },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase">+4.000 cambios <span className="text-gradient">reales</span></h1>
          <p className="text-white/40 text-sm sm:text-base mt-2 max-w-lg">Sin atajos. Solo constancia, un plan real y alguien que te acompana en cada paso.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-md border-b border-dark/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-dark/30" />
            <div className="flex gap-1.5">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => setFilter(tab.key)} className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-all ${filter === tab.key ? 'bg-dark text-white shadow-sm' : 'bg-white border border-dark/10 text-dark/40 hover:text-dark/60'}`}>
                  {tab.label} <span className="text-[9px] opacity-50 ml-0.5">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[10px] text-dark/30 font-medium">
            <span className="inline-flex items-center gap-1"><Crown size={10} className="text-primary" /> Coaching</span>
            <span className="inline-flex items-center gap-1"><Download size={10} /> APP</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                key={c.name + c.result}
                variants={fadeUp}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid mb-4 sm:mb-5"
              >
                <div
                  onClick={() => setSelected(c)}
                  className="bg-white rounded-2xl border border-dark/8 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  {/* Header bar */}
                  <div className="bg-primary/80 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-white/60 uppercase">ELY FITNESS</span>
                    </div>
                    <span className="text-sm font-black text-white">{c.name}</span>
                  </div>

                  {/* Before/After photos */}
                  <div className="grid grid-cols-2 gap-px bg-dark/10">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img src={c.before} alt="Antes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <span className="absolute bottom-2 left-2 bg-white/85 text-dark text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Antes</span>
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img src={c.after} alt="Despues" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <span className="absolute bottom-2 right-2 bg-primary text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Despues</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${c.plan === 'coaching' ? 'bg-primary/10 text-primary-dark' : 'bg-dark/5 text-dark/40'}`}>
                          {c.plan === 'coaching' ? 'Coaching' : 'APP'}
                        </span>
                        <span className="text-primary font-bold text-xs">{c.result}</span>
                      </div>
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(j => <Star key={j} size={9} className="fill-yellow-400 text-yellow-400" />)}</div>
                    </div>
                    <p className="text-[11px] sm:text-xs text-dark/50 leading-relaxed">&quot;{c.text}&quot;</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-dark/30 text-sm">No hay resultados para este filtro.</p>
          </div>
        )}
      </div>

      {/* CTA bottom */}
      <div className="bg-dark py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-3">Tu puedes ser el <span className="text-gradient">siguiente</span></h2>
        <p className="text-white/35 text-sm mb-6">Elegi tu plan y empieza tu transformacion.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/#planes" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase transition-all">
            Ver planes
          </Link>
          <Link to="/#contacto" className="inline-flex items-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/40 px-7 py-3.5 rounded-full font-bold text-sm uppercase transition-all">
            Contactar
          </Link>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-50" onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', damping: 25 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full pointer-events-auto relative overflow-hidden max-h-[90vh] overflow-y-auto">
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-dark/5">
                  <X size={16} />
                </button>

                <div className="grid grid-cols-2 gap-px bg-dark/10">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={selected.before} alt="Antes" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-white/85 text-dark text-[9px] font-bold uppercase px-2.5 py-1 rounded-full">Antes</span>
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={selected.after} alt="Despues" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-primary text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full">Despues</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-dark">{selected.name}</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${selected.plan === 'coaching' ? 'bg-primary/10 text-primary-dark' : 'bg-dark/5 text-dark/40'}`}>
                        {selected.plan === 'coaching' ? 'Coaching' : 'APP'}
                      </span>
                    </div>
                    <span className="text-primary font-bold text-sm">{selected.result}</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(j => <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-sm text-dark/55 leading-relaxed">&quot;{selected.text}&quot;</p>

                  <div className="mt-6 pt-4 border-t border-dark/8">
                    <Link to="/#contacto" onClick={() => setSelected(null)} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold text-sm uppercase transition-all">
                      Quiero mi cambio
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
