export default function Hero() {
	return (
		<section 
			className="hero-section relative w-full min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
			style={{
				background: 'linear-gradient(to bottom, var(--color-hype-purple) 0%, var(--color-hype-blue) 100%)',
			}}
		>
			<div className="max-w-7xl mx-auto w-full">
				<div className="text-center mb-12 sm:mb-16">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
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
						className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 px-4"
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
						className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed px-4"
						style={{ fontFamily: 'var(--font-primary)' }}
					>
						Cazadores del éxito digital. Estrategas feroces. Resultados implacables.
					</p>
				</div>

				{/* Banner de Tiburones */}
				<div className="relative w-full flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 px-4">
					<div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 flex-wrap">
						<img 
							src="/images/tiburones/lopera.png" 
							alt="Lopera Tiburón" 
							className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-110 transition-transform duration-300"
						/>
						<img 
							src="/images/tiburones/mauro.png" 
							alt="Mauro Tiburón" 
							className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-110 transition-transform duration-300"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
