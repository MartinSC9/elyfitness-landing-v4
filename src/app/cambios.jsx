import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, X, Users, Smartphone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } };
const stagger = { visible: { transition: { staggerChildren: 0.04 } } };

const CAMBIOS_ULTRA = [
  // --- SECCION 1 ---
  {
    name: 'C.B.', result: '-20 kg', plan: 'ultra',
    text: 'Empecé el plan ultra con muchas dudas y miedo a entrenar con pesas, pensaba que me vería más grande. Nunca imaginé que podría conseguirlo. Gracias a Ely he perdido más de 20 kg de forma saludable, entreno cinco días por semana y me siento fuerte, constante y feliz. No paso hambre, no tengo ansiedad por comer y he vuelto a mirarme al espejo con orgullo. Este verano me compré un bikini por primera vez en años, y lo hice sonriendo.',
    img: '/cambios/carla.webp',
  },
  {
    name: 'N.T.', result: 'Competición', plan: 'ultra',
    text: 'He podido avanzar en mi ilusión de competir. Ha sido un proceso que me ha hecho crecer, dentro y fuera del entreno. Ahora, me apetece reconectar con mi cuerpo desde otro enfoque, más consciente y duradero. Sé que con Ely lo haré bien, con ganas y equilibrio. Es momento de disfrutar, aprender y construir con cabeza para mantenerlo a largo plazo.',
    img: '/cambios/nt.webp',
  },
  {
    name: 'V.M.', result: 'Recomposición', plan: 'ultra',
    text: 'Empecé con Ely con muchas ganas, pero también con muchas dudas. Su apoyo fue tan cercano que sentí que me acompañaba en cada paso. Al principio solo quería recuperar hábitos y confianza, pero acabé transformando mi cuerpo y mi mentalidad. Aprendí que no se trata de ser perfecta, sino constante. Bajé muchísimo volumen en abdomen y piernas, y hoy me siento fuerte, segura y feliz. Ely entendió perfectamente mis analíticas de sangre y pudimos avanzar mucho con ello.',
    img: '/cambios/vane-m.webp',
  },
  {
    name: 'M. M.', result: 'Sin medicación', plan: 'ultra',
    text: 'Nunca imaginé que la mujer a la que admiraba por redes acabaría dándome tanta fuerza y motivación real para superar mi depresión. Llegué al plan luchando con fibromialgia, artrosis, diverticulitis, tinnitus y una psoriasis muy agresiva… pero con unas ganas inmensas de salir adelante. Desde el primer momento me volqué al 200% en el Plan Ultra Premium+, hoy vivo sin medicación, con más salud, autoestima y una relación preciosa con mi cuerpo.',
    img: '/cambios/monica.webp',
  },
  {
    name: 'V.G.', result: 'Fuerza + Energía', plan: 'ultra',
    text: 'Dormía pocas horas por mi hija pequeña, y aun así no he dejado de entrenar ni un solo día. Nunca me había sentido tan bien por dentro y por fuera. Alucino cuando comparo mis fotos del inicio con las de ahora. He eliminado el azúcar sin echarlo de menos, entreno con energía y hasta me he marcado como reto hacer mi primera dominada. Gracias Ely por acompañarme en este proceso. Soy otra persona.',
    img: '/cambios/vicky.webp',
  },
  {
    name: 'T.H.', result: '-4,5 kg / 4 sem', plan: 'ultra',
    text: 'Después de mis dos partos, turnos de noche, lactancia y poco descanso… sentía que me había perdido un poco a mí misma. He bajado 4,5 kg en 4 semanas, pero lo que más me emociona es todo lo que he ganado en seguridad y alegría. Después de más de dos años, he recuperado la menstruación, y eso para mí lo dice todo: mi cuerpo vuelve a estar en equilibrio. He aprendido a comer, a organizarme con los peques y a disfrutar incluso en vacaciones sin culpa.',
    img: '/cambios/tami.webp',
  },
  {
    name: 'E.A.', result: 'Recomposición', plan: 'ultra',
    text: 'Empecé entrenando en casa, sin apenas material y con muchas dudas de si sería capaz de mantener la constancia. Poco a poco fui aprendiendo a organizarme, a entender mi cuerpo y a disfrutar del proceso sin exigirme tanto. Gracias a Ely mejoré mi fuerza, mi técnica y mi confianza, y ver mis progresos me motivaba cada semana. Hoy tengo mi propio espacio de entrenamiento en casa, me siento más fuerte que nunca y, sobre todo, orgullosa de haber construido esta disciplina y equilibrio en mi vida.',
    img: '/cambios/ester-alvarez.webp',
  },
  {
    name: 'L.R.', result: '+Fuerza', plan: 'ultra',
    text: 'Con Ely no solo he transformado mi cuerpo, he aprendido a entrenar con intención, a escucharme y a ser más amable conmigo misma. A pesar de las molestias en el hombro y las semanas de duda, nunca he dejado de avanzar. Hoy entreno con más foco, como mejor y me siento más fuerte por dentro y por fuera. He aprendido a canalizar mi autoexigencia y a disfrutar del proceso. Ely me ha dado herramientas que van mucho más allá de la estética, y eso es lo que más valoro.',
    img: '/cambios/leti-rejido.webp',
  },
  {
    name: 'M.C.', result: 'Running', plan: 'ultra',
    text: 'Empecé con Ely queriendo mejorar mis tiempos en carrera, pero sin imaginar cuánto podía cambiar mi cuerpo y mi rendimiento. Gracias al Plan Ultra enfocado al running, he ganado masa muscular, potencia y una energía que antes no tenía. Ahora corro más rápido, con mejores sensaciones y he superado todas mis marcas personales. Cada entrenamiento tiene sentido, y por fin siento que mi cuerpo y mi mente van en la misma dirección.',
    img: '/cambios/mr-cirera.webp',
  },
  // --- SECCION 2 ---
  {
    name: 'V.C.', result: 'Definición', plan: 'ultra',
    text: 'Con Ely he aprendido a perder esa grasilla que llevaba tiempo queriendo eliminar, pero sin obsesionarme. Su dedicación tan cercana y su forma de guiarme han marcado la diferencia. He mejorado muchísimo mi glúteo, noto mi cuerpo más firme, definido y con fuerza real. Cada semana me siento más segura y orgullosa del proceso. Hoy tengo más energía, más constancia y, sobre todo, una nueva confianza en mí misma gracias al acompañamiento de Ely.',
    img: '/cambios/vanesa-carbe.webp',
  },
  {
    name: 'L.F.', result: 'Condición física', plan: 'ultra',
    text: 'Ely es mucho más que una entrenadora, es una gran amiga. Gracias a sus Campus y ULTRAS he podido compartir con ella en persona y sentir su energía de cerca, algo que me ha motivado aún más. He mejorado mi condición física, corro con más fuerza y disfruto mucho más de cada carrera. Me siento en mi mejor momento. Ahora toca centrarse en ganar volumen, seguir aprendiendo y disfrutar del proceso con la misma ilusión de siempre.',
    img: '/cambios/l-flores.webp',
  },
  {
    name: 'M. P.', result: 'Abdomen', plan: 'ultra',
    text: 'Hace varios años estuve con Ely, y desde entonces su experiencia y cercanía me han acompañado siempre. Me siento genial, he reducido muchísimo el abdomen y hago ejercicios que antes pensaba que nunca podría hacer. Ely me ha cambiado la vida, no solo por los resultados físicos, sino por cómo ha transformado mi forma de verme y cuidarme. Después de tantos años, sigo con la misma dinámica, motivada y disfrutando de cada paso del camino.',
    img: '/cambios/mm-palacios.webp',
  },
  {
    name: 'M. G.', result: '+Fuerza', plan: 'ultra',
    text: 'Gracias a mi pareja, que me recomendó a Ely, di el giro que necesitaba para conseguir el físico que siempre había querido. Su plan me ayudó a entender cómo entrenar y alimentarme de forma eficiente. Hoy me siento más fuerte y con la motivación deseada. He aprendido a mantener los resultados sin perder el equilibrio. Muy contento con mis nuevos proyectos y con todo lo que he logrado gracias a Ely.',
    img: '/cambios/miguel-garcia.webp',
  },
  {
    name: 'E.B.', result: 'Estilo de vida', plan: 'ultra',
    text: 'Gracias a Ely descubrí un estilo de vida que me cambió por completo. Aprendí a alimentarme mejor, a entrenar con intención y a disfrutar del proceso sin obsesionarme. En estos meses he mejorado mi fuerza, mi composición corporal y, sobre todo, mi mentalidad. Entrenar y cuidarme ahora forman parte de mí. Siento que tengo el control, me veo más fuerte y más segura que nunca.',
    img: '/cambios/elena-barquilla.webp',
  },
  {
    name: 'C.R.', result: 'Composición', plan: 'ultra',
    text: 'Llegué a Ely con ganas, poco tiempo y muchas horas sentada, pero con su guía aprendí a organizarme, a comer con sentido y a entrenar con intención. Entreno en casa con constancia, aplico progresión de cargas y por fin veo cómo cambian mi fuerza y mi composición corporal. Me siento más activa, más segura y sin ansiedad con la comida: disfruto del proceso y del equilibrio.',
    img: '/cambios/cristina-suarez.webp',
  },
  {
    name: 'A.C.', result: 'Confianza', plan: 'ultra',
    text: 'He ganado una confianza que hacía años no sentía. Me miro al espejo y por fin me reconozco: fuerte, segura y llena de energía cada día. Gracias al trabajo con Ely, he aprendido a cuidarme desde el equilibrio, disfrutando del proceso sin sentir culpa ni presión. Hoy me siento maravillosa, feliz con mi cambio y con una nueva forma de entender la salud. Sin duda, recomendaría a Ely siempre… porque me ha cambiado la vida y la manera de verme.',
    img: '/cambios/andrea-caijao.webp',
  },
  {
    name: 'A.M.', result: 'Bienestar', plan: 'ultra',
    text: 'Con Ely aprendí a cuidarme de verdad, no solo a nivel físico sino también emocional. Gracias a su cercanía y su forma de guiarme, gané seguridad, equilibrio y una relación mucho más sana conmigo misma. Su apoyo fue clave incluso cuando tuve que parar por temas hormonales; me enseñó que priorizar la salud también es avanzar. Hoy me siento más fuerte, con más energía y feliz de haber recuperado mi bienestar.',
    img: '/cambios/andrea-martin.webp',
  },
  {
    name: 'A.G.', result: 'Deshinchada', plan: 'ultra',
    text: 'Siempre me sentía hinchada y con el abdomen pesado, por más que cuidara mi alimentación. Desde que empecé con Ely, aprendí a escuchar mi cuerpo, a comer mejor y, sobre todo, a deshincharme. Ahora me veo más fina, ligera y con una energía increíble. Me encanta cómo me queda la ropa y cómo se refleja todo el trabajo en mi cuerpo. Hoy me siento super atractiva, segura y feliz con mi cambio. Ely ha sabido sacar mi mejor versión.',
    img: '/cambios/ari-gonzalez.webp',
  },
  // --- SECCION 3 ---
  {
    name: 'A.U.', result: 'Lesión + Fuerza', plan: 'ultra',
    text: 'Llegué con una lesión, mucha incertidumbre y esa hinchazón que no me dejaba sentirme ligera. Con Ely aprendí a organizarme, a entrenar con intención (adaptando cada fase en mis lesiones) y a cuidarme sin obsesionarme. La retención bajó, el abdomen se afinó y recuperé fuerza y confianza: vuelvo a moverme sin miedo y a disfrutar del proceso. Hoy me siento activa, ligera y orgullosa de mi disciplina.',
    img: '/cambios/andrea-uria.webp',
  },
  {
    name: 'S.B.', result: 'Método Híbrido', plan: 'ultra',
    text: 'El Método Híbrido de Ely me ha cambiado la vida: combinar fuerza y resistencia me ha dado un cuerpo más eficiente y una mente más fuerte. Entreno pesas sin miedo y salgo a correr con un plan que tiene sentido; noto potencia en las piernas y estabilidad en cada zancada. Antes no podía con las tiradas largas y ahora completo carreras de larga distancia con buenas sensaciones. Me siento capaz, con energía y con un rumbo claro.',
    img: '/cambios/sandra-buitra.webp',
  },
  {
    name: 'R.E.', result: 'Equilibrio', plan: 'ultra',
    text: 'Estuve hace años con Ely y no tengo duda de que marcó un antes y un después en mi vida. No solo mejoré físicamente, sino también mentalmente: aprendí a quererme, a entender mi cuerpo y a sentirme feliz conmigo misma. Ella me dio el enfoque que necesitaba para encontrar equilibrio, confianza y constancia. Gracias a Ely, este estilo de vida ya forma parte de mí… y sé que lo mantendré para siempre.',
    img: '/cambios/raquel-espinosa.jpg',
  },
  {
    name: 'J.R.', result: 'Hábitos', plan: 'ultra',
    text: 'Empecé con Ely siendo casi una niña, sin rutina, sin constancia y sin saber cómo cuidarme. Poco a poco me enseñó a crear hábitos, a organizarme, a moverme cada día y a entender que los resultados llegan con paciencia y compromiso. Su forma de guiarme fue clave para cambiar mi mentalidad: dejé de castigarme y aprendí a disfrutar del proceso. Hoy tengo una relación sana con la comida y el entrenamiento.',
    img: '/cambios/julia-rosell.webp',
  },
  {
    name: 'J.M', result: 'Recomposición', plan: 'ultra',
    text: 'Estuve con Ely hace unos años y volví porque con ella siempre me he sentido comprendida, motivada y enfocada. Su método y su cercanía son únicos: me enseñó a organizarme, a comer bien y a entrenar sin obsesión. No solo he mejorado físicamente, también he recuperado el orden, la energía y las ganas de seguir superándome. Incluso me he animado a correr, y cada vez aguanto más.',
    img: '/cambios/joana-m.webp',
  },
  {
    name: 'A.Z.', result: '-Abdomen', plan: 'ultra',
    text: 'Era un chico que no sabía por dónde empezar ni en quién confiar. Hasta que conocí a Ely por instagram y fue la mejor decisión que pude tomar. Quería reducir el abdomen, ganar energía y verme mejor, y gracias a su método y su apoyo constante lo he logrado. Hoy entreno con una idea, me mantengo en forma sin obsesionarme y me siento más fuerte, vital y seguro que nunca.',
    img: '/cambios/alvaro-martinez.webp',
  },
  {
    name: 'L.B.', result: '+10 años', plan: 'ultra',
    text: 'He retomado con Ely varias veces a lo largo de los años, y siempre que he estado con ella he conseguido mejorar y dar un giro a mi cuerpo. A veces he recaído, pero volver a contactar con ella siempre ha sido volver a reencontrarme conmigo misma. Después de más de 10 años y varias etapas juntas, esta vez me siento super orgullosa, más fuerte y con ganas de seguir el mismo camino que tantas veces me ha hecho sentir bien.',
    img: '/cambios/lola-blasc.webp',
  },
  {
    name: 'C. C.', result: 'Digestión', plan: 'ultra',
    text: 'Antes me costaba reconocer mi propio progreso… Hoy me siento estable, fuerte y en calma. Llegué con dudas sobre mi digestión, el hambre emocional y cómo organizar mis comidas, pero poco a poco entendí que esto no va de hacer dieta, sino de cuidarme con conciencia. He mejorado mi digestión, eliminando lo que no me sentaba bien. Ya no me frustro si los cambios no son rápidos.',
    img: '/cambios/cris.webp',
  },
  {
    name: 'V.C.', result: 'Vitalidad', plan: 'ultra',
    text: 'Ely consiguió cambiar por completo la relación que tenía con la comida. He aprendido a disfrutar sin culpa, a cumplir conmigo misma y a entender que cuidarse también puede ser placentero. Me he deshinchado muchísimo y noto mi cuerpo más ligero y con más energía. Después de varios años, me siento renovada, con vitalidad y, sinceramente, más joven que nunca.',
    img: '/cambios/vero-cuenca.jpg',
  },
  // --- SECCION 4 ---
  {
    name: 'V.G.', result: '+9 años con Ely', plan: 'ultra',
    text: 'Estuve con Ely hace más de 9 años, y aún recuerdo cómo me cambió la forma de entender la salud y el bienestar. Llegué con ansiedad por la comida, sin energía y sin saber cómo romper ese círculo, y ella me enseñó desde la calma, la empatía y el conocimiento. Gracias a su método y a entender mis analíticas de sangre, hoy tengo una relación sana con la comida, me siento más ligera, con más fuerza y con un enfoque real de bienestar.',
    img: '/cambios/vane-gonza.webp',
  },
  {
    name: 'E.C.', result: 'Deshinchada', plan: 'ultra',
    text: 'He estado varias veces con Ely, siempre en los momentos en los que más la he necesitado. Cada vez que he vuelto con ella, he notado una mejora increíble, tanto por fuera como por dentro. Me siento deshinchada, con energía y con ganas de seguir adelante aplicando todos sus consejos. Orgullosa de volver a sentirme como antes, fuerte, motivada y con esa ilusión que solo Ely sabe despertar.',
    img: '/cambios/ester-cano.webp',
  },
  {
    name: 'R.A.', result: 'Constancia', plan: 'ultra',
    text: 'He estado con Ely en varias etapas, y siempre que he vuelto a su método he sentido una mejora brutal, tanto física como mental. Me ha ayudado a mantenerme constante, a cuidarme sin obsesionarme y a encontrar ese equilibrio que buscaba entre disciplina y bienestar. Ely transmite una energía y una motivación que te hacen creer en ti y en todo lo que puedes conseguir.',
    img: '/cambios/raquel-acosta.webp',
  },
  {
    name: 'R.M', result: 'Baloncesto', plan: 'ultra',
    text: 'Quería mejorar mi rendimiento en baloncesto: rendir mejor en los partidos, llegar más fuerte a los entrenamientos y aguantar el ritmo sin quedarme sin energía. Gracias a Ely he mejorado muchísimo mi condición física, adaptada totalmente al baloncesto y la nutrición que conlleva. Me siento más ágil, más rápido y con mejores sensaciones en la pista. El ultra plan con Ely ha sido un antes y un después.',
    img: '/cambios/ruben-mallenco.webp',
  },
  {
    name: 'R.R.', result: 'Recomposición', plan: 'ultra',
    text: 'Empecé con Ely con el objetivo de hacer una recomposición corporal, pero lo que he conseguido va mucho más allá de eso. He logrado un físico que me gusta, que puedo mantener sin esfuerzo y que se adapta perfectamente a mi estilo de vida. Me siento más ligero, con más energía y muchísimo mejor en mi día a día. En el trabajo mis compañeros me lo dicen constantemente, que se me ve mejor, más activo y con otra actitud.',
    img: '/cambios/rafa-ruiz.webp',
  },
  {
    name: 'M.P.', result: '-8 kg + Salud', plan: 'ultra',
    text: 'Es una excelente profesional! Yo venía de atracones, mala relación con la comida, malos hábitos y gracias a ella he conseguido no solo relacionarme bien con la comida sino que ha desaparecido la ansiedad por comer. Ya van más de 8 kg menos pero sobretodo he mejorado en salud interior. Sabe muchísimo de temas hormonales, SIBO, microbiota. Además no solo es una dietista sino que te da el servicio de coach que es tan importante.',
    img: '/cambios/mp.webp',
  },
  {
    name: 'N.S.', result: 'Primera 10K', plan: 'ultra',
    text: 'Estoy encantada con el trabajo que he hecho junto a Ely. Me ha enseñado a tener paciencia, a entender que los resultados llegan con constancia y a disfrutar del proceso. Gracias a su método he aprendido a cuidarme sin prisa, sabiendo cómo organizar mi día a día y mantener mis hábitos sin agobios. Nunca pensé que sería capaz, pero me he animado a correr mi primera carrera de 10 kilómetros. Gracias Ely por ayudarme a creer en mí.',
    img: '/cambios/natalia-sastre.webp',
  },
  {
    name: 'C.A.', result: 'Mejor versión', plan: 'ultra',
    text: 'Volver a mi mejor versión ha sido posible gracias a Ely. Llegué a ella en un momento en el que me sentía perdida, sin motivación y con muchos bloqueos en mi día a día. Con su ayuda, paciencia y forma tan directa de trabajar, ha sabido dar justo en la tecla. Me ha ayudado a desatascar esos problemas que me frenaban y a recuperar mi energía, mis ganas y mi equilibrio. Hoy me siento más fuerte, más centrada y orgullosa de haber vuelto a ser yo misma.',
    img: '/cambios/carmen-castillo.webp',
  },
  {
    name: 'C.M.', result: 'Mamá activa', plan: 'ultra',
    text: 'Gracias a Ely me siento más vital que nunca. He experimentado una mejora increíble, tanto física como mental, y eso se refleja en todo lo que hago. Ahora tengo la energía que necesitaba para disfrutar de mis hijos y ser la mejor versión de mí misma como mamá. Me siento fuerte, activa y muy orgullosa de lo que he conseguido con su ayuda. Ely me ha enseñado que cuidarme también es una forma de cuidar de los míos.',
    img: '/cambios/carmen-moral.webp',
  },
];

