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

import logoCCI from "./assets/images/brand/logo/logo-cci-pos-es.png";
import logoMoxa from "./assets/images/brand/logo/Moxa_Logo_CMYK.png";


import AlvaroBorges from "./assets/images/ponentes/alvaro_borges.png";
import JoseValiente from "./assets/images/ponentes/jose_valiente.png";



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
  <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-20 px-6 md:px-12 xl:px-32 overflow-hidden cyber-grid">
    
    {/* 🔥 Contenedor más estrecho en desktop */}
    <div className="max-w-5xl xl:max-w-6xl mx-auto relative z-10">
      
      <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 border border-primary px-6 py-2 text-xs md:text-sm font-condensed font-bold tracking-[0.35em] text-primary mb-8 uppercase">
            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            <span>Próxima Edición 2026</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-6xl xl:text-6xl font-bold leading-[1] mb-8">
            <strong>Ciberseguridad Industrial</strong> <br />
            <span className="text-primary">& NIS2</span>
          </h1>

          <p className="text-lg md:text-xl text-primary mb-10 leading-relaxed max-w-xl font-light">
            Preparando la <strong>industria del futuro</strong>: 
            <strong> Convergencia IT/OT</strong>, 
            <strong> cumplimiento normativo</strong> y 
            <strong> resiliencia en infraestructuras críticas</strong>.
          </p>
          
          <div className="flex flex-col gap-4 mb-12">

            <div className="flex items-center gap-3 font-condensed font-bold uppercase tracking-widest text-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span><strong>30 Abril</strong> · Madrid</span>
            </div>

            {/* 
            <div className="flex items-center gap-3 font-condensed font-bold uppercase tracking-widest text-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span><strong>5 Mayo</strong> · Sevilla</span>
            </div>

            <div className="flex items-center gap-3 font-condensed font-bold uppercase tracking-widest text-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span><strong>7 Mayo</strong> · Bilbao</span>
            </div>
            */}
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
          <div className="relative z-10 border border-primary p-2">
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200" 
              alt="Ciberseguridad industrial OT IT"
              className="w-full h-[400px] md:h-[600px] object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent pointer-events-none" />
          </div>

          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-primary" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-primary" />
        </motion.div>

      </div>
    </div>
  </section>
);


const About = () => (
  <section id="about" className="py-12 md:py-20 px-6 md:px-12 xl:px-32 bg-primary">
    
    <div className="max-w-5xl xl:max-w-6xl mx-auto">
      
      <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold leading-tight">
            Sobre el Evento
          </h2>

          <div className="w-20 h-1 bg-heading mb-12" />

          <p className="text-xl md:text-1xl text-heading font-light leading-relaxed mb-8">
            Tras la gran acogida en Barcelona,{" "}
            <strong className="font-bold text-primary">
              Tempel Group
            </strong>{" "}
            organiza esta jornada especializada para abordar la{" "}
            <strong className="font-bold text-primary">
              ciberseguridad industrial
            </strong>.
          </p>

          <p className="text-lg text-primary font-light leading-relaxed mb-8">
            El nuevo escenario industrial exige algo más que tecnología: requiere{" "}
            <strong className="font-semibold text-heading">
              visión estratégica
            </strong>,{" "}
            <strong className="font-semibold text-heading">
              criterio técnico
            </strong>{" "}
            y{" "}
            <strong className="font-semibold text-heading">
              colaboración
            </strong>.
            <br /><br />
            En esta sesión abordaremos los retos actuales de la{" "}
            <strong className="font-bold text-heading">
              ciberseguridad OT
            </strong>{" "}
            y cómo prepararse ante un entorno cada vez más{" "}
            <strong className="font-semibold text-heading">
              conectado, exigente y regulado
            </strong>.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-10"
        >
          <div className="p-8 border border-primary brutal-card">
            <h3 className="text-2xl font-bold mb-4">
              Contexto{" "}
              <span className="text-primary font-extrabold">
                NIS2
              </span>
            </h3>
            <p className="text-primary font-light leading-relaxed">
              La directiva{" "}
              <strong className="text-heading font-bold">
                NIS2
              </strong>{" "}
              marca un antes y un después en la{" "}
              <strong className="text-heading font-semibold">
                regulación de la ciberseguridad en Europa
              </strong>.
              <br /><br />
              Analizaremos sus implicaciones reales y cómo cumplir con los nuevos estándares de{" "}
              <strong className="text-heading font-semibold">
                resiliencia y protección industrial
              </strong>.
            </p>
          </div>

          <div className="p-8 border border-primary brutal-card">
            <h3 className="text-2xl font-bold mb-4">
              Objetivo del Evento
            </h3>
            <p className="text-primary font-light leading-relaxed">
              Ofrecer una visión{" "}
              <strong className="text-heading font-semibold">
                práctica y aplicable
              </strong>{" "}
              para entender el impacto regulatorio, identificar{" "}
              <strong className="text-heading font-semibold">
                prioridades de ciberseguridad
              </strong>{" "}
              y evaluar{" "}
              <strong className="text-heading font-semibold">
                tecnologías de protección industrial
              </strong>.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);





