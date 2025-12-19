import { useEffect, useRef } from "react";
import { MoveDown } from 'lucide-react';

// ============================================================================
// COMPONENTE: BADGE
// ============================================================================
function HeroBadge() {
  return (
    <div 
      className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit"
    >
      <span 
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: 'var(--color-hype-green)' }}
      />
      <span 
        className="text-xs font-medium text-white"
        style={{ fontFamily: 'var(--font-primary)' }}
      >
        Agencia de Marketing Digital
      </span>
    </div>
  );
}

// ============================================================================
// COMPONENTE: TÍTULO
// ============================================================================
function HeroTitle() {
  return (
    <h1 
      className="hero-title text-2xl sm:text-3xl lg:text-4xl leading-tight"
      style={{ 
        fontFamily: 'var(--font-primary)',
        color: 'white',
        willChange: 'transform, opacity'
      }}
    >
      LA EMPRESA QUE NO
      <br />
      ESTÁ EN REDES SOCIALES,
      <br />
      <span className="font-bold text-4xl sm:text-5xl lg:text-6xl" style={{ color: 'text-white', fontFamily: 'var(--font-secondary)' }}>
        ya no existe.
      </span>
    </h1>
  );
}

// ============================================================================
// COMPONENTE: DESCRIPCIÓN
// ============================================================================
function HeroDescription() {
  return (
    <p 
      className="hero-description text-sm sm:text-base text-gray-200 max-w-lg leading-relaxed"
      style={{ fontFamily: 'var(--font-primary)', willChange: 'transform, opacity' }}
    >
      En <span className="font-bold">Hype Marketing Digital</span> ayudamos a marcas y emprendedores a crecer con estrategias digitales auténticas, creativas y enfocadas en resultados.
      Humanizamos tu marca, potenciamos el alcance orgánico y transformamos tu visión en crecimiento real.
    </p>
  );
}

// ============================================================================
// COMPONENTE: BOTONES
// ============================================================================
function HeroButtons() {
  // Refs para los dos CTAs
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const handlers = [];

    // Import dinámico de GSAP sólo para los botones
    import('gsap').then(({ default: gsap }) => {
      if (!mounted) return;

      const setup = (el) => {
        if (!el) return;

        const onEnter = () => gsap.to(el, { scale: 1.04, duration: 0.28, ease: 'power2.out' });
        const onLeave = () => gsap.to(el, { scale: 1, duration: 0.28, ease: 'power2.out' });

        el.addEventListener('pointerenter', onEnter, { passive: true });
        el.addEventListener('pointerleave', onLeave, { passive: true });
        el.addEventListener('focus', onEnter, { passive: true });
        el.addEventListener('blur', onLeave, { passive: true });

        handlers.push({ el, onEnter, onLeave });
      };

      setup(primaryRef.current);
      setup(secondaryRef.current);
    }).catch(() => {});

    return () => {
      mounted = false;
      // eliminar listeners
      handlers.forEach(({ el, onEnter, onLeave }) => {
        try {
          el.removeEventListener('pointerenter', onEnter, true);
          el.removeEventListener('pointerleave', onLeave, true);
          el.removeEventListener('focus', onEnter, true);
          el.removeEventListener('blur', onLeave, true);
        } catch (e) {}
      });
    };
  }, []);

  return (
    <div className="hero-buttons flex w-full flex-row gap-4 items-center" style={{ willChange: 'transform, opacity' }}>
      {/* CTA Primario - Agenda reunión */}
      <a 
        ref={primaryRef}
        href="/#contacto"
        className="hero-button hero-button-primary flex-1 sm:w-auto px-4 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 group whitespace-nowrap hover:bg-[#47FD27] hover:text-black text-center"
        style={{
          backgroundColor: 'white',
          color: '#000',
          fontFamily: 'var(--font-primary)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(71, 253, 39, 0.3)',
          transform: 'translateZ(0) scale(1)'
        }}
      >
        Agenda reunión
        <span className="group-hover:translate-x-1">→</span>
      </a>
      
      {/* CTA Secundario - Servicios */}
      <a 
        ref={secondaryRef}
        href="/servicios"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          fontFamily: 'var(--font-primary)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          cursor: 'pointer',
          transform: 'translateZ(0) scale(1)'
        }}
        className="hero-button hero-button-secondary flex-1 sm:w-auto px-4 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base whitespace-nowrap hover:border-white hover:border-4 text-center"
      >
        Servicios
      </a>
    </div>
  );
}

