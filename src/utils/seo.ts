import { SITE_URL, COMPANY, IMAGES } from '../config/siteConfig';

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Updates all relevant head tags for client-side navigation.
 * Note: Under no circumstances does this touch or insert any meta keywords tag.
 */
export function updateSEO({
  title,
  description,
  path,
  image = IMAGES.hero,
  type = 'website',
  schema,
}: SEOProps) {
  // 1. Document title
  document.title = title;

  // 2. Canonical URL (without hash or trailing slash ambiguity)
  const canonicalHref = `${SITE_URL}${path === '/' ? '' : path}`;

  // Helper to get or create a tag
  const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Meta description
  setMetaTag('name', 'description', description);

  // 4. Canonical link tag
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalHref);

  // 5. Open Graph tags
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonicalHref);
  setMetaTag('property', 'og:type', type);
  setMetaTag('property', 'og:image', image);
  setMetaTag('property', 'og:locale', 'ar_EG');
  setMetaTag('property', 'og:site_name', COMPANY.name);

  // 6. Twitter Card tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', image);

  // 7. Schema.org JSON-LD Structured Data
  let scriptEl = document.getElementById('schema-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'schema-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  // Base factual schema for the business and website
  const baseSchemas: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: COMPANY.name,
      url: SITE_URL,
      inLanguage: 'ar',
      description: description,
    },
    {
      '@context': 'https://schema.org',
      '@type': ['Electrician', 'LocalBusiness'],
      '@id': `${SITE_URL}/#business`,
      name: COMPANY.name,
      url: SITE_URL,
      telephone: [COMPANY.phoneSecondaryTel, COMPANY.phonePrimaryTel],
      email: COMPANY.email,
      image: image,
      areaServed: {
        '@type': 'Country',
        name: COMPANY.countryEn,
      },
      sameAs: [
        COMPANY.facebookUrl,
        COMPANY.instagramUrl,
      ],
    },
  ];

  if (schema) {
    if (Array.isArray(schema)) {
      baseSchemas.push(...schema);
    } else {
      baseSchemas.push(schema);
    }
  }

  scriptEl.textContent = JSON.stringify(
    baseSchemas.length === 1 ? baseSchemas[0] : { '@context': 'https://schema.org', '@graph': baseSchemas },
    null,
    2
  );
}
