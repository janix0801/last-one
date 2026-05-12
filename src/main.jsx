import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Award,
  Bot,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CheckCircle2,
  Instagram,
  MapPin,
  MessageCircle,
  Microscope,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Users,
  Waves
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
  }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const treatments = [
  {
    slug: "dermatologia-estetica-facial",
    title: "Dermatología estética facial",
    text: "Diagnóstico médico de piel, textura, manchas, poro, rojeces y pérdida de luminosidad.",
    details: ["Peelings médicos", "Skinboosters", "Protocolos de luminosidad"],
    pageIntro: "Un abordaje médico para mejorar la calidad visible de la piel sin transformar la expresión del rostro.",
    idealFor: ["Piel apagada o irregular", "Primeros signos de edad", "Manchas leves y poro visible", "Preparación para eventos"],
    benefits: ["Más luminosidad", "Textura más fina", "Piel más hidratada", "Plan dermocosmético personalizado"],
    process: ["Diagnóstico cutáneo", "Selección de protocolo", "Tratamiento en cabina médica", "Rutina domiciliaria y revisión"],
    session: "45-60 min",
    recovery: "Mínima o moderada según el protocolo",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=82"
  },
  {
    slug: "botox-armonizacion-natural",
    title: "Botox y armonización natural",
    text: "Tratamientos de expresión con precisión médica para suavizar arrugas sin perder naturalidad.",
    details: ["Frente y entrecejo", "Patas de gallo", "Sonrisa gingival"],
    pageIntro: "Tratamiento médico de precisión para relajar zonas concretas, suavizar la expresión cansada y mantener un resultado natural.",
    idealFor: ["Arrugas de expresión", "Mirada cansada", "Prevención de líneas profundas", "Resultado discreto y elegante"],
    benefits: ["Expresión descansada", "Aplicación precisa", "Sin cambio de facciones", "Revisión de resultado incluida"],
    process: ["Valoración muscular", "Diseño de puntos", "Aplicación médica", "Control a los 15 días"],
    session: "20-30 min",
    recovery: "Sin baja social habitual",
    icon: Syringe,
    image: "https://images.unsplash.com/photo-1598300188480-626f2f79ab8d?auto=format&fit=crop&w=900&q=82"
  },
  {
    slug: "laser-dermatologico-avanzado",
    title: "Láser dermatológico avanzado",
    text: "Tecnología para manchas, vasos, cicatrices, tono irregular y rejuvenecimiento progresivo.",
    details: ["Manchas solares", "Rosácea", "Cicatrices de acné"],
    pageIntro: "Tecnología médica para tratar alteraciones de pigmento, vascularización, textura y envejecimiento cutáneo de forma controlada.",
    idealFor: ["Manchas solares", "Rojeces o rosácea", "Cicatrices de acné", "Textura irregular"],
    benefits: ["Tono más uniforme", "Mejora progresiva", "Protocolos ajustados al fototipo", "Seguimiento dermatológico"],
    process: ["Evaluación de piel", "Prueba y parámetros", "Sesión láser", "Cuidados post-tratamiento"],
    session: "30-50 min",
    recovery: "Variable según intensidad y zona",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?auto=format&fit=crop&w=900&q=82"
  },
  {
    slug: "acne-marcas-cicatrices",
    title: "Acné, marcas y cicatrices",
    text: "Plan médico personalizado para controlar brotes, reparar barrera cutánea y mejorar textura.",
    details: ["Acné adulto", "Marcas postinflamatorias", "Cicatrices"],
    pageIntro: "Plan dermatológico por fases para controlar el acné activo, proteger la barrera cutánea y mejorar marcas residuales.",
    idealFor: ["Acné adulto", "Brotes recurrentes", "Marcas rojas o pigmentadas", "Cicatrices y textura irregular"],
    benefits: ["Menos brotes", "Mejor control de grasa", "Piel más calmada", "Tratamiento de marcas por fases"],
    process: ["Historia clínica", "Plan médico y cosmético", "Tratamientos complementarios", "Revisiones evolutivas"],
    session: "40-60 min",
    recovery: "Adaptada al tratamiento indicado",
    icon: Microscope,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=82"
  },
  {
    slug: "medicina-antiaging",
    title: "Medicina antiaging",
    text: "Tratamientos regenerativos para firmeza, colágeno, hidratación profunda y calidad de piel.",
    details: ["Biostimuladores", "Mesoterapia", "Redensificación"],
    pageIntro: "Protocolos regenerativos orientados a mejorar densidad, hidratación profunda, elasticidad y envejecimiento saludable de la piel.",
    idealFor: ["Flacidez inicial", "Pérdida de firmeza", "Piel fina o deshidratada", "Prevención antiaging"],
    benefits: ["Estimulación de colágeno", "Piel más densa", "Resultado progresivo", "Enfoque natural"],
    process: ["Diagnóstico facial", "Plan de sesiones", "Tratamiento regenerativo", "Mantenimiento personalizado"],
    session: "35-60 min",
    recovery: "Leve y temporal en la mayoría de casos",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=82"
  },
  {
    slug: "remodelacion-corporal",
    title: "Remodelación corporal",
    text: "Soluciones no invasivas para firmeza, drenaje, contorno y bienestar corporal.",
    details: ["Celulitis", "Flacidez", "Contorno corporal"],
    pageIntro: "Tratamientos corporales no invasivos para mejorar contorno, firmeza, textura y sensación de ligereza.",
    idealFor: ["Flacidez localizada", "Celulitis", "Retención de líquidos", "Definición de contorno"],
    benefits: ["Mejor firmeza", "Contorno más definido", "Sin cirugía", "Protocolos combinables"],
    process: ["Valoración corporal", "Medición y objetivos", "Sesiones por zona", "Plan de mantenimiento"],
    session: "45-75 min",
    recovery: "Sin baja social habitual",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=82"
  }
];