const CAMBIOS_ANUAL = [
  {
    name: 'C.B.', result: 'Constancia', plan: 'anual',
    text: 'Empecé con el Entrenamiento 13 Casa y terminé con esas "agujetas buenas" que te motivan. No era de cocinar y ahora me apetece entrar en la cocina porque todo está explicado paso a paso. He aprendido a entrenar mejor y más segura gracias a estos entrenamientos ya estructurados. Siento el apoyo del equipo de Ely y la comunidad; es constancia posible, resultados visibles y cero agobios.',
    img: '/cambios/jessica-moreno.webp',
  },
  {
    name: 'K.G.', result: 'Campus + App', plan: 'anual',
    text: 'Combinar el Campus con la App ha sido espectacular. En el Campus aprendí el "por qué" de cada cosa (técnica, pausas, respiración, progresión), y en la App lo pongo en práctica con rutinas claras y recetas riquísimas que me hacen ser constante sin agobios. Esa mezcla me dio método y seguridad desde el primer día. Lo mejor es la comunidad de Ely: en el Campus me sentí acompañada y escuchada, y en la App tengo el plan a un click, adaptado a mis semanas. Hoy entreno mejor, como mejor y entiendo lo que hago. Me veo más fuerte y organizada, y por fin siento que formo parte de un equipo que empuja en la misma dirección.',
    img: '/cambios/kat-campus.webp',
  },
  {
    name: 'A.P.', result: 'Hábitos', plan: 'anual',
    text: 'Bendito el día que conocí a Ely, sus servicios y sus consejos diarios. Pasé de ir a trompicones a tener un método claro. Siento que por fin cuido mi salud con cabeza y constancia. Soy peluquera y mi trabajo es intenso, pero ahora sé cómo afrontarlo: organizo mis semanas, ajusto entrenos cuando toca y no improviso con la comida. Me noto con más energía, y con la mente más tranquila. Estoy súper agradecida: Ely es inspiración y guía. Ahora tengo herramientas reales para vivir mejor. De verdad, agradecida de por vida.',
    img: '/cambios/ap.webp',
  },
  {
    name: 'N.V.', result: 'Fuerza inferior', plan: 'anual',
    text: 'Pasé de no saber cómo empezar a tener los entrenos estructurados dentro de la tribu de Ely. Tener un plan claro, con sesiones guiadas y progresión, me dio orden y motivación desde el primer día. Noto que he mejorado mucho la parte inferior: más fuerza y estabilidad en glúteo y piernas. Además, me siento menos retenida, con la alimentación práctica de la app que encaja con mi rutina. Me apunté al Campus con Ely y fue genial: entendí el porqué de cada ejercicio y conocerme más a mí misma. Esta combinación me hizo avanzar más rápido y con mucha más seguridad.',
    img: '/cambios/vane-campus.webp',
  },
  {
    name: 'E.G.', result: 'Adherencia', plan: 'anual',
    text: 'Nunca había seguido un plan con tanta adherencia. Desde la primera semana noté orden, energía y ganas de seguir. La app es intuitiva y las explicaciones son tan claras que entrenar en casa es efectivo de verdad. Las recetas son un 10: ricas, variadas y pensadas para la vida real. "Está todo buenísimo" se ha convertido en frase de casa. Me facilita comer mejor sin pasar horas en la cocina. Cuando surgió un problema técnico, me lo solucionaron al momento. Me siento acompañada, motivada y orgullosa de mi progreso. Por eso he renovado: el Plan Anual me da resultados y calma a la vez.',
    img: '/cambios/elena-gasto.webp',
  },
  {
    name: 'L.G.', result: 'Método', plan: 'anual',
    text: 'Lo mejor del Plan Anual es que se adapta a mis etapas: semanas con más exterior o entrenos en equipo, y aun así la dieta encaja perfecta. No siento que "empiezo de cero" cada mes; tengo un método que me sostiene. Me encanta cómo está todo organizado: rutinas, ejercicios localizados y esa calidad técnica que te hace entrenar mejor. Termino las sesiones con buenas agujetas y cero dudas de lo que tengo que hacer. Además, comer sano me resulta natural: recetas sabrosas y sencillas, de las que apetece repetir. Ely es un referente para mí y para mis amigas, y se nota que detrás hay un equipo que cuida.',
    img: '/cambios/leti-app.jpg',
  },
  {
    name: 'L.J.', result: 'Comunidad', plan: 'anual',
    text: 'Para mí no es solo una app; es la comunidad que inspira. Estar con Ely y las chicas me anima cuando tengo esos malos días. Los entrenos en casa realmente funcionan y las recetas las disfruto. Siento que por fin puedo mantener hábitos sin obsesionarme. He renovado sin pensarlo: el Plan Anual me da resultados y, sobre todo, me hace sentir bien conmigo.',
    img: '/cambios/laura-juanos.webp',
  },
  {
    name: 'M.S.', result: 'Flexibilidad', plan: 'anual',
    text: 'Lo que me convenció fue la flexibilidad y que la tengo como guía y es autodidacta: semanas con más trabajo fuera, viajes… y aun así todo me encaja y siento que he progresado. La guía paso a paso me evita improvisar y perder tiempo en los entrenamientos híbridos. Sé qué entrenar y qué comer, sin complicarme. Además la comunidad de Ely siempre me ayuda. El soporte de mail es rápido y cercano.',
    img: '/cambios/marisa.webp',
  },
  {
    name: 'C.H.', result: 'Pack Duo', plan: 'anual',
    text: 'Nos apuntamos al Pack Duo y fue un antes y un después. La app anual de Ely nos da variedad de entrenos para casa o gym y explica técnica, pausas y respiración para hacerlo seguro y efectivo. En nutrición es comodísimo: recetas fáciles y riquísimas, opción de ajustar raciones "para dos" y lista de la compra compartida, así no improvisamos. Cuando surge una duda, el soporte responde rápido y con cercanía; se nota que hay equipo detrás. Lo mejor es la motivación compartida: nos retamos, celebramos progresos y, si uno flojea, la otra tira. Ya hemos decidido renovar porque tener método, compañía no tiene precio.',
    img: '/cambios/carlos-hdz.webp',
  },
  {
    name: 'I.C.', result: '18 años', plan: 'anual',
    text: 'Tengo 18 años y me siento muy afortunada de haber conocido ahora el Plan Anual de Ely gracias a mi madre. Empecé hace poco y ya noto cambios: entrenos claros que puedo hacer en el gym con videos. Las recetas son fáciles y riquísimas, así que comer bien no se me hace cuesta arriba. Lo mejor es que he empezado pronto: estoy construyendo hábitos. Me siento con más energía y lo combino con el ciclo formativo que estoy haciendo.',
    img: '/cambios/itzi.webp',
  },
  {
    name: 'E.Z.', result: 'Resultados reales', plan: 'anual',
    text: 'No era de cocinar, pero con la app me cambió el chip: recetas sencillas, compra guiada y platos que apetecen. En casa decimos que "todo está buenísimo". Entrenar tiene sentido: trabajo localizado, estrenos semanales y la sensación de que mejoro sin lesionarme. Ya me han preguntado varias amigas y alguna se la ha bajado. Yo he renovado porque veo resultados reales y sostenibles y me encanta la comunidad de Ely.',
    img: '/cambios/erden.webp',
  },
];

