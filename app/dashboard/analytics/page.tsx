'use client'

import { useState } from 'react';
import { TrendingUp, Users, AlertTriangle, Target, DollarSign } from 'lucide-react';

// Mock AI analytics data
const aiAnalytics = {
  customerSegments: [
    {
      name: 'Hochwertige VIPs',
      count: 12,
      description: 'Loyale Kunden mit hoher Kaufkraft und regelmäßigen Zusatzumsätzen',
      avgSpend: 142,
      visitFrequency: 4.2,
      predictedChurn: 8,
      preferredProducts: ['Supplements', 'Personal Training', 'Premium Kurse']
    },
    {
      name: 'Aktive Stammkunden',
      count: 45,
      description: 'Regelmäßige Besucher mit solidem Engagement',
      avgSpend: 78,
      visitFrequency: 3.1,
      predictedChurn: 15,
      preferredProducts: ['Protein Shakes', 'Gruppenkurse', 'Energy Drinks']
    },
    {
      name: 'Gelegenheitsnutzer',
      count: 23,
      description: 'Unregelmäßige Besucher mit Potenzial für Engagement',
      avgSpend: 42,
      visitFrequency: 1.3,
      predictedChurn: 52,
      preferredProducts: ['Tageskarten', 'Drop-in Kurse']
    }
  ],
  productRecommendations: [
    {
      product: 'Premium Supplements Bundle',
      confidence: 87,
      targetSegment: 'Hochwertige VIPs',
      expectedRevenue: 1240,
      reasoning: 'Hohe Korrelation zwischen VIP-Status und Supplement-Käufen in den letzten 6 Monaten'
    },
    {
      product: 'Personal Training Pakete',
      confidence: 79,
      targetSegment: 'Aktive Stammkunden',
      expectedRevenue: 2850,
      reasoning: 'Stammkunden zeigen erhöhtes Interesse an individueller Betreuung'
    },
    {
      product: 'Monats-Abo Upgrade',
      confidence: 92,
      targetSegment: 'Gelegenheitsnutzer',
      expectedRevenue: 980,
      reasoning: 'Kostenanalyse zeigt, dass 68% der Gelegenheitsnutzer mit Abo Geld sparen würden'
    }
  ],
  churnPrediction: {
    highRisk: 8,
    mediumRisk: 15,
    lowRisk: 57,
    interventionSuccess: 78
  },
  salesOptimization: {
    priceOptimization: {
      proteinShakes: { currentPrice: 4.50, suggestedPrice: 4.95, expectedIncrease: '+12%' },
      supplements: { currentPrice: 38.00, suggestedPrice: 42.00, expectedIncrease: '+18%' },
      personalTraining: { currentPrice: 65.00, suggestedPrice: 70.00, expectedIncrease: '+8%' }
    },
    seasonalTrends: {
      'Q1 2025': { trend: '+28%', reason: 'Neujahrsvorsätze & Fitnesswelle' },
      'Q2 2025': { trend: '+15%', reason: 'Sommervorbereitung' },
      'Q3 2025': { trend: '-8%', reason: 'Urlaubszeit' },
      'Q4 2025': { trend: '+22%', reason: 'Winterfitness & Jahresendangebote' }
    }
  }
};

