import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight, CalendarCheck, Check, ChevronDown, ChevronLeft, ChevronRight,
  Ear, HeartHandshake, MapPin, Menu, MessageCircle,
  PhoneCall, Pause, Play, ShieldCheck, Sparkles, X,
} from 'lucide-react'
import { contactText, siteConfig, trackEvent, whatsappUrl } from './config'

const navItems = [
  ['Início', '#inicio'], ['Especialidades', '#especialidades'], ['Procedimentos', '#procedimentos'], ['Sobre', '#sobre'],
  ['Locais', '#locais'], ['Dúvidas', '#duvidas'], ['Contato', '#contato'],
] as const

const specialties = [
  { icon: 'dizziness', title: 'Otoneurologia: tontura, vertigem e equilíbrio', text: 'Avaliação para pessoas que sentem tontura, vertigem, sensação de desequilíbrio ou instabilidade. A consulta busca entender a causa desses sintomas e, quando necessário, podem ser solicitados exames específicos do equilíbrio.', className: 'nose' },
  { icon: Ear, title: 'Zumbido e alterações auditivas', text: 'Avaliação de sintomas como zumbido, diminuição da audição, sensação de ouvido tampado ou pressão no ouvido. O objetivo é investigar o que pode estar causando essas alterações e orientar o tratamento adequado.', className: 'ear' },
  { icon: 'otoneurology-exam', title: 'Exames otoneurológicos', text: 'Exames que ajudam a avaliar o funcionamento do sistema responsável pelo equilíbrio. Podem ser utilizados testes como a videonistagmoscopia infravermelha, o vHIT e o exame de posturografia para ajudar a identificar alterações relacionadas à tontura, vertigem e desequilíbrio.', className: 'balance' },
  { icon: 'throat', title: 'Cirurgia de amígdalas e adenoide com Coblation', text: 'Cirurgia indicada em casos de aumento das amígdalas ou da adenoide, que podem causar dificuldade para respirar, roncos, infecções frequentes ou outros problemas. Em casos selecionados, pode ser utilizada a tecnologia Coblation durante o procedimento.', className: 'throat' },
  { icon: 'surgery-tool', title: 'Cirurgia otorrinolaringológica', text: 'Avaliação de problemas do nariz, seios da face, garganta e ouvido que podem precisar de tratamento cirúrgico. Cada caso é analisado individualmente para definir se a cirurgia é necessária e qual é a opção mais adequada.', className: 'kids' },
  { icon: 'ear-nose-throat', title: 'Otorrinolaringologia geral', text: 'Atendimento para adultos e crianças com problemas como rinite, sinusite, nariz entupido, infecções de ouvido, dores ou alterações na garganta e outras condições relacionadas ao ouvido, nariz e garganta.', className: 'surgery' },
] as const

const examChapters = [
  {
    eyebrow: 'Equilíbrio e otoneurologia',
    title: 'Exames otorrinolaringológicos',
    intro: [],
    image: '/images/procedimentos-avaliacao-otoneurologica-sao-luis.webp',
    imageAlt: 'Dr. Evaldo realiza avaliação otoneurológica em paciente em São Luís',
    imagePosition: '48% center',
    items: [
      ['Videonistagmoscopia infravermelha', 'Exame que observa os movimentos dos olhos para ajudar a identificar alterações relacionadas à tontura e à vertigem. Ele permite avaliar como o sistema responsável pelo equilíbrio está funcionando.'],
      ['VHIT – Video Head Impulse Test', 'Exame que avalia como os olhos e o ouvido interno trabalham juntos para manter a visão estável durante os movimentos da cabeça. Ele ajuda a identificar alterações no sistema responsável pelo equilíbrio.'],
    ],
  },
  {
    eyebrow: 'Nariz, garganta e voz',
    title: 'Exames com imagem para uma avaliação detalhada',
    intro: [],
    image: '/images/procedimentos-videoendoscopia-nasossinusal-sao-luis.webp',
    imageAlt: 'Dr. Evaldo realiza videoendoscopia nasossinusal durante atendimento',
    imagePosition: '75% 32%',
    items: [
      ['Videoendoscopia nasossinusal', 'Exame realizado com uma pequena câmera que permite visualizar por dentro do nariz e avaliar regiões que não podem ser vistas facilmente em um exame comum. Ajuda a investigar problemas como obstrução nasal, sinusite e outras alterações nasais.'],
      ['Videolaringoscopia', 'Exame realizado com uma pequena câmera para observar a garganta, a laringe e as cordas vocais. É utilizado para investigar sintomas como rouquidão, alterações na voz, tosse persistente, engasgos e desconfortos na garganta.'],
    ],
  },
  {
    eyebrow: 'Tratamentos no consultório',
    title: 'Procedimentos para vertigem e alterações do ouvido interno',
    intro: [],
    image: '/images/procedimentos-avaliacao-equilibrio-tv-52pol.webp',
    imageAlt: 'Dr. Evaldo orienta paciente durante avaliação do equilíbrio com plataforma no consultório',
    imagePosition: '58% 30%',
    items: [
      ['Posturografia', 'Exame que avalia como o seu corpo mantém o equilíbrio em diferentes situações. Ele ajuda a identificar dificuldades de equilíbrio e também pode auxiliar na escolha do tratamento ou da reabilitação mais adequada.'],
      ['Manobras de reposicionamento para vertigem posicional (VPPB)', 'São movimentos realizados pelo médico para tratar um tipo específico de vertigem que costuma surgir ao mudar a posição da cabeça, como ao deitar, levantar ou virar na cama. As manobras ajudam a reposicionar pequenas partículas dentro do ouvido que podem estar causando a tontura.'],
      ['Aplicação intratimpânica de medicamentos', 'Procedimento em que o medicamento é aplicado diretamente no ouvido através do tímpano, permitindo que ele atue mais próximo da região que precisa ser tratada. Pode ser indicado em situações específicas, como alguns casos de perda auditiva súbita, doença de Ménière e outras alterações do ouvido interno.'],
    ],
  },
] as const

const coblationChapters = [
  {
    eyebrow: 'Tecnologia para amígdalas e adenoide',
    title: 'Coblation®: tecnologia moderna para cirurgias de amígdalas e adenoide',
    intro: [
      'A Coblation® é uma tecnologia utilizada em procedimentos de otorrinolaringologia para tratar tecidos das amígdalas e da adenoide. O método utiliza energia de radiofrequência combinada com uma solução salina, formando um campo de plasma capaz de atuar de maneira controlada na área tratada.',
      'Por trabalhar em temperaturas mais baixas do que algumas técnicas convencionais, a Coblation® foi desenvolvida para proporcionar maior precisão e reduzir a propagação de calor nos tecidos próximos. Ela pode ser utilizada em procedimentos como amigdalectomia, adenoidectomia e adenotonsilectomia, conforme a indicação médica.',
      'A cirurgia pode ser considerada em casos de amígdalas ou adenoide aumentadas, amigdalite recorrente, ronco, dificuldade para respirar, respiração pela boca e apneia obstrutiva do sono. A avaliação individualizada é essencial para definir se há indicação cirúrgica e qual tratamento é mais adequado.',
      'O Dr. Evaldo atua em otorrinolaringologia e avalia pacientes que desejam conhecer a técnica Coblation® em São Luís, incluindo quem busca cirurgia de amígdalas, cirurgia de adenoide ou investigação de ronco e problemas respiratórios durante o sono.',
      'Agende uma consulta para saber se essa tecnologia pode ser indicada para o seu caso.',
    ],
    image: '/images/procedimentos-coblation-amigdalas-adenoide-sao-luis.webp',
    imageAlt: 'Dr. Evaldo, otorrinolaringologista em São Luís, com instrumento utilizado em procedimentos de Coblation®',
    imagePosition: '50% 35%',
    video: {
      mp4: '/videos/coblation-dr-evaldo.mp4',
    },
    items: [],
  },
] as const

const surgeryChapters = [
  {
    eyebrow: 'Respiração nasal',
    title: 'Cirurgias otorrinolaringológicas',
    intro: [],
    image: '/images/procedimentos-ambiente-cirurgico.webp',
    imageAlt: 'Dr. Evaldo realiza cirurgia em ambiente cirúrgico',
    imagePosition: '50% 38%',
    items: [
      ['Septoplastia', 'Cirurgia realizada para corrigir o desvio do septo, que é a estrutura que separa os dois lados do nariz. O objetivo é melhorar a passagem do ar e facilitar a respiração pelo nariz.'],
      ['Cirurgia dos cornetos nasais', 'Cirurgia indicada quando os cornetos, estruturas localizadas dentro do nariz, estão aumentados e dificultam a passagem do ar. O procedimento busca reduzir o tamanho dessas estruturas para melhorar a respiração nasal.'],
    ],
  },
  {
    eyebrow: 'Nariz e seios da face',
    title: 'Cirurgia endoscópica nasossinusal',
    intro: [],
    image: '/images/procedimentos-cirurgia-otorrino-sao-luis.webp',
    imageAlt: 'Dr. Evaldo durante procedimento cirúrgico otorrinolaringológico',
    imagePosition: '50% 20%',
    items: [
      ['Cirurgia endoscópica nasossinusal', 'Cirurgia realizada por dentro do nariz, com o auxílio de uma pequena câmera, sem necessidade de cortes externos na maioria dos casos. Pode ser indicada para tratar problemas como sinusite crônica, pólipos nasais e outras alterações que causam obstrução ou inflamação persistente.'],
    ],
  },
  {
    eyebrow: 'Garganta, amígdalas e voz',
    title: 'Cirurgias da garganta e da laringe',
    intro: [],
    image: '/images/procedimentos-cirurgia-otorrinolaringologica-maranhao.webp',
    imageAlt: 'Procedimento cirúrgico de otorrinolaringologia realizado pelo Dr. Evaldo',
    imagePosition: '50% 34%',
    items: [
      ['Microcirurgia da laringe', 'Cirurgia realizada para avaliar e tratar alterações na laringe e nas cordas vocais, como pólipos, cistos e outras lesões. O procedimento busca remover ou tratar essas alterações preservando ao máximo a voz e o funcionamento das cordas vocais.'],
    ],
  },
] as const

