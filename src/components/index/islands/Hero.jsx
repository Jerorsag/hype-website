import { useEffect, useRef, useState } from "react";
import { MoveDown } from 'lucide-react';

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const SPLINE_CONFIG = {
  sceneUrl: import.meta.env.PUBLIC_SPLINE_SCENE_URL || "https://prod.spline.design/qizxb2hVkyi2nMIb/scene.splinecode",
  scale: parseFloat(import.meta.env.PUBLIC_SPLINE_SCALE) || 1.2,
};

// ============================================================================
// COMPONENTE: BADGE
// ============================================================================
function HeroBadge() {
  return (
    <div 
      className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 w-fit"
    >
      <span 
        className="inline-block w-2 h-2 rounded-full"
        style={{ backgroundColor: 'var(--color-hype-green)' }}
      />
      <span 
        className="text-sm font-medium text-black"
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
      className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight"
      style={{ 
        fontFamily: 'var(--font-primary)',
        color: 'white',
        willChange: 'transform, opacity'
      }}
    >
      SI TU NEGOCIO NO
      <br />
      ESTÁ EN INTERNET,
      <br />
      <span className="font-bold" style={{ color: 'text-white', fontFamily: 'var(--font-secondary)' }}>
        NO EXISTE.
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
      className="hero-description text-base sm:text-lg text-gray-200 max-w-lg leading-relaxed"
      style={{ fontFamily: 'var(--font-primary)', willChange: 'transform, opacity' }}
    >
      En <span className="font-bold">Hype Marketing Digital</span> transformamos ideas en movimiento. Creamos 
      estrategias que no solo se ven bien, sino que generan resultados reales y 
      medibles para tu negocio.
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
        className="hero-button hero-button-primary flex-1 sm:w-auto px-4 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 group whitespace-nowrap hover:bg-[#47FD27] hover:text-black text-center"
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
        className="hero-button hero-button-secondary flex-1 sm:w-auto px-4 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg whitespace-nowrap hover:border-white hover:border-4 text-center"
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
      className="flex flex-row sm:grid sm:grid-cols-3 gap-4 sm:gap-8 pt-10 border-t text-center items-center"
      style={{ borderColor: 'rgba(255, 255, 255, 0.15)', willChange: 'transform, opacity' }}
    >
      {/* Stat 1: Proyectos */}
      <div className="hero-stat flex-1 flex flex-col items-center gap-2">
        <span 
          className="text-2xl sm:text-4xl font-bold"
          style={{
            fontFamily: 'var(--font-secondary)',
            color: 'var(--color-hype-green)'
          }}
        >
          150+
        </span>
        <span 
          className="text-xs sm:text-sm text-gray-300 font-medium"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Proyectos exitosos
        </span>
      </div>

      {/* Stat 2: Clientes */}
      <div className="hero-stat flex-1 flex flex-col items-center gap-2">
        <span 
          className="text-2xl sm:text-4xl font-bold"
          style={{
            fontFamily: 'var(--font-secondary)',
            color: 'var(--color-hype-orange)'
          }}
        >
          98%
        </span>
        <span 
          className="text-xs sm:text-sm text-gray-300 font-medium"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Clientes satisfechos
        </span>
      </div>

      {/* Stat 3: Experiencia */}
      <div className="hero-stat flex-1 flex flex-col items-center gap-2">
        <span 
          className="text-2xl sm:text-4xl font-bold "
          style={{
            fontFamily: 'var(--font-secondary)',
            color: 'var(--color-hype-yellow)'
          }}
        >
          5+
        </span>
        <span 
          className="text-xs sm:text-sm text-gray-300 font-medium"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Años de experiencia
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE: SPLINE 3D
// ============================================================================
function HeroSpline() {
  // Renderea un placeholder vacío hasta que el Spline se cargue en idle
  const [SplineComp, setSplineComp] = useState(null);
  const mountedRef = useRef(true);
  const [calculatedScale, setCalculatedScale] = useState(SPLINE_CONFIG.scale);

  useEffect(() => {
    // ajustar escala responsive para móviles
    const updateScale = () => {
      try {
        const w = window.innerWidth;
        // Si es móvil (<640px) reducir ligeramente la escala para que quepa y sea interactivo
        if (w < 640) setCalculatedScale(SPLINE_CONFIG.scale * 0.78);
        else setCalculatedScale(SPLINE_CONFIG.scale);
      } catch (e) {
        setCalculatedScale(SPLINE_CONFIG.scale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale, { passive: true });
    mountedRef.current = true;

    const loadSpline = () => {
      // import dinámico del paquete solo cuando sea necesario (evita listeners pesados al inicio)
      import('@splinetool/react-spline')
        .then((mod) => {
          if (!mountedRef.current) return;
          setSplineComp(() => mod.default);
        })
        .catch(() => {});
    };

    const onFirstInteraction = () => {
      loadSpline();
      window.removeEventListener('pointerdown', onFirstInteraction, true);
      window.removeEventListener('keydown', onFirstInteraction, true);
    };

    // Preferir requestIdleCallback para no bloquear el hilo principal
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => loadSpline(), { timeout: 1500 });
      window.addEventListener('pointerdown', onFirstInteraction, { capture: true, passive: true });
      window.addEventListener('keydown', onFirstInteraction, { capture: true, passive: true });
      return () => {
        mountedRef.current = false;
        window.cancelIdleCallback?.(id);
        window.removeEventListener('pointerdown', onFirstInteraction, true);
        window.removeEventListener('keydown', onFirstInteraction, true);
      };
    }

    // Fallback: cargar después de un pequeño delay y también en la primera interacción
    const t = setTimeout(loadSpline, 1000);
    window.addEventListener('pointerdown', onFirstInteraction, { capture: true, passive: true });
    window.addEventListener('keydown', onFirstInteraction, { capture: true, passive: true });

    return () => {
      mountedRef.current = false;
      clearTimeout(t);
      window.removeEventListener('pointerdown', onFirstInteraction, true);
      window.removeEventListener('keydown', onFirstInteraction, true);
      window.removeEventListener('resize', updateScale, true);
    };
  }, []);

  return (
    <div
      className="hero-spline w-full h-[520px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden"
      style={{
        filter: 'drop-shadow(0 8px 24px rgba(71, 253, 39, 0.12))',
        willChange: 'transform, opacity'
      }}
    >
      <div
        style={{
          transform: `scale(${calculatedScale})`,
          transformOrigin: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform, opacity',
          touchAction: 'auto',
          pointerEvents: 'auto'
        }}
      >
        {SplineComp ? (
          <div style={{ width: '100%', height: '100%', maxWidth: 560 }}>
            <SplineComp scene={SPLINE_CONFIG.sceneUrl} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ============================================================================
// FUNCIÓN: INICIALIZAR ANIMACIONES CON GSAP
// ============================================================================
/**
 * Inicializa todas las animaciones del Hero usando GSAP
 * - Usa `gsap.context` para scope y cleanup automático en React
 * - Usa `autoAlpha` y `transform` para animaciones GPU-friendly
 * - Reduce trabajo (menos sombras animadas, menor duración conjunta)
 * @param {React.RefObject} contentRef - Referencia al contenedor de contenido
 * @param {React.RefObject} splineRef - Referencia al componente Spline
 * @returns {Promise<Object>} contexto de GSAP con método `revert()` para cleanup
 */
async function initializeHeroAnimations(contentRef, splineRef) {
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

    // Spline: animar sólo opacidad/scale del contenedor para evitar repaints
    if (splineRef.current) {
      tl.from(splineRef.current, { autoAlpha: 0, scale: 0.98, duration: 0.9 }, 0.45);
    }
  }, contentRef);

  return ctx;
}

// ============================================================================
// COMPONENTE PRINCIPAL: HERO
// ============================================================================
export default function Hero() {
  const contentRef = useRef(null);
  const splineRef = useRef(null);

  // Inicializar animaciones cuando el componente se monta
  useEffect(() => {
    let ctx = null;
    // inicializa y captura el contexto para cleanup
    initializeHeroAnimations(contentRef, splineRef).then((c) => {
      ctx = c;
    });

    return () => {
      // si el contexto ya existe, revert lo limpiará
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
    };
  }, []);

  return (
    <section 
      className="hero-section relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      style={{
        background: `linear-gradient(to bottom, var(--color-hype-purple) 0%, var(--color-hype-blue) 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* CONTENIDO PRINCIPAL */}
        <div ref={contentRef} className="hero-content flex flex-col gap-8">
          <HeroBadge />
          <HeroTitle />
          <HeroDescription />
          <HeroButtons />
          <HeroStats />
        </div>

        {/* SPLINE 3D */}
        <div ref={splineRef} className="block w-full flex justify-center mt-6 lg:mt-0">
          <HeroSpline />
        </div>

      </div>

      {/* Indicador de scroll - flecha abajo (one-liner usando lucide) */}
      <a href="#servicios" aria-label="Ir a Servicios" className="hype-scroll-hint absolute left-1/2 transform -translate-x-1/2 bottom-6 z-30 cursor-pointer">
        <MoveDown aria-hidden="true" className="text-white" />
      </a>

    </section>
  );
}