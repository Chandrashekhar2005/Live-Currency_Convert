import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import {
  Coins,
  ArrowLeftRight,
  TrendingUp,
  Globe,
  Calculator,
  Table,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Currency, ExchangeRatesData, ConversionRecord } from './types/currency';
import { UNIQUE_CURRENCIES } from './data/currencies';
import { fetchLiveRates, calculateRate, getInitialRates } from './services/exchangeRates';
import { Header } from './components/Header';
import { ConverterCard } from './components/ConverterCard';
import { Toast } from './components/Toast';
import { SeoContentHome } from './components/SeoContentHome';
import { SEO_CURRENCY_PAIRS, getCurrencyPairBySlug } from './data/seoPairs';
import { updatePageMeta, HOME_PAGE_META } from './utils/seo';

// Lazy load below-the-fold tab features and secondary routes to minimize initial bundle size and speed up LCP
const MultiCurrencyComparison = lazy(() =>
  import('./components/MultiCurrencyComparison').then((m) => ({ default: m.MultiCurrencyComparison }))
);
const ExchangeRateTrend = lazy(() =>
  import('./components/ExchangeRateTrend').then((m) => ({ default: m.ExchangeRateTrend }))
);
const TravelFeeCalculator = lazy(() =>
  import('./components/TravelFeeCalculator').then((m) => ({ default: m.TravelFeeCalculator }))
);
const DenominationCheatSheet = lazy(() =>
  import('./components/DenominationCheatSheet').then((m) => ({ default: m.DenominationCheatSheet }))
);
const CurrencySelectorModal = lazy(() =>
  import('./components/CurrencySelectorModal').then((m) => ({ default: m.CurrencySelectorModal }))
);
const ConversionHistoryDrawer = lazy(() =>
  import('./components/ConversionHistoryDrawer').then((m) => ({ default: m.ConversionHistoryDrawer }))
);
const CurrencyPairPage = lazy(() =>
  import('./components/CurrencyPairPage').then((m) => ({ default: m.CurrencyPairPage }))
);

const POPULAR_NAV_PAIRS = [
  { from: 'USD', to: 'INR', path: '/currency-converter/usd-to-inr' },
  { from: 'USD', to: 'EUR', path: '/currency-converter/usd-to-eur' },
  { from: 'USD', to: 'GBP', path: '/currency-converter/usd-to-gbp' },
  { from: 'USD', to: 'JPY', path: '/currency-converter/usd-to-jpy' },
  { from: 'EUR', to: 'GBP', path: '/currency-converter/eur-to-gbp' },
  { from: 'USD', to: 'AED', path: '/currency-converter/usd-to-aed' },
  { from: 'USD', to: 'CAD' },
  { from: 'USD', to: 'AUD' },
  { from: 'USD', to: 'CNY' },
  { from: 'USD', to: 'BRL' },
];

