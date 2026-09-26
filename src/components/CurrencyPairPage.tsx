import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  Info,
  Layers,
  ArrowLeftRight,
  ExternalLink,
} from 'lucide-react';
import { CurrencyPairData, SEO_CURRENCY_PAIRS } from '../data/seoPairs';
import { Currency, ExchangeRatesData } from '../types/currency';
import { ConverterCard } from './ConverterCard';
import { CurrencyFlag } from './CurrencyFlag';
import { formatCurrencyAmount } from '../services/exchangeRates';

interface CurrencyPairPageProps {
  pairData: CurrencyPairData;
  fromCurrency: Currency;
  toCurrency: Currency;
  ratesData: ExchangeRatesData | null;
  isLoadingRates: boolean;
  onRefreshRates: () => void;
  onSwapCurrencies: () => void;
  onOpenFromModal: () => void;
  onOpenToModal: () => void;
  onShowToast: (msg: string) => void;
  onAddToHistory?: (from: Currency, to: Currency, fromAmt: number, toAmt: number, rate: number) => void;
  onNavigate: (path: string) => void;
  currentRate: number;
}

export const CurrencyPairPage: React.FC<CurrencyPairPageProps> = ({
  pairData,
  fromCurrency,
  toCurrency,
  ratesData,
  isLoadingRates,
  onRefreshRates,
  onSwapCurrencies,
  onOpenFromModal,
  onOpenToModal,
  onShowToast,
  onAddToHistory,
  onNavigate,
  currentRate,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const otherPairs = SEO_CURRENCY_PAIRS.filter((p) => p.slug !== pairData.slug);
  const inverseRate = currentRate > 0 ? 1 / currentRate : 0;

  return (
    <div className="space-y-8">
      {/* Breadcrumb & Navigation Back */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="inline-flex items-center gap-1 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </a>
        <span>/</span>
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="hover:text-emerald-700 transition-colors"
        >
          Currency Converter
        </a>
        <span>/</span>
        <span className="text-slate-900 font-semibold" aria-current="page">
          {pairData.fromCode} to {pairData.toCode}
        </span>
      </nav>

      {/* Page Header with Single Primary H1 */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <CurrencyFlag countryCode={fromCurrency.countryCode} fallbackEmoji={fromCurrency.flagEmoji} size="sm" />
            <span>{pairData.fromCode}</span>
            <ArrowRight className="w-3 h-3 text-emerald-600" />
            <CurrencyFlag countryCode={toCurrency.countryCode} fallbackEmoji={toCurrency.flagEmoji} size="sm" />
            <span>{pairData.toCode}</span>
          </div>
          <span className="text-xs text-slate-500">Live Exchange Rate Guide</span>
        </div>

        {/* The ONE primary H1 for this page */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {pairData.h1}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          {pairData.subtitle}
        </p>

        {/* Live Rate Reference Badge (Calculated from real live data) */}
        {currentRate > 0 && (
          <div className="inline-flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Live Interbank Rate:</span>
            <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
              1 {pairData.fromCode} = {formatCurrencyAmount(currentRate, toCurrency.decimals)} {pairData.toCode}
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-600 text-xs sm:text-sm">
              1 {pairData.toCode} = {formatCurrencyAmount(inverseRate, fromCurrency.decimals)} {pairData.fromCode}
            </span>
          </div>
        )}
      </header>

      {/* Embedded Live Converter Card with Live Rates */}
      <section aria-label="Interactive Currency Calculator">
        <ConverterCard
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          onOpenFromModal={onOpenFromModal}
          onOpenToModal={onOpenToModal}
          onSwapCurrencies={onSwapCurrencies}
          ratesData={ratesData}
          isLoading={isLoadingRates}
          onRefresh={onRefreshRates}
          onShowToast={onShowToast}
          onAddToHistory={onAddToHistory}
        />
      </section>

      {/* Natural Explanatory Content */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
            About {pairData.fromName} to {pairData.toName} ({pairData.fromCode} to {pairData.toCode})
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            {pairData.introduction}
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {pairData.aboutPair}
          </p>
        </div>

        {/* Live Denomination Conversion Matrix for this Pair */}
        {currentRate > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Quick {pairData.fromCode} to {pairData.toCode} Conversion Table
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Calculated using the latest live interbank exchange rate (1 {pairData.fromCode} = {formatCurrencyAmount(currentRate, toCurrency.decimals)} {pairData.toCode}).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Forward conversion table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3.5">{pairData.fromCode} ({pairData.fromSymbol})</th>
                      <th className="py-2.5 px-3.5 text-right">{pairData.toCode} ({pairData.toSymbol})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {pairData.popularAmounts.slice(0, 5).map((amt) => (
                      <tr key={`fwd-${amt}`} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3.5 font-semibold text-slate-800">
                          {formatCurrencyAmount(amt, fromCurrency.decimals)} {pairData.fromCode}
                        </td>
                        <td className="py-2 px-3.5 text-right text-emerald-700 font-bold">
                          {formatCurrencyAmount(amt * currentRate, toCurrency.decimals)} {pairData.toCode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Higher amounts table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3.5">{pairData.fromCode} ({pairData.fromSymbol})</th>
                      <th className="py-2.5 px-3.5 text-right">{pairData.toCode} ({pairData.toSymbol})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {pairData.popularAmounts.slice(5).map((amt) => (
                      <tr key={`fwd-hi-${amt}`} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3.5 font-semibold text-slate-800">
                          {formatCurrencyAmount(amt, fromCurrency.decimals)} {pairData.fromCode}
                        </td>
                        <td className="py-2 px-3.5 text-right text-emerald-700 font-bold">
                          {formatCurrencyAmount(amt * currentRate, toCurrency.decimals)} {pairData.toCode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* How to Convert Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
          How to Convert {pairData.fromCode} to {pairData.toCode}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pairData.howToConvert.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3.5">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Factors Influencing Rates */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Key Factors Influencing the {pairData.fromCode}/{pairData.toCode} Exchange Rate
        </h2>
        <p className="text-slate-600 text-sm mb-6">
          Understanding the macroeconomic forces that shift the {pairData.fromName} and {pairData.toName} helps identify the best times to make transfers or purchase currency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pairData.keyFactors.map((factor, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {factor.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel & Remittance Tips */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Travel & Practical Tips for {pairData.fromCode} to {pairData.toCode}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {pairData.travelTips}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ for this pair */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Frequently Asked Questions: {pairData.fromCode} to {pairData.toCode}
        </h2>
        <p className="text-slate-600 text-sm mb-6">
          Common questions answered regarding converting {pairData.fromName} to {pairData.toName}.
        </p>

        <div className="space-y-3">
          {pairData.faq.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                aria-expanded={openFaqIndex === index}
              >
                <span>{item.question}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>
              {openFaqIndex === index && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Internal Linking: Popular Currency Conversions & Return to Home */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Other Popular Currency Conversions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
              Compare rates for other major world currency pairs or return to the main multi-currency converter.
            </p>
          </div>
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
          >
            <span>All 170+ Currencies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {otherPairs.map((p) => (
            <a
              key={p.slug}
              href={p.path}
              onClick={(e) => handleLinkClick(e, p.path)}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="font-mono font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                  {p.fromCode} to {p.toCode}
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  {p.fromName} to {p.toName}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