const locations = [
  {
    name: 'Executive Lake Center',
    subtitle: 'Clínica Rhinus',
    logo: '/logos/locais-logo-clinica-rhinus.png',
    logoAlt: 'Logotipo da Clínica Rhinus',
    address: 'R. das Andirobas, 10 – sala 405\nJardim Renascença, São Luís – MA\nCEP 65075-040',
    reference: 'Próximo à Lagoa da Jansen.',
    mapsUrl: 'https://share.google/MG1haMyEcS3pog2UO',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta com o Dr. Evaldo César Macau na Clínica Rhinus.',
  },
  {
    name: 'Unidade Medical Center Jaracaty',
    subtitle: 'UDI Hospital',
    logo: '/logos/locais-logo-udi-hospital.svg',
    logoAlt: 'Logotipo da UDI Hospital',
    address: 'Av. Professor Carlos Cunha, 1\nMedical Center Jaracaty – 2º andar\nJaracaty, São Luís – MA · CEP 65076-820',
    reference: '',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Unidade%20Medical%20Center%20Jaracaty%2C%20Avenida%20Professor%20Carlos%20Cunha%2C%201%2C%20Edif%C3%ADcio%20Medical%20Center%20Jaracaty%2C%202%C2%BA%20andar%2C%20Jaracaty%2C%20S%C3%A3o%20Lu%C3%ADs%20-%20MA%2C%2065076-820',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta com o Dr. Evaldo César Macau na Unidade Medical Center Jaracaty.',
  },
] as const

function DizzinessIcon() {
  return <img className="dizziness-icon" src="/images/especialidades-icone-tontura.svg" alt="" aria-hidden="true" />
}

function OtoneurologyExamIcon() {
  return <img className="otoneurology-exam-icon" src="/images/especialidades-icone-exames-otoneurologicos.svg" alt="" aria-hidden="true" />
}

function EarNoseThroatIcon() {
  return <img className="ear-nose-throat-icon" src="/images/especialidades-icone-ouvido-nariz-garganta.svg" alt="" aria-hidden="true" />
}

function SurgeryToolIcon() {
  return <img className="surgery-tool-icon" src="/images/especialidades-icone-cirurgia-otorrino.svg" alt="" aria-hidden="true" />
}

function ThroatIcon() {
  return <img className="throat-icon" src="/images/especialidades-icone-garganta.svg" alt="" aria-hidden="true" />
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><path d="M17.5 6.5h.01" /></svg>
}

const patientReviews = [
  {
    name: 'Cynthia Amaral', verified: 'Opinião verificada', date: '9 de agosto de 2024', location: 'Clínica Rhinus',
    text: 'Médico excelente, hoje toda a nossa família consulta com ele, nos traz segurança, atendimento personalizado, confiança no que faz e, o melhor, saímos satisfeitos e curados. Jamais vou esquecer o que fez pelo meu pai, hoje um homem curado, sem sofrimentos. Graças a Deus e à competência do Dr. Evaldo Macau.',
  },
  {
    name: 'Luiza', verified: 'Consulta verificada', date: '16 de setembro de 2022', location: 'Pronto Otorrino',
    text: 'Adorei a consulta, primeira vez, mas o atendimento é super-rápido, sem muita espera e com comodidade. O Dr. é supergente boa, me fez ficar sem perguntas e atendeu minhas expectativas como mãe.',
  },
  {
    name: 'Karla', verified: 'Consulta verificada', date: '12 de setembro de 2024', location: 'Clínica Rhinus',
    text: 'Excelente profissional, tirou todas as minhas dúvidas e é bem prestativo. Muito obrigado, doutor.',
  },
  {
    name: 'A. R. de Carvalho', verified: 'Opinião verificada', date: '30 de agosto de 2024', location: 'Clínica Rhinus',
    text: 'Dr. Evaldo tem sido um profissional empático, esclarecedor e certeiro!',
  },
  {
    name: 'Paulo César Rodrigues Lima', verified: 'Consulta verificada', date: '27 de fevereiro de 2025', location: 'Clínica Rhinus',
    text: 'Excelente médico, muito atencioso e educado e me deixou muito mais tranquilo.',
  },
  {
    name: 'Ticiana', verified: 'Opinião verificada', date: '20 de fevereiro de 2022', location: 'Pronto Otorrino',
    text: 'Excelente médico, competente, atencioso, diagnóstico e tratamento adequados, sem falar da pontualidade e da explicação detalhada sobre o problema.',
  },
] as const

function PatientReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollEndTimerRef = useRef<number | null>(null)
  const [cardsPerView, setCardsPerView] = useState(1)
  const [activePage, setActivePage] = useState(0)
  const pageCount = Math.ceil(patientReviews.length / cardsPerView)

  useEffect(() => {
    const updateCardsPerView = () => setCardsPerView(window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1)
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  useEffect(() => {
    setActivePage((current) => Math.min(current, pageCount - 1))
  }, [pageCount])

  useEffect(() => () => {
    if (scrollEndTimerRef.current !== null) window.clearTimeout(scrollEndTimerRef.current)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const card = track?.querySelectorAll<HTMLElement>('.patient-review')[activePage * cardsPerView]
    if (!track || !card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [activePage, cardsPerView])

  const goToPage = (page: number) => setActivePage(Math.max(0, Math.min(page, pageCount - 1)))
  const handleScroll = () => {
    if (scrollEndTimerRef.current !== null) window.clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = window.setTimeout(() => {
      const track = trackRef.current
      const cards = Array.from(track?.querySelectorAll<HTMLElement>('.patient-review') ?? [])
      if (!track || !cards.length) return
      const closestCard = cards.reduce((closest, card, index) => {
        const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft)
        return distance < closest.distance ? { index, distance } : closest
      }, { index: 0, distance: Number.POSITIVE_INFINITY })
      setActivePage(Math.min(Math.floor(closestCard.index / cardsPerView), pageCount - 1))
    }, 160)
  }

  return <div className="container patient-reviews reveal">
    <div className="reviews-carousel-heading">
      <div><span className="eyebrow">Opiniões verificadas</span><h3>Experiências compartilhadas por pacientes</h3></div>
    </div>
    <div className="patient-reviews-track" ref={trackRef} role="region" aria-label="Opiniões dos pacientes. Arraste horizontalmente ou use os controles." tabIndex={0} onScroll={handleScroll}>
      {patientReviews.map(({ name, date, location, text }) => <article className="patient-review" key={`${name}-${date}`}>
        <div className="patient-review-header">
          <span className="review-avatar" aria-hidden="true">{name.charAt(0)}</span>
          <h3>{name}</h3>
        </div>
        <blockquote>“{text}”</blockquote>
        <footer><span>{date} · {location}</span><a href={siteConfig.contact.doctoralia} target="_blank" rel="noreferrer">Doctoralia <ArrowRight size={15} /></a></footer>
      </article>)}
    </div>
    <div className="reviews-carousel-controls" aria-label="Navegação das opiniões">
      <button type="button" aria-label="Ver opiniões anteriores" onClick={() => goToPage(activePage - 1)} disabled={activePage === 0}><ChevronLeft /></button>
      <span aria-live="polite">{activePage + 1} de {pageCount}</span>
      <button type="button" aria-label="Ver próximas opiniões" onClick={() => goToPage(activePage + 1)} disabled={activePage === pageCount - 1}><ChevronRight /></button>
    </div>
  </div>
}

const faqs = [
  ['Quando devo procurar um otorrinolaringologista ou uma avaliação em Otoneurologia?', 'A avaliação otorrinolaringológica é indicada diante de sintomas persistentes ou recorrentes relacionados ao ouvido, audição, nariz, garganta, voz, respiração ou sono. Para casos de tontura, vertigem, desequilíbrio, zumbido, perda auditiva ou sensação de ouvido tampado, uma avaliação em Otoneurologia pode ajudar a investigar a origem dos sintomas e direcionar o tratamento.'],
  ['Quais são as principais causas de tontura e vertigem?', 'Tontura e vertigem podem ter diferentes causas e nem sempre significam “labirintite”. Entre as possibilidades estão alterações como VPPB, doença de Ménière, hipofunções vestibulares, migrânea vestibular e tontura postural-perceptual persistente (TPPP). Condições neurológicas e outros problemas clínicos também podem causar sintomas semelhantes, por isso a avaliação individualizada é importante.'],
  ['Quais exames podem ser realizados na investigação da tontura e do equilíbrio?', 'Os exames são definidos de acordo com a avaliação clínica de cada paciente. Dependendo do caso, podem ser utilizados exames como videonistagmoscopia infravermelha, Video Head Impulse Test (vHIT), avaliações auditivas e outros testes específicos da função vestibular.'],
  ['Zumbido tem tratamento?', 'Sim, existem diferentes formas de acompanhamento e tratamento, dependendo da causa e das características do zumbido. Ele pode estar relacionado a condições auditivas ou não auditivas, por isso a avaliação busca identificar possíveis fatores associados e seu impacto na qualidade de vida para definir a abordagem mais adequada.'],
  ['Quando a cirurgia das amígdalas e adenoide é indicada e o que é Coblation®?', 'A cirurgia pode ser indicada em casos de amígdalas ou adenoide aumentadas, obstrução respiratória, alterações respiratórias durante o sono ou determinadas infecções recorrentes. Em alguns casos, pode ser utilizada a tecnologia Coblation®️, que emprega radiofrequência associada a uma solução salina para remoção ou redução dos tecidos em temperaturas relativamente baixas. A indicação da cirurgia e da técnica utilizada depende da avaliação de cada paciente.'],
  ['Como funciona o atendimento, agendamento e formas de pagamento?', 'O atendimento otorrinolaringológico contempla adultos e crianças, com avaliação direcionada às necessidades de cada faixa etária. O agendamento pode ser realizado diretamente pelo WhatsApp, onde a equipe informa os locais e horários disponíveis. As modalidades de atendimento particular ou por convênio podem variar de acordo com o local e devem ser consultadas diretamente com a equipe.'],
] as const

const instagramPosts = [
  {
    title: 'Nem toda tontura é labirintite',
    description: `Essa palavra virou um rótulo para quase qualquer tontura…
Mas, na medicina, labirintite verdadeira é rara.

Na prática, o que mais aparece são outras causas, como:
🔹 VPPB
🔹 Enxaqueca vestibular
🔹 Neurite vestibular`,
    video: '/instagram/nem-toda-tontura-e-labirintite.mp4',
    videoLite: '/instagram/nem-toda-tontura-e-labirintite-lite.mp4',
    videoPoster: '/instagram/nem-toda-tontura-e-labirintite-poster.webp',
    page: '/conteudos/labirintite-e-tontura.html',
    videoAriaLabel: 'Vídeo explicando que nem toda tontura é labirintite',
    url: 'https://www.instagram.com/reel/DVw1LcIgG8p/?utm_source=ig_web_copy_link&stkn=NTc4MTIwNjQ2YQ==',
  },
  {
    title: 'Estação chuvosa e rinite vasomotora',
    description: `🌧️ Chegou a estação chuvosa… e com ela, as crises de rinite vasomotora!

Nariz entupido, escorrendo, espirros e aquela sensação constante de congestão — sem alergia envolvida.
Isso é rinite vasomotora.

👉 Diferente da rinite alérgica, aqui o problema é a hiper-reatividade dos vasos do nariz.
Mudanças bruscas de temperatura, aumento da umidade, mofo, cheiros fortes e até o ar-condicionado viram gatilhos clássicos — exatamente o combo da época das chuvas.`,
    url: 'https://www.instagram.com/p/DUBeG0vAO5E/',
    image: '/instagram/rinite-estacao-chuvosa.webp',
    imageAlt: 'Publicação do Dr. Evaldo sobre rinite vasomotora na estação chuvosa',
    page: '/conteudos/rinite-vasomotora.html',
  },
  {
    title: '“Labirintite”? Você tem certeza?',
    description: `🌀 “LABIRINTITE”? VOCÊ TEM CERTEZA?

Você sente tontura ao levantar da cama?
Sensação de cabeça pesada, desequilíbrio, vista escurecendo, insegurança ao andar ou um “barato” estranho na cabeça?

⚠️ Pode não ser labirintite!

Muita gente chama qualquer tontura de labirintite, mas isso é só um nome genérico. Na verdade, existem várias causas diferentes para esse problema, e cada uma exige um tratamento específico.`,
    url: 'https://www.instagram.com/p/DWCqMoSEe74/',
    image: '/instagram/tontura-nao-e-labirintite.webp',
    imageAlt: 'Publicação do Dr. Evaldo explicando que nem toda tontura é labirintite',
    page: '/conteudos/labirintite-e-tontura.html',
  },
  {
    title: 'Tontura NÃO é tudo “labirintite”',
    description: `Existe uma causa MUITO comum e pouco diagnosticada:
👉 Enxaqueca Vestibular

📌 Pode dar:
• tontura
• enjoo 🤢
• sensibilidade à luz 💡
• e às vezes NEM vem com dor de cabeça

⏱️ Crises de minutos a horas
⚠️ Piora com estresse, sono ruim e jejum

Resultado? A tontura continua — e você perde tempo.

💬 Já passou por isso? Comenta aqui
📲 Envia pra quem vive com tontura`,
    video: '/instagram/enxaqueca-vestibular.mp4',
    videoLite: '/instagram/enxaqueca-vestibular-lite.mp4',
    videoPoster: '/instagram/enxaqueca-vestibular-poster.webp',
    page: '/conteudos/enxaqueca-vestibular.html',
    videoAriaLabel: 'Vídeo explicando os sintomas da enxaqueca vestibular',
    url: 'https://www.instagram.com/reel/DWhkB1zgHo6/',
  },
  {
    title: 'O ouvido não serve apenas para ouvir',
    description: `Dentro dele existe uma estrutura chamada labirinto, responsável por perceber movimento, aceleração e a posição da cabeça.

Esse sistema trabalha junto com a visão e os sensores do corpo (pés, pernas e coluna) para manter o equilíbrio.

Quando essas informações não se entendem, o resultado pode ser:

⚠️ tontura
⚠️ instabilidade
⚠️ sensação de chão mole
⚠️ cabeça “flutuando”`,
    video: '/instagram/ouvido-equilibrio-labirinto.mp4',
    videoLite: '/instagram/ouvido-equilibrio-labirinto-lite.mp4',
    videoPoster: '/instagram/ouvido-equilibrio-labirinto-poster.webp',
    page: '/conteudos/ouvido-interno-e-equilibrio.html',
    videoAriaLabel: 'Vídeo explicando como o ouvido e o labirinto participam do equilíbrio',
    url: 'https://www.instagram.com/reel/DVexR90gPy8/',
  },
  {
    title: 'Tontura no supermercado',
    description: `Você sente tontura ou mal-estar ao entrar em supermercados, shoppings ou locais muito iluminados?
Essa sensação comum pode não ser “labirintite” como muitos pensam… Pode ser enxaqueca vestibular, também conhecida como a enxaqueca do labirinto.

📍Luzes fluorescentes, corredores longos, muitos estímulos visuais e sons podem desencadear crises de tontura, visão embaralhada ou sensação de desequilíbrio — mesmo sem dor de cabeça!`,
    url: 'https://www.instagram.com/p/DVrTUEAkQu3/',
    image: '/instagram/tontura-supermercado.webp',
    imageAlt: 'Publicação do Dr. Evaldo sobre episódios de tontura no supermercado',
    page: '/conteudos/enxaqueca-vestibular.html',
  },
  {
    title: 'Se sua tontura não melhora, pare agora',
    description: `Você pode estar tomando Labirin, Betaserc ou similares há meses…
👉 e isso não resolve a maioria das tonturas

🚨 O erro não é o remédio. É tratar sem diagnóstico certo.`,
    video: '/instagram/se-sua-tontura-nao-melhora.mp4',
    videoLite: '/instagram/se-sua-tontura-nao-melhora-lite.mp4',
    videoPoster: '/instagram/se-sua-tontura-nao-melhora-poster.webp',
    page: '/conteudos/tontura-e-diagnostico.html',
    videoAriaLabel: 'Vídeo alertando sobre o tratamento de tontura sem diagnóstico correto',
    url: 'https://www.instagram.com/reel/DXhreRuEdB5/',
  },
] as const

type VideoNetworkTier = 'fast' | 'medium' | 'constrained'
type VideoPriority = 'active' | 'next' | 'none'
type VideoStatus = 'idle' | 'preparing' | 'playing' | 'waiting' | 'delayed' | 'error'

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string
    saveData?: boolean
    addEventListener?: (type: 'change', listener: () => void) => void
    removeEventListener?: (type: 'change', listener: () => void) => void
  }
}

const readVideoNetworkTier = (): VideoNetworkTier => {
  if (typeof navigator === 'undefined') return 'medium'
  const connection = (navigator as NavigatorWithConnection).connection
  if (connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return 'constrained'
  if (connection?.effectiveType === '3g') return 'medium'
  return 'fast'
}

function useVideoNetworkTier() {
  const [tier, setTier] = useState<VideoNetworkTier>('medium')

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection
    const updateTier = () => setTier(readVideoNetworkTier())
    updateTier()
    if (!connection?.addEventListener) return
    connection.addEventListener('change', updateTier)
    return () => connection.removeEventListener?.('change', updateTier)
  }, [])

  return tier
}

const videoPreloadMargin = (tier: VideoNetworkTier) => tier === 'fast' ? '1000px 0px' : tier === 'medium' ? '650px 0px' : '0px'