// ============================================================================
// COMPONENTE: ESTADÍSTICAS
// ============================================================================
function HeroStats() {
  return (
    <div 
      className="flex flex-row sm:grid sm:grid-cols-3 gap-3 sm:gap-6 pt-6 border-t text-center items-center"
      style={{ borderColor: 'rgba(255, 255, 255, 0.15)', willChange: 'transform, opacity' }}
    >
      {/* Stat 1: Proyectos */}
      <div className="hero-stat flex-1 flex flex-col items-center gap-1">
        <span 
          className="text-xl sm:text-2xl lg:text-3xl font-bold"
          style={{
            fontFamily: 'var(--font-secondary)',
            color: 'var(--color-hype-green)'
          }}
        >
          150+
        </span>
        <span 
          className="text-xs text-gray-300 font-medium"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Proyectos exitosos
        </span>
      </div>

      {/* Stat 2: Clientes */}
      <div className="hero-stat flex-1 flex flex-col items-center gap-1">
        <span 
          className="text-xl sm:text-2xl lg:text-3xl font-bold"
          style={{
            fontFamily: 'var(--font-secondary)',
            color: 'var(--color-hype-orange)'
          }}
        >
          98%
        </span>
        <span 
          className="text-xs text-gray-300 font-medium"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Clientes satisfechos
        </span>
      </div>

      {/* Stat 3: Experiencia */}
      <div className="hero-stat flex-1 flex flex-col items-center gap-1">
        <span 
          className="text-xl sm:text-2xl lg:text-3xl font-bold "
          style={{
            fontFamily: 'var(--font-secondary)',
            color: 'var(--color-hype-yellow)'
          }}
        >
          5+
        </span>
        <span 
          className="text-xs text-gray-300 font-medium"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Años de experiencia
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE: BANNER DE TIBURONES
// ============================================================================
function HeroBanner({ imageRef }) {
  const floatRef = useRef(null);

  useEffect(() => {
    let ctx = null;
    
    // Importar GSAP dinámicamente para animación de flotación continua
    import('gsap').then(({ default: gsap }) => {
      if (!floatRef.current) return;

      // Crear contexto para cleanup automático
      ctx = gsap.context(() => {
        // Animación continua sutil de flotación (inicia después de la animación de entrada)
        const floatAnimation = gsap.to(floatRef.current, {
          y: -12,
          duration: 3.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.8 // Espera a que termine la animación de entrada
        });
      });
    }).catch(() => {});

    return () => {
      if (ctx && typeof ctx.revert === 'function') {
        ctx.revert();
      }
    };
  }, []);

  return (
    <div 
      className="hero-banner w-full flex justify-center items-center mt-6 lg:mt-0"
      style={{ willChange: 'transform, opacity' }}
    >
      <div 
        ref={imageRef}
        className="relative w-full max-w-xl"
        style={{
          filter: 'drop-shadow(0 20px 40px rgba(71, 253, 39, 0.25))',
        }}
      >
        <div ref={floatRef}>
          <img 
            src="/images/tiburones/banner.jpeg"
            alt="Equipo Hype - Tiburones del Marketing Digital"
            className="w-full h-auto rounded-2xl object-cover shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          />
        </div>
        {/* Efecto de brillo sutil */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(71, 253, 39, 0.1) 0%, rgba(162, 1, 255, 0.1) 100%)',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// FUNCIÓN: INICIALIZAR ANIMACIONES CON GSAP
// ============================================================================
async function initializeHeroAnimations(contentRef, bannerRef) {
  const { default: gsap } = await import("gsap");

  if (!contentRef.current) return null;

  // Crear un context para React (asegura cleanup correcto)
  const ctx = gsap.context(() => {
    // Valores por defecto optimizados
    const defaults = { duration: 0.65, ease: "power2.out" };

    // Timeline secuenciado y liviano
    const tl = gsap.timeline({ defaults });

    // Animaciones: usar autoAlpha (opacity + visibility) y transform (y)
    tl.from(contentRef.current.querySelector(".hero-badge"), { autoAlpha: 0, y: 12 }, 0);
    tl.from(contentRef.current.querySelector(".hero-title"), { autoAlpha: 0, y: 20 }, 0.12);
    tl.from(contentRef.current.querySelector(".hero-description"), { autoAlpha: 0, y: 16 }, 0.28);

    // Animar botones como grupo y luego stagger suave
    tl.from(contentRef.current.querySelector(".hero-buttons"), { autoAlpha: 0, y: 12 }, 0.42);
    tl.from(contentRef.current.querySelectorAll(".hero-button"), { autoAlpha: 0, y: 10, stagger: 0.08 }, 0.5);

    // Estadísticas
    tl.from(contentRef.current.querySelectorAll(".hero-stat"), { autoAlpha: 0, y: 10, stagger: 0.06 }, 0.6);

    // Banner: animación suave y destacada
    if (bannerRef.current) {
      tl.from(bannerRef.current, { autoAlpha: 0, scale: 0.85, y: 30, duration: 1.2, ease: 'power3.out' }, 0.5);
    }
  }, contentRef);

  return ctx;
}

// ============================================================================
// COMPONENTE PRINCIPAL: HERO
// ============================================================================
export default function Hero() {
  const contentRef = useRef(null);
  const bannerRef = useRef(null);

  // Inicializar animaciones cuando el componente se monta
  useEffect(() => {
    let ctx = null;
    // inicializa y captura el contexto para cleanup
    initializeHeroAnimations(contentRef, bannerRef).then((c) => {
      ctx = c;
    });

    return () => {
      // si el contexto ya existe, revert lo limpiará
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
    };
  }, []);

  return (
    <section 
      className="hero-section relative w-full min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      style={{
        background: `linear-gradient(to bottom, var(--color-hype-purple) 0%, var(--color-hype-blue) 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        
        {/* CONTENIDO PRINCIPAL */}
        <div ref={contentRef} className="hero-content flex flex-col gap-4 sm:gap-5">
          <HeroBadge />
          <HeroTitle />
          <HeroDescription />
          <HeroButtons />
          <HeroStats />
        </div>

        {/* BANNER DE TIBURONES */}
        <HeroBanner imageRef={bannerRef} />

      </div>

      {/* Indicador de scroll - flecha abajo (one-liner usando lucide) */}
      <a href="#servicios" aria-label="Ir a Servicios" className="hype-scroll-hint absolute left-1/2 transform -translate-x-1/2 bottom-6 z-30 cursor-pointer">
        <MoveDown aria-hidden="true" className="text-white" />
      </a>

      {/* Cohete decorativo - Esquina superior derecha */}
      <div className="absolute top-8 right-4 sm:right-8 lg:right-12 z-0 opacity-60 pointer-events-none">
        <img 
          src="/images/cohetes/cohete-white.svg" 
          alt="" 
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transform rotate-12"
          aria-hidden="true"
        />
      </div>

    </section>
  );
}
