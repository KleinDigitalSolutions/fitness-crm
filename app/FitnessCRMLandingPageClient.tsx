"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  Shield,
  Bell,
  Target,
  Activity,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Euro,
  UserPlus,
} from "lucide-react"

export default function FitnessCRMLandingPageClient() {
  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Fitness-Studio CRM Software",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web-based",
            "provider": {
              "@type": "Organization",
              "name": "Klein Digital Solutions",
              "url": "https://kleindigitalsolutions.de"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://kleindigitalsolutions.de/leistungen/fitness-crm"
            },
            "description": "CRM-Software für Fitness-Studios mit Mitgliederverwaltung, Kursbuchung, automatischer Abrechnung und KI-Analytics."
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-red-900/20 via-slate-900 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-slate-900/50 to-transparent"></div>

          <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm"
              >
                <Activity className="h-5 w-5 text-red-400" />
                <span className="text-sm font-medium uppercase tracking-wider text-white/90">
                  All-in-One Studio Management
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              >
                Fitness-Studio CRM:{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Mitglieder verwalten, Umsatz steigern
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl"
              >
                Alles, was Sie für Ihr Fitness-Studio brauchen: Mitgliederverwaltung, automatische Abrechnung,
                Kursbuchung und KI-gestützte Analytics – in einem modernen, intuitiven System.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-16 flex flex-col justify-center gap-4 sm:flex-row"
              >
                <Link
                  href="/leistungen/fitness-crm/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-white/90"
                >
                  Live-Demo öffnen
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="mailto:info@kleindigitalsolutions.de"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white/60 hover:bg-white/5"
                >
                  Beratungsgespräch buchen
                </a>
              </motion.div>

              {/* Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
              >
                {[
                  { title: "Zeitersparnis", value: "15h", caption: "pro Woche gespart" },
                  { title: "Retention", value: "+23%", caption: "mehr Mitglieder bleiben" },
                  { title: "Automatisierung", value: "87%", caption: "weniger manuelle Arbeit" },
                  { title: "Umsatz", value: "+18%", caption: "durch Up-Selling" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                  >
                    <span className="text-xs uppercase tracking-[0.35em] text-white/50">{item.title}</span>
                    <span className="text-3xl font-semibold text-white">{item.value}</span>
                    <span className="text-xs text-white/60">{item.caption}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-b border-white/10 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Warum Studio-Betreiber unser CRM lieben
                </h2>
                <p className="mx-auto max-w-3xl text-xl text-white/60">
                  Moderne Fitness-Studios brauchen moderne Software.
                  Schluss mit Excel-Listen und Papier-Chaos.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Users,
                    title: "Mitgliederverwaltung",
                    description: "Alle Mitgliederdaten zentral: Verträge, Zahlungen, Besuchshistorie, Gesundheitsdaten und Notfallkontakte – übersichtlich und DSGVO-konform.",
                  },
                  {
                    icon: Calendar,
                    title: "Kursbuchung & Planung",
                    description: "Automatische Kursbuchung mit Wartelisten-Management. WhatsApp/SMS-Erinnerungen 2h vor Kursbeginn. Mitglieder buchen per App.",
                  },
                  {
                    icon: Euro,
                    title: "Automatische Abrechnung",
                    description: "SEPA-Lastschrift, Rechnungsstellung und Mahnwesen komplett automatisiert. Zahlungserinnerungen per E-Mail/SMS.",
                  },
                  {
                    icon: BarChart3,
                    title: "KI-gestützte Analytics",
                    description: "Dashboards mit Echtzeit-Daten: Umsatz, Auslastung, Mitgliederwachstum. KI erkennt Kündigungsrisiken und optimiert Marketing.",
                  },
                  {
                    icon: Bell,
                    title: "Smart Notifications",
                    description: "Automatische Benachrichtigungen bei Zahlungsausfall, niedrigen Credits oder inaktiven Mitgliedern. Nie wieder etwas verpassen.",
                  },
                  {
                    icon: Shield,
                    title: "DSGVO & Sicherheit",
                    description: "Hosting in Deutschland, verschlüsselte Datenübertragung, automatische Backups und vollständige DSGVO-Compliance.",
                  }
                ].map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={index}
                      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                        <Icon className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
                      <p className="leading-relaxed text-white/60">{benefit.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="border-b border-white/10 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Funktionen im Detail
                </h2>
              </div>

              <div className="space-y-12">
                {/* Feature 1 */}
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                        <Users className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Mitglieder-Management</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Automatisches Lead-Scoring für neue Interessenten</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Vertrags- und Zahlungsstatus in Echtzeit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Besuchshistorie und Trainings-Tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Kaufhistorie: Shakes, Supplements, Zubehör</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Loyalitätsprogramm mit Punkten und Rewards</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-white/70">Aktive Mitglieder</span>
                        <span className="text-2xl font-bold text-white">847</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-white/70">Neue diese Woche</span>
                        <span className="text-xl font-semibold text-green-400">+12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Kündigungsrisiko</span>
                        <span className="text-xl font-semibold text-orange-400">23</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <div className="order-2 md:order-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="rounded-xl bg-white/5 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Yoga Flow</span>
                          <span className="text-green-400 text-sm">18:00</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Users className="h-4 w-4" />
                          <span>12/15 gebucht</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/5 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">HIIT Training</span>
                          <span className="text-green-400 text-sm">19:00</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Users className="h-4 w-4" />
                          <span>20/20 gebucht</span>
                          <span className="text-orange-400">Warteliste: 5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                        <Calendar className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Kursverwaltung</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Automatische Buchungsbestätigungen per SMS/WhatsApp</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Wartelisten mit automatischer Nachrückung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Erinnerungen 2 Stunden vor Kursbeginn</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Trainer-Dashboard für Check-ins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Auslastungs-Analytics und Trend-Prognosen</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                        <TrendingUp className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">KI-Analytics & Retention</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">KI erkennt Kündigungsrisiko anhand Besuchsmustern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Automatische Interventions-Kampagnen bei Risiko-Mitgliedern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Umsatz- und Wachstums-Prognosen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Personalisierte Angebote basierend auf Kaufhistorie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <span className="text-white/60">Automatische E-Mail-Reports jeden Montag</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70">Retention Rate</span>
                        <span className="text-2xl font-bold text-green-400">94.2%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: '94.2%' }}></div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70">Monatlicher Umsatz</span>
                        <span className="text-2xl font-bold text-white">67.840 €</span>
                      </div>
                      <span className="text-green-400 text-sm">↑ +18% vs. Vormonat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="border-b border-white/10 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Perfekt für Ihr Studio
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10">
                  <Activity className="mb-4 h-10 w-10 text-red-400" />
                  <h3 className="mb-3 text-2xl font-bold text-white">Boutique Studios</h3>
                  <p className="mb-4 text-white/60">
                    Yoga, Pilates, Cycling – perfekt für spezialisierte Studios mit Kursfokus.
                  </p>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li>• Einfache Kursbuchung</li>
                    <li>• Membership-Pakete</li>
                    <li>• Community-Features</li>
                  </ul>
                </div>

                <div className="rounded-3xl border-2 border-red-500/50 bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 backdrop-blur-sm">
                  <div className="mb-4 inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300">
                    Beliebt
                  </div>
                  <Target className="mb-4 h-10 w-10 text-red-400" />
                  <h3 className="mb-3 text-2xl font-bold text-white">Fitness-Ketten</h3>
                  <p className="mb-4 text-white/60">
                    Multi-Location Management mit zentraler Verwaltung und Reporting.
                  </p>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li>• Standort-übergreifend</li>
                    <li>• Zentrales Dashboard</li>
                    <li>• Franchise-Features</li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10">
                  <Zap className="mb-4 h-10 w-10 text-orange-400" />
                  <h3 className="mb-3 text-2xl font-bold text-white">Personal Training</h3>
                  <p className="mb-4 text-white/60">
                    1:1 Sessions, Trainingsplanung und individuelle Betreuung.
                  </p>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li>• Individuelles Tracking</li>
                    <li>• Ernährungspläne</li>
                    <li>• Fortschritts-Monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA with Demo Link */}
        <section className="border-b border-white/10 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 p-10 text-center backdrop-blur-sm">
              <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Bereit für smartes Studio-Management?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
                Testen Sie alle Funktionen in unserer interaktiven Demo oder lassen Sie sich persönlich beraten.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/leistungen/fitness-crm/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-white/90"
                >
                  Interaktive Demo starten
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="mailto:info@kleindigitalsolutions.de"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white/60 hover:bg-white/5"
                >
                  Beratung anfragen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-white/10 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h3 className="mb-8 text-center text-3xl font-semibold text-white">Echte Ergebnisse</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Zeitersparnis</p>
                  <p className="mt-2 text-4xl font-bold text-white">15h/Woche</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Weniger Verwaltungsaufwand durch Automatisierung von Abrechnungen, Mahnungen und Buchungen.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Retention</p>
                  <p className="mt-2 text-4xl font-bold text-white">+23%</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Kündigungsrate sinkt durch frühzeitige Erkennung von Risiko-Mitgliedern und automatische Interventionen.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Zusatzumsatz</p>
                  <p className="mt-2 text-4xl font-bold text-white">+18%</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Personalisierte Angebote für Supplements, PT-Sessions und Upgrades basierend auf KI-Analyse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </>
  )
}
