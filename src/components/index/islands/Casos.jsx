import React, { useEffect, useRef, useState } from 'react';

export default function Casos() {
	const sectionRef = useRef(null);
	const trackRef = useRef(null);
	const containerRef = useRef(null);
	const videoRefs = useRef({});
	const [videos, setVideos] = useState([]);
	const [isMobile, setIsMobile] = useState(false);

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

	// Animación horizontal en móvil
	useEffect(() => {
		if (!isMobile || !trackRef.current || !sectionRef.current || !containerRef.current || videos.length === 0) return;

		let gsap = null;
		let scrollHandler = null;
		let resizeHandler = null;
		let rafId = null;
		let cleanup = null;

		// Lazy-load GSAP
		import('gsap').then((mod) => {
			gsap = mod.default;

			const section = sectionRef.current;
			const track = trackRef.current;
			const container = containerRef.current;

			const updateDimensions = () => {
				const trackWidth = track.scrollWidth;
				const containerWidth = container.clientWidth;
				const maxTranslate = Math.max(trackWidth - containerWidth, 0);
				
				// Altura de scroll: suficiente para revelar todos los videos
				// Usamos el ancho total del track como referencia para la altura de scroll
				const winH = window.innerHeight;
				// Altura adicional para permitir scroll suave (proporcional al ancho del track)
				const scrollHeight = winH + maxTranslate * 1.2 + 300;
				section.style.minHeight = `${scrollHeight}px`;

				return { maxTranslate, scrollHeight, winH };
			};

			let dimensions = updateDimensions();

			const onScroll = () => {
				const rect = section.getBoundingClientRect();
				const { winH, scrollHeight, maxTranslate } = dimensions;

				// Calcular progreso basado en la posición de la sección
				// Cuando el top de la sección está en el top del viewport, progress = 0
				// Cuando el bottom de la sección está en el top del viewport, progress = 1
				const sectionTop = rect.top;
				const sectionHeight = rect.height;
				
				// Área de scroll efectiva (después del título sticky)
				const titleOffset = 200; // Espacio para el título sticky
				const scrollStart = winH - titleOffset;
				const scrollRange = scrollHeight - winH;
				
				let progress = 0;
				
				if (sectionTop <= scrollStart) {
					// La sección ha entrado en el área de scroll
					const scrolled = scrollStart - sectionTop;
					progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);
				}

				const x = -maxTranslate * progress;
				gsap.to(track, { 
					x, 
					duration: 0.1, 
					ease: 'none',
					overwrite: true
				});
			};

			// Throttle con requestAnimationFrame
			let ticking = false;
			scrollHandler = () => {
				if (!ticking) {
					rafId = window.requestAnimationFrame(() => {
						onScroll();
						ticking = false;
					});
					ticking = true;
				}
			};

			resizeHandler = () => {
				dimensions = updateDimensions();
				onScroll();
			};

			window.addEventListener('scroll', scrollHandler, { passive: true });
			window.addEventListener('resize', resizeHandler, { passive: true });

			// Llamada inicial
			onScroll();

			// Cleanup function
			cleanup = () => {
				window.removeEventListener('scroll', scrollHandler);
				window.removeEventListener('resize', resizeHandler);
				if (rafId) window.cancelAnimationFrame(rafId);
			};
		}).catch((err) => {
			console.error('Error loading GSAP:', err);
		});

		return () => {
			if (cleanup) cleanup();
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
			playPromise
				.then(() => {
					console.log('Video reproduciéndose:', video.src);
				})
				.catch((err) => {
					// Algunos navegadores pueden bloquear autoplay
					console.log('Autoplay bloqueado para video:', video.src, err.message);
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
			className="w-full bg-gray-50 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 overflow-hidden relative"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Título y descripción - Fijo en móvil, normal en desktop */}
				<div 
					className={`text-center mb-6 sm:mb-8 ${isMobile ? 'sticky top-20 z-30 bg-gray-50 pb-4 pt-2' : ''}`}
					style={isMobile ? { backdropFilter: 'blur(10px)', backgroundColor: 'rgba(249, 250, 251, 0.95)' } : {}}
				>
					<p 
						className="text-sm sm:text-base font-semibold uppercase tracking-wide mb-2"
						style={{ color: 'var(--color-hype-green)' }}
					>
						Casos Reales
					</p>
					<h2 
						className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3" 
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
					<p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
						Descubre cómo hemos ayudado a marcas como la tuya a alcanzar sus objetivos digitales.
					</p>
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

				{/* Mobile: Track horizontal con animación de scroll */}
				<div className="sm:hidden relative">
					{videos.length > 0 ? (
						<div 
							ref={containerRef}
							className="overflow-hidden"
							style={{ height: '400px' }}
						>
							<div 
								ref={trackRef} 
								className="flex gap-4 will-change-transform"
								style={{ transform: 'translateX(0px)' }}
							>
								{videos.map((video, i) => (
									<div 
										key={`mobile-video-${i}`} 
										className="min-w-[85vw] rounded-xl overflow-hidden shadow-lg bg-gray-200 flex-shrink-0"
										style={{ height: '400px' }}
									>
										<video 
											ref={(el) => {
												if (el) {
													videoRefs.current[`mobile-${i}`] = el;
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
						</div>
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