const team = [
  {
    name: "Dra. Elena Mar",
    role: "Dermatóloga estética",
    text: "Especialista en diagnóstico facial, láser médico y protocolos de rejuvenecimiento natural.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=82"
  },
  {
    name: "Dr. Marc Vidal",
    role: "Medicina estética avanzada",
    text: "Experto en armonización facial, toxina botulínica y tratamientos regenerativos.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=82"
  },
  {
    name: "Clara Soler",
    role: "Skin therapist",
    text: "Acompañamiento de piel, seguimiento post-tratamiento y rutinas dermocosméticas.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=82"
  }
];

const testimonials = [
  {
    name: "Claudia R.",
    quote: "Me explicaron mi piel con muchísimo detalle. El resultado fue natural, luminoso y muy elegante.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=420&q=80"
  },
  {
    name: "Marina V.",
    quote: "La clínica transmite calma y excelencia. Todo el proceso fue puntual, privado y muy cuidado.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=420&q=80"
  },
  {
    name: "Alex M.",
    quote: "Buscaba algo médico, no agresivo. El equipo entendió perfectamente que quería verme descansado.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=420&q=80"
  }
];

const gallery = [
  {
    title: "Luminosidad y textura",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1000&q=82"
  },
  {
    title: "Calidad de piel",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=82"
  },
  {
    title: "Armonía facial",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=82"
  }
];

