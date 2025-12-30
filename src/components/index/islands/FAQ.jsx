import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqData = [
	{
		id: 1,
		question: '¿Cuánto tiempo toma un proyecto?',
		answer: 'El tiempo varía según el alcance del proyecto. Un sitio web básico puede tomar 4-6 semanas, mientras que estrategias digitales completas pueden extenderse de 3 a 6 meses. Trabajamos contigo para establecer timelines realistas desde el inicio.'
	},
	{
		id: 2,
		question: '¿Qué incluye una estrategia digital?',
		answer: 'Nuestra estrategia digital incluye análisis de mercado, definición de objetivos medibles, auditoría de marca y competencia, plan de contenido, calendario editorial, estrategia de redes sociales, plan de publicidad digital, y métricas de seguimiento con reportes mensuales.'
	},
	{
		id: 3,
		question: '¿Ofrecen soporte después del lanzamiento?',
		answer: 'Sí, ofrecemos diferentes planes de soporte post-lanzamiento. Desde mantenimiento básico hasta acompañamiento continuo con actualizaciones, optimizaciones y análisis de rendimiento. Puedes elegir el plan que mejor se adapte a tus necesidades.'
	},
	{
		id: 4,
		question: '¿Cuál es el proceso de trabajo?',
		answer: 'Nuestro proceso se divide en: 1) Consultoría inicial y definición de objetivos, 2) Propuesta estratégica personalizada, 3) Desarrollo y ejecución, 4) Lanzamiento y monitoreo, 5) Optimización continua. Mantenemos comunicación constante en cada etapa.'
	},
	{
		id: 5,
		question: '¿Trabajan con empresas pequeñas?',
		answer: '¡Absolutamente! Trabajamos con empresas de todos los tamaños, desde startups hasta grandes corporaciones. Tenemos planes y soluciones adaptadas a diferentes presupuestos y necesidades. Creemos que cada negocio merece una presencia digital de calidad.'
	}
];

export default function FAQ() {
	const [openId, setOpenId] = useState(null);

	const toggleQuestion = (id) => {
		setOpenId(openId === id ? null : id);
	};

	return (
		<section id="faq" className="w-full bg-gray-50 py-16 sm:py-24 lg:py-32 relative overflow-hidden">
			{/* Cohete decorativo - Esquina superior derecha */}
			<div className="absolute top-12 right-4 sm:right-8 lg:right-12 z-0 opacity-40 pointer-events-none">
				<img 
					src="https://res.cloudinary.com/ddk9axpgt/image/upload/v1767105512/cohete-primary_gh35qu.svg" 
					alt="" 
					className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transform rotate-12"
					aria-hidden="true"
				/>
			</div>

			{/* Imagen del gato - Posicionamiento responsive */}
			<div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 -translate-x-8 xl:-translate-x-4 z-0 pointer-events-none">
				<img 
					src="https://res.cloudinary.com/ddk9axpgt/image/upload/v1767105522/gata_hype_qw2d15.png" 
					alt="Gata Hype" 
					className="w-auto h-[400px] xl:h-[500px] opacity-90"
					style={{ maxWidth: 'none' }}
				/>
			</div>
			
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Badge y Título */}
				<div className="text-center mb-12 sm:mb-16">
					<p 
						className="text-sm sm:text-base font-semibold mb-4 uppercase tracking-wider"
						style={{ color: 'var(--color-hype-purple)' }}
					>
						FAQ
					</p>
					<h2 
						className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6"
						style={{ fontFamily: 'var(--font-primary)' }}
					>
						Preguntas{' '}
						<span 
							className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
							style={{ fontFamily: 'var(--font-secondary)' }}
						>
							frecuentes
						</span>
					</h2>
					<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Resolvemos tus dudas para que tomes la mejor decisión.
					</p>
				</div>

				{/* Lista de Preguntas */}
				<div className="space-y-4 mb-12">
					{faqData.map((item) => {
						const isOpen = openId === item.id;
						return (
							<div
								key={item.id}
								className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
							>
								<button
									onClick={() => toggleQuestion(item.id)}
									className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left group focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-xl cursor-pointer"
									aria-expanded={isOpen}
									aria-controls={`faq-answer-${item.id}`}
								>
									<span 
										className="text-base sm:text-lg font-semibold text-black pr-4 transition-colors duration-200 group-hover:text-purple-600"
										style={{ fontFamily: 'var(--font-primary)' }}
									>
										{item.question}
									</span>
									<ChevronDown
										className={`w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0 transition-transform duration-300 ${
											isOpen ? 'rotate-180' : ''
										}`}
									/>
								</button>
								{/* Línea decorativa */}
								{isOpen && (
									<div className="px-6 sm:px-8 pt-1">
										<div 
											className="h-0.5 rounded-full"
											style={{ 
												background: 'linear-gradient(to right, transparent 0%, rgba(162, 1, 255, 0.2) 20%, rgba(162, 1, 255, 0.4) 50%, rgba(162, 1, 255, 0.2) 80%, transparent 100%)'
											}}
										/>
									</div>
								)}
								<div
									id={`faq-answer-${item.id}`}
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
									}`}
								>
									<div className="px-6 sm:px-8 py-6 sm:py-8">
										<p 
											className="text-sm sm:text-base text-gray-600 leading-relaxed"
											style={{ fontFamily: 'var(--font-primary)' }}
										>
											{item.answer}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* CTA Section */}
				<div className="text-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 sm:p-10 border border-purple-100">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 mb-6">
						<MessageCircle className="w-8 h-8 text-white" />
					</div>
					<h3 
						className="text-2xl sm:text-3xl font-bold text-black mb-4"
						style={{ fontFamily: 'var(--font-primary)' }}
					>
						¿Necesitas más ayuda?
					</h3>
					<p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto">
						Contáctanos directamente para una conversación sin compromisos.
					</p>
					<a
						href="#contacto"
						className="inline-flex items-center px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
						style={{ fontFamily: 'var(--font-primary)' }}
					>
						Contactar
					</a>
				</div>
			</div>
		</section>
	);
}

