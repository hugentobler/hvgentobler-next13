export const generateJsonLd = (
  dateModified: string,
  datePublished: string,
  description: string,
  title: string,
  path: string
) => (
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": `https://hvgentobler.com/og/${title}`,
    "url": `https://hvgentobler.com/${path}`,
    "datePublished": new Date(datePublished),
    "dateCreated": new Date(datePublished),
    "dateModified": new Date(dateModified),
    "description": description,
    "inLanguage": "en",
    "publisher": {
      "@type": "Person",
      "name": "Christopher Hugentobler",
      "url": "https://hvgentobler.com/"
    },
    "author": {
      "@type": "Person",
      "name": "Christopher Hugentobler",
      "url": "https://hvgentobler.com/"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://hvgentobler.com"
    }
  }
)