function Section({ id, eyebrow, title, intro, children, className = "" }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-5 py-18 sm:px-8 lg:py-24 ${className}`}>
      {(eyebrow || title) && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.28 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">{eyebrow}</p>}
          {title && <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{title}</h2>}
          {intro && <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{intro}</p>}
        </motion.div>
      )}
      {children}
    </section>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`soft-card group relative overflow-hidden rounded-[1.4rem] border border-white/70 bg-white/72 shadow-clinic ${className}`}>
      <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-sky-200/45 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <header className="relative min-h-screen overflow-hidden bg-clinic">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=76"
          alt=""
          className="h-full w-full object-cover opacity-45"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,252,.98),rgba(248,251,252,.78)_46%,rgba(248,251,252,.35))]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f6f8f8] to-transparent" />

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-white/70 font-display text-sm font-semibold text-slate-950 shadow-sm backdrop-blur-xl">Æ</span>
          <span className="font-display text-sm font-semibold tracking-[0.28em] text-slate-900">DERMA BCN</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-slate-700 md:flex">
          <a href="#tratamientos" className="transition hover:text-sky-800">Tratamientos</a>
          <a href="#clinica" className="transition hover:text-sky-800">La clínica</a>
          <a href="#equipo" className="transition hover:text-sky-800">Equipo</a>
          <a href="#contacto" className="transition hover:text-sky-800">Contacto</a>
        </div>
        <a href="#reserva" className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm backdrop-blur-xl transition hover:border-sky-200 hover:bg-white">
          Reservar
        </a>
      </nav>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-7xl items-center px-5 pb-20 pt-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm text-slate-650 shadow-sm backdrop-blur-2xl">
            <span className="h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_18px_rgba(14,165,233,.55)]" />
            Clínica dermatológica premium en Barcelona
          </div>
          <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">
            Dermatología estética avanzada, natural y personalizada
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-650 sm:text-xl">
            Tratamientos médicos de alto nivel para mejorar la calidad de tu piel con precisión, seguridad y resultados elegantes.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#reserva" className="premium-button">
              Reservar valoración <ArrowRight size={18} />
            </a>
            <a href="https://wa.me/34930000000" className="secondary-button">
              <MessageCircle size={18} /> Hablar por WhatsApp
            </a>
          </div>
          <div className="mt-14 grid max-w-3xl grid-cols-3 gap-3 sm:gap-4">
            {["Dermatólogos", "Láser médico", "Resultados naturales"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/80 bg-white/62 px-4 py-4 text-center text-slate-700 shadow-sm backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em]">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function Treatments() {
  return (
    <Section
      id="tratamientos"
      eyebrow="Tratamientos"
      title="Tratamientos dermatológicos diseñados alrededor de tu piel."
      intro="Una cartera médica completa para textura, manchas, arrugas, acné, firmeza y luminosidad, siempre con diagnóstico previo y seguimiento."
    >
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {treatments.map(({ slug, title, text, details, icon: Icon, image }) => (
          <motion.article key={title} variants={fadeUp}>
            <Card className="h-full transition duration-500 hover:-translate-y-2">
              <div className="aspect-[1.35] overflow-hidden">
                <img src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-950">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {details.map((detail) => (
                    <span key={detail} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
                      {detail}
                    </span>
                  ))}
                </div>
                <a href={`#tratamiento/${slug}`} className="treatment-link mt-7">
                  Ver tratamiento <ArrowRight size={17} />
                </a>
              </div>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function TreatmentDetail({ treatment }) {
  const relatedTreatments = treatments.filter((item) => item.slug !== treatment.slug).slice(0, 3);
  const Icon = treatment.icon;

  return (
    <main className="min-h-screen bg-[#f6f8f8] text-slate-950">
      <div className="fixed inset-0 pointer-events-none z-0 clinic-texture" />
      <section className="relative overflow-hidden bg-clinic">
        <div className="absolute inset-0">
          <img src={treatment.image} alt="" className="h-full w-full object-cover opacity-18" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,252,.99),rgba(248,251,252,.86)_52%,rgba(248,251,252,.58))]" />

        <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-white/70 font-display text-sm font-semibold text-slate-950 shadow-sm backdrop-blur-xl">Æ</span>
            <span className="font-display text-sm font-semibold tracking-[0.28em] text-slate-900">DERMA BCN</span>
          </a>
          <a href="#tratamientos" className="secondary-button min-h-0 px-4 py-2 text-sm">
            <ArrowLeft size={17} /> Tratamientos
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-10 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1fr_430px] lg:pb-24 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 26, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <a href="#tratamientos" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-800 transition hover:text-slate-950">
              <ArrowLeft size={17} /> Volver a tratamientos
            </a>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm text-slate-650 shadow-sm backdrop-blur-2xl">
              <Icon size={18} className="text-sky-700" />
              Tratamiento dermatológico premium
            </div>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 sm:text-7xl">
              {treatment.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-650">
              {treatment.pageIntro}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#contacto" className="premium-button">
                Reservar valoración <ArrowRight size={18} />
              </a>
              <a href="https://wa.me/34930000000" className="secondary-button">
                <MessageCircle size={18} /> Consultar por WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Card>
              <img src={treatment.image} alt={treatment.title} className="h-80 w-full object-cover" />
              <div className="grid grid-cols-2 gap-3 p-5">
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Sesión</p>
                  <p className="mt-2 font-display text-lg font-semibold text-slate-950">{treatment.session}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Recuperación</p>
                  <p className="mt-2 font-display text-lg font-semibold text-slate-950">{treatment.recovery}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Section eyebrow="Información" title="Todo lo que necesitas saber antes de decidir.">
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoPanel title="Indicado para" items={treatment.idealFor} />
          <InfoPanel title="Beneficios" items={treatment.benefits} />
          <InfoPanel title="Proceso clínico" items={treatment.process} ordered />
        </div>
      </Section>

      <section className="relative mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Card>
            <div className="p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Primera visita</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">La recomendación final siempre empieza con diagnóstico.</h2>
              <p className="mt-5 leading-8 text-slate-600">
                En la valoración revisamos tu piel, expectativas, historial, posibles contraindicaciones y el nivel de resultado que buscas. El objetivo es diseñar un plan realista, seguro y coherente con tu rostro o cuerpo.
              </p>
              <a href="#contacto" className="premium-button mt-8 w-fit">
                Reservar valoración <ArrowRight size={18} />
              </a>
            </div>
          </Card>
          <Card>
            <div className="p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Tratamientos relacionados</p>
              <div className="mt-6 grid gap-3">
                {relatedTreatments.map((item) => {
                  const RelatedIcon = item.icon;
                  return (
                    <a key={item.slug} href={`#tratamiento/${item.slug}`} className="related-treatment">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-sky-50 text-sky-700">
                        <RelatedIcon size={20} />
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.text}</small>
                      </span>
                      <ArrowRight size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  );
}

function InfoPanel({ title, items, ordered = false }) {
  return (
    <Card className="h-full">
      <div className="p-7">
        <h3 className="font-display text-2xl font-semibold text-slate-950">{title}</h3>
        <div className="mt-6 space-y-4">
          {items.map((item, index) => (
            <div key={item} className="flex gap-3">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-50 text-sm font-semibold text-sky-800 ring-1 ring-sky-100">
                {ordered ? index + 1 : <CheckCircle2 size={16} />}
              </span>
              <p className="leading-7 text-slate-650">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ClinicSection() {
  return (
    <Section
      id="clinica"
      eyebrow="La clínica"
      title="Un espacio médico sereno, privado y diseñado para cuidarte."
      intro="Consulta dermatológica, tecnología estética avanzada y una experiencia de paciente cuidada desde la primera visita."
    >
      <div className="grid items-center gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <Card>
            <img
              src="https://images.unsplash.com/photo-1631248055158-edec7a3c072b?auto=format&fit=crop&w=1000&q=76"
              alt="Interior premium de clínica dermatológica"
              className="h-[520px] w-full object-cover"
            />
          </Card>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="grid gap-4 sm:grid-cols-2">
          {[
            ["Diagnóstico médico", "Valoración dermatológica antes de cualquier tratamiento.", Microscope],
            ["Privacidad total", "Agenda cuidada, tiempos amplios y salas diseñadas para la calma.", ShieldCheck],
            ["Tecnología clínica", "Láser, análisis cutáneo y aparatología seleccionada por criterio médico.", Award],
            ["Seguimiento real", "Protocolos post-tratamiento y evolución documentada de la piel.", CalendarCheck]
          ].map(([title, text, Icon]) => (
            <motion.div key={title} variants={fadeUp}>
              <Card className="h-full">
                <div className="p-6">
                  <Icon className="mb-6 text-sky-700" size={24} />
                  <h3 className="font-display text-lg font-semibold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function Team() {
  return (
    <Section id="equipo" eyebrow="Equipo médico" title="Especialistas que combinan ciencia, criterio estético y trato humano.">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} className="grid gap-5 lg:grid-cols-3">
        {team.map((person) => (
          <motion.article key={person.name} variants={fadeUp}>
            <Card className="h-full transition duration-500 hover:-translate-y-2">
              <img src={person.image} alt={person.name} className="h-80 w-full object-cover object-top" />
              <div className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">{person.role}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">{person.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{person.text}</p>
              </div>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function BeforeAfter() {
  const [active, setActive] = useState(0);
  const item = gallery[active];
  const next = () => setActive((active + 1) % gallery.length);
  const prev = () => setActive((active - 1 + gallery.length) % gallery.length);

  return (
    <Section id="resultados" eyebrow="Resultados" title="Antes y después con un enfoque natural y dermatológico.">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
        <Card>
          <div className="grid gap-0 overflow-hidden lg:grid-cols-[1fr_330px]">
            <div className="grid min-h-[430px] grid-cols-2">
              <figure className="relative overflow-hidden bg-slate-200">
                <img src={item.image} alt={`Antes: ${item.title}`} className="h-full w-full scale-105 object-cover opacity-65 grayscale contrast-75 brightness-90 blur-[1px]" />
                <figcaption className="absolute left-5 top-5 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur-xl">Antes</figcaption>
              </figure>
              <figure className="relative overflow-hidden">
                <img src={item.image} alt={`Después: ${item.title}`} className="h-full w-full object-cover saturate-110 contrast-105" />
                <figcaption className="absolute left-5 top-5 rounded-full bg-sky-900/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">Después</figcaption>
              </figure>
            </div>
            <div className="flex flex-col justify-between border-t border-slate-100 bg-white/70 p-7 lg:border-l lg:border-t-0">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Caso {active + 1}</p>
                <h3 className="mt-4 font-display text-3xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  Galería visual orientativa para mostrar el tipo de transformación: piel más uniforme, descansada y luminosa sin perder naturalidad.
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <button className="icon-button" onClick={prev} aria-label="Ver caso anterior"><ChevronLeft size={20} /></button>
                <button className="icon-button" onClick={next} aria-label="Ver caso siguiente"><ChevronRight size={20} /></button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}

function AISection() {
  return (
    <Section
      id="ia"
      eyebrow="Atención inteligente"
      title="Tecnología para acompañarte, no para sustituir el criterio médico."
      intro="La clínica utiliza asistencia digital para agilizar reservas, recordatorios y seguimiento, manteniendo siempre la valoración médica como centro de la experiencia."
      className="py-14 lg:py-18"
    >
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 md:grid-cols-5">
        {[
          ["Reserva sencilla", CalendarCheck],
          ["WhatsApp", MessageCircle],
          ["Recordatorios", Clock3],
          ["Seguimiento", Bot],
          ["Agenda cuidada", Users]
        ].map(([title, Icon]) => (
          <motion.div key={title} variants={fadeUp}>
            <Card className="h-full">
              <div className="flex items-center gap-3 p-5">
                <Icon className="text-sky-700" size={21} />
                <p className="font-medium text-slate-800">{title}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section eyebrow="Pacientes" title="Experiencias discretas, naturales y cuidadosamente acompañadas.">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <motion.article variants={fadeUp} key={testimonial.name}>
            <Card className="h-full transition duration-500 hover:-translate-y-1">
              <div className="flex h-full flex-col p-7">
                <div className="mb-7 flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-display font-semibold text-slate-950">{testimonial.name}</h3>
                    <div className="mt-1 flex text-sky-700">
                      {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
                <p className="text-base leading-8 text-slate-650">“{testimonial.quote}”</p>
              </div>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function BookingFlow() {
  const steps = [
    ["Valoración inicial", "Escuchamos objetivos, historial y necesidades de la piel."],
    ["Diagnóstico dermatológico", "Analizamos piel, prioridades y opciones reales de tratamiento."],
    ["Plan personalizado", "Creamos un protocolo por fases, natural y medible."],
    ["Seguimiento", "Acompañamos la evolución para ajustar y mantener resultados."]
  ];

  return (
    <Section id="reserva" eyebrow="Método clínico" title="Un proceso claro para decidir con seguridad.">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} className="grid gap-4 lg:grid-cols-4">
        {steps.map(([step, text], index) => (
          <motion.div key={step} variants={fadeUp}>
            <Card className="h-full">
              <div className="p-7">
                <span className="mb-8 grid h-11 w-11 place-items-center rounded-full bg-sky-900 text-sm font-semibold text-white">0{index + 1}</span>
                <h3 className="font-display text-xl font-semibold text-slate-950">{step}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1800&q=82')] bg-cover bg-center opacity-28" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#f6f8f8_0%,rgba(246,248,248,.88)_45%,rgba(246,248,248,.55)_100%)]" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative mx-auto max-w-5xl px-5 text-center"
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">Primera valoración</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Descubre una forma más médica, natural y premium de cuidar tu piel.</h2>
        <a href="#contacto" className="premium-button mx-auto mt-10 w-fit">
          Reservar valoración <ArrowRight size={18} />
        </a>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contacto" className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-slate-950">DERMA BCN</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Clínica dermatológica premium en Barcelona. Medicina estética, láser médico y tratamientos personalizados para la salud y belleza de la piel.
          </p>
        </div>
        <div className="grid gap-4 text-sm text-slate-650 sm:grid-cols-2">
          <a className="footer-link" href="https://instagram.com"><Instagram size={18} /> Instagram</a>
          <a className="footer-link" href="https://wa.me/34930000000"><MessageCircle size={18} /> WhatsApp</a>
          <a className="footer-link" href="mailto:contacto@dermabcn.com"><ArrowRight size={18} /> Contacto</a>
          <span className="footer-link"><MapPin size={18} /> Passeig de Gràcia, Barcelona</span>
        </div>
      </div>
    </footer>
  );
}

function ChatbotButton() {
  return (
    <motion.a
      href="https://wa.me/34930000000"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.45 }}
      className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/90 bg-white/80 text-sky-900 shadow-clinic backdrop-blur-2xl transition hover:scale-105 hover:bg-white"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle size={25} />
    </motion.a>
  );
}

function App() {
  const [route, setRoute] = useState(() => window.location.hash || "");
  const activeTreatment = treatments.find((item) => route === `#tratamiento/${item.slug}`);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (activeTreatment) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.title = `${activeTreatment.title} | DERMA BCN`;
      return;
    }

    document.title = "DERMA BCN | Clínica dermatológica premium en Barcelona";
    if (route.startsWith("#") && route.length > 1) {
      window.setTimeout(() => {
        document.getElementById(route.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [route, activeTreatment]);

  const sections = useMemo(
    () => [
      <Hero key="hero" />,
      <Treatments key="treatments" />,
      <ClinicSection key="clinic" />,
      <Team key="team" />,
      <BeforeAfter key="ba" />,
      <BookingFlow key="flow" />,
      <AISection key="ai" />,
      <Testimonials key="testimonials" />,
      <FinalCTA key="cta" />,
      <Footer key="footer" />
    ],
    []
  );

  if (activeTreatment) {
    return <TreatmentDetail treatment={activeTreatment} />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f8f8] text-slate-950">
      <div className="fixed inset-0 pointer-events-none z-0 clinic-texture" />
      {sections}
      <ChatbotButton />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
