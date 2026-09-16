export const siteConfig = {
  doctor: { name: 'Dr. Evaldo César Macau', shortName: 'Dr. Evaldo', specialty: 'Otorrinolaringologia', crm: 'CRM-MA 10415', rqe: 'RQE 3698' },
  contact: {
    whatsapp: '+55 98 9143-3929',
    phone: '(98) 99143-3929',
    address: 'Rua das Andirobas, 10, sala 405 — Jardim Renascença, São Luís — MA, CEP 65075-040',
    openingHours: '',
    instagram: 'https://www.instagram.com/drevaldomacau',
    officialUrl: 'https://SEU-DOMINIO.com.br',
    doctoralia: 'https://www.doctoralia.com.br/evaldo-cesar-macau/otorrino/santa-ines',
  },
  location: {
    clinic: 'Executive Lake Center', city: 'São Luís', state: 'MA',
    mapsUrl: 'https://share.google/MG1haMyEcS3pog2UO',
  },
  assets: {
    logoLight: '/logos/dr-evaldo-logo-cabecalho.webp',
    logoDark: '/logos/dr-evaldo-logo-rodape.webp',
    hero: '/images/inicio-retrato-profissional-dr-evaldo.webp',
    about: '/images/webp/IMG-20230530-WA0121.jpg.webp',
    clinical: '/images/atendimento-avaliacao-ouvido.webp',
  },
} as const

export const contactText = {
  phone: siteConfig.contact.phone || 'Telefone a confirmar',
  address: siteConfig.contact.address || 'Endereço do consultório a confirmar',
  hours: siteConfig.contact.openingHours || 'Horários a confirmar com a equipe',
}

export function whatsappUrl(message = 'Olá! Gostaria de informações para agendar uma consulta com o Dr. Evaldo.') {
  const phone = siteConfig.contact.whatsapp.replace(/\D/g, '')
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : siteConfig.contact.doctoralia
}

export function trackEvent(event: string, details: Record<string, string> = {}) {
  const win = window as Window & { dataLayer?: unknown[] }
  win.dataLayer = win.dataLayer || []
  win.dataLayer.push({ event, ...details })
}
