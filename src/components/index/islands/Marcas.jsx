import { useEffect, useRef } from 'react';
import { getCldImageUrl } from "astro-cloudinary/helpers";

export default function Marcas() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  // Lista de marcas - cambia las rutas según tus imágenes en public/images/marcas
  const marcas = [
  {
    id: 1,
    name: "Alitas MX",
    src: getCldImageUrl({
      src: "ALITAS_MX_wmgjjh", // public_id REAL en Cloudinary
      height: 80,
      quality: "auto",
      format: "auto",
    }),
  },
  {
    id: 2,
    name: "Bogotanas",
    src: getCldImageUrl({
      src: "BOGOTANAS_y0xj40", 
      height: 80,
      quality: "auto",
      format: "auto",
    }),
  },
  {
    id: 3,
    name: "Blix",
    src: getCldImageUrl({
      src: "blix_e0ellw", 
      height: 80,
      quality: "auto",
      format: "auto",
    }),
  },
  {
    id: 4,
    name: "HL",
    src: getCldImageUrl({
      src: "HL_s56nnz",
      height: 80,
      quality: "auto",
      format: "auto",
    }),
  },
  {
    id: 5,
    name: "Terpel",
    src: getCldImageUrl({
      src: "TERPEL_xdcqb1",
      height: 80,
      quality: "auto",
      format: "auto",
    }),
  },
  {
    id: 6,
    name: "Rodada",
    src: getCldImageUrl({
      src: "RODADA_wdixlo",
      height: 80,
      quality: "auto",
      format: "auto",
    }),
  },
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
