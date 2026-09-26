import React, { useState } from 'react';
import {
  Globe,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Plane,
  CreditCard,
  Building,
  RefreshCw,
  Coins,
  Compass,
} from 'lucide-react';
import { SEO_CURRENCY_PAIRS } from '../data/seoPairs';

interface SeoContentHomeProps {
  onNavigate: (path: string) => void;
}

export const SeoContentHome: React.FC<SeoContentHomeProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 mt-12 text-slate-700">
      {/* 1. Live Currency Converter Section */}
      <section aria-labelledby="live-converter-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-100">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Real-Time Market Tracking</span>
          </div>
          <h2 id="live-converter-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
            Live Currency Converter
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
            Global FX is an intuitive, real-time currency conversion platform engineered to give you the most accurate foreign exchange rates available. Whether you are transferring money internationally, shopping online from global merchants, managing foreign investments, or preparing for cross-border holidays, our tool connects directly with reliable wholesale interbank data feeds.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Unlike many commercial banks and airport exchange booths that bury hidden 3% to 6% markups inside their quoted rates, Global FX delivers transparent mid-market reference rates. This empowers you to check real baseline values before converting currencies online or completing financial transactions.
          </p>
        </div>
      </section>

      {/* 2. Convert 170+ Currencies Section */}
      <section aria-labelledby="currencies-coverage-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100">
              <Globe className="w-3.5 h-3.5" />
              <span>Worldwide Coverage</span>
            </div>
            <h2 id="currencies-coverage-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Convert 170+ Currencies
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Access exchange rates for virtually every sovereign currency on the planet. From major global reserve units to emerging market tenders, all currencies are paired with crisp national flags and official three-letter ISO 4217 currency codes for effortless identification.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="block text-2xl font-black text-slate-900">170+</span>
              <span className="text-[11px] font-medium text-slate-500">World Currencies</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="block text-2xl font-black text-emerald-600">0%</span>
              <span className="text-[11px] font-medium text-slate-500">Hidden Markups</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="block text-2xl font-black text-slate-900">24/7</span>
              <span className="text-[11px] font-medium text-slate-500">Rate Updates</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="block text-2xl font-black text-slate-900">100%</span>
              <span className="text-[11px] font-medium text-slate-500">Free to Use</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Major Reserve Currencies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full live pricing for the US Dollar (USD), Euro (EUR), British Pound (GBP), Japanese Yen (JPY), Swiss Franc (CHF), and Canadian Dollar (CAD).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Asia & Middle East Corridors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accurate live rates for Indian Rupee (INR), UAE Dirham (AED), Singapore Dollar (SGD), Saudi Riyal (SAR), Chinese Yuan (CNY), and Australian Dollar (AUD).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Emerging & Regional Markets</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Support for Latin American, African, and European regional currencies, including Brazilian Real (BRL), Mexican Peso (MXN), and South African Rand (ZAR).
            </p>
          </div>
        </div>
      </section>

      {/* 3. How to Use the Currency Converter */}
      <section aria-labelledby="how-to-use-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h2 id="how-to-use-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          How to Use the Currency Converter
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mb-6">
          Converting currencies online with Global FX takes just a few seconds. Follow these simple steps to calculate conversions accurately:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Enter Your Amount</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Type the amount you want to convert into the input box or click any quick preset chip (e.g. 100, 500, 1000).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Select Base Currency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click the base currency pill to search through 170+ world currencies by code, country name, or region.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Choose Target Currency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pick the currency you want to receive. The conversion automatically calculates in real time as you type.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Analyze Trends & Fees</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Switch tabs to view historical exchange rate charts, travel fee comparisons, or pocket denomination cheat sheets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Currency Conversions Section (Internal Linking Hub) */}
      <section aria-labelledby="popular-conversions-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 id="popular-conversions-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Popular Currency Conversions
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Explore dedicated live calculators and detailed exchange guides for the world's most requested currency pairs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEO_CURRENCY_PAIRS.map((pair) => (
            <a
              key={pair.slug}
              href={pair.path}
              onClick={(e) => handleLinkClick(e, pair.path)}
              className="group p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all block relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                  {pair.fromCode} to {pair.toCode}
                </span>
                <span className="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                {pair.fromName} to {pair.toName}
              </p>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {pair.metaDescription}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800 mb-1">Comparing Prices in Different Currencies:</p>
          Looking to compare prices across international e-commerce platforms or budget for overseas study and work? Use our currency pair pages for <a href="/currency-converter/usd-to-inr" onClick={(e) => handleLinkClick(e, '/currency-converter/usd-to-inr')} className="text-emerald-700 hover:underline font-semibold">USD to INR</a>, <a href="/currency-converter/usd-to-eur" onClick={(e) => handleLinkClick(e, '/currency-converter/usd-to-eur')} className="text-emerald-700 hover:underline font-semibold">USD to EUR</a>, <a href="/currency-converter/usd-to-gbp" onClick={(e) => handleLinkClick(e, '/currency-converter/usd-to-gbp')} className="text-emerald-700 hover:underline font-semibold">USD to GBP</a>, <a href="/currency-converter/usd-to-jpy" onClick={(e) => handleLinkClick(e, '/currency-converter/usd-to-jpy')} className="text-emerald-700 hover:underline font-semibold">USD to JPY</a>, <a href="/currency-converter/eur-to-gbp" onClick={(e) => handleLinkClick(e, '/currency-converter/eur-to-gbp')} className="text-emerald-700 hover:underline font-semibold">EUR to GBP</a>, and <a href="/currency-converter/usd-to-aed" onClick={(e) => handleLinkClick(e, '/currency-converter/usd-to-aed')} className="text-emerald-700 hover:underline font-semibold">USD to AED</a> to see current rates and avoid inflated exchange surcharges.
        </div>
      </section>

      {/* 5. Currency Converter for International Travel Section */}
      <section aria-labelledby="travel-converter-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
          <Plane className="w-3.5 h-3.5" />
          <span>Smart Spending Abroad</span>
        </div>
        <h2 id="travel-converter-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
          Currency Converter for International Travel
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
          Traveling abroad brings incredible experiences, but foreign transaction fees and confusing exchange markups can quietly inflate your vacation budget. Knowing the live mid-market rate is your best protection against predatory currency pricing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <CreditCard className="w-5 h-5 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Avoid Dynamic Currency Conversion (DCC)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a foreign card terminal or ATM asks whether you want to be billed in your home currency or the local currency, always choose the <strong>local currency</strong>. Choosing your home currency triggers DCC, which can add 4% to 8% in hidden conversion fees.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <Building className="w-5 h-5 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Skip Airport Kiosks When Possible</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Airport currency exchange booths often advertise "0% Commission," but compensate by offering exchange rates that are 7% to 15% worse than the real mid-market rate. Withdrawing cash from a reputable local bank ATM inside the city is typically far cheaper.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <Coins className="w-5 h-5 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Use the Pocket Denomination Matrix</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our built-in denomination cheat sheet gives travelers an instant pocket conversion table for common bills (10, 20, 50, 100), making it simple to evaluate restaurant checks, taxi fares, and market bargaining on the spot.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions Section */}
      <section aria-labelledby="faq-section-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3 border border-slate-200">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>Got Questions?</span>
        </div>
        <h2 id="faq-section-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-sm mb-6">
          Everything you need to know about our currency converter, rates, and supported currencies.
        </p>

        <div className="space-y-3">
          {/* FAQ 1 */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <button
              onClick={() => toggleFaq(0)}
              className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              aria-expanded={openFaqIndex === 0}
            >
              <span>What is a currency converter?</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaqIndex === 0 ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>
            {openFaqIndex === 0 && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                A currency converter is a financial calculator that converts the value of one currency into another using the latest foreign exchange (FX) market exchange rates. It helps travelers, online shoppers, and businesses determine the exact value of their money across international currencies.
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <button
              onClick={() => toggleFaq(1)}
              className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              aria-expanded={openFaqIndex === 1}
            >
              <span>How many currencies does Global FX support?</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaqIndex === 1 ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>
            {openFaqIndex === 1 && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Global FX supports more than 170 sovereign world currencies, complete with national flags and ISO currency codes, covering major reserve currencies (USD, EUR, GBP, JPY), regional powerhouses (INR, AED, CAD, AUD), and emerging market currencies worldwide.
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <button
              onClick={() => toggleFaq(2)}
              className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              aria-expanded={openFaqIndex === 2}
            >
              <span>Can I convert USD to INR?</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaqIndex === 2 ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>
            {openFaqIndex === 2 && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Yes, you can easily convert US Dollars to Indian Rupees (USD to INR). Global FX provides real-time mid-market rates, conversion charts, and a dedicated <a href="/currency-converter/usd-to-inr" onClick={(e) => handleLinkClick(e, '/currency-converter/usd-to-inr')} className="text-emerald-700 font-semibold underline">USD to INR converter page</a> with live updates.
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <button
              onClick={() => toggleFaq(3)}
              className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              aria-expanded={openFaqIndex === 3}
            >
              <span>Can I convert EUR to USD?</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaqIndex === 3 ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>
            {openFaqIndex === 3 && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Yes, Global FX supports both USD to EUR and EUR to USD conversions. You can swap base and target currencies with a single click, or check our dedicated <a href="/currency-converter/usd-to-eur" onClick={(e) => handleLinkClick(e, '/currency-converter/usd-to-eur')} className="text-emerald-700 font-semibold underline">USD to EUR converter</a> to view transatlantic rates and parity indicators.
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <button
              onClick={() => toggleFaq(4)}
              className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              aria-expanded={openFaqIndex === 4}
            >
              <span>Is Global FX free to use?</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaqIndex === 4 ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>
            {openFaqIndex === 4 && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Yes, Global FX is 100% free to use. There are no fees, subscriptions, or account requirements. You can convert any of the 170+ world currencies at live interbank rates at any time.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
