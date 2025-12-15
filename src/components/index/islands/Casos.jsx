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

	// Animación horizontal en móvil con GSAP + ScrollTrigger (1 slide por vista + snap)
	useEffect(() => {
		if (!isMobile || !trackRef.current || !sectionRef.current || videos.length === 0) return;

		let ctx = null;

		(async () => {
			try {
				const gsapModule = await import('gsap');
				const { ScrollTrigger } = await import('gsap/ScrollTrigger');
				const gsap = gsapModule.default;

				// Registrar plugin una sola vez
				if (!gsap.core?.globals()?.ScrollTrigger) {
					gsap.registerPlugin(ScrollTrigger);
				}

				const section = sectionRef.current;
				const track = trackRef.current;

				if (!section || !track) return;

				// Slides individuales
				const slides = track.querySelectorAll('[data-caso-slide]');
				const totalSlides = slides.length || videos.length || 1;

				ctx = gsap.context(() => {
					gsap.set(track, { xPercent: 0 });

					// ScrollTrigger: pin de la sección y desplazamiento horizontal
					gsap.to(track, {
						xPercent: -100 * (totalSlides - 1),
						ease: 'none',
						scrollTrigger: {
							trigger: section,
							start: 'top top', // cuando el título llega al top
							end: () => `+=${window.innerHeight * totalSlides}`,
							scrub: 0.5, // Más fluido (menor valor = más suave)
							pin: true,
							anticipatePin: 1,
							invalidateOnRefresh: true,
							// Snap más suave para que cada slide se ajuste de forma fluida
							snap: {
								snapTo: totalSlides > 1 ? 1 / (totalSlides - 1) : 1,
								duration: { min: 0.2, max: 0.4 },
								delay: 0.1,
								ease: 'power1.out'
							}
						}
					});
				}, section);
			} catch (err) {
				console.error('Error inicializando GSAP ScrollTrigger en Casos:', err);
			}
		})();

		return () => {
			if (ctx) ctx.revert();
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
			className="w-full bg-gray-50 pt-2 sm:pt-24 lg:pt-28 pb-6 sm:pb-10 overflow-hidden relative"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Título y descripción - Fijo en móvil, normal en desktop */}
				<div 
					className={`text-center mb-2 sm:mb-6 ${isMobile ? 'sticky top-20 z-30 bg-gray-50 pb-3 pt-2' : ''}`}
					style={isMobile ? { backdropFilter: 'blur(10px)', backgroundColor: 'rgba(249, 250, 251, 0.95)' } : {}}
				>
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

				{/* Mobile: experiencia inmersiva horizontal (1 video por vista) */}
				<div className="sm:hidden relative">
					{videos.length > 0 ? (
						<div 
							ref={containerRef}
							className="overflow-hidden rounded-2xl"
							style={{ height: '100vh' }}
						>
							<div 
								ref={trackRef} 
								className="flex will-change-transform h-full"
								style={{ transform: 'translateX(0px)' }}
							>
								{videos.map((video, i) => (
									<div 
										key={`mobile-video-${i}`} 
										data-caso-slide
										className="w-full h-full flex justify-center items-start flex-shrink-0 px-4 pt-2"
									>
										<div className="w-full flex items-center justify-center rounded-2xl overflow-hidden bg-black/80">
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
													height: 'calc(100vh - 140px)',
													width: 'auto',
													aspectRatio: '9 / 16',
													maxWidth: '90vw',
													borderRadius: '1.2rem',
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