export default function AnalyticsPage() {
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleStartCampaign = (product: string) => {
    setSelectedProduct(product);
    setShowCampaignModal(true);
  };

  return (
    <div className="space-y-8">
      {/* KI Overview Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">KI-basierte Kundenanalyse</h2>
            <p className="text-white/80">Intelligente Einblicke in Kaufverhalten und Verkaufsoptimierung</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">Segmente identifiziert</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">Umsatzprognose</p>
            <p className="text-2xl font-bold">+18%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">Churn Prävention</p>
            <p className="text-2xl font-bold">78%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">KI Konfidenz</p>
            <p className="text-2xl font-bold">91%</p>
          </div>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">🎯 Intelligente Kundensegmentierung</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {aiAnalytics.customerSegments.map((segment, index) => (
            <div
              key={index}
              className="border border-slate-700 bg-slate-800/70 rounded-xl p-5 hover:shadow-xl hover:bg-slate-700/70 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">{segment.name}</h4>
                <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-medium">
                  {segment.count} Kunden
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-4">{segment.description}</p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ø Ausgaben/Monat:</span>
                  <span className="font-semibold text-white">€{segment.avgSpend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Besuchsfrequenz:</span>
                  <span className="font-semibold text-white">{segment.visitFrequency}x/Woche</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Churn-Risiko:</span>
                  <span className={`font-semibold ${
                    segment.predictedChurn > 50 ? 'text-red-400' :
                    segment.predictedChurn > 30 ? 'text-orange-400' :
                    'text-green-400'
                  }`}>
                    {segment.predictedChurn}%
                  </span>
                </div>

                <div className="pt-4">
                  <p className="text-slate-400 text-sm mb-2">Bevorzugte Produkte:</p>
                  <div className="flex flex-wrap gap-1">
                    {segment.preferredProducts.map((product, i) => (
                      <span key={i} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">🛍️ KI-Produktempfehlungen</h3>
        <div className="space-y-4">
          {aiAnalytics.productRecommendations.map((rec, index) => (
            <div
              key={index}
              className="border border-slate-700 bg-slate-800/70 rounded-xl p-5 hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3">
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <h4 className="text-lg font-semibold text-white">{rec.product}</h4>
                  <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-700">
                    {rec.confidence}% Konfidenz
                  </span>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-slate-400">Erwarteter Umsatz</p>
                  <p className="text-xl font-bold text-green-400">€{rec.expectedRevenue}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-slate-400">Zielgruppe:</p>
                  <p className="font-semibold text-white">{rec.targetSegment}</p>
                </div>
                <div>
                  <p className="text-slate-400">KI-Begründung:</p>
                  <p className="text-slate-300">{rec.reasoning}</p>
                </div>
              </div>

              <button
                onClick={() => handleStartCampaign(rec.product)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Marketingkampagne starten
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">💰 Preisoptimierung</h3>
          <div className="space-y-4">
            {Object.entries(aiAnalytics.salesOptimization.priceOptimization).map(([product, data]) => (
              <div key={product} className="border border-slate-700 bg-slate-800/70 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white capitalize">
                    {product.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <span className="text-green-400 font-bold">{data.expectedIncrease}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Aktuell: €{data.currentPrice}</span>
                  <span className="text-white font-semibold">Empfohlen: €{data.suggestedPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">⚠️ Churn-Prävention</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-700">
                <p className="text-2xl font-bold text-red-400">{aiAnalytics.churnPrediction.highRisk}</p>
                <p className="text-red-400 text-sm">Hohes Risiko</p>
              </div>
              <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-700">
                <p className="text-2xl font-bold text-orange-400">{aiAnalytics.churnPrediction.mediumRisk}</p>
                <p className="text-orange-400 text-sm">Mittleres Risiko</p>
              </div>
              <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-700">
                <p className="text-2xl font-bold text-green-400">{aiAnalytics.churnPrediction.lowRisk}</p>
                <p className="text-green-400 text-sm">Geringes Risiko</p>
              </div>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg">
              <p className="text-slate-300 text-sm">Erfolgsquote Interventionen:</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{width: `${aiAnalytics.churnPrediction.interventionSuccess}%`}}
                  ></div>
                </div>
                <span className="font-bold text-green-400">{aiAnalytics.churnPrediction.interventionSuccess}%</span>
              </div>
            </div>

            <button
              onClick={() => console.log('Starting retention campaign...')}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Retention-Kampagne starten
            </button>
          </div>
        </div>
      </div>

      {/* Seasonal Trends */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">📈 Saisonale Verkaufstrends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(aiAnalytics.salesOptimization.seasonalTrends).map(([quarter, data]) => (
            <div key={quarter} className="text-center p-4 border border-slate-700 bg-slate-800/70 rounded-lg">
              <h4 className="font-semibold text-white mb-2">{quarter}</h4>
              <p className={`text-2xl font-bold mb-1 ${
                data.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {data.trend}
              </p>
              <p className="text-slate-400 text-sm">{data.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Modal */}
      {showCampaignModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowCampaignModal(false)}
        >
          <div
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Kampagne erstellen</h3>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-xl">
                <p className="text-slate-300">
                  Möchten Sie eine automatische Marketingkampagne für <strong className="text-white">{selectedProduct}</strong> starten?
                </p>
                <p className="text-slate-400 text-sm mt-4">
                  Die KI wird automatisch die optimale Zielgruppe auswählen und personalisierte E-Mails versenden.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowCampaignModal(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => {
                    console.log(`Starting campaign for ${selectedProduct}...`);
                    setShowCampaignModal(false);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  Kampagne starten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