export default function App() {
  // Current route pathname
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Extract currency pair from path if available
  const getPairFromPath = useCallback((pathname: string) => {
    const match = pathname.match(/^\/currency-converter\/([a-z0-9-]+)\/?$/i);
    if (match && match[1]) {
      return getCurrencyPairBySlug(match[1].toLowerCase());
    }
    return undefined;
  }, []);

  const activePairData = getPairFromPath(currentPath);

  const [fromCurrency, setFromCurrency] = useState<Currency>(() => {
    if (activePairData) {
      const match = UNIQUE_CURRENCIES.find((c) => c.code === activePairData.fromCode);
      if (match) return match;
    }
    return UNIQUE_CURRENCIES.find((c) => c.code === 'USD') || UNIQUE_CURRENCIES[0];
  });

  const [toCurrency, setToCurrency] = useState<Currency>(() => {
    if (activePairData) {
      const match = UNIQUE_CURRENCIES.find((c) => c.code === activePairData.toCode);
      if (match) return match;
    }
    return UNIQUE_CURRENCIES.find((c) => c.code === 'EUR') || UNIQUE_CURRENCIES[1];
  });

  const [baseAmount, setBaseAmount] = useState<number>(100);
  const [ratesData, setRatesData] = useState<ExchangeRatesData>(() => {
    return getInitialRates(fromCurrency.code);
  });
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);

  // Modals state
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Active sub-view tab
  const [activeTab, setActiveTab] = useState<'calculator' | 'watchlist' | 'trends' | 'fees' | 'matrix'>('calculator');

  // History & Toast
  const [history, setHistory] = useState<ConversionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('fx_conversion_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  // Fetch exchange rates
  const loadRates = useCallback(async (base: string = 'USD') => {
    setIsLoadingRates(true);
    try {
      const data = await fetchLiveRates(base);
      setRatesData(data);
    } catch (e) {
      console.error('Failed to load rates', e);
    } finally {
      setIsLoadingRates(false);
    }
  }, []);

  useEffect(() => {
    loadRates(fromCurrency.code);
  }, [fromCurrency.code, loadRates]);

  // Sync routing and metadata
  const handleNavigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setCurrentPath(path);
  }, []);

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update SEO metadata and currency selections when path changes
  useEffect(() => {
    const pair = getPairFromPath(currentPath);
    if (pair) {
      const f = UNIQUE_CURRENCIES.find((c) => c.code === pair.fromCode);
      const t = UNIQUE_CURRENCIES.find((c) => c.code === pair.toCode);
      if (f) setFromCurrency(f);
      if (t) setToCurrency(t);

      updatePageMeta({
        title: pair.title,
        description: pair.metaDescription,
        canonicalUrl: `https://currency-converter2-zipd.vercel.app${pair.path}`,
        ogTitle: pair.title,
        ogDescription: pair.metaDescription,
        ogUrl: `https://currency-converter2-zipd.vercel.app${pair.path}`,
        twitterTitle: pair.title,
        twitterDescription: pair.metaDescription,
        faqSchema: pair.faq,
      });
    } else {
      updatePageMeta(HOME_PAGE_META);
    }
  }, [currentPath, getPairFromPath]);

  const handleSwap = () => {
    const prevFrom = fromCurrency;
    const prevTo = toCurrency;
    setFromCurrency(prevTo);
    setToCurrency(prevFrom);
    showToast(`Swapped ${prevTo.code} ⇄ ${prevFrom.code}`);
  };

  const handleAddToHistory = (
    from: Currency,
    to: Currency,
    fromAmt: number,
    toAmt: number,
    rate: number
  ) => {
    const record: ConversionRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      fromCode: from.code,
      toCode: to.code,
      fromAmount: fromAmt,
      toAmount: toAmt,
      rate,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      if (
        prev[0] &&
        prev[0].fromCode === record.fromCode &&
        prev[0].toCode === record.toCode &&
        Math.abs(prev[0].fromAmount - record.fromAmount) < 0.01
      ) {
        return prev;
      }
      const updated = [record, ...prev.slice(0, 19)];
      try {
        localStorage.setItem('fx_conversion_history', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('fx_conversion_history');
    } catch {}
    showToast('Conversion history cleared');
  };

  const handleApplyHistory = (record: ConversionRecord) => {
    const foundFrom = UNIQUE_CURRENCIES.find((c) => c.code === record.fromCode);
    const foundTo = UNIQUE_CURRENCIES.find((c) => c.code === record.toCode);
    if (foundFrom && foundTo) {
      setFromCurrency(foundFrom);
      setToCurrency(foundTo);
      setBaseAmount(record.fromAmount);
      showToast(`Loaded ${record.fromCode} to ${record.toCode} conversion`);
    }
  };

  const currentRate = calculateRate(fromCurrency.code, toCurrency.code, ratesData);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        ratesData={ratesData}
        isLoading={isLoadingRates}
        onRefresh={() => loadRates(fromCurrency.code)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onNavigate={handleNavigate}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {activePairData ? (
          /* Render Currency-Specific SEO Page */
          <Suspense fallback={<div className="p-12 text-center text-sm font-semibold text-slate-400 animate-pulse">Loading currency conversion...</div>}>
            <CurrencyPairPage
              pairData={activePairData}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              ratesData={ratesData}
              isLoadingRates={isLoadingRates}
              onRefreshRates={() => loadRates(fromCurrency.code)}
              onSwapCurrencies={handleSwap}
              onOpenFromModal={() => setIsFromModalOpen(true)}
              onOpenToModal={() => setIsToModalOpen(true)}
              onShowToast={showToast}
              onAddToHistory={handleAddToHistory}
              onNavigate={handleNavigate}
              currentRate={currentRate}
            />
          </Suspense>
        ) : (
          /* Render Homepage View */
          <>
            {/* Page Title & Hero Introduction (Single Primary H1) */}
            <div className="pt-2 pb-1 space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Live Currency Converter - Global FX
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Free live currency converter to convert 170+ currencies with up-to-date exchange rates. Fast, simple and easy to use.
              </p>
            </div>

            {/* Popular Pairs Strip with Internal Links */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
              <span className="text-slate-600 font-bold shrink-0">Popular Pairs:</span>
              {POPULAR_NAV_PAIRS.map((pair) => {
                const isActive = fromCurrency.code === pair.from && toCurrency.code === pair.to;
                if (pair.path) {
                  return (
                    <a
                      key={`${pair.from}-${pair.to}`}
                      href={pair.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(pair.path!);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 rounded-xl border shrink-0 transition-all text-xs font-semibold ${
                        isActive
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {pair.from} / {pair.to}
                    </a>
                  );
                }
                return (
                  <button
                    key={`${pair.from}-${pair.to}`}
                    onClick={() => {
                      const f = UNIQUE_CURRENCIES.find((c) => c.code === pair.from);
                      const t = UNIQUE_CURRENCIES.find((c) => c.code === pair.to);
                      if (f && t) {
                        setFromCurrency(f);
                        setToCurrency(t);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl border shrink-0 transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {pair.from} / {pair.to}
                  </button>
                );
              })}
            </div>

            {/* Primary Converter Card */}
            <ConverterCard
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              onOpenFromModal={() => setIsFromModalOpen(true)}
              onOpenToModal={() => setIsToModalOpen(true)}
              onSwapCurrencies={handleSwap}
              ratesData={ratesData}
              isLoading={isLoadingRates}
              onRefresh={() => loadRates(fromCurrency.code)}
              onShowToast={showToast}
              onAddToHistory={handleAddToHistory}
            />

            {/* Feature Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-x-auto">
              <button
                id="tab-watchlist"
                onClick={() => setActiveTab('watchlist')}
                className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'watchlist'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Multi-Currency Board</span>
              </button>

              <button
                id="tab-trends"
                onClick={() => setActiveTab('trends')}
                className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'trends'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Rate Trends (Chart)</span>
              </button>

              <button
                id="tab-fees"
                onClick={() => setActiveTab('fees')}
                className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'fees'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Fee & Markup Analyzer</span>
              </button>

              <button
                id="tab-matrix"
                onClick={() => setActiveTab('matrix')}
                className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'matrix'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Table className="w-4 h-4 text-emerald-400" />
                <span>Cheat Sheet Matrix</span>
              </button>
            </div>

            {/* Active Tab View Panels */}
            <div className="transition-all">
              <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200/80 animate-pulse">Loading analysis tool...</div>}>
                {activeTab === 'watchlist' && (
                  <MultiCurrencyComparison
                    baseCurrency={fromCurrency}
                    baseAmount={baseAmount}
                    ratesData={ratesData}
                    onSelectAsTarget={(target) => {
                      setToCurrency(target);
                      showToast(`Set ${target.code} (${target.countryName}) as target`);
                    }}
                  />
                )}

                {activeTab === 'trends' && (
                  <ExchangeRateTrend
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    currentRate={currentRate}
                  />
                )}

                {activeTab === 'fees' && (
                  <TravelFeeCalculator
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    baseAmount={baseAmount}
                    currentRate={currentRate}
                  />
                )}

                {activeTab === 'matrix' && (
                  <DenominationCheatSheet
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    currentRate={currentRate}
                  />
                )}
              </Suspense>
            </div>

            {/* High-Quality Semantic SEO Content Sections on Homepage */}
            <SeoContentHome onNavigate={handleNavigate} />
          </>
        )}
      </main>

      {/* Comprehensive Footer with Internal Links */}
      <footer className="border-t border-slate-200 bg-white/80 py-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
              >
                <img
                  src="/app-icon-header.webp"
                  alt="Global FX"
                  width={20}
                  height={20}
                  loading="lazy"
                  decoding="async"
                  className="w-5 h-5 rounded-md object-cover flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <span>Global FX - Live Currency Converter</span>
              </a>
              <p className="text-slate-500 mt-1">
                Real-time currency converter covering 170+ sovereign currencies, national flags, and interbank FX feeds.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-slate-700 hover:text-emerald-700 transition-colors"
              >
                Home
              </a>
            </div>
          </div>

          {/* Dedicated Popular Currency Corridors Links */}
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Popular Exchange Corridors
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {SEO_CURRENCY_PAIRS.map((pair) => (
                <a
                  key={pair.slug}
                  href={pair.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(pair.path);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors font-medium"
                >
                  {pair.fromCode} to {pair.toCode} ({pair.fromName} to {pair.toName})
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} Global FX. All rights reserved. Free live currency exchange references.</p>
            <p className="font-mono">Mid-market interbank exchange data</p>
          </div>
        </div>
      </footer>

      {/* Currency Picker Modal for FROM */}
      {isFromModalOpen && (
        <Suspense fallback={null}>
          <CurrencySelectorModal
            isOpen={isFromModalOpen}
            onClose={() => setIsFromModalOpen(false)}
            selectedCode={fromCurrency.code}
            onSelect={(selected) => {
              setFromCurrency(selected);
              showToast(`Selected ${selected.code} (${selected.countryName}) as base`);
            }}
            title="Select Base Currency (From)"
          />
        </Suspense>
      )}

      {/* Currency Picker Modal for TO */}
      {isToModalOpen && (
        <Suspense fallback={null}>
          <CurrencySelectorModal
            isOpen={isToModalOpen}
            onClose={() => setIsToModalOpen(false)}
            selectedCode={toCurrency.code}
            onSelect={(selected) => {
              setToCurrency(selected);
              showToast(`Selected ${selected.code} (${selected.countryName}) as target`);
            }}
            title="Select Target Currency (To)"
          />
        </Suspense>
      )}

      {/* Conversion History Drawer */}
      {isHistoryOpen && (
        <Suspense fallback={null}>
          <ConversionHistoryDrawer
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            history={history}
            onClearHistory={handleClearHistory}
            onApplyHistory={handleApplyHistory}
          />
        </Suspense>
      )}

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
