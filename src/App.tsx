import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
  Calendar,
  MapPin,
  Clock,
  Building2,
  Award,
  Lightbulb,
  FileText,
  Phone,
  ChevronRight,
  Info,
  Lock,
  Zap,
  Activity,
  Globe
} from "lucide-react";
import React, { useState, useEffect } from "react";

import logoTempel from "./assets/images/brand/logo/logotipo_tempelgroup.png";

import logoCCI from "./assets/images/brand/logo/logotipo_tempelgroup.png";
import logoMoxa from "./assets/images/brand/logo/logotipo_tempelgroup.png";

// --- Components ---

const Navbar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre el evento", href: "#about" },
    { name: "Temáticas", href: "#themes" },
    { name: "Agenda", href: "#agenda" },
    { name: "Ponentes", href: "#speakers" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logoTempel}
              alt="Tempel Group"
              className="h-8 sm:h-10 w-auto object-contain transition-all duration-300"
            />
          </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-[10px] font-condensed font-bold uppercase tracking-[0.2em] text-primary transition-colors duration-300">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-heading transition-colors">{link.name}</a>
          ))}
          <a href="#register" className="border border-heading px-4 py-2 hover:bg-secondary hover:text-primary transition-all">
            Registro
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 text-heading"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-heading p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-primary border-b border-primary overflow-hidden transition-colors duration-300"
          >
            <div className="p-6 flex flex-col gap-4 text-sm font-condensed font-bold uppercase tracking-widest text-primary">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-heading py-2 border-b border-primary/20">{link.name}</a>
              ))}
              <a href="#register" onClick={() => setIsOpen(false)} className="border border-heading px-4 py-3 text-center hover:bg-secondary hover:text-primary transition-all mt-2">
                Registro
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-4 sm:px-6 overflow-hidden cyber-grid">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 border border-primary px-4 py-1.5 text-[10px] font-condensed font-bold tracking-[0.3em] text-primary mb-8 uppercase transition-colors duration-300">
            <Calendar className="w-3 h-3" />
            <span>Próxima Edición 2026</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[1] mb-8 transition-colors duration-300">
            Ciberseguridad <br />
            <span className="text-primary">Industrial & NIS2</span>
          </h1>
          <p className="text-lg md:text-xl text-primary mb-10 leading-relaxed max-w-xl font-light transition-colors duration-300">
            Preparando la industria del futuro: Convergencia IT/OT, cumplimiento normativo y resiliencia en infraestructuras críticas.
          </p>
          
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-3 text-heading font-condensed font-bold uppercase tracking-widest text-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span>30 Abril · Madrid</span>
            </div>

            <div className="flex items-center gap-3 text-heading font-condensed font-bold uppercase tracking-widest text-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span>5 Mayo · Sevilla</span>
            </div>

            <div className="flex items-center gap-3 text-heading font-condensed font-bold uppercase tracking-widest text-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span>7 Mayo · Bilbao</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a href="#register" className="btn-primary flex items-center justify-center gap-3 group">
              Registrarse
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="btn-secondary flex items-center justify-center gap-3">
              Más información
              <Info className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative z-10 border border-primary p-2 transition-all duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200" 
              alt="Cybersecurity Industrial" 
              className="w-full h-[400px] md:h-[600px] object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent pointer-events-none" />
          </div>
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-primary transition-colors duration-300" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-primary transition-colors duration-300" />
        </motion.div>
      </div>
    </div>
  </section>
);



