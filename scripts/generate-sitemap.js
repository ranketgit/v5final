// @ts-check
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xmlFormatter from 'xml-formatter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://v5agence.com';
const SITEMAP_DIR = path.join(__dirname, '..', 'public');

// Import data files
const citiesModule = await import('../src/data/cities.js');
const servicesModule = await import('../src/data/services.js');

const { cities } = citiesModule;
const { services } = servicesModule;

const MAX_URLS_PER_SITEMAP = 1000;

// Helper function to create sitemap XML
const createSitemapXML = (urls) => {
  const urlsXML = urls.map(url => `
    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>${url === SITE_URL ? '1.0' : '0.8'}</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXML}
</urlset>`;
};

// Helper function to create sitemap index XML
const createSitemapIndexXML = (sitemapFiles) => {
  const sitemapsXML = sitemapFiles.map(file => `
    <sitemap>
      <loc>${SITE_URL}/${file}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXML}
</sitemapindex>`;
};

// Generate all URLs
const generateUrls = () => {
  const urls = new Set();

  // Add static pages
  urls.add(SITE_URL);
  urls.add(`${SITE_URL}/a-propos`);
  urls.add(`${SITE_URL}/contactez-nous`);
  urls.add(`${SITE_URL}/services`);
  urls.add(`${SITE_URL}/villes`);

  // Add city pages
  cities.forEach(section => {
    section.cities.forEach(city => {
      urls.add(`${SITE_URL}/${city.slug}/marketing-digital`);
    });
  });

  // Add service pages
  services.forEach(category => {
    // Add category page
    urls.add(`${SITE_URL}/services/${category.slug}`);

    category.subcategories.forEach(subcategory => {
      // Add subcategory page
      urls.add(`${SITE_URL}/services/${subcategory.slug}`);

      subcategory.services.forEach(service => {
        // Add service page
        urls.add(`${SITE_URL}/services/${service.slug}`);
        urls.add(`${SITE_URL}/services/${category.slug}/${subcategory.slug}/${service.slug}`);

        // Add city-specific service pages
        cities.forEach(section => {
          section.cities.forEach(city => {
            urls.add(`${SITE_URL}/${city.slug}/${service.slug}`);
          });
        });
      });
    });
  });

  return Array.from(urls);
};

// Main function to generate sitemaps
const generateSitemaps = async () => {
  try {
    const urls = generateUrls();
    const sitemapFiles = [];
    
    // Create public directory if it doesn't exist
    if (!fs.existsSync(SITEMAP_DIR)) {
      fs.mkdirSync(SITEMAP_DIR, { recursive: true });
    }
    
    // Split URLs into chunks of MAX_URLS_PER_SITEMAP
    for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
      const chunk = urls.slice(i, i + MAX_URLS_PER_SITEMAP);
      const sitemapNumber = Math.floor(i / MAX_URLS_PER_SITEMAP) + 1;
      const filename = `sitemap${sitemapNumber}.xml`;
      
      // Create sitemap for this chunk
      const sitemapXML = createSitemapXML(chunk);
      const formattedXML = xmlFormatter(sitemapXML, {
        indentation: '  ',
        collapseContent: true,
      });
      
      fs.writeFileSync(path.join(SITEMAP_DIR, filename), formattedXML);
      sitemapFiles.push(filename);
    }

    // Create sitemap index
    const sitemapIndexXML = createSitemapIndexXML(sitemapFiles);
    const formattedIndexXML = xmlFormatter(sitemapIndexXML, {
      indentation: '  ',
      collapseContent: true,
    });
    
    fs.writeFileSync(path.join(SITEMAP_DIR, 'sitemap.xml'), formattedIndexXML);

    console.log(`✅ Generated ${sitemapFiles.length} sitemaps with ${urls.length} total URLs`);
    console.log('✅ Sitemap index created at sitemap.xml');
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
};

// Generate sitemaps
generateSitemaps();