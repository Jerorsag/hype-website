import React, { useEffect, useRef, useState } from 'react';

export default function Casos() {
	const sectionRef = useRef(null);
	const trackRef = useRef(null);
	const containerRef = useRef(null);
	const videoRefs = useRef({});
	const [videos, setVideos] = useState([]);
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

	// Cargar videos desde public/videos
	useEffect(() => {
		// Lista directa de 6 videos
		const videoList = [
			'/videos/caso1.mp4',
			'/videos/caso2.mp4',
			'/videos/caso3.mp4',
			'/videos/caso4.mp4',
			'/videos/caso5.mp4',
			'/videos/caso6.mp4'
		];

		// Verificar cuáles existen
		Promise.all(
			videoList.map((path) =>
				fetch(path, { method: 'HEAD' })
					.then((res) => {
						if (res.ok) {
							return path;
						}
						return null;
					})
					.catch((err) => {
						return null;
					})
			)
		).then((results) => {
			const found = results.filter(Boolean);
			if (found.length > 0) {
				setVideos(found);
			} else {
				// Si no se encuentran, usar la lista directa de todos modos
				setVideos(videoList);
			}
		});
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
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
										preload="auto"
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
											className="w-screen h-full flex justify-center items-center flex-shrink-0 snap-start"
											style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem' }}
										>
											<div 
												className="flex items-center justify-center overflow-hidden"
												style={{
													width: '100%',
													maxWidth: 'calc(100vw - 1.5rem)',
													aspectRatio: '9 / 16',
													maxHeight: '100%'
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
													preload="auto"
													className="w-full h-full object-cover"
													style={{ 
														objectPosition: 'center center'
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
											if (containerRef.current) {
												const containerWidth = window.innerWidth;
												containerRef.current.scrollTo({
													left: containerWidth * i,
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
