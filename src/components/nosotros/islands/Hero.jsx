import { useEffect, useRef } from 'react';

export default function Hero() {
	const contentRef = useRef(null);
	const sharksRef = useRef(null);

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
				
				// Animar tiburones con stagger
				if (sharksRef.current) {
					const sharks = sharksRef.current.querySelectorAll('img');
					if (sharks.length > 0) {
						tl.from(sharks, { 
							autoAlpha: 0, 
							scale: 0.8, 
							y: 20,
							stagger: 0.15,
							duration: 0.8,
							ease: 'back.out(1.2)'
						}, 0.4);
					}
				}
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
			className="hero-section relative w-full min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
			style={{
				background: 'linear-gradient(to bottom, var(--color-hype-purple) 0%, var(--color-hype-blue) 100%)',
			}}
		>
			{/* Cohete decorativo - Esquina superior derecha */}
			<div className="absolute top-8 right-4 sm:right-8 lg:right-12 z-0 opacity-60 pointer-events-none">
				<img 
					src="https://res.cloudinary.com/ddk9axpgt/image/upload/v1767105514/cohete-white_jim4mb.svg" 
					alt="" 
					className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transform rotate-12"
					aria-hidden="true"
				/>
			</div>

			<div ref={contentRef} className="max-w-7xl mx-auto w-full relative z-10">
				<div className="text-center mb-12 sm:mb-16">
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
							Sobre Nosotros
						</span>
					</div>

					{/* Título */}
					<h1 
						className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 px-4"
						style={{ fontFamily: 'var(--font-primary)' }}
					>
						Somos un equipo de{' '}
						<span 
							style={{ 
								color: 'var(--color-hype-green)',
								fontFamily: 'var(--font-secondary)'
							}}
						>
							tiburones
						</span>
					</h1>

					{/* Descripción */}
					<p 
						className="hero-description text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed px-4"
						style={{ fontFamily: 'var(--font-primary)' }}
					>
						Cazadores del éxito digital. Estrategas feroces. Resultados implacables.
					</p>
				</div>

				{/* Banner de Tiburones */}
				<div ref={sharksRef} className="relative w-full flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 px-4">
					<div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 flex-wrap">
						<div className="shark-container">
							<img 
								src="/images/tiburones/lopera.png" 
								alt="Lopera Tiburón" 
								className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-110 transition-all duration-500 ease-out cursor-pointer hover:drop-shadow-2xl"
								style={{ opacity: 1, visibility: 'visible', willChange: 'transform', transformOrigin: 'center' }}
							/>
						</div>
						<div className="shark-container">
							<img 
								src="/images/tiburones/mauro.png" 
								alt="Mauro Tiburón" 
								className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-110 transition-all duration-500 ease-out cursor-pointer hover:drop-shadow-2xl"
								style={{ opacity: 1, visibility: 'visible', willChange: 'transform', transformOrigin: 'center' }}
							/>
						</div>
						<div className="shark-container">
							<img 
								src="/images/tiburones/cm.png" 
								alt="Community Manager Tiburón" 
								className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-110 transition-all duration-500 ease-out cursor-pointer hover:drop-shadow-2xl"
								style={{ opacity: 1, visibility: 'visible', willChange: 'transform', transformOrigin: 'center' }}
							/>
						</div>
						<div className="shark-container">
							<img 
								src="/images/tiburones/kami.png" 
								alt="Camila Tiburón" 
								className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-110 transition-all duration-500 ease-out cursor-pointer hover:drop-shadow-2xl"
								style={{ opacity: 1, visibility: 'visible', willChange: 'transform', transformOrigin: 'center' }}
							/>
						</div>
						<div className="shark-container">
							<img 
								src="/images/tiburones/villa.png" 
								alt="Villa Tiburón" 
								className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-110 transition-all duration-500 ease-out cursor-pointer hover:drop-shadow-2xl"
								style={{ opacity: 1, visibility: 'visible', willChange: 'transform', transformOrigin: 'center' }}
							/>
						</div>
						<div className="shark-container">
							<img 
								src="/images/tiburones/ladino.png" 
								alt="Steven Tiburón" 
								className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-110 transition-all duration-500 ease-out cursor-pointer hover:drop-shadow-2xl"
								style={{ opacity: 1, visibility: 'visible', willChange: 'transform', transformOrigin: 'center' }}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