const SECTION_SIZE = 9;

// Merge and interleave: every ~3 ultras insert 1 anual
const ALL_CAMBIOS = (() => {
  const mixed = [];
  let ai = 0;
  for (let ui = 0; ui < CAMBIOS_ULTRA.length; ui++) {
    mixed.push(CAMBIOS_ULTRA[ui]);
    if ((ui + 1) % 3 === 0 && ai < CAMBIOS_ANUAL.length) {
      mixed.push(CAMBIOS_ANUAL[ai++]);
    }
  }
  while (ai < CAMBIOS_ANUAL.length) mixed.push(CAMBIOS_ANUAL[ai++]);
  return mixed;
})();

const CTA_LINKS = {
  ultra: 'https://elyfitness.harbiz.io/checkout-form/elyfitness?product=afZzAGaDBuSqXMQyh&lang=es',
  anual: 'https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT',
};

const FILTERS = [
  { key: 'todos', label: 'Todos' },
  { key: 'ultra', label: '1:1', icon: Users },
  { key: 'anual', label: 'APP', icon: Smartphone },
];

export default function CambiosPage() {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [visibleSections, setVisibleSections] = useState(1);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { setVisibleSections(1); }, [activeFilter]);

  const cambios = activeFilter === 'todos' ? ALL_CAMBIOS : ALL_CAMBIOS.filter(c => c.plan === activeFilter);
  const totalSections = Math.ceil(cambios.length / SECTION_SIZE);
  const visibleCambios = cambios.slice(0, visibleSections * SECTION_SIZE);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase">Cambios <span className="text-gradient">Reales</span></h1>
          <p className="text-white/40 text-sm sm:text-base mt-2 max-w-lg">Transformaciones reales de mis chic@s. Sin atajos. Solo constancia, un plan real y alguien que te acompaña en cada paso.</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {FILTERS.map(f => {
              const isActive = activeFilter === f.key;
              const activeClass = f.key === 'ultra' ? 'bg-primary text-white' : f.key === 'anual' ? 'bg-dark-soft text-white' : 'bg-white text-dark';
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase transition-all ${
                    isActive ? activeClass : 'bg-white/10 text-white/50 hover:bg-white/15 hover:text-white/70'
                  }`}
                >
                  {f.icon && <f.icon size={14} />}
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <motion.div key={activeFilter} initial="hidden" animate="visible" variants={stagger} className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {visibleCambios.map((c) => (
              <motion.div
                key={c.name + c.result + c.plan}
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
                  <div className={`${c.plan === 'ultra' ? 'bg-primary/80' : 'bg-dark/90'} px-4 py-2 flex items-center justify-between`}>
                    <span className="text-[9px] font-bold text-white/60 uppercase tracking-wider">ELY FITNESS</span>
                    <span className="text-sm font-black text-white">{c.name}</span>
                  </div>

                  {/* Transformation photo */}
                  <div className="relative overflow-hidden">
                    <img
                      src={c.img}
                      alt={`Transformación ${c.name}`}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className={`absolute top-3 right-3 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md inline-flex items-center gap-1 ${c.plan === 'ultra' ? 'bg-primary text-white' : 'bg-dark text-white'}`}>
                      {c.plan === 'ultra' ? <><Users size={11} /> 1:1</> : <><Smartphone size={11} /> APP</>}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`${c.plan === 'ultra' ? 'text-primary' : 'text-dark'} font-bold text-xs`}>{c.result}</span>
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(j => <Star key={j} size={9} className="fill-yellow-400 text-yellow-400" />)}</div>
                    </div>
                    <p className="text-[11px] sm:text-xs text-dark/50 leading-relaxed line-clamp-4">&quot;{c.text}&quot;</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load more */}
        {visibleSections < totalSections && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleSections(s => s + 1)}
              className="inline-flex items-center gap-2 bg-dark text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase hover:bg-dark/80 transition-all"
            >
              Ver más cambios <ChevronDown size={16} />
            </button>
            <p className="text-dark/30 text-xs mt-2">
              Mostrando {visibleCambios.length} de {cambios.length} transformaciones
            </p>
          </div>
        )}
      </div>

      {/* CTA bottom */}
      <div className="bg-dark py-10 sm:py-12 px-4 text-center">
        <h2 className="text-xl sm:text-3xl font-black text-white uppercase mb-3">Tú puedes ser el <span className="text-gradient">siguiente</span></h2>
        <p className="text-white/35 text-xs sm:text-sm mb-6">Empieza tu cambio conmigo. Elige el plan que mejor se adapte a ti.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={CTA_LINKS.ultra} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase transition-all">
            <Users size={14} /> Coaching 1:1
          </a>
          <a href={CTA_LINKS.anual} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-dark-soft hover:bg-white/20 text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase transition-all border border-white/20">
            <Smartphone size={14} /> Plan Anual APP
          </a>
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

                <div className="relative overflow-hidden">
                  <img src={selected.img} alt={`Transformación ${selected.name}`} className="w-full aspect-[4/3] sm:aspect-square object-cover" />
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-dark">{selected.name}</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${selected.plan === 'ultra' ? 'bg-primary/10 text-primary-dark' : 'bg-dark text-white'}`}>
                        {selected.plan === 'ultra' ? <><Users size={9} /> 1:1</> : <><Smartphone size={9} /> APP</>}
                      </span>
                    </div>
                    <span className={`${selected.plan === 'ultra' ? 'text-primary' : 'text-dark'} font-bold text-sm`}>{selected.result}</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(j => <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-sm text-dark/55 leading-relaxed">&quot;{selected.text}&quot;</p>

                  <div className="mt-6 pt-4 border-t border-dark/8">
                    <a href={CTA_LINKS[selected.plan]} target="_blank" rel="noopener noreferrer" className={`w-full flex items-center justify-center gap-2 ${selected.plan === 'ultra' ? 'bg-primary hover:bg-primary-dark' : 'bg-dark hover:bg-dark-soft'} text-white py-3 rounded-xl font-bold text-sm uppercase transition-all`}>
                      {selected.plan === 'ultra' ? 'Quiero mi cambio' : 'Únete al Plan Anual'}
                    </a>
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