function InstagramVideo({ src, liteSrc, poster, ariaLabel, tabIndex, priority, sectionNear, networkTier }: { src: string; liteSrc: string; poster: string; ariaLabel?: string; tabIndex?: number; priority: VideoPriority; sectionNear: boolean; networkTier: VideoNetworkTier }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playTimerRef = useRef<number | null>(null)
  const prepareTimerRef = useRef<number | null>(null)
  const manuallyPausedRef = useRef(false)
  const playAfterLoadRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [manuallyRequested, setManuallyRequested] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const [status, setStatus] = useState<VideoStatus>('idle')
  const [retryKey, setRetryKey] = useState(0)
  const mayPreload = sectionNear && networkTier !== 'constrained' && priority !== 'none'
  const hasSource = manuallyRequested || mayPreload
  const selectedSrc = manuallyRequested && networkTier === 'constrained' ? liteSrc : src
  const requestSrc = retryKey === 0 ? selectedSrc : `${selectedSrc}${selectedSrc.includes('?') ? '&' : '?'}retry=${retryKey}`
  const preload = manuallyRequested ? 'auto' : priority === 'active' && networkTier === 'fast' ? 'auto' : mayPreload ? 'metadata' : 'none'

  useEffect(() => {
    if (priority !== 'none') return
    setManuallyRequested(false)
    setStatus('idle')
    setShowPoster(true)
  }, [priority])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasSource) return
    video.load()
    if (playAfterLoadRef.current) void video.play().catch(() => undefined)
  }, [hasSource, retryKey, selectedSrc])

  useEffect(() => {
    const video = videoRef.current
    const track = video?.closest('.instagram-track')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileScreen = window.matchMedia('(max-width: 899px)')
    let isVisible = false
    let lastTrackScrollLeft = track?.scrollLeft ?? 0

    const clearPlayTimer = () => {
      if (playTimerRef.current === null) return
      window.clearTimeout(playTimerRef.current)
      playTimerRef.current = null
    }

    const clearPrepareTimer = () => {
      if (prepareTimerRef.current === null) return
      window.clearTimeout(prepareTimerRef.current)
      prepareTimerRef.current = null
    }

    const schedulePlayback = () => {
      clearPlayTimer()
      if (!video || !hasSource || networkTier === 'constrained' || !mobileScreen.matches || !isVisible || document.hidden || reducedMotion.matches || manuallyPausedRef.current) return
      playTimerRef.current = window.setTimeout(() => {
        if (!mobileScreen.matches || !isVisible || document.hidden || reducedMotion.matches || manuallyPausedRef.current) return
        void video.play().catch(() => undefined)
      }, 7000)
    }

    const resetToThumbnail = () => {
      if (!video) return
      video.pause()
      if (video.readyState > 0) video.currentTime = 0
      setIsPlaying(false)
      setShowPoster(true)
      setStatus('idle')
      clearPrepareTimer()
    }

    const handleHorizontalMovement = () => {
      if (!track || Math.abs(track.scrollLeft - lastTrackScrollLeft) < 1) return
      lastTrackScrollLeft = track.scrollLeft
      manuallyPausedRef.current = false
      resetToThumbnail()
      schedulePlayback()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetToThumbnail()
        clearPlayTimer()
        return
      }
      schedulePlayback()
    }

    const handleScreenChange = () => {
      if (!mobileScreen.matches) resetToThumbnail()
      schedulePlayback()
    }

    if (!video) return
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible
      isVisible = entry.isIntersecting && entry.intersectionRatio >= .6
      if (!isVisible) {
        manuallyPausedRef.current = false
        resetToThumbnail()
        clearPlayTimer()
      } else if (!wasVisible) {
        schedulePlayback()
      }
    }, { threshold: [0, .6] })

    observer.observe(video)
    track?.addEventListener('scroll', handleHorizontalMovement, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    mobileScreen.addEventListener('change', handleScreenChange)
    reducedMotion.addEventListener('change', schedulePlayback)

    return () => {
      observer.disconnect()
      track?.removeEventListener('scroll', handleHorizontalMovement)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      mobileScreen.removeEventListener('change', handleScreenChange)
      reducedMotion.removeEventListener('change', schedulePlayback)
      clearPlayTimer()
      clearPrepareTimer()
      video.pause()
    }
  }, [selectedSrc, hasSource, networkTier])

  const startPrepareTimer = () => {
    if (prepareTimerRef.current !== null) window.clearTimeout(prepareTimerRef.current)
    prepareTimerRef.current = window.setTimeout(() => {
      setShowPoster(true)
      setStatus((current) => current === 'preparing' || current === 'waiting' ? 'delayed' : current)
    }, 15000)
  }

  const requestPlayback = () => {
    playAfterLoadRef.current = true
    manuallyPausedRef.current = false
    setStatus('preparing')
    startPrepareTimer()
    if (!hasSource) {
      setManuallyRequested(true)
      return
    }
    void videoRef.current?.play().catch(() => undefined)
  }

  const retryPlayback = () => {
    setStatus('preparing')
    setShowPoster(true)
    playAfterLoadRef.current = true
    startPrepareTimer()
    setManuallyRequested(true)
    setRetryKey((value) => value + 1)
  }

  const handlePlayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (playTimerRef.current !== null) {
      window.clearTimeout(playTimerRef.current)
      playTimerRef.current = null
    }
    const video = videoRef.current
    if (status === 'error' || status === 'delayed') {
      retryPlayback()
      return
    }
    if (!video || video.paused) {
      requestPlayback()
      return
    }
    manuallyPausedRef.current = true
    video.pause()
    setIsPlaying(false)
  }

  const handlePlaying = () => {
    playAfterLoadRef.current = false
    if (prepareTimerRef.current !== null) window.clearTimeout(prepareTimerRef.current)
    prepareTimerRef.current = null
    setIsPlaying(true)
    setShowPoster(false)
    setStatus('playing')
  }

  return <>
    {hasSource && <video
      key={requestSrc}
      ref={videoRef}
      aria-label={ariaLabel}
      muted
      loop
      playsInline
      preload={preload}
      poster={poster}
      onCanPlay={() => { if (playAfterLoadRef.current) void videoRef.current?.play().catch(() => undefined) }}
      onClick={() => {
        if (!videoRef.current || videoRef.current.paused) return
        manuallyPausedRef.current = true
        videoRef.current.pause()
        setIsPlaying(false)
      }}
      onPlaying={handlePlaying}
      onPause={() => setIsPlaying(false)}
      onWaiting={() => {
        if (showPoster) return
        setStatus('waiting')
        startPrepareTimer()
      }}
      onError={() => { setStatus('error'); setIsPlaying(false); setShowPoster(true) }}
    ><source src={requestSrc} type="video/mp4" /></video>}
    <img className={`instagram-video-poster${showPoster ? '' : ' is-hidden'}`} src={poster} alt="" width="540" height="960" loading="lazy" decoding="async" aria-hidden="true" />
    {(status === 'preparing' || status === 'waiting') && <div className="instagram-video-status" role="status"><span className="video-spinner" />Preparando vídeo…</div>}
    {(status === 'delayed' || status === 'error') && <button type="button" className="instagram-video-retry" onClick={handlePlayClick}>{status === 'delayed' ? 'Conexão lenta. Tentar novamente' : 'Não foi possível carregar. Tentar novamente'}</button>}
    {status !== 'preparing' && status !== 'waiting' && status !== 'delayed' && status !== 'error' && <button type="button" className={`instagram-video-play${isPlaying ? ' is-playing' : ''}`} tabIndex={tabIndex} aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'} onPointerDown={(event) => event.stopPropagation()} onClick={handlePlayClick}>{isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button>}
  </>
}

