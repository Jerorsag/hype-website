import { useEffect, useRef } from 'react';

export default function Hero() {
	const contentRef = useRef(null);

	useEffect(() => {
		let ctx = null;
		
		// Importar GSAP dinámicamente
		import('gsap').then(({ default: gsap }) => {
			if (!contentRef.current) return;

			// Crear contexto para cleanup automático
			ctx = gsap.context(() => {
				const defaults = { duration: 0.65, ease: 'power2.out' };
				const tl = gsap.timeline({ defaults });

				// Animaciones secuenciadas con selectores dentro del contentRef
				tl.from(contentRef.current.querySelector('.hero-badge'), { autoAlpha: 0, y: 12 }, 0);
				tl.from(contentRef.current.querySelector('.hero-title'), { autoAlpha: 0, y: 20 }, 0.12);
				tl.from(contentRef.current.querySelector('.hero-description'), { autoAlpha: 0, y: 16 }, 0.28);
				tl.from(contentRef.current.querySelector('.hero-button'), { autoAlpha: 0, y: 12 }, 0.45);
			}, contentRef);
		}).catch(() => {});

		return () => {
			if (ctx && typeof ctx.revert === 'function') {
				ctx.revert();
			}
		};
	}, []);

	return (
		<section 
			className="hero-section relative w-full min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
			style={{
				background: 'linear-gradient(to bottom, var(--color-hype-purple) 0%, var(--color-hype-blue) 100%)',
			}}
		>
			{/* Cohete decorativo - Esquina superior derecha */}
			<div className="absolute top-8 right-4 sm:right-8 lg:right-12 z-0 opacity-60 pointer-events-none">
				<img 
					src="/images/cohetes/cohete-white.svg" 
					alt="" 
					className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transform rotate-12"
					aria-hidden="true"
				/>
			</div>

			<div ref={contentRef} className="max-w-4xl mx-auto w-full text-center relative z-10">
				{/* Badge */}
				<div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 w-fit mx-auto">
					<span 
						className="inline-block w-2 h-2 rounded-full"
						style={{ backgroundColor: 'var(--color-hype-green)' }}
					/>
					<span 
						className="text-sm font-medium text-white"
						style={{ fontFamily: 'var(--font-primary)' }}
					>
						Nuestros Servicios
					</span>
				</div>

				{/* Título */}
				<h1 
					className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
					style={{ fontFamily: 'var(--font-primary)' }}
				>
					Servicios diseñados para{' '}
					<span 
						style={{ 
							color: 'var(--color-hype-green)',
							fontFamily: 'var(--font-secondary)'
						}}
					>
						crecer tu marca
					</span>
				</h1>

				{/* Descripción */}
				<p 
					className="hero-description text-base sm:text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
					style={{ fontFamily: 'var(--font-primary)' }}
				>
					Transforma tu visión de marketing digital. Cada táctica está diseñada para impulsar tu negocio hacia nuevos horizontes de éxito.
				</p>

				{/* Botón CTA */}
				<a
					href="/#contacto"
					className="hero-button inline-flex items-center px-8 sm:px-10 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out group cursor-pointer"
					style={{
						fontFamily: 'var(--font-primary)',
						boxShadow: '0 8px 24px rgba(71, 253, 39, 0.3)',
						opacity: 1,
						visibility: 'visible',
						willChange: 'transform'
					}}
				>
					Solicitar presupuesto
					<span className="ml-2 group-hover:translate-x-1 transition-all duration-500 ease-out">→</span>
				</a>
			</div>
		</section>
	);
}
