import { motion } from "motion/react";
import { 
  Shield, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import React, { useState, useEffect } from "react";

const Navbar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0 transition-colors duration-300">
            <Shield className="text-primary w-5 h-5 transition-colors duration-300" />
          </div>
          <span className="text-xl sm:text-2xl font-condensed font-bold text-heading tracking-tighter uppercase truncate transition-colors duration-300">
            TEMPEL <span className="text-primary">GROUP</span>
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-xs font-condensed font-bold uppercase tracking-[0.2em] text-primary transition-colors duration-300">
          <a href="#intro" className="hover:text-heading transition-colors">Evento</a>
          <a href="#contents" className="hover:text-heading transition-colors">Contenidos</a>
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary hover:text-primary transition-all rounded-full"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#register" className="border border-heading px-4 py-2 hover:bg-secondary hover:text-primary transition-all">
            Preinscripción
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
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
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-primary border-b border-primary p-6 flex flex-col gap-6 text-sm font-condensed font-bold uppercase tracking-widest text-primary transition-colors duration-300"
        >
          <a href="#intro" onClick={() => setIsOpen(false)} className="hover:text-heading">Evento</a>
          <a href="#contents" onClick={() => setIsOpen(false)} className="hover:text-heading">Contenidos</a>
          <a href="#register" onClick={() => setIsOpen(false)} className="border border-heading px-4 py-3 text-center hover:bg-secondary hover:text-primary transition-all">
            Preinscripción
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 overflow-hidden cyber-grid">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block border border-primary px-4 py-1 text-[10px] font-condensed font-bold tracking-[0.3em] text-primary mb-6 md:mb-8 uppercase transition-colors duration-300">
            Nueva Edición en Preparación
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 transition-colors duration-300">
            Preinscríbete a la próxima edición de <br />
            <span className="text-primary">Ciberseguridad Industrial & NIS2:</span> <br />
            <span className="opacity-40">Preparando la industria del futuro</span>
          </h1>
          <p className="text-base md:text-lg text-primary mb-4 leading-relaxed max-w-lg font-light transition-colors duration-300">
            Tras la gran acogida de nuestro encuentro en Barcelona, en Tempel Group estamos preparando una nueva edición de esta jornada especializada sobre ciberseguridad en entornos industriales, convergencia IT/OT y cumplimiento normativo NIS2.
          </p>
          <p className="text-sm md:text-base text-primary mb-8 leading-relaxed max-w-lg font-medium transition-colors duration-300">
            Déjanos tus datos y te avisaremos en cuanto confirmemos la fecha, la ciudad y la apertura oficial de inscripciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a 
              href="#register" 
              className="btn-primary flex items-center justify-center gap-3 group text-center"
            >
              Quiero preinscribirme
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center justify-center sm:justify-start gap-3 px-4 py-4 text-heading font-condensed font-bold tracking-widest uppercase text-xs sm:text-sm transition-colors duration-300">
              <Users className="opacity-40 w-5 h-5" />
              <span>Plazas Limitadas</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="relative z-10 border border-primary p-1.5 md:p-2 grayscale hover:grayscale-0 transition-all duration-700">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
              alt="Industrial Cybersecurity" 
              className="w-full h-auto object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[10px] md:border-[20px] border-primary/20 pointer-events-none transition-colors duration-300" />
          </div>
          
          {/* Brutalist accents - Hidden on small screens to reduce clutter */}
          <div className="hidden sm:block absolute -top-10 -right-10 w-24 md:w-32 h-24 md:h-32 border-t border-r border-primary transition-colors duration-300" />
          <div className="hidden sm:block absolute -bottom-10 -left-10 w-24 md:w-32 h-24 md:h-32 border-b border-l border-primary transition-colors duration-300" />
        </motion.div>
      </div>
    </div>
  </section>
);