const Themes = () => {
  const themes = [
    { 
      title: "Ciberseguridad & NIS2", 
      icon: Lock, 
      desc: "Estrategias de <strong>ciberseguridad empresarial</strong> alineadas con la <strong>regulación NIS2</strong>, garantizando la protección de activos digitales y el cumplimiento normativo." 
    },
    { 
      title: "Infraestructuras Críticas & Tecnología", 
      icon: Shield, 
      desc: "Protección de <strong>infraestructuras críticas</strong> mediante <strong>soluciones tecnológicas avanzadas</strong> en detección, respuesta y prevención de amenazas." 
    },
    { 
      title: "Gestión del Riesgo Digital", 
      icon: Activity, 
      desc: "Metodologías para <strong>identificar, evaluar y mitigar riesgos</strong> en entornos industriales y redes corporativas." 
    },
  ];

  return (
    <section id="themes" className="py-12 md:py-20 px-6 md:px-12 xl:px-32 bg-secondary text-primary">
      
      {/* 🔥 Contenedor alineado con Hero/About */}
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold mb-6">
            Temáticas del Evento
          </h2>
          <p className="text-primary/60 max-w-2xl mx-auto font-light">
            Áreas clave en <strong className="text-primary">ciberseguridad industrial</strong>, 
            <strong className="text-primary"> cumplimiento NIS2</strong> y 
            <strong className="text-primary"> protección de infraestructuras críticas</strong>.
          </p>
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

              <h3 className="text-2xl font-bold mb-4 text-primary">
                {theme.title}
              </h3>

              <p 
                className="text-primary/60 font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: theme.desc }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};







const Innovation = () => (
  <section className="py-24 md:py-20 px-6 md:px-12 xl:px-32 bg-primary transition-colors duration-300">
    
    <div className="max-w-5xl xl:max-w-6xl mx-auto">
      
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">¿Por qué asistir?</h2>

          <p className="text-lg text-primary font-light leading-relaxed mb-10">
            Descubre las <strong className="text-heading font-semibold">tecnologías que están transformando la ciberseguridad industrial</strong> en entornos productivos. 
            Un espacio dedicado a la <strong className="text-heading font-semibold">vanguardia tecnológica en IT/OT</strong>.
          </p>

          <div className="space-y-8">
            {[
              { 
                title: "Tecnologías Presentadas", 
                icon: Lightbulb, 
                desc: "Hardware y software de última generación para <strong>entornos OT</strong>." 
              },
              { 
                title: "Soluciones de Ciberseguridad", 
                icon: Shield, 
                desc: "Sistemas de protección específicos para <strong>redes industriales</strong>." 
              },
              { 
                title: "Tendencias del Sector", 
                icon: Globe, 
                desc: "Evolución de la <strong>ciberseguridad industrial global</strong>." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                
                <div className="w-12 h-12 border border-primary flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p 
                    className="text-primary font-light text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" 
            alt="Tecnología ciberseguridad industrial" 
            className="w-full h-64 object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" 
            alt="Redes industriales seguridad OT" 
            className="w-full h-64 object-cover mt-8"
          />
        </div>

      </div>
    </div>
  </section>
);











const Agenda = () => {
  const sessions = [
    {
      time: "09:30 - 10:00",
      title: "Bienvenida y acreditación",
      desc: "Recepción de asistentes y entrega de acreditaciones."
    },
    {
      time: "10:00 - 10:05",
      title: "Introducción",
      desc: "Jordi Gangolells (Marketing Manager, Tempel Group)."
    },
    {
      time: "10:05 - 10:20",
      title: "Evolución, experiencia y compromiso con el futuro del entorno industrial",
      desc: "Gemma Garcés (Sales Manager, Tempel Group)."
    },
    {
      time: "10:20 - 10:50",
      title: "Aprendiendo de los errores al cumplir NIS2 en un entorno OT",
      desc: "José Valiente (Director General, CCI)."
    },
    {
      time: "10:50 - 11:50",
      title: "Protegiendo Activos OT en la Convergencia IT/OT: IEC 62443 en Acción",
      desc: "Francisco Herrero (Channel Sales Manager, MOXA)."
    },
    {
      time: "11:50 - 12:00",
      title: "Coffee Break",
      desc: "Pausa para café y networking."
    },
    {
      time: "12:00 - 13:00",
      title: "Demostración Producto Moxa",
      desc: "Álvaro Borges (Senior Lead Field Application Engineer, MOXA)."
    },
    {
      time: "13:00 - 14:00",
      title: "Mesa redonda - Seguridad OT integral: regulación, tecnología y personas",
      desc: "Francisco Herrero, Álvaro Borges, José Valiente y Juan Robles."
    },
    {
      time: "14:00 - 15:00",
      title: "Lunch & Networking: Conectando la Ciberseguridad",
      desc: "Espacio final para networking entre profesionales."
    },
  ];

  return (
    <section id="agenda" className="py-24 md:py-20 px-6 md:px-12 xl:px-32 bg-secondary text-primary">
      
      <div className="max-w-5xl xl:max-w-6xl mx-auto text-center">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl xl:text-6xl font-bold mb-6">
            Agenda del Evento
          </h2>
          <div className="w-16 h-px bg-primary mx-auto opacity-40" />
        </div>
        
        <div className="space-y-4">
          {sessions.map((session, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col md:flex-row border border-primary/20 hover:border-primary transition-all"
            >
              <div className="md:w-1/4 p-6 bg-primary/5 border-b md:border-b-0 md:border-r border-primary/20 font-condensed font-bold text-base text-primary">
                {session.time}
              </div>

              <div className="md:w-3/4 p-6 text-left">
                <h3 className="text-xl font-semibold mb-1 text-primary">
                  {session.title}
                </h3>
                <p className="text-primary/60 font-light text-sm leading-relaxed">
                  {session.desc}
                </p>
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
      role: "Ciberseguridad Industrial", 
      company: "CCI", 
      desc: "Comunico y comparto experiencias en ciberseguridad industrial para crecer aliados.", 
      img: JoseValiente
    },
    { 
      name: "Francisco Herrero", 
      role: "Channel sales manager", 
      company: "Moxa", 
      desc: "Pendiente de información.", 
      img: "https://picsum.photos/seed/francisco/400/400" 
    },
    {
      name: "Álvaro Borges",
      role: "Senior Lead Field Application Engineer",
      company: "MOXA",
      desc: "Especialista en soluciones industriales y conectividad OT, con amplia experiencia en soporte técnico avanzado y despliegue de infraestructuras en entornos industriales.",
      img: AlvaroBorges
    },
  ];

  return (
    <section id="speakers" className="py-24 md:py-20 px-6 md:px-12 xl:px-32 bg-primary">
      
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl xl:text-6xl font-bold mb-6">
            Ponentes
          </h2>
          <p className="text-primary/60 max-w-2xl mx-auto font-light">
            <strong className="text-heading">Expertos en ciberseguridad industrial</strong> y 
            <strong className="text-heading"> tecnologías OT/IT</strong> que compartirán su conocimiento.
          </p>
        </div>
        
        {/* 🔥 md = 2x2 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-primary/20 group overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={speaker.img} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 text-left">
                <h3 className="text-lg font-bold mb-1">
                  {speaker.name}
                </h3>

                <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-primary/80 mb-3">
                  {speaker.role} @ {speaker.company}
                </div>

                <p className="text-xs text-primary/60 font-light leading-relaxed group-hover:text-primary transition-colors">
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
    { name: "MOXA", logo: logoMoxa, url: "https://www.moxa.com/", className: "w-1/2" }
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 xl:px-32 bg-primary border-y border-primary">
      
      {/* 🔥 Contenedor alineado con todo */}
      <div className="max-w-5xl xl:max-w-6xl mx-auto">

        {/* ORGANIZADO POR */}
        <div className="text-center mb-20">
          <h2 className="text-sm md:text-xl font-condensed font-bold uppercase tracking-[0.4em] text-primary opacity-60 mb-6">
            Evento organizado por
          </h2>

          <div className="flex justify-center items-center mb-8">
            <img
              src={logoTempel}
              alt="Tempel Group"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>

          <div className="w-16 h-px bg-primary mx-auto opacity-30" />
        </div>

        {/* PARTNERS */}
        <div className="text-center mb-16">
          <h2 className="text-sm md:text-xl font-condensed font-bold uppercase tracking-[0.4em] text-primary opacity-60">
              Partners y Colaboradores
          </h2>
          <div className="w-16 h-px bg-primary mx-auto opacity-30" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-20 md:gap-32">
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
                className={`h-14 md:h-20 object-contain ${partner.className || "w-auto"}`}
              />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};












const PracticalInfo = () => {
  const events = [
    {
      city: "Madrid",
      date: "15 Oct 2026",
      time: "09:00 - 15:30",
      location: "Ubicación pendiente de confirmar",
      venue: "Centro Tecnológico Madrid",
      mapUrl: "https://maps.google.com/?q=madrid",
      iframe: "https://www.google.com/maps?q=madrid&output=embed",
    },
    /*
    {
      city: "Bilbao",
      date: "22 Oct 2026",
      time: "09:00 - 15:30",
      location: "Ubicación pendiente de confirmar",
      venue: "Espacio Innovación Bilbao",
      mapUrl: "https://maps.google.com/?q=bilbao",
      iframe: "https://www.google.com/maps?q=bilbao&output=embed",
    },
    {
      city: "Sevilla",
      date: "29 Oct 2026",
      time: "09:00 - 15:30",
      location: "Ubicación pendiente de confirmar",
      venue: "Centro de Convenciones Sevilla",
      mapUrl: "https://maps.google.com/?q=sevilla",
      iframe: "https://www.google.com/maps?q=sevilla&output=embed",
    },
    */
  ];

  const faqs = [
    { q: "¿Es el evento gratuito?", a: "Sí, es un evento exclusivo para profesionales del sector industrial previo registro." },
    { q: "¿Se entregará certificado?", a: "Sí, recibirás un certificado digital de participación." },
    { q: "¿Habrá traducción?", a: "Las ponencias internacionales contarán con traducción simultánea." },
  ];

  return (
    <section className="py-24 md:py-20 px-6 md:px-12 xl:px-32 bg-primary">
      
      <div className="max-w-5xl xl:max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6">
            Información Práctica
          </h2>
          <p className="text-primary/60 font-light max-w-2xl mx-auto">
            Evento presencial en <strong className="text-heading">Madrid</strong>, 
            centrado en <strong className="text-heading">ciberseguridad industrial</strong> y 
            <strong className="text-heading"> entornos OT</strong>.
          </p>
        </div>

        {/* EVENT + MAP */}
        <div className="space-y-10 mb-20">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-primary/20 overflow-hidden"
            >
              {/* MAP */}
              <div className="h-[280px] md:h-[350px] relative">
                <iframe
                  src={event.iframe}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title={event.city}
                  className="opacity-80"
                />
                <div className="absolute inset-0 pointer-events-none border-[10px] border-primary/10" />
              </div>

              {/* INFO */}
              <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 text-left">
                
                {/* LEFT */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {event.city}
                  </h3>

                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 mt-1" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 mt-1" />
                    <div>
                      <p className="font-semibold">{event.venue}</p>
                      <p className="text-primary/60 text-sm">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                  >
                    Cómo llegar
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg md:text-xl xl:text-4xl font-bold mb-10 uppercase tracking-widest text-center">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-primary/20 p-6">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  {faq.q}
                </h4>
                <p className="text-primary/60 text-sm font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};



const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    empresa: "",
    cargo: "",
    email: "",
    telefono: "",
    legal: false,
    newsletter: false,
    honeypot: ""
  });

  const sanitize = (value: string) => value.replace(/[<>]/g, "").trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : sanitize(value)
    });
  };

  const validate = () => {
    const blockedDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

    if (!formData.nombre || !formData.apellidos) return false;
    if (!formData.cargo) return false;
    if (!formData.email.includes("@")) return false;

    const domain = formData.email.split("@")[1]?.toLowerCase();
    if (!domain || blockedDomains.includes(domain)) {
      alert("Introduce un email corporativo (no Gmail, Hotmail, etc.)");
      return false;
    }

    if (!formData.telefono) return false;
    if (!formData.legal) return false;
    if (formData.honeypot !== "") return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      alert("Completa correctamente todos los campos obligatorios");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.ok) setSubmitted(true);
      else alert("Error enviando formulario");
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-32 px-6 md:px-12 xl:px-32 text-center max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 border border-heading flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-heading w-10 h-10" />
        </div>
        <h3 className="text-4xl font-bold mb-6">Reserva Confirmada</h3>
        <p className="text-primary text-xl font-light">
          Gracias por registrarte. Recibirás un email con los detalles del evento.
        </p>
      </motion.div>
    );
  }

  return (
    <section id="register" className="py-24 md:py-20 px-6 md:px-12 xl:px-32 bg-secondary text-primary">
      
      <div className="max-w-5xl xl:max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 uppercase">
            Registro Profesional
          </h2>
          <p className="text-primary/60 font-light">
            Completa el formulario para reservar tu plaza.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* honeypot */}
          <input
            type="text"
            name="honeypot"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">
                Nombre *
              </label>
              <input name="nombre" required onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary" />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">
                Apellidos *
              </label>
              <input name="apellidos" required onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">
                Empresa
              </label>
              <input name="empresa" onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary" />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">
                Cargo *
              </label>
              <input name="cargo" required onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">
                Email Profesional *
              </label>
              <input type="email" name="email" required onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary" />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">
                Teléfono *
              </label>
              <input type="tel" name="telefono" required onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 py-3 text-xl outline-none focus:border-primary" />
            </div>
          </div>

          {/* LEGAL */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <input type="checkbox" name="legal" required onChange={handleChange} className="mt-1.5 accent-primary" />
              <span className="text-xs text-primary/60 font-light leading-relaxed">
                Acepto las{" "}
                <a href="/aviso-legal.html" className="underline">condiciones legales</a>,{" "}
                <a href="/politica-privacidad.html" className="underline">política de privacidad</a> y{" "}
                <a href="/cookies.html" className="underline">cookies</a>. *
              </span>
            </div>

            <div className="flex items-start gap-4">
              <input type="checkbox" name="newsletter" onChange={handleChange} className="mt-1.5 accent-primary" />
              <span className="text-xs text-primary/60 font-light leading-relaxed">
                Deseo recibir comunicaciones informativas.
              </span>
            </div>
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-primary text-secondary border border-primary font-condensed font-bold uppercase tracking-[0.4em] text-xl hover:opacity-90 flex items-center justify-center gap-4 group"
          >
            {loading ? "Enviando..." : "Reservar Plaza"}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>

        </form>
      </div>
    </section>
  );
};



const Footer = () => (
  <footer className="py-12 md:py-20 pb-16 md:pb-24 px-6 md:px-12 xl:px-32 bg-primary border-t border-primary">
    
    <div className="max-w-5xl xl:max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16">
      
      {/* BRAND */}
      <div className="space-y-6">
        <img 
          src={logoTempel} 
          alt="Tempel Group" 
          className="h-8 md:h-10 w-auto object-contain"
        />
        <p className="text-sm text-primary/60 font-light leading-relaxed">
          Expertos en <strong className="text-heading">ciberseguridad industrial</strong> y 
          <strong className="text-heading"> soluciones tecnológicas</strong> para la industria del futuro.
        </p>
      </div>
      
      {/* CONTACTO */}
      <div className="space-y-6">
        <h4 className="text-sm md:text-xl font-condensed font-bold uppercase tracking-[0.4em] text-heading">
          Contacto
        </h4>
        <div className="space-y-4 text-sm font-light">
          <a href="mailto:leads@tempelgroup.com" className="flex items-center gap-3 hover:text-heading transition-colors">
            <Globe className="w-4 h-4" />
            leads@tempelgroup.com
          </a>
          <a href="tel:+34931234567" className="flex items-center gap-3 hover:text-heading transition-colors">
            <Phone className="w-4 h-4" />
            +34 93 123 45 67
          </a>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="space-y-6">
        <h4 className="text-sm md:text-xl font-condensed font-bold uppercase tracking-[0.4em] text-heading">
          Social
        </h4>
        <div className="space-y-3 text-sm font-light">
          <a href="https://www.linkedin.com/company/tempelgroup/" target="_blank" className="block hover:text-heading transition-colors">LinkedIn</a>
          <a href="https://www.youtube.com/@TempelGroupWorld" target="_blank" className="block hover:text-heading transition-colors">YouTube</a>
          <a href="https://www.facebook.com/TempelGroupWorld/" target="_blank" className="block hover:text-heading transition-colors">Facebook</a>
          <a href="https://www.instagram.com/tempelgroup/" target="_blank" className="block hover:text-heading transition-colors">Instagram</a>
          <a href="https://share.google/U3uQePfl8ee4RSfrM" target="_blank" className="block hover:text-heading transition-colors">Google Business</a>
        </div>
      </div>

      {/* LEGAL */}
      <div className="space-y-6">
        <h4 className="text-sm md:text-xl font-condensed font-bold uppercase tracking-[0.4em] text-heading">
          Legal
        </h4>
        <div className="space-y-3 text-sm font-light">
          <a href="/aviso-legal.html" className="block hover:text-heading transition-colors">Aviso Legal</a>
          <a href="/politica-privacidad.html" className="block hover:text-heading transition-colors">Política de Privacidad</a>
          <a href="/cookies.html" className="block hover:text-heading transition-colors">Cookies</a>
        </div>
      </div>

    </div>

    <div className="max-w-5xl xl:max-w-6xl mx-auto mt-16 pt-6 border-t border-primary/30 text-[10px] uppercase tracking-[0.4em] text-primary/40 text-center">
      © {new Date().getFullYear()} Tempel Group. Todos los derechos reservados.
    </div>

  </footer>
);



{/* non-used components 
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



const MapSection = () => {
  const locations = [
    {
      city: "Madrid",
      venue: "Centro Tecnológico Madrid",
      address: "Ubicación pendiente de confirmar",
      mapUrl: "https://maps.google.com/?q=madrid",
      iframe: "https://www.google.com/maps?q=madrid&output=embed",
    },
    /*
    {
      city: "Bilbao",
      venue: "Espacio Innovación Bilbao",
      address: "Ubicación pendiente de confirmar",
      mapUrl: "https://maps.google.com/?q=bilbao",
      iframe: "https://www.google.com/maps?q=bilbao&output=embed",
    },
    {
      city: "Sevilla",
      venue: "Centro de Convenciones Sevilla",
      address: "Ubicación pendiente de confirmar",
      mapUrl: "https://maps.google.com/?q=sevilla",
      iframe: "https://www.google.com/maps?q=sevilla&output=embed",
    },
    
  ];

  return (
    <section className="py-24 md:py-20 px-6 md:px-12 xl:px-32 bg-secondary">
      
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        

        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 text-primary">
            Ubicación del Evento
          </h2>
          <p className="text-primary/60 font-light max-w-2xl mx-auto">
            Evento presencial en <strong className="text-heading">Madrid</strong>, 
            en un entorno orientado a la <strong className="text-heading">ciberseguridad industrial</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-10">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border border-primary/20 hover:border-primary transition-all duration-500 overflow-hidden"
            >
              <div className="h-[280px] md:h-[350px] relative">
                <iframe
                  src={loc.iframe}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title={loc.city}
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 pointer-events-none border-[10px] border-secondary/20" />
              </div>

  
              <div className="p-6 md:p-8 space-y-4 text-left">
                <h3 className="text-xl md:text-2xl font-bold text-primary">
                  {loc.city}
                </h3>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-primary">{loc.venue}</p>
                    <p className="text-primary/60 text-sm font-light">
                      {loc.address}
                    </p>
                  </div>
                </div>

                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                  Cómo llegar
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

*/}

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
      <Innovation />
      <Partners />
      <Agenda /> 
      <Speakers />
      {/*<Sponsors />
      <Countdown />
      <MapSection />*/}
      <PracticalInfo />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
