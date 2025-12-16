export default function Hero() {
	return (
		<section 
			className="hero-section relative w-full min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
			style={{
				background: 'linear-gradient(to bottom, var(--color-hype-purple) 0%, var(--color-hype-blue) 100%)',
			}}
		>
			<div className="max-w-4xl mx-auto w-full text-center">
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
						Nuestros Servicios
					</span>
				</div>

				{/* Título */}
				<h1 
					className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
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
					className="text-base sm:text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
					style={{ fontFamily: 'var(--font-primary)' }}
				>
					Transforma tu visión de marketing digital. Cada táctica está diseñada para impulsar tu negocio hacia nuevos horizontes de éxito.
				</p>

				{/* Botón CTA */}
			<a
				href="/#contacto"
				className="inline-flex items-center px-8 sm:px-10 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
				style={{
					fontFamily: 'var(--font-primary)',
					boxShadow: '0 8px 24px rgba(71, 253, 39, 0.3)'
				}}
			>
				Solicitar presupuesto
				<span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
			</a>
			</div>
		</section>
	);
}