function InstagramCarousel() {
  const networkTier = useVideoNetworkTier()
  const cloneCount = Math.min(instagramPosts.length, 3)
  const firstRealIndex = cloneCount
  const lastRealIndex = cloneCount + instagramPosts.length - 1
  const firstTrailingCloneIndex = lastRealIndex + 1
  const lastTrackIndex = lastRealIndex + cloneCount
  const trackRef = useRef<HTMLDivElement>(null)
  const currentTrackIndexRef = useRef(firstRealIndex)
  const scrollEndTimerRef = useRef<number | null>(null)
  const hintPlayedRef = useRef(false)
  const dragStateRef = useRef({ active: false, pointerId: -1, startX: 0, scrollLeft: 0, moved: false })
  const suppressClickRef = useRef(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sectionNear, setSectionNear] = useState(false)
  const carouselPosts = [
    ...instagramPosts.slice(-cloneCount).map((post, index) => ({ post, key: `clone-before-${index}`, isClone: true, originalIndex: instagramPosts.length - cloneCount + index })),
    ...instagramPosts.map((post, index) => ({ post, key: post.url, isClone: false, originalIndex: index })),
    ...instagramPosts.slice(0, cloneCount).map((post, index) => ({ post, key: `clone-after-${index}`, isClone: true, originalIndex: index })),
  ]
  const videoPriority = (postIndex: number): VideoPriority => {
    if (postIndex === currentIndex) return 'active'
    if (networkTier === 'fast' && postIndex === (currentIndex + 1) % instagramPosts.length) return 'next'
    return 'none'
  }

  const centerCard = (trackIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current
    const nextTrackIndex = Math.max(0, Math.min(trackIndex, lastTrackIndex))
    const card = track?.querySelectorAll<HTMLElement>('.instagram-card')[nextTrackIndex]
    if (!track || !card) return
    const nextIndex = (nextTrackIndex - firstRealIndex + instagramPosts.length) % instagramPosts.length
    currentTrackIndexRef.current = nextTrackIndex
    setCurrentIndex(nextIndex)
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
    if (behavior === 'auto') {
      const inlineScrollBehavior = track.style.scrollBehavior
      track.style.scrollBehavior = 'auto'
      track.scrollLeft = left
      track.style.scrollBehavior = inlineScrollBehavior
      return
    }
    track.scrollTo({ left, behavior })
  }

  const updateClosestCard = (shouldCenter = false) => {
    const track = trackRef.current
    const cards = Array.from(track?.querySelectorAll<HTMLElement>('.instagram-card') ?? [])
    if (!track || !cards.length) return
    const trackCenter = track.scrollLeft + track.clientWidth / 2
    const closestTrackIndex = cards.reduce((closest, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      return Math.abs(cardCenter - trackCenter) < closest.distance
        ? { index, distance: Math.abs(cardCenter - trackCenter) }
        : closest
    }, { index: firstRealIndex, distance: Number.POSITIVE_INFINITY }).index
    if (shouldCenter) {
      centerCard(closestTrackIndex)
      return
    }
    if (closestTrackIndex < firstRealIndex) {
      centerCard(closestTrackIndex + instagramPosts.length, 'auto')
      return
    }
    if (closestTrackIndex >= firstTrailingCloneIndex) {
      centerCard(closestTrackIndex - instagramPosts.length, 'auto')
      return
    }
    currentTrackIndexRef.current = closestTrackIndex
    setCurrentIndex(closestTrackIndex - firstRealIndex)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    centerCard(firstRealIndex, 'auto')
    const resizeObserver = new ResizeObserver(() => centerCard(currentTrackIndexRef.current, 'auto'))
    resizeObserver.observe(track)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    setSectionNear(false)
    const observer = new IntersectionObserver(([entry]) => setSectionNear(entry.isIntersecting), {
      threshold: 0.01,
      rootMargin: videoPreloadMargin(networkTier),
    })
    observer.observe(track)
    return () => observer.disconnect()
  }, [networkTier])

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hintPlayedRef.current) return
      hintPlayedRef.current = true
      observer.disconnect()
      track.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-20px)', offset: .48 },
        { transform: 'translateX(0)' },
      ], { duration: 800, easing: 'cubic-bezier(.22, 1, .36, 1)' })
    }, { threshold: .35 })
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => {
    if (scrollEndTimerRef.current !== null) window.clearTimeout(scrollEndTimerRef.current)
  }, [])

  const handleScroll = () => {
    if (scrollEndTimerRef.current !== null) window.clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = window.setTimeout(() => updateClosestCard(), 140)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const track = trackRef.current
    if (!track) return
    dragStateRef.current = { active: true, pointerId: event.pointerId, startX: event.clientX, scrollLeft: track.scrollLeft, moved: false }
    track.setPointerCapture(event.pointerId)
    track.classList.add('is-dragging')
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    const drag = dragStateRef.current
    if (!track || !drag.active || event.pointerId !== drag.pointerId) return
    const distance = event.clientX - drag.startX
    if (Math.abs(distance) > 4) drag.moved = true
    if (!drag.moved) return
    event.preventDefault()
    track.scrollLeft = drag.scrollLeft - distance
  }

  const finishPointerDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    const drag = dragStateRef.current
    if (!track || !drag.active || event.pointerId !== drag.pointerId) return
    drag.active = false
    track.classList.remove('is-dragging')
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
    if (drag.moved) {
      suppressClickRef.current = true
      updateClosestCard(true)
      window.setTimeout(() => { suppressClickRef.current = false }, 0)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    centerCard(currentTrackIndexRef.current + (event.key === 'ArrowRight' ? 1 : -1))
  }

  return <>
    <div
      className="instagram-track"
      ref={trackRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Publicações do Instagram do Dr. Evaldo. Deslize horizontalmente ou use os controles para navegar."
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onScroll={handleScroll}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerDrag}
      onPointerCancel={finishPointerDrag}
      onClickCapture={(event) => {
        if (!suppressClickRef.current) return
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      {carouselPosts.map(({ post, key, isClone, originalIndex }) => <article className={`instagram-card${isClone ? '' : ' reveal'}`} aria-hidden={isClone || undefined} aria-label={isClone ? undefined : `Publicação ${originalIndex + 1} de ${instagramPosts.length}`} style={{ '--delay': `${(originalIndex % 4) * 70}ms` } as React.CSSProperties} key={key}>
        {'video' in post ? <div className="instagram-card__media">{isClone ? <img src={post.videoPoster} alt="" width="540" height="960" loading="lazy" decoding="async" /> : <InstagramVideo src={post.video} liteSrc={post.videoLite} poster={post.videoPoster} ariaLabel={post.videoAriaLabel} priority={videoPriority(originalIndex)} sectionNear={sectionNear} networkTier={networkTier} />}</div> : <a className="instagram-card__media" href={post.url} target="_blank" rel="noreferrer" tabIndex={isClone ? -1 : undefined} aria-label={`Abrir no Instagram: ${post.title}`} onClick={() => trackEvent('click_instagram_post', { post: String(originalIndex + 1) })}>
        {'image' in post ? <img src={post.image} alt={isClone ? '' : post.imageAlt} width="1080" height="1350" loading="lazy" /> : <span className="instagram-card__pending">
          <span className="instagram-card__play"><Play fill="currentColor" /></span>
          <span>Vídeo em atualização</span>
          <small>O card já está pronto para receber a mídia.</small>
        </span>}
      </a>}
      <div className="instagram-card__body">
        <h3><a href={post.page} tabIndex={isClone ? -1 : undefined}>{post.title}</a></h3>
        <p>{post.description}</p>
        <a href={post.url} target="_blank" rel="noreferrer" tabIndex={isClone ? -1 : undefined} onClick={() => trackEvent('click_instagram_post', { post: String(originalIndex + 1) })}>Ler mais <ArrowRight size={17} /></a>
      </div>
    </article>)}
    </div>
    <div className="instagram-carousel-controls" aria-label="Navegação das publicações">
      <button type="button" aria-label="Ver publicação anterior" onClick={() => centerCard(currentTrackIndexRef.current - 1)}><ChevronLeft /></button>
      <span aria-live="polite">{currentIndex + 1} de {instagramPosts.length}</span>
      <button type="button" aria-label="Ver próxima publicação" onClick={() => centerCard(currentTrackIndexRef.current + 1)}><ChevronRight /></button>
    </div>
  </>
}

function WhatsAppLink({ children, className = 'button primary', source, message }: { children: ReactNode; className?: string; source: string; message?: string }) {
  return (
    <a className={className} href={whatsappUrl(message)} target="_blank" rel="noreferrer"
      onClick={() => trackEvent(siteConfig.contact.whatsapp ? 'click_whatsapp' : 'click_doctoralia', { source })}>
      {children}
    </a>
  )
}

type NarrativeChapter = {
  readonly eyebrow: string
  readonly title: string
  readonly intro: readonly string[]
  readonly image: string
  readonly imageAlt: string
  readonly imagePosition: string
  readonly video?: {
    readonly mp4: string
  }
  readonly items: readonly (readonly [string, string])[]
}

function LazyProcedureVideo({ src, poster, ariaLabel, objectPosition, active }: { src: string; poster: string; ariaLabel: string; objectPosition?: string; active: boolean }) {
  const networkTier = useVideoNetworkTier()
  const shellRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const delayTimerRef = useRef<number | null>(null)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [manual, setManual] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const [status, setStatus] = useState<VideoStatus>('idle')
  const [retryKey, setRetryKey] = useState(0)
  const hasSource = manual || (near && networkTier !== 'constrained')
  const requestSrc = retryKey === 0 ? src : `${src}${src.includes('?') ? '&' : '?'}retry=${retryKey}`

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return
    const preloadObserver = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      threshold: 0.01,
      rootMargin: videoPreloadMargin(networkTier),
    })
    const visibilityObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .35), { threshold: [0, .35] })
    preloadObserver.observe(shell)
    visibilityObserver.observe(shell)
    return () => {
      preloadObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [networkTier])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasSource) return
    video.load()
    if (manual || (visible && networkTier !== 'constrained' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)) void video.play().catch(() => undefined)
  }, [hasSource, manual, networkTier, retryKey, visible])

  useEffect(() => {
    const video = videoRef.current
    if (!video || visible) return
    video.pause()
    setShowPoster(true)
    setStatus('idle')
  }, [visible])

  useEffect(() => () => {
    if (delayTimerRef.current !== null) window.clearTimeout(delayTimerRef.current)
  }, [])

  const startDelayTimer = () => {
    if (delayTimerRef.current !== null) window.clearTimeout(delayTimerRef.current)
    delayTimerRef.current = window.setTimeout(() => {
      setShowPoster(true)
      setStatus((current) => current === 'preparing' || current === 'waiting' ? 'delayed' : current)
    }, 15000)
  }

  const requestPlayback = () => {
    setManual(true)
    setStatus('preparing')
    startDelayTimer()
    if (hasSource) void videoRef.current?.play().catch(() => undefined)
  }

  const retryPlayback = () => {
    setShowPoster(true)
    setStatus('preparing')
    setManual(true)
    startDelayTimer()
    setRetryKey((value) => value + 1)
  }

  const handlePlaying = () => {
    if (delayTimerRef.current !== null) window.clearTimeout(delayTimerRef.current)
    delayTimerRef.current = null
    setShowPoster(false)
    setStatus('playing')
  }

  return <div ref={shellRef} className={`procedure-narrative__image procedure-video-shell${active ? ' is-active' : ''}`}>
    {hasSource && <video
      key={requestSrc}
      aria-label={ariaLabel}
      ref={videoRef}
      muted
      loop
      playsInline
      preload={manual || networkTier === 'fast' ? 'auto' : 'metadata'}
      poster={poster}
      style={{ objectPosition }}
      onCanPlay={() => { if (manual || (visible && networkTier !== 'constrained')) void videoRef.current?.play().catch(() => undefined) }}
      onPlaying={handlePlaying}
      onWaiting={() => {
        if (showPoster) return
        setStatus('waiting')
        startDelayTimer()
      }}
      onError={() => { setShowPoster(true); setStatus('error') }}
    ><source src={requestSrc} type="video/mp4" /></video>}
    <img className={`procedure-video-poster${showPoster ? '' : ' is-hidden'}`} src={poster} alt="" loading="lazy" decoding="async" style={{ objectPosition }} aria-hidden="true" />
    {(status === 'preparing' || status === 'waiting') && <div className="procedure-video-status" role="status"><span className="video-spinner" />Preparando vídeo…</div>}
    {(status === 'delayed' || status === 'error') && <button type="button" className="procedure-video-retry" onClick={retryPlayback}>{status === 'delayed' ? 'Conexão lenta. Tentar novamente' : 'Não foi possível carregar. Tentar novamente'}</button>}
    {networkTier === 'constrained' && status !== 'preparing' && status !== 'waiting' && status !== 'delayed' && status !== 'error' && showPoster && <button type="button" className="procedure-video-play" aria-label="Reproduzir vídeo" onClick={requestPlayback}><Play fill="currentColor" /></button>}
  </div>
}

