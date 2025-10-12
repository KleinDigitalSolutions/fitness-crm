import { Metadata } from 'next'
import FitnessCRMLandingPageClient from './FitnessCRMLandingPageClient'

export const metadata: Metadata = {
  title: 'Fitness-Studio CRM Software – Mitgliederverwaltung & Automatisierung | Klein Digital Solutions',
  description: 'Professionelle CRM-Software für Fitness-Studios. Mitgliederverwaltung, Kursbuchung, Zahlungsabwicklung und KI-gestützte Analytics – alles in einem System. DSGVO-konform aus Dortmund.',
  keywords: [
    'Fitness CRM Software',
    'Mitgliederverwaltung Fitnessstudio',
    'Studio Management Software',
    'Fitness Studio Verwaltung',
    'Kursverwaltung Fitness',
    'Automatische Abrechnung Fitnessstudio',
    'Fitness Studio Analytics',
    'SEPA Lastschrift Fitnessstudio',
    'Mitglieder Retention System',
    'Fitness Studio Automatisierung',
    'Gym Management Software Deutschland',
  ],
  openGraph: {
    title: 'Fitness-Studio CRM Software | Klein Digital Solutions',
    description: 'Automatisierte Mitgliederverwaltung, Kursbuchung und Zahlungsabwicklung für moderne Fitness-Studios. KI-gestützte Analytics inklusive.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://kleindigitalsolutions.de/leistungen/fitness-crm',
  },
  alternates: {
    canonical: 'https://kleindigitalsolutions.de/leistungen/fitness-crm'
  }
}

export default function FitnessCRMLandingPage() {
  return <FitnessCRMLandingPageClient />
}
