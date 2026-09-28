export interface PageMetaOptions {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  faqSchema?: { question: string; answer: string }[];
}

export function updatePageMeta(options: PageMetaOptions) {
  // Update Title
  document.title = options.title;

  // Helper to set or create meta tag
  const setMeta = (selector: string, attr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Meta description
  setMeta('meta[name="description"]', 'name', 'description', options.description);

  // Robots
  setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');

  // Open Graph
  setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMeta('meta[property="og:title"]', 'property', 'og:title', options.ogTitle || options.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', options.ogDescription || options.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', options.ogUrl || options.canonicalUrl);
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Currency Converter');
  setMeta('meta[name="application-name"]', 'name', 'application-name', 'Currency Converter');
  setMeta('meta[name="apple-mobile-web-app-title"]', 'name', 'apple-mobile-web-app-title', 'Currency Converter');

  // Twitter
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', options.twitterTitle || options.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', options.twitterDescription || options.description);

  // Canonical Link
  let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', options.canonicalUrl);

  // Update JSON-LD schema for FAQ (matches id="faq-schema" in index.html, preventing duplicates)
  let faqScript = document.getElementById('faq-schema') as HTMLScriptElement | null;
  if (options.faqSchema && options.faqSchema.length > 0) {
    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: options.faqSchema.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.id = 'faq-schema';
      faqScript.type = 'application/ld+json';
      document.head.appendChild(faqScript);
    }
    faqScript.textContent = JSON.stringify(faqData, null, 2);
  } else if (faqScript) {
    faqScript.remove();
  }
}

export const HOME_PAGE_FAQS = [
  {
    question: 'What is a currency converter?',
    answer:
      'A currency converter is a financial tool that calculates the equivalent value of one currency in terms of another based on current foreign exchange (FX) market rates.',
  },
  {
    question: 'How many currencies does Global FX support?',
    answer:
      'Global FX supports over 170 sovereign world currencies, including USD, EUR, GBP, JPY, INR, CAD, AUD, AED, and more, complete with national flag indicators.',
  },
  {
    question: 'Can I convert USD to INR?',
    answer:
      'Yes, you can convert US Dollars (USD) to Indian Rupees (INR) instantly using the latest live interbank exchange rates with no hidden calculation markups.',
  },
  {
    question: 'Can I convert EUR to USD?',
    answer:
      'Yes, Global FX offers real-time Euro (EUR) to US Dollar (USD) conversions alongside reverse calculations and trend analysis.',
  },
  {
    question: 'Is Global FX free to use?',
    answer:
      'Yes, Global FX is 100% free to use with unlimited currency conversions, real-time rates, and no sign-up or subscription required.',
  },
];

export const HOME_PAGE_META: PageMetaOptions = {
  title: 'Live Currency Converter – Convert 170+ Currencies',
  description: 'Free live currency converter to convert 170+ currencies with up-to-date exchange rates. Fast, simple and easy to use.',
  canonicalUrl: 'https://currency-converter2-zipd.vercel.app/',
  ogTitle: 'Live Currency Converter – Convert 170+ Currencies',
  ogDescription: 'Free live currency converter supporting 170+ currencies with easy and fast currency conversion.',
  ogUrl: 'https://currency-converter2-zipd.vercel.app/',
  twitterTitle: 'Live Currency Converter – Convert 170+ Currencies',
  twitterDescription: 'Free live currency converter supporting 170+ currencies with easy and fast currency conversion.',
  faqSchema: HOME_PAGE_FAQS,
};