const Intro = () => (
  <section id="intro" className="py-20 md:py-32 px-4 sm:px-6 border-y border-primary bg-primary transition-colors duration-300">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 md:mb-12 leading-tight transition-colors duration-300">Una jornada para <br className="hidden sm:block" />entender, decidir y actuar</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-base md:text-lg leading-relaxed text-primary font-light transition-colors duration-300">
          <p>
            El nuevo escenario industrial exige algo más que tecnología: requiere visión, criterio y colaboración. En esta sesión abordaremos los retos actuales de la ciberseguridad OT y cómo prepararse ante un entorno cada vez más conectado, más exigente y más regulado.
          </p>
          <p>
            Hablaremos de cómo afrontar la convergencia IT/OT, qué implicaciones reales tiene NIS2 para la industria y qué buenas prácticas pueden ayudar a mejorar la resiliencia y la protección de los activos críticos.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const ContentItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex items-start gap-4 md:gap-6 p-5 md:p-6 brutal-card group"
  >
    <div className="mt-1 text-heading font-condensed font-bold text-lg md:text-xl opacity-20 group-hover:opacity-100 transition-all shrink-0">
      /
    </div>
    <span className="text-heading font-condensed text-lg md:text-xl tracking-wide uppercase leading-tight transition-colors duration-300">{text}</span>
  </motion.div>
);

