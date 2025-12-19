import { useEffect, useRef } from 'react';

export default function Marcas() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  // Lista de marcas - cambia las rutas según tus imágenes en public/images/marcas
  const marcas = [
    { id: 1, name: 'Marca 1', src: '/images/marcas-hype/ALITAS MX.png' },
    { id: 2, name: 'Marca 2', src: '/images/marcas-hype/BOGOTANAS.png' },
    { id: 3, name: 'Marca 3', src: '/images/marcas-hype/blix.png' },
    { id: 4, name: 'Marca 4', src: '/images/marcas-hype/HL.png' },
    { id: 5, name: 'Marca 5', src: '/images/marcas-hype/TERPEL.png' },
    { id: 6, name: 'Marca 6', src: '/images/marcas-hype/RODADA.png' }
  ];

  useEffect(() => {
    let tween = null;

    import('gsap').then(({ default: gsap }) => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const trackWidth = track.offsetWidth / 3; // Una tercera parte porque triplicamos el contenido

      // Timeline con loop infinito seamless
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(track, {
        x: -trackWidth,
        duration: 15,
        ease: 'none',
        onComplete: () => {
          // Resetear sin que se vea el salto
          gsap.set(track, { x: 0 });
        }
      });

      tween = tl;

      // Animación del título (fade-in con movimiento)
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          autoAlpha: 0,
          y: 30,
          duration: 1.2,
          ease: 'power2.out'
        });
      }
    }).catch(() => {});

    return () => {
      tween?.kill();
    };
  }, []);

  return (
    <section className="w-full bg-black py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center" style={{ fontFamily: 'var(--font-primary)' }}>
          <span className="text-white ">Confían en</span>{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-secondary)' }}>
            nosotros
          </span>
        </h2>
      </div>

      {/* Carousel container con fade gradient */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* Carousel track */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-20 sm:gap-24 lg:gap-32 whitespace-nowrap will-change-transform px-12 sm:px-16">
            {/* Render marcas duplicadas para loop infinito perfecto */}
            {[...marcas, ...marcas, ...marcas].map((marca, idx) => (
              <div
                key={`${marca.id}-${idx}`}
                className="flex-shrink-0 h-12 sm:h-14 lg:h-16 flex items-center justify-center"
              >
                <img
                  src={marca.src}
                  alt={marca.name}
                  className="h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
