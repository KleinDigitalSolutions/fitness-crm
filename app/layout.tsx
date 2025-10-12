// app/layout.tsx
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';
import { inter, poppins } from './fonts';
import RootClientLayout from '@/components/layout/RootClientLayout';
import Script from 'next/script';

// SEO-optimierte Metadata für Dortmund (bereits exzellent)
export const metadata: Metadata = {
  title: 'Webdesign, Next.js & Automatisierung | Klein Digital Solutions Dortmund',
  description:
    'Wir entwickeln performante Next.js-Websites, individuelle React-Anwendungen und Automatisierungslösungen mit API-Integrationen. Klein Digital Solutions ist Ihre Agentur für Webentwicklung, KI-gestützte Prozesse und Chatbots aus Dortmund.',
  keywords: [
    'Next.js Agentur',
    'Webdesign Dortmund',
    'React Entwicklung NRW',
    'API Integration Automatisierung',
    'Business Automatisierung',
    'KI Chatbot Unternehmen',
    'KI Chatbot für Unternehmen',
    'Website Chatbot entwickeln',
    'WhatsApp Chatbot Business',
    'Automatischer Kundenservice',
    'Chatbot Integration',
    'KI Assistent Dortmund',
    'Conversational AI Deutschland',
    '24/7 Kundensupport Chatbot',
    'Lead Qualifizierung Chatbot',
    'Process Automation',
    'Headless CMS Entwicklung',
    'SaaS Entwicklung Dortmund',
    'Klein Digital Solutions'
  ],
  authors: [{ name: 'Klein Digital Solutions' }],
  creator: 'Klein Digital Solutions',
  publisher: 'Klein Digital Solutions',
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL('https://www.kleindigitalsolutions.de'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Webdesign, Automatisierung & API-Integrationen | Klein Digital Solutions',
    description:
      'Digitale Produkte aus Dortmund: Next.js-Websites, React-Apps, API-Automatisierung und KI-Workflows für Unternehmen in NRW und darüber hinaus.',
    url: 'https://kleindigitalsolutions.de',
    siteName: 'Klein Digital Solutions',
    locale: 'de_DE',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Klein Digital Solutions - Webentwicklung Dortmund' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Webentwicklung & Automatisierung | Klein Digital Solutions',
    description: 'Performante Websites, React-Entwicklung & API-Automatisierung aus Dortmund – individuell für Ihr Unternehmen.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: { google: 'your-google-verification-code', yandex: 'your-yandex-verification-code' },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

// Strukturierte Daten für lokale SEO (sehr gut für die lokale Auffindbarkeit)
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Klein Digital Solutions',
  description: 'Professionelle Webentwicklung und digitale Lösungen in Dortmund',
  url: 'https://kleindigitalsolutions.de',
  telephone: '+49-176-41678256',
  email: 'info@kleindigitalsolutions.de',
  address: { '@type': 'PostalAddress', addressLocality: 'Dortmund', addressRegion: 'NRW', addressCountry: 'DE', postalCode: '44135' },
  geo: { '@type': 'GeoCoordinates', latitude: 51.5136, longitude: 7.4653 },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '€€',
  areaServed: [
    'Dortmund', 'Bochum', 'Essen', 'Duisburg', 'Gelsenkirchen', 'Hagen', 'Hamm', 'Herne',
    'Mülheim an der Ruhr', 'Oberhausen', 'Recklinghausen', 'Witten', 'Ruhrgebiet', 'Nordrhein-Westfalen'
  ],
  sameAs: ['https://www.linkedin.com/company/klein-digital-solutions', 'https://github.com/kleindigitalsolutions'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webentwicklung', description: 'Professionelle Website-Entwicklung mit modernen Technologien' }},
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Automatisierung', description: 'Digitale Automatisierung von Geschäftsprozessen' }},
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'KI-Chatbot Entwicklung', description: 'Intelligente Chatbots für Website und WhatsApp Business - 24/7 automatisierter Kundenservice und Lead-Qualifizierung' }},
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Optimierung', description: 'Suchmaschinenoptimierung für bessere Sichtbarkeit' }}
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        {/* ✅ HIER IST DIE KORREKTUR */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />

        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        
        <meta name="geo.region" content="DE-NW" />
        <meta name="geo.placename" content="Dortmund" />
        <meta name="geo.position" content="51.5136;7.4653" />
        <meta name="ICBM" content="51.5136, 7.4653" />
      </head>
      <body className={cn(inter.variable, poppins.variable, 'font-sans antialiased bg-white text-gray-900')}>
        
        {/* --- Google Tag Manager mit Consent Mode v2 --- */}
        <Script
          id="gtm-consent-default"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              const existingConsent = localStorage.getItem('kleindigitalsolutions_cookie_consent_v1');
              let consentState = {
                'ad_storage': 'denied', 'analytics_storage': 'denied',
                'functionality_storage': 'denied', 'personalization_storage': 'denied',
                'security_storage': 'granted', 'wait_for_update': 500
              };
              
              if (existingConsent) {
                try {
                  const parsed = JSON.parse(existingConsent);
                  consentState = {
                    ...consentState,
                    'ad_storage': parsed.ad_storage || 'denied',
                    'analytics_storage': parsed.analytics_storage || 'denied',
                    'functionality_storage': parsed.functionality_storage || 'denied',
                    'personalization_storage': parsed.personalization_storage || 'denied'
                  };
                } catch (e) {
                  console.warn('Failed to parse cookie consent:', e);
                }
              }
              gtag('consent', 'default', consentState);
            `,
          }}
        />
        
        <Script
          id="gtm-base-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PXHGVS6L'); 
            `,
          }}
        />
        
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PXHGVS6L"
                  height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>

        <RootClientLayout>
          {children}
        </RootClientLayout>
      </body>
    </html>
  );
}