const About = () => (
  <section id="about" className="py-24 md:py-40 px-4 sm:px-6 bg-primary transition-colors duration-300">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-10 leading-tight">Sobre el Evento</h2>
          <div className="w-20 h-1 bg-heading mb-12" />
          <p className="text-xl md:text-2xl text-heading font-light leading-relaxed mb-8">
            Tras la gran acogida de nuestro encuentro en Barcelona, Tempel Group organiza esta jornada especializada para abordar la realidad de la ciberseguridad industrial.
          </p>
          <p className="text-lg text-primary font-light leading-relaxed mb-8">
            El nuevo escenario industrial exige algo más que tecnología: requiere visión, criterio y colaboración. En esta sesión abordaremos los retos actuales de la ciberseguridad OT y cómo prepararse ante un entorno cada vez más conectado, más exigente y más regulado.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <div className="p-8 border border-primary brutal-card">
            <h3 className="text-2xl font-bold mb-4">Contexto NIS2</h3>
            <p className="text-primary font-light leading-relaxed">
              La directiva NIS2 marca un antes y un después en la regulación de la ciberseguridad en Europa. Analizaremos qué implicaciones reales tiene para la industria y cómo cumplir con los nuevos estándares de resiliencia.
            </p>
          </div>
          <div className="p-8 border border-primary brutal-card">
            <h3 className="text-2xl font-bold mb-4">Objetivo del Evento</h3>
            <p className="text-primary font-light leading-relaxed">
              Nuestro objetivo es ofrecer una visión útil y aplicable para ayudaros a entender el impacto regulatorio, identificar prioridades de protección y evaluar tecnologías de implantación.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Themes = () => {
  const themes = [
    { title: "Ciberseguridad Empresarial", icon: Lock, desc: "Protección integral de los activos digitales y la continuidad de negocio." },
    { title: "Regulación NIS2", icon: FileText, desc: "Análisis profundo del marco normativo y estrategias de cumplimiento." },
    { title: "Infraestructuras Críticas", icon: Shield, desc: "Seguridad avanzada para entornos industriales y servicios esenciales." },
    { title: "Soluciones Tecnológicas", icon: Zap, desc: "Últimas innovaciones en detección, respuesta y prevención de amenazas." },
    { title: "Gestión del Riesgo Digital", icon: Activity, desc: "Metodologías para identificar, evaluar y mitigar riesgos en la red." },
  ];

  return (
    <section id="themes" className="py-24 md:py-40 px-4 sm:px-6 bg-secondary text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-primary text-4xl md:text-7xl font-bold mb-6">Temáticas del Evento</h2>
          <p className="text-primary/60 max-w-2xl mx-auto font-light">Áreas principales que definen la agenda de esta edición especializada.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-primary/20 hover:border-primary transition-all group"
            >
              <theme.icon className="w-10 h-10 mb-8 opacity-40 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold mb-4 text-primary">{theme.title}</h3>
              <p className="text-primary/60 font-light leading-relaxed">{theme.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Innovation = () => (
  <section className="py-24 md:py-40 px-4 sm:px-6 bg-primary transition-colors duration-300">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">¿Por qué asistir?</h2>
          <p className="text-lg text-primary font-light leading-relaxed mb-10">
            Descubre las tecnologías que están transformando la seguridad en entornos productivos. Un espacio dedicado a la vanguardia tecnológica.
          </p>
          <div className="space-y-8">
            {[
              { title: "Tecnologías Presentadas", icon: Lightbulb, desc: "Hardware y software de última generación para entornos OT." },
              { title: "Soluciones de Ciberseguridad", icon: Shield, desc: "Sistemas de protección específicos para redes industriales." },
              { title: "Tendencias del Sector", icon: Globe, desc: "Hacia dónde se dirige la ciberseguridad industrial global." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-12 h-12 border border-primary flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-primary font-light text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" alt="Tech 1" className="w-full h-64 object-cover  transition-all" referrerPolicy="no-referrer" />
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" alt="Tech 2" className="w-full h-64 object-cover  transition-all mt-8" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  </section>
);

const Agenda = () => {
  const sessions = [
    { time: "09:00 - 10:00", title: "Situación actual de la ciberseguridad", desc: "Análisis de amenazas globales y su impacto en la industria local." },
    { time: "10:00 - 11:30", title: "Normativa NIS2", desc: "Sesión técnica sobre cumplimiento, plazos y responsabilidades legales." },
    { time: "11:30 - 12:00", title: "Coffee Break & Networking", desc: "Espacio de intercambio entre profesionales y expertos." },
    { time: "12:00 - 13:30", title: "Soluciones Tecnológicas", desc: "Demo práctica de herramientas de protección IT/OT convergentes." },
    { time: "13:30 - 14:30", title: "Casos Reales", desc: "Presentación de proyectos de éxito y lecciones aprendidas." },
    { time: "14:30 - 15:30", title: "Preguntas y Networking", desc: "Cierre de la jornada con debate abierto y conclusiones." },
  ];

  return (
    <section id="agenda" className="py-24 md:py-40 px-4 sm:px-6 bg-secondary text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-20">
          <h2 className="text-primary text-4xl md:text-7xl font-bold mb-6">Agenda del Evento</h2>
          <div className="w-20 h-1 bg-primary" />
        </div>
        
        <div className="space-y-6">
          {sessions.map((session, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row border border-primary/20 hover:border-primary transition-all"
            >
              <div className="md:w-1/4 p-8 bg-primary/5 border-b md:border-b-0 md:border-r border-primary/20 font-condensed font-bold text-xl text-primary">
                {session.time}
              </div>
              <div className="md:w-3/4 p-8">
                <h3 className="text-2xl font-bold mb-2 text-primary">{session.title}</h3>
                <p className="text-primary/60 font-light">{session.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Speakers = () => {
  const speakers = [
    { 
      name: "Gemma Garcés", 
      role: "Por definir", 
      company: "Tempel Group", 
      desc: "Pendiente de información.", 
      img: "https://picsum.photos/seed/gemma/400/400" 
    },
    { 
      name: "José Valiente", 
      role: "Por definir", 
      company: "CCI", 
      desc: "Pendiente de información.", 
      img: "https://picsum.photos/seed/jose/400/400" 
    },
    { 
      name: "Francisco Herrero", 
      role: "Por definir", 
      company: "Moxa", 
      desc: "Pendiente de información.", 
      img: "https://picsum.photos/seed/francisco/400/400" 
    },
    { 
      name: "Álvaro Borges", 
      role: "Por definir", 
      company: "Moxa", 
      desc: "Pendiente de información.", 
      img: "https://picsum.photos/seed/alvaro/400/400" 
    },
  ];

  return (
    <section id="speakers" className="py-24 md:py-40 px-4 sm:px-6 bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-bold mb-6">Ponentes</h2>
          <p className="text-primary max-w-2xl mx-auto font-light">
            Líderes de opinión y expertos técnicos que compartirán su conocimiento.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="brutal-card group overflow-hidden"
            >
              <div className="aspect-square overflow-hidden transition-all duration-500">
                <img src={speaker.img} alt={speaker.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
                <div className="text-[10px] font-condensed font-bold uppercase tracking-widest text-primary mb-4">
                  {speaker.role} @ {speaker.company}
                </div>
                <p className="text-xs text-primary font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                  {speaker.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = [
    { name: "CCI", logo: logoCCI, url: "https://www.cci-es.org/" },
    { name: "MOXA", logo: logoMoxa, url: "https://www.moxa.com/" }
  ];

  return (
    <section className="py-20 bg-primary border-y border-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Evento organizado por */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-condensed font-bold uppercase tracking-[0.4em] text-primary opacity-40 mb-4">
            Evento organizado por
          </h2>

          <div className="flex justify-center items-center mb-6">
            <img
              src={logoTempel}
              alt="Tempel Group"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </div>

          <div className="w-12 h-px bg-primary mx-auto opacity-20" />
        </div>

        {/* Partners */}
        <div className="text-center mb-12">
          <h2 className="text-xs font-condensed font-bold uppercase tracking-[0.4em] text-primary opacity-40 mb-4">
            Partners Estratégicos
          </h2>
          <div className="w-12 h-px bg-primary mx-auto opacity-20" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
          {partners.map((partner) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="transition-all duration-500 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
const Sponsors = () => {
  const logos = [
    "MOXA", "SIEMENS", "FORTINET", "PALO ALTO", "CISCO", "ABB", "ROCKWELL", "SCHNEIDER", "HONEYWELL", "KASPERSKY"
  ];

  return (
    <section className="py-20 bg-secondary border-y border-primary/20 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <h2 className="text-primary text-2xl font-bold uppercase tracking-widest text-center">Patrocinadores</h2>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="mx-12 flex items-center justify-center">
              <span className="text-primary text-4xl md:text-6xl font-condensed font-bold opacity-20 hover:opacity-100 transition-opacity cursor-default">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Countdown = () => {
  const events = [
    { city: "Madrid", date: new Date("2026-04-30T09:00:00").getTime() },
    { city: "Sevilla", date: new Date("2026-05-05T09:00:00").getTime() },
    { city: "Bilbao", date: new Date("2026-05-07T09:00:00").getTime() },
  ];

  const calculateTimeLeft = (target) => {
    const now = new Date().getTime();
    const distance = target - now;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(events.map(e => calculateTimeLeft(e.date)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(events.map(e => calculateTimeLeft(e.date)));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-primary border-y border-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

        <h2 className="text-2xl md:text-4xl font-bold mb-10">
          Los eventos comienzan en:
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {events.map((event, index) => (
            <div key={index} className="border border-primary p-6 brutal-card">

              <div className="text-lg font-condensed font-bold uppercase tracking-widest mb-6">
                {event.city}
              </div>

              <div className="grid grid-cols-4 gap-3">

                {[
                  { label: "D", value: timeLeft[index].days },
                  { label: "H", value: timeLeft[index].hours },
                  { label: "M", value: timeLeft[index].minutes },
                  { label: "S", value: timeLeft[index].seconds },
                ].map((item, i) => (
                  <div key={i} className="p-3 border border-primary">
                    <div className="text-2xl md:text-3xl font-bold">
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-[9px] font-condensed uppercase opacity-60">
                      {item.label}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))}

        </div>

        <a
          href="#register"
          className="btn-primary inline-flex items-center gap-3 group mt-12"
        >
          Registrarse ahora
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

      </div>
    </section>
  );
};

const MapSection = () => (
  <section className="py-24 md:py-40 px-4 sm:px-6 bg-secondary transition-colors duration-300">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-primary">Ubicación del Evento</h2>
          <p className="text-lg text-primary/60 font-light leading-relaxed mb-8">
            El evento se celebrará en el corazón tecnológico de Madrid, con excelentes conexiones de transporte y servicios de primer nivel.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-primary">Centro de Convenciones IFEMA</h4>
                <p className="text-primary/60 font-light">Av. del Partenón, 5, 28042 Madrid, España</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-primary">Pabellón de Innovación</h4>
                <p className="text-primary/60 font-light">Sala de Conferencias 4.1</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <a 
              href="https://maps.app.goo.gl/..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3"
            >
              Cómo llegar
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[500px] border border-primary/20  transition-all duration-700 overflow-hidden"
        >
          {/* Interactive Map Iframe */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3035.747144414328!2d-3.619623623439444!3d40.45871297143247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f3600000001%3A0x8683e3903102489e!2sIFEMA%20MADRID!5e0!3m2!1ses!2ses!4v1710150000000!5m2!1ses!2ses" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación IFEMA Madrid"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 pointer-events-none border-[20px] border-secondary/20" />
        </motion.div>
      </div>
    </div>
  </section>
);

const PracticalInfo = () => {
  const faqs = [
    { q: "¿Es el evento gratuito?", a: "Sí, es un evento exclusivo para profesionales del sector industrial previo registro y confirmación." },
    { q: "¿Se entregará certificado de asistencia?", a: "Sí, todos los asistentes recibirán un certificado digital de participación." },
    { q: "¿Habrá traducción simultánea?", a: "Las ponencias internacionales contarán con traducción simultánea al español." },
  ];

  return (
    <section className="py-24 md:py-40 px-4 sm:px-6 bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-12">Información Práctica</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <Calendar className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-1">Fecha</h4>
                  <p className="text-primary font-light">15 de Octubre, 2026</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Clock className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-1">Horario</h4>
                  <p className="text-primary font-light">09:00 - 15:30 (CET)</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Globe className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-1">Modalidad</h4>
                  <p className="text-primary font-light">Presencial (Madrid) & Streaming Online</p>
                </div>
              </div>
              <div className="flex gap-6">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-1">Lugar</h4>
                  <p className="text-primary font-light">Centro de Convenciones IFEMA / Plataforma Digital</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-10 uppercase tracking-widest">Preguntas Frecuentes</h3>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 border border-primary brutal-card">
                  <h4 className="font-bold mb-3 flex items-center gap-3">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-primary font-light leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-32 px-4 sm:px-6 text-center max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 border border-heading flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-heading w-10 h-10" />
        </div>
        <h3 className="text-4xl font-bold mb-6">Reserva Confirmada</h3>
        <p className="text-primary text-xl font-light">
          Gracias por registrarte. En breve recibirás un email con los detalles de acceso y la agenda completa.
        </p>
      </motion.div>
    );
  }

  return (
    <section id="register" className="py-24 md:py-40 px-4 sm:px-6 bg-secondary text-primary transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-4xl md:text-7xl font-bold mb-6 uppercase">Registro Profesional</h2>
          <p className="text-primary/60 font-light">Completa el formulario para reservar tu plaza en el evento.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Nombre</label>
              <input required type="text" className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Apellidos</label>
              <input required type="text" className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Empresa</label>
              <input required type="text" className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Cargo</label>
              <input required type="text" className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Email Profesional</label>
              <input required type="email" className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Teléfono</label>
              <input required type="tel" className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <input required type="checkbox" id="rgpd" className="mt-1.5 accent-primary" />
            <label htmlFor="rgpd" className="text-xs text-primary/60 font-light leading-relaxed">
              Acepto la política de privacidad y el tratamiento de mis datos para la gestión del evento conforme al RGPD.
            </label>
          </div>
          
          <button 
            type="submit"
            className="w-full py-6 bg-primary text-secondary font-condensed font-bold uppercase tracking-[0.4em] text-xl hover:opacity-90 transition-all flex items-center justify-center gap-4 group"
          >
            Reservar Plaza
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 px-4 sm:px-6 bg-primary border-t border-primary transition-colors duration-300">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          {/* Logo Tempel */}
          <img 
            src={logoTempel} 
            alt="Tempel Group" 
            className="h-8 w-auto object-contain"
          />
        </div>
        <p className="text-sm text-primary font-light leading-relaxed">
          Expertos en soluciones tecnológicas industriales y ciberseguridad avanzada para la industria del futuro.
        </p>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-xs font-condensed font-bold uppercase tracking-widest text-heading">Contacto</h4>
        <div className="space-y-4 text-sm font-light">
          <a href="mailto:info@tempelgroup.com" className="flex items-center gap-3 hover:text-heading transition-colors">
            <Globe className="w-4 h-4" />
            leads@tempelgroup.com
          </a>
          <a href="tel:+34931234567" className="flex items-center gap-3 hover:text-heading transition-colors">
            <Phone className="w-4 h-4" />
            +34 93 123 45 67
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xs font-condensed font-bold uppercase tracking-widest text-heading">Social</h4>
        <div className="flex gap-6">
          <a href="#" className="hover:text-heading transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-heading transition-colors">Twitter</a>
          <a href="#" className="hover:text-heading transition-colors">YouTube</a>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xs font-condensed font-bold uppercase tracking-widest text-heading">Legal</h4>
        <div className="space-y-4 text-sm font-light">
          <a href="#" className="block hover:text-heading transition-colors">Privacidad</a>
          <a href="#" className="block hover:text-heading transition-colors">Cookies</a>
          <a href="#" className="block hover:text-heading transition-colors">Aviso Legal</a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary/30 text-[10px] uppercase tracking-[0.4em] text-primary opacity-40">
      © {new Date().getFullYear()} Tempel Group. Todos los derechos reservados.
    </div>
  </footer>
);

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen selection:bg-heading selection:text-primary transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Themes />
      <Partners />
      <Innovation />
      <Agenda /> 
      <Speakers />
      {/*<Sponsors />*/}
      <Countdown />
      <MapSection />
      <PracticalInfo />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
