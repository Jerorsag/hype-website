import React, { useEffect, useRef, useState } from 'react';

const videos = [
  'https://res.cloudinary.com/ddk9axpgt/video/upload/q_auto,f_auto/v1767108314/caso1_seyte2.mp4',
  'https://res.cloudinary.com/ddk9axpgt/video/upload/q_auto,f_auto/v1767108316/caso2_glxcg7.mp4',
  'https://res.cloudinary.com/ddk9axpgt/video/upload/q_auto,f_auto/v1767108320/caso3_cv65kq.mp4',
  'https://res.cloudinary.com/ddk9axpgt/video/upload/q_auto,f_auto/v1767108322/caso4_ldfacu.mp4',
  'https://res.cloudinary.com/ddk9axpgt/video/upload/q_auto,f_auto/v1767108325/caso5_zsoxo3.mp4',
  'https://res.cloudinary.com/ddk9axpgt/video/upload/q_auto,f_auto/v1767108318/caso6_gv9rvu.mp4'
];

export default function Casos() {
	const sectionRef = useRef(null);
	const trackRef = useRef(null);
	const containerRef = useRef(null);
	const videoRefs = useRef({});
	const [isMobile, setIsMobile] = useState(false);
	const [activeVideoIndex, setActiveVideoIndex] = useState(0);
	const slideRefs = useRef([]);

	// Detectar si es móvil
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	
	// Scroll horizontal nativo en móvil con IntersectionObserver para detectar video activo
	useEffect(() => {
		if (!isMobile || !containerRef.current || videos.length === 0) return;

		const container = containerRef.current;
		const slides = slideRefs.current.filter(Boolean);

		if (slides.length === 0) return;

		// IntersectionObserver para detectar qué video está visible
		const observerOptions = {
			root: container,
			rootMargin: '0px',
			threshold: 0.5 // Video debe estar al menos 50% visible
		};

		const observerCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = parseInt(entry.target.getAttribute('data-slide-index'), 10);
					if (!isNaN(index)) {
						setActiveVideoIndex(index);
					}
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);

		// Observar todos los slides
		slides.forEach((slide) => {
			if (slide) {
				observer.observe(slide);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, [videos, isMobile]);

	// Función helper para reproducir un video
	const playVideo = (video) => {
		if (!video || video.tagName !== 'VIDEO') return;
		
		// Asegurar propiedades
		video.loop = true;
		video.muted = true;
		video.playsInline = true;
		video.setAttribute('playsinline', '');
		video.setAttribute('webkit-playsinline', '');
		
		// Verificar que el video tenga src
		if (!video.src && !video.getAttribute('src')) {
			console.warn('Video sin src:', video);
			return;
		}
		
		// Intentar reproducir
		const playPromise = video.play();
		if (playPromise !== undefined) {
			playPromise.catch(() => {
				// Algunos navegadores pueden bloquear autoplay
				// Error silencioso
			});
		}
	};

	// Asegurar que los videos se reproduzcan cuando estén listos
	useEffect(() => {
		// Pequeño delay para asegurar que los elementos estén en el DOM
		const timer = setTimeout(() => {
			Object.values(videoRefs.current).forEach((video) => {
				playVideo(video);
			});
		}, 100);

		return () => clearTimeout(timer);
	}, [videos]);

	return (
		<section 
			ref={sectionRef} 
			id="casos" 
			className="w-full bg-gray-50 pt-12 sm:pt-24 lg:pt-28 pb-6 sm:pb-10 overflow-hidden relative"
		>
			{/* Cohete decorativo - Esquina superior derecha */}
			<div className="absolute top-16 right-4 sm:right-8 lg:right-12 z-0 opacity-40 pointer-events-none">
				<img 
					src="https://res.cloudinary.com/ddk9axpgt/image/upload/q_auto,f_auto/v1767105512/cohete-primary_gh35qu.svg" 
					alt="" 
					className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transform rotate-12"
					aria-hidden="true"
				/>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Título y descripción */}
				<div className="text-center mb-2 sm:mb-6">
					<p 
						className="text-sm sm:text-base font-semibold uppercase tracking-wide mb-2"
						style={{ color: 'var(--color-hype-green)' }}
					>
						Casos Reales
					</p>
					<h2 
						className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1" 
						style={{ fontFamily: 'var(--font-primary)' }}
					>
						Resultados que{' '}
						<span 
							className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" 
							style={{ fontFamily: 'var(--font-secondary)' }}
						>
							hablan
						</span>
					</h2>
				</div>

				{/* Desktop: Grid de 6 videos del mismo tamaño */}
				<div className="hidden sm:block">
					{videos.length > 0 ? (
						<div className="grid grid-cols-3 gap-4 lg:gap-6">
							{videos.map((video, i) => (
								<div 
									key={`desktop-video-${i}`} 
									className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
									style={{ minHeight: '280px', height: '100%' }}
								>
									<video 
										ref={(el) => {
											if (el) {
												videoRefs.current[`desktop-${i}`] = el;
												// Intentar reproducir inmediatamente cuando se asigna el ref
												setTimeout(() => playVideo(el), 200);
											}
										}}
										src={video} 
										muted 
										loop 
										playsInline 
										autoPlay
										preload="metadata"
										style={{ 
											display: 'block', 
											width: '100%', 
											height: '100%',
											objectFit: 'cover',
											backgroundColor: '#000'
										}}
										onLoadedMetadata={(e) => {
											playVideo(e.target);
										}}
										onCanPlay={(e) => {
											playVideo(e.target);
										}}
										onLoadedData={(e) => {
											playVideo(e.target);
										}}
										onError={(e) => {
											console.error('❌ Error cargando video:', video, e.target.error);
										}}
									/>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<p className="text-gray-500">Cargando videos...</p>
						</div>
					)}
				</div>

				{/* Mobile: Scroll horizontal nativo con swipe */}
				<div className="sm:hidden">
					{videos.length > 0 ? (
						<>
							{/* Contenedor de videos con scroll horizontal */}
							<div 
								ref={containerRef}
								className="overflow-x-scroll overflow-y-hidden snap-x snap-mandatory"
								style={{ 
									height: 'calc(100vh - 280px)',
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
									WebkitOverflowScrolling: 'touch'
								}}
							>
								<style>{`
									[data-casos-scroll-container]::-webkit-scrollbar {
										display: none;
									}
								`}</style>
								<div 
									ref={trackRef} 
									data-casos-scroll-container
									className="flex h-full"
									style={{ width: `${videos.length * 100}vw` }}
								>
									{videos.map((video, i) => (
										<div 
											key={`mobile-video-${i}`} 
											ref={(el) => {
												slideRefs.current[i] = el;
											}}
											data-slide-index={i}
											className="w-screen h-full flex justify-center items-center flex-shrink-0"
											style={{ 
												scrollSnapAlign: 'center',
												scrollSnapStop: 'always'
											}}
										>
											<div 
												className="flex items-center justify-center overflow-hidden"
												style={{
													width: 'calc(100vw - 1.5rem)',
													height: '100%',
													maxHeight: '100%',
													marginInline: 'auto'
												}}
											>
												<video 
													ref={(el) => {
														if (el) {
															videoRefs.current[`mobile-${i}`] = el;
															setTimeout(() => playVideo(el), 200);
														}
													}}
													src={video} 
													muted 
													loop 
													playsInline 
													autoPlay
													preload="metadata"
													className="w-full h-full object-contain"
													style={{ 
														objectPosition: 'center center',
														aspectRatio: '9 / 16'
													}}
													onLoadedMetadata={(e) => {
														playVideo(e.target);
													}}
													onCanPlay={(e) => {
														playVideo(e.target);
													}}
													onLoadedData={(e) => {
														playVideo(e.target);
													}}
													onError={(e) => {
														console.error('❌ Error cargando video:', video, e.target.error);
													}}
												/>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Indicadores (dots) - Debajo del carrusel, siempre visibles */}
							<div className="flex justify-center items-center gap-2 py-4">
								{videos.map((_, i) => (
									<button
										key={`indicator-${i}`}
										onClick={() => {
											if (containerRef.current && slideRefs.current[i]) {
												const slide = slideRefs.current[i];
												const container = containerRef.current;
												const containerRect = container.getBoundingClientRect();
												const slideRect = slide.getBoundingClientRect();
												// Calcular posición para centrar el slide
												const scrollLeft = slide.offsetLeft - (containerRect.width / 2) + (slideRect.width / 2);
												
												container.scrollTo({
													left: scrollLeft,
													behavior: 'smooth'
												});
											}
										}}
										className={`transition-all duration-300 rounded-full ${
											i === activeVideoIndex 
												? 'w-2.5 h-2.5 bg-purple-600' 
												: 'w-2 h-2 bg-gray-400 opacity-60'
										}`}
										aria-label={`Video ${i + 1} de ${videos.length}`}
									/>
								))}
							</div>
						</>
					) : (
						<div className="text-center py-12">
							<p className="text-gray-500">Cargando videos...</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