const Contents = () => {
  const items = [
    "Contexto actual de la ciberseguridad industrial",
    "Impacto de la convergencia IT/OT en los entornos productivos",
    "Claves para avanzar en el cumplimiento de NIS2",
    "Enfoque práctico sobre segmentación, acceso seguro, gestión de vulnerabilidades y resiliencia",
    "Buenas prácticas y aprendizajes reales en entornos OT",
    "Espacio de debate con especialistas del sector",
    "Networking con profesionales de la industria"
  ];

  const objectives = [
    "entender el impacto regulatorio",
    "identificar prioridades de protección",
    "evaluar tecnologías y criterios de implantación",
    "compartir experiencias y resolver dudas con expertos"
  ];

  return (
    <section id="contents" className="py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 transition-colors duration-300 uppercase">Qué encontrarás en el evento</h2>
          <p className="text-xl md:text-2xl font-condensed font-bold text-primary transition-colors duration-300">¿Qué veremos en esta próxima edición?</p>
          <div className="w-16 md:w-24 h-1 bg-heading mt-6 transition-colors duration-300" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border border-primary transition-colors duration-300 mb-20">
          {items.map((item, idx) => (
            <ContentItem key={idx} text={item} delay={idx * 0.05} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight transition-colors duration-300">Un enfoque práctico y orientado a la realidad industrial</h3>
            <p className="text-lg text-primary font-light leading-relaxed mb-8 transition-colors duration-300">
              Esta jornada está dirigida a profesionales que necesitan aterrizar la ciberseguridad industrial en decisiones reales: responsables de planta, ingeniería, automatización, OT, IT, ciberseguridad, compliance y dirección técnica.
            </p>
            <p className="text-lg text-primary font-medium mb-6 transition-colors duration-300">Nuestro objetivo es ofrecer una visión útil y aplicable para ayudaros a:</p>
            <ul className="space-y-4 mb-10">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-center gap-3 text-primary transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-heading shrink-0" />
                  <span className="font-light">{obj}</span>
                </li>
              ))}
            </ul>
            <a 
              href="#register" 
              className="btn-primary inline-flex items-center justify-center gap-3 group"
            >
              Preinscribirme ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          <div className="relative border border-primary p-2 transition-colors duration-300">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
              alt="Industrial Reality" 
              className="w-full h-auto grayscale transition-all duration-700 hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Partners = () => (
  <section className="py-20 md:py-32 px-4 sm:px-6 bg-primary border-y border-primary transition-colors duration-300">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8 transition-colors duration-300">Con la participación de expertos y partners de referencia</h2>
        <p className="text-lg md:text-xl text-primary font-light leading-relaxed transition-colors duration-300">
          En esta nueva edición contaremos con la participación de especialistas de <strong>Tempel Group</strong>, <strong>MOXA</strong> y <strong>Centro de Ciberseguridad Industrial</strong>, para compartir conocimiento, experiencia y perspectivas complementarias sobre regulación, tecnología y personas en la seguridad OT.
        </p>
      </motion.div>
    </div>
  </section>
);

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    "la convocatoria oficial",
    "la agenda actualizada",
    "la ubicación definitiva",
    "la apertura de plazas"
  ];

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 md:py-32 px-4 sm:px-6 text-center max-w-2xl mx-auto"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 border border-heading flex items-center justify-center mx-auto mb-8 transition-colors duration-300">
          <CheckCircle2 className="text-heading w-8 h-8 md:w-10 md:h-10 transition-colors duration-300" />
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300">Interés Registrado</h3>
        <p className="text-primary text-lg md:text-xl font-light transition-colors duration-300">
          Gracias por tu interés. Te avisaremos personalmente en cuanto confirmemos la fecha y se abra el registro oficial.
        </p>
      </motion.div>
    );
  }

  return (
    <section id="register" className="py-20 md:py-32 px-4 sm:px-6 bg-secondary text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20">
        <div>
          <h2 className="text-primary text-4xl sm:text-5xl md:text-7xl font-bold leading-[1] mb-8 md:mb-12 transition-colors duration-300 uppercase">
            Reserva tu <br /> interés ahora
          </h2>
          <p className="text-primary text-lg md:text-xl font-light leading-relaxed max-w-md mb-8 transition-colors duration-300">
            La fecha y el lugar del evento se comunicarán próximamente. Completa el formulario y serás de las primeras personas en recibir:
          </p>
          <ul className="space-y-4 mb-12">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-primary transition-colors duration-300">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="font-light">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
          <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-3 md:space-y-4">
              <label className="text-[10px] md:text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Nombre</label>
              <input 
                required
                type="text" 
                className="w-full bg-transparent border-b border-primary py-2 text-lg md:text-xl outline-none focus:border-heading transition-colors"
              />
            </div>
            <div className="space-y-3 md:space-y-4">
              <label className="text-[10px] md:text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Apellidos</label>
              <input 
                required
                type="text" 
                className="w-full bg-transparent border-b border-primary py-2 text-lg md:text-xl outline-none focus:border-heading transition-colors"
              />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-3 md:space-y-4">
              <label className="text-[10px] md:text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Empresa</label>
              <input 
                required
                type="text" 
                className="w-full bg-transparent border-b border-primary py-2 text-lg md:text-xl outline-none focus:border-heading transition-colors"
              />
            </div>
            <div className="space-y-3 md:space-y-4">
              <label className="text-[10px] md:text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Cargo</label>
              <input 
                required
                type="text" 
                className="w-full bg-transparent border-b border-primary py-2 text-lg md:text-xl outline-none focus:border-heading transition-colors"
              />
            </div>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            <label className="text-[10px] md:text-xs font-condensed font-bold uppercase tracking-widest text-primary opacity-60">Sector de la empresa</label>
            <input 
              required
              type="text" 
              className="w-full bg-transparent border-b border-primary py-2 text-lg md:text-xl outline-none focus:border-heading transition-colors"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-5 md:py-6 bg-primary text-secondary font-condensed font-bold uppercase tracking-[0.3em] text-lg md:text-xl hover:opacity-80 transition-all flex items-center justify-center gap-4 group"
          >
            Quiero recibir la convocatoria
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 md:py-20 px-4 sm:px-6 bg-primary border-t border-primary transition-colors duration-300">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0 transition-colors duration-300">
          <Shield className="text-primary w-5 h-5 transition-colors duration-300" />
        </div>
        <span className="text-xl sm:text-2xl font-condensed font-bold text-heading tracking-tighter uppercase transition-colors duration-300">
          TEMPEL <span className="opacity-40">GROUP</span>
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 text-[10px] md:text-xs font-condensed font-bold uppercase tracking-widest text-primary transition-colors duration-300">
        <div className="space-y-4">
          <div className="text-heading transition-colors duration-300">Legal</div>
          <a href="#" className="block hover:text-heading transition-colors">Privacidad</a>
          <a href="#" className="block hover:text-heading transition-colors">Cookies</a>
        </div>
        <div className="space-y-4">
          <div className="text-heading transition-colors duration-300">Social</div>
          <a href="#" className="block hover:text-heading transition-colors">LinkedIn</a>
          <a href="#" className="block hover:text-heading transition-colors">Twitter</a>
        </div>
        <div className="space-y-4">
          <div className="text-heading transition-colors duration-300">Contacto</div>
          <a href="#" className="block hover:text-heading transition-colors">Email</a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 border-t border-primary/30 text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary opacity-40 transition-colors duration-300">
      © {new Date().getFullYear()} Tempel Group. All Rights Reserved.
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
      <Intro />
      <Contents />
      <Partners />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