function ProcedureNarrative({ id, variant, chapters, message }: {
  id: string
  variant: 'exams' | 'surgeries'
  chapters: readonly NarrativeChapter[]
  message: string
}) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const layout = section.querySelector<HTMLElement>('.procedure-narrative__layout')
    const stage = section.querySelector<HTMLElement>('.procedure-narrative__stage')
    const figure = section.querySelector<HTMLElement>('.procedure-narrative__figure')
    const chapterElements = Array.from(section.querySelectorAll<HTMLElement>('.procedure-narrative__chapter'))
    const imageElements = Array.from(section.querySelectorAll<HTMLElement>('.procedure-narrative__image'))
    if (!layout || !stage || !figure || chapterElements.length < 2) return

    const desktopQuery = window.matchMedia('(min-width: 900px)')
    let activeIndex = 0
    let animationFrame = 0
    let measuredWidth = window.innerWidth
    const getViewportHeight = () => window.visualViewport?.height ?? window.innerHeight
    let measuredHeight = getViewportHeight()
    const clamp = (value: number) => Math.max(0, Math.min(1, value))

    const measure = () => {
      if (desktopQuery.matches) {
        section.style.removeProperty('--narrative-copy-height')
        section.classList.remove('is-flow', 'is-compact-flow')
        return
      }

      if (window.innerWidth < 600) {
        section.style.removeProperty('--narrative-copy-height')
        section.classList.add('is-flow', 'is-compact-flow')
        return
      }

      section.classList.remove('is-compact-flow')
      section.classList.add('is-measuring')
      const tallestChapter = Math.max(...chapterElements.map((chapter) => chapter.offsetHeight))
      section.classList.remove('is-measuring')
      section.style.setProperty('--narrative-copy-height', `${Math.ceil(tallestChapter)}px`)

      const stickyTop = Number.parseFloat(getComputedStyle(layout).top) || 16
      const gap = Number.parseFloat(getComputedStyle(layout).rowGap) || 16
      const minimumPhoto = 124
      const mobileCtaClearance = 78
      const fits = stickyTop + minimumPhoto + gap + tallestChapter + mobileCtaClearance <= getViewportHeight()
      section.classList.toggle('is-flow', !fits)
    }

    const paint = () => {
      animationFrame = 0
      const desktop = desktopQuery.matches
      const flowing = section.classList.contains('is-flow')
      const compactFlow = section.classList.contains('is-compact-flow')
      const sectionRect = section.getBoundingClientRect()
      const sectionStyle = getComputedStyle(section)
      const paddingTop = Number.parseFloat(sectionStyle.paddingTop) || 0
      const paddingBottom = Number.parseFloat(sectionStyle.paddingBottom) || 0
      const stickyElement = desktop ? stage : layout
      const stickyTop = Number.parseFloat(getComputedStyle(stickyElement).top) || 0
      const range = Math.max(1, section.offsetHeight - paddingTop - paddingBottom - stickyElement.offsetHeight)
      const progress = clamp((stickyTop - (sectionRect.top + paddingTop)) / range)

      if (compactFlow) {
        const viewportHeight = getViewportHeight()
        const revealLine = viewportHeight * .72
        chapterElements.forEach((chapter) => {
          const figureBottom = chapter.querySelector('.procedure-narrative__inline-figure')?.getBoundingClientRect().bottom ?? chapter.getBoundingClientRect().top
          const items = Array.from(chapter.querySelectorAll<HTMLElement>('.procedure-narrative__items li'))
          const lastItemBottom = items.at(-1)?.getBoundingClientRect().bottom ?? figureBottom
          const chapterProgress = clamp((revealLine - figureBottom) / Math.max(1, lastItemBottom - figureBottom))
          chapter.style.setProperty('--chapter-progress', chapterProgress.toFixed(3))
          items.forEach((item) => item.classList.toggle('is-reached', item.getBoundingClientRect().top <= revealLine))
        })
      }

      let nextIndex = 0
      if (desktop || flowing) {
        const viewportHeight = getViewportHeight()
        const readingLine = viewportHeight * (section.classList.contains('is-compact-flow') ? .38 : .56)
        chapterElements.forEach((chapter, index) => {
          if (chapter.getBoundingClientRect().top <= readingLine) nextIndex = index
        })
      } else {
        const rawScene = progress * chapterElements.length
        if (rawScene >= activeIndex + 1.1) nextIndex = Math.min(chapterElements.length - 1, activeIndex + 1)
        else if (rawScene < activeIndex - .1) nextIndex = Math.max(0, activeIndex - 1)
        else nextIndex = activeIndex
      }

      const reveal = desktop
        ? progress
        : clamp((getViewportHeight() - figure.getBoundingClientRect().top) / (getViewportHeight() * .62))
      section.style.setProperty('--narrative-progress', progress.toFixed(3))
      figure.style.setProperty('--narrative-reveal', reveal.toFixed(3))

      if (nextIndex === activeIndex && section.dataset.ready === 'true') return
      activeIndex = nextIndex
      section.dataset.ready = 'true'
      chapterElements.forEach((chapter, index) => {
        chapter.classList.toggle('is-active', index === activeIndex)
        chapter.classList.toggle('is-read', index < activeIndex)
      })
      imageElements.forEach((image, index) => image.classList.toggle('is-active', index === activeIndex))
    }

    const schedulePaint = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(paint)
    }
    const remeasure = () => {
      measure()
      paint()
    }
    const onResize = () => {
      const viewportHeight = getViewportHeight()
      if (window.innerWidth === measuredWidth && viewportHeight === measuredHeight) {
        schedulePaint()
        return
      }
      measuredWidth = window.innerWidth
      measuredHeight = viewportHeight
      remeasure()
    }

    section.classList.add('is-cold', 'is-enhanced')
    measure()
    paint()
    window.addEventListener('scroll', schedulePaint, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.visualViewport?.addEventListener('resize', onResize, { passive: true })
    desktopQuery.addEventListener('change', remeasure)
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => section.classList.remove('is-cold')))

    return () => {
      window.removeEventListener('scroll', schedulePaint)
      window.removeEventListener('resize', onResize)
      window.visualViewport?.removeEventListener('resize', onResize)
      desktopQuery.removeEventListener('change', remeasure)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [chapters.length])

  const narrativeStyle = {
    '--narrative-scenes': chapters.length,
    ...(variant === 'surgeries' ? { '--compact-photo-height': 'calc(var(--compact-photo-size) * 1.25)' } : {}),
  } as React.CSSProperties

  return <section ref={sectionRef} className={`section procedure-narrative procedure-narrative--${variant}`} id={id} aria-labelledby={`${id}-title`} style={narrativeStyle}>
    <div className="container">
      <div className="procedure-narrative__layout">
        <div className="procedure-narrative__stage">
          {chapters.length === 1 && <div className="procedure-narrative__media-title" aria-hidden="true">{chapters[0].title}</div>}
          <figure className="procedure-narrative__figure">
            {chapters.map((chapter, index) => chapter.video ? <LazyProcedureVideo
              key={`${chapter.title}-${chapter.video.mp4}`}
              src={chapter.video.mp4}
              poster={chapter.image}
              ariaLabel={chapter.imageAlt}
              objectPosition={chapter.imagePosition}
              active={index === 0}
            /> : <picture className={`procedure-narrative__image ${index === 0 ? 'is-active' : ''}`} key={`${chapter.title}-${chapter.image}`}>
              <img src={chapter.image} alt={chapter.imageAlt} width={variant === 'exams' ? 1440 : 1006} height={variant === 'exams' ? 1080 : 1788} loading="lazy" decoding="async" style={{ objectPosition: chapter.imagePosition }} />
            </picture>)}
          </figure>
        </div>

        <div className="procedure-narrative__chapters">
          {chapters.map((chapter, index) => <article className={`procedure-narrative__chapter ${index === 0 ? 'is-active' : ''}`} key={chapter.title}>
            <figure className="procedure-narrative__inline-figure" aria-hidden="true" style={variant === 'surgeries' ? { aspectRatio: '4 / 5' } : undefined}>
              <img src={chapter.image} alt="" loading="lazy" decoding="async" style={{ objectPosition: chapter.imagePosition }} />
            </figure>
            {index === 0 ? <h2 id={`${id}-title`}>{chapter.title}</h2> : <h3>{chapter.title}</h3>}
            {chapter.intro.length > 0 && <div className="procedure-narrative__intro">{chapter.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
            {chapter.items.length > 0 && <ul className="procedure-narrative__items">
              {chapter.items.map(([name, description]) => <li key={name}><strong>{name}</strong><span>{description}</span></li>)}
            </ul>}
          </article>)}
        </div>
      </div>

      <div className="procedure-narrative__footer">
        <WhatsAppLink source={variant === 'exams' ? 'exam-procedures' : 'surgeries'} message={message}>{variant === 'exams' ? 'Tirar dúvidas sobre exames' : 'Tirar dúvidas sobre cirurgias'} <MessageCircle size={19} /></WhatsAppLink>
      </div>
    </div>
  </section>
}

function LocationsSection() {
  return <section className="section locations" id="locais" aria-labelledby="locations-title">
    <div className="container">
      <SectionTitle eyebrow="Onde encontrar" title="Locais de atendimento" text="Escolha a unidade mais conveniente e entre em contato para agendar sua consulta com o Dr. Evaldo César Macau." centered id="locations-title" />
      <div className="locations-grid">
        {locations.map((location, index) => <article className="location-card reveal" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties} key={location.name}>
          {location.logo && <img className="location-logo" src={location.logo} alt={location.logoAlt} />}
          <h3>{location.name}</h3>
          {location.subtitle && <p className="location-subtitle">{location.subtitle}</p>}
          <address>{location.address}</address>
          {location.reference && <p className="location-reference">{location.reference}</p>}
          <div className="location-actions">
            <a className="button secondary" href={location.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver rota para ${location.name} no Google Maps`} onClick={() => trackEvent('click_directions', { location: location.name })}>Ver rota no Google Maps <ArrowRight size={18} /></a>
            <WhatsAppLink source={`location-${index + 1}`} message={location.whatsappMessage}>Agendar nesta unidade <MessageCircle size={18} /></WhatsAppLink>
          </div>
        </article>)}
      </div>
    </div>
  </section>
}

function Header() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    document.documentElement.classList.toggle('menu-open', open)
    let focusTimer: number | undefined

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
        .filter((element) => element.offsetParent !== null)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    if (open) {
      wasOpenRef.current = true
      document.addEventListener('keydown', onKeyDown)
      focusTimer = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>('a[href]')?.focus(), 30)
    } else if (wasOpenRef.current) {
      toggleRef.current?.focus({ preventScroll: true })
      wasOpenRef.current = false
    }

    return () => {
      document.body.classList.remove('menu-open')
      document.documentElement.classList.remove('menu-open')
      document.removeEventListener('keydown', onKeyDown)
      if (focusTimer) window.clearTimeout(focusTimer)
    }
  }, [open])
  return (
    <header className="site-header" ref={headerRef}>
      <div className="container nav-wrap">
        <a className="brand" href="#inicio" aria-label="Dr. Evaldo César Macau — início">
          <img src={siteConfig.assets.logoLight} alt="Dr. Evaldo César Macau, Otorrinolaringologista" width="344" height="82" />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <WhatsAppLink className="button primary nav-cta" source="header">Agendar consulta <ArrowRight size={17} /></WhatsAppLink>
        <button className="menu-toggle" ref={toggleRef} type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div id="mobile-menu" ref={menuRef} className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open ? true : undefined}>
        <nav aria-label="Navegação mobile" onClick={(event) => { if ((event.target as HTMLElement).closest('a')) setOpen(false) }}>
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={(event) => {
            event.preventDefault()
            setOpen(false)
            window.setTimeout(() => {
              window.history.pushState(null, '', href)
              document.querySelector(href)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
            }, 80)
          }}>{label}<ArrowRight size={18} /></a>)}
          <WhatsAppLink source="mobile-menu">Agendar consulta <MessageCircle size={18} /></WhatsAppLink>
        </nav>
      </div>
    </header>
  )
}

function SectionTitle({ eyebrow, title, text, centered = false, id }: { eyebrow: string; title: string; text?: string; centered?: boolean; id?: string }) {
  return <div className={`section-title reveal ${centered ? 'centered' : ''}`}>
    <span className="eyebrow">{eyebrow}</span><h2 id={id}>{title}</h2>{text && <p>{text}</p>}
  </div>
}

function FAQItem({ question, answer, index, open, onToggle }: { question: string; answer: string; index: number; open: boolean; onToggle: () => void }) {
  const contentId = `faq-content-${index}`
  return <div className={`faq-item ${open ? 'open' : ''}`}>
    <h3><button type="button" aria-expanded={open} aria-controls={contentId} onClick={() => { onToggle(); if (!open) trackEvent('open_faq', { question }) }}>
      <span>{question}</span><ChevronDown aria-hidden="true" />
    </button></h3>
    <div id={contentId} className="faq-answer" role="region" aria-hidden={!open}><p>{answer}</p></div>
  </div>
}

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return <div className="faq-list reveal">{faqs.map(([question, answer], index) => (
    <FAQItem key={question} question={question} answer={answer} index={index} open={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
  ))}</div>
}

function MobileStickyCTA() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [contactVisible, setContactVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('#inicio')
    const contact = document.querySelector('#contato')
    const footer = document.querySelector('.footer')
    if (!hero || !contact || !footer) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting)
        if (entry.target === contact) setContactVisible(entry.isIntersecting)
        if (entry.target === footer) setFooterVisible(entry.isIntersecting)
      })
    }, { threshold: 0.05, rootMargin: '-72px 0px 0px' })
    observer.observe(hero)
    observer.observe(contact)
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  if (heroVisible || contactVisible || footerVisible) return null
  return <div className="mobile-cta-bar"><WhatsAppLink source="mobile-sticky"><MessageCircle /> <span>Agendar pelo WhatsApp</span></WhatsAppLink></div>
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return <>
    <Header />
    <main id="conteudo">
      <section className="hero" id="inicio">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy reveal visible">
            <span className="eyebrow"><MapPin size={15} /> Otorrinolaringologista em São Luís</span>
            <div className="hero-doctor"><strong>Dr. Evaldo César Macau</strong><span>CRM-MA 10415 · RQE 3698</span></div>
            <h1>Cuidado especializado para <em>tontura, zumbido, audição, ouvido, nariz e garganta</em></h1>
            <p>Avaliação especializada de tontura, vertigem, desequilíbrio, zumbido e perda auditiva, além das principais doenças do ouvido, nariz e garganta, em adultos e crianças.</p>
            <div className="hero-actions">
              <WhatsAppLink source="hero">Agendar consulta pelo WhatsApp <MessageCircle size={19} /></WhatsAppLink>
              <a className="hero-location-link" href="#locais"><MapPin size={18} /> Ver locais de atendimento <ArrowRight size={18} /></a>
            </div>
            <div className="hero-proof">
              <div className="hero-trust"><span><ShieldCheck size={18} /> Cuidado responsável</span><span><HeartHandshake size={18} /> Atendimento humanizado</span></div>
              <div className="hero-certifications" aria-label="Certificações profissionais">
                <img className="hero-residency-seal" src="/images/inicio-selo-residencia-unicamp-nota-a.webp" alt="Residência Médica Nota A — UNICAMP" width="1254" height="1254" loading="lazy" />
                <img className="hero-aborl-seal" src="/images/inicio-selo-titulo-especialista-aborl.webp" alt="Título de Especialista — ABORL-CCF" width="2048" height="788" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="hero-visual reveal visible">
            <div className="portrait-shape"><div className="portrait-ring" /><img src={siteConfig.assets.hero} alt="Retrato profissional do Dr. Evaldo César Macau" width="1080" height="1620" fetchPriority="high" /></div>
            <div className="floating-card card-one"><span className="icon-box"><HeartHandshake size={21} /></span><span><strong>Escuta com atenção</strong><small>Atendimento humanizado</small></span></div>
            <div className="floating-card card-two"><span className="icon-box"><CalendarCheck size={21} /></span><span><strong>Agende pelo WhatsApp</strong><small>Contato direto com a equipe</small></span></div>
            <div className="floating-badge"><Sparkles size={16} /> Cuidado especializado</div>
          </div>
        </div>
        <a className="scroll-cue" href="#especialidades" aria-label="Ir para especialidades"><span>Explore</span><ChevronDown /></a>
      </section>

      <section className="section specialties" id="especialidades">
        <div className="container">
          <SectionTitle eyebrow="Ouvidos, nariz e garganta" title="Áreas de atendimento" text="Avaliação especializada para adultos e crianças, respeitando as necessidades de cada fase da vida." centered />
          <div className="specialty-grid">
            {specialties.map(({ icon: Icon, title, text, className }, i) => <article className={`specialty-card ${className} reveal`} style={{ '--delay': `${i * 90}ms` } as React.CSSProperties} key={title}>
              <div className="specialty-icon">{Icon === 'ear-nose-throat' ? <EarNoseThroatIcon /> : Icon === 'surgery-tool' ? <SurgeryToolIcon /> : Icon === 'otoneurology-exam' ? <OtoneurologyExamIcon /> : Icon === 'dizziness' ? <DizzinessIcon /> : Icon === 'throat' ? <ThroatIcon /> : <Icon strokeWidth={1.7} />}</div><span className="card-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p><a href={className === 'throat' ? '#procedimentos' : '#contato'}>{className === 'throat' ? 'Conheça a técnica Coblation®' : 'Agende uma consulta'} <ArrowRight size={18} /></a>
            </article>)}
          </div>
          <div className="center-action reveal"><WhatsAppLink source="after-specialties">Quero agendar uma avaliação <MessageCircle size={19} /></WhatsAppLink></div>
        </div>
      </section>

      <ProcedureNarrative
        id="procedimentos"
        variant="surgeries"
        chapters={coblationChapters}
        message="Olá! Gostaria de informações sobre a técnica Coblation® para cirurgia de amígdalas e adenoide."
      />

      <ProcedureNarrative
        id="exames"
        variant="exams"
        chapters={examChapters}
        message="Olá! Gostaria de informações sobre exames e procedimentos otorrinolaringológicos."
      />

      <ProcedureNarrative
        id="cirurgias"
        variant="surgeries"
        chapters={surgeryChapters}
        message="Olá! Gostaria de informações sobre cirurgias otorrinolaringológicas."
      />

      <section className="section about" id="sobre">
        <div className="container about-grid">
          <div className="about-visual reveal">
            <div className="about-image"><img src={siteConfig.assets.about} alt="Retrato profissional do Dr. Evaldo César Macau" width="1080" height="1620" loading="lazy" /></div>
            <span className="about-dot dot-a" /><span className="about-dot dot-b" />
          </div>
          <div className="about-copy reveal">
            <span className="eyebrow">Sobre o especialista</span>
            <h2>Conheça o Dr. Evaldo Macau</h2>
            <p>Sou médico otorrinolaringologista, graduado em Medicina pela Universidade Federal do Maranhão (UFMA), com Residência Médica em Otorrinolaringologia pela Universidade Estadual de Campinas (UNICAMP) e Título de Especialista pela ABORL-CCF.</p>
            <p>Minha atuação é dedicada especialmente à Otoneurologia, com foco na investigação e tratamento de tontura, vertigem, desequilíbrio, zumbido e alterações do ouvido interno, além da atuação em cirurgia otorrinolaringológica, incluindo procedimentos de amígdalas e adenoide com tecnologia Coblation, quando indicada.</p>
            <details className="about-more">
              <summary>Ver trajetória e abordagem completas</summary>
              <div>
                <p>Realizei aperfeiçoamento em Otoneurologia na Universidade de Lisboa, em Portugal, complementando minha formação na avaliação especializada dos distúrbios do equilíbrio e da audição.</p>
              </div>
            </details>
            <ul className="check-list"><li><Check /> CRM-MA 10415 | RQE 3698</li><li><Check /> Título de Especialista pela ABORL-CCF</li><li><Check /> Otorrinolaringologia e Otoneurologia</li></ul>
            <WhatsAppLink source="about">Agendar uma consulta <ArrowRight size={19} /></WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="section credentials">
        <div className="container credentials-grid">
          <div className="credentials-intro reveal"><span className="eyebrow">Formação e experiência</span><h2>Formação e atuação especializada em Otorrinolaringologia</h2><p>Formação médica e atuação profissional dedicadas à Otorrinolaringologia, com ênfase em Otoneurologia e cirurgia.</p></div>
          <ul className="credential-list reveal">
            <li><Check /><div><h3>Graduação em Medicina</h3><p>Universidade Federal do Maranhão (UFMA)</p></div></li>
            <li><Check /><div><h3>Residência Médica em Otorrinolaringologia</h3><p>Universidade Estadual de Campinas (UNICAMP)</p></div></li>
            <li><Check /><div><h3>Título de Especialista em Otorrinolaringologia</h3><p>ABORL-CCF</p></div></li>
            <li><Check /><div><h3>Aperfeiçoamento em Otoneurologia</h3><p>Universidade de Lisboa, Portugal</p></div></li>
            <li><Check /><div><h3>Atuação profissional</h3><p>Médico assistente do Hospital Universitário da UFMA (HU-UFMA) e responsável pelo Ambulatório de Otoneurologia</p></div></li>
          </ul>
        </div>
      </section>

      <section className="section instagram-feed" id="conteudos">
        <div className="container">
          <div className="instagram-heading reveal">
            <div>
              <span className="eyebrow"><InstagramIcon /> Conteúdos e orientações</span>
              <h2>Informação para cuidar melhor da sua saúde</h2>
              <p>Confira conteúdos sobre sintomas, prevenção, exames, tratamentos e cuidados em otorrinolaringologia e otoneurologia.</p>
            </div>
            <a className="instagram-profile-link" href={siteConfig.contact.instagram} target="_blank" rel="noreferrer" onClick={() => trackEvent('click_instagram', { source: 'content-section' })}>
              <InstagramIcon /> Ver perfil no Instagram <ArrowRight size={18} />
            </a>
          </div>

          <InstagramCarousel />
        </div>
      </section>

      <LocationsSection />

      <section className="section reviews">
        <div className="container reviews-card reveal">
          <div><span className="eyebrow light">Relatos públicos</span><h2>A confiança de quem já foi atendido</h2><p>Os pacientes destacam a atenção durante as consultas, a clareza das explicações, a tranquilidade transmitida e o cuidado no acompanhamento.</p><p>São relatos que reforçam o compromisso com um atendimento humano, responsável e dedicado.</p></div>
          <div className="reviews-action"><strong>16</strong><span>opiniões publicadas na Doctoralia</span><a className="button white" href={siteConfig.contact.doctoralia} target="_blank" rel="noreferrer">Ver avaliações dos pacientes <ArrowRight size={18} /></a></div>
        </div>
        <PatientReviewsCarousel />
      </section>

      <section className="section faq" id="duvidas">
        <div className="container faq-grid">
          <div className="faq-intro reveal"><span className="eyebrow">Dúvidas frequentes</span><h2>Informação clara também faz parte do cuidado</h2><p>Encontre respostas objetivas sobre a consulta e o atendimento.</p><WhatsAppLink className="text-link" source="faq">Ainda tem dúvidas? Fale conosco <ArrowRight size={18} /></WhatsAppLink></div>
          <FAQList />
        </div>
      </section>

      <section className="section contact" id="contato">
        <div className="container contact-card reveal">
          <div className="contact-copy"><span className="eyebrow light">Agende sua consulta</span><h2>Dê o primeiro passo para cuidar da sua saúde</h2><p>Se você apresenta dificuldade para respirar, crises frequentes de sinusite, dores no ouvido, zumbido, tontura, perda auditiva, ronco ou problemas recorrentes nas amígdalas, procure uma avaliação especializada.</p><p>Entre em contato para consultar a disponibilidade e agendar seu atendimento.</p><WhatsAppLink className="button white" source="contact">Consultar disponibilidade <MessageCircle size={19} /></WhatsAppLink><div className="contact-doctor-id"><strong>Dr. Evaldo César Macau</strong><span>Otorrinolaringologista · CRM-MA 10415 · RQE 3698</span></div></div>
          <div className="contact-info">
            <div><MapPin /><span><small>{siteConfig.location.clinic}</small><strong>{contactText.address}</strong></span></div>
            <a href="tel:+5598991433929"><PhoneCall /><span><small>Telefone</small><strong>{contactText.phone}</strong></span></a>
            <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer" onClick={() => trackEvent('click_instagram', { source: 'contact' })}><InstagramIcon /><span><small>Instagram</small><strong>@drevaldomacau</strong></span></a>
            <a className="location-link" href={siteConfig.location.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('click_directions')}><MapPin /> Ver localização <ArrowRight /></a>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand"><img src={siteConfig.assets.logoDark} alt="Dr. Evaldo César Macau" width="344" height="82" /><p>Otorrinolaringologia com atenção, clareza e cuidado para adultos e crianças.</p><p><strong>CRM-MA 10415 · RQE 3698</strong></p></div>
        <div><h2>Navegação</h2>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <div><h2>Contato</h2><a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle /> Agendamento online</a>{siteConfig.contact.instagram ? <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer"><InstagramIcon /> Instagram</a> : <span className="placeholder-link"><InstagramIcon /> Instagram a configurar</span>}<a href="/privacidade.html">Política de Privacidade</a></div>
      </div>
      <div className="container footer-bottom"><p>© {new Date().getFullYear()} Dr. Evaldo César Macau. Todos os direitos reservados.</p><p>As informações deste site são educativas e não substituem consulta médica.</p></div>
    </footer>
    <MobileStickyCTA />
  </>
}
