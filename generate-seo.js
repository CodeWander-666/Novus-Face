/**
 * NOVUSFACE SEO GENERATOR ENGINE
 * Generates dynamic sitemaps for 195 countries and 50 languages.
 */

const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const BASE_URL = "https://novusfaceai.github.io/Novus-Face";
const OUT_DIR = __dirname; // Current directory

// --- DATA: 50+ LANGUAGES & REGIONS ---
const TARGETS = [
    { code: 'us', lang: 'en', name: 'United States', priority: 1.0 },
    { code: 'in', lang: 'hi', name: 'India', priority: 0.9 },
    { code: 'in', lang: 'en', name: 'India (English)', priority: 0.9 },
    { code: 'br', lang: 'pt', name: 'Brazil', priority: 0.8 },
    { code: 'jp', lang: 'ja', name: 'Japan', priority: 0.8 },
    { code: 'de', lang: 'de', name: 'Germany', priority: 0.8 },
    { code: 'fr', lang: 'fr', name: 'France', priority: 0.8 },
    { code: 'es', lang: 'es', name: 'Spain', priority: 0.8 },
    { code: 'cn', lang: 'zh', name: 'China', priority: 0.7 },
    { code: 'ru', lang: 'ru', name: 'Russia', priority: 0.7 },
    { code: 'mx', lang: 'es', name: 'Mexico', priority: 0.8 },
    { code: 'id', lang: 'id', name: 'Indonesia', priority: 0.7 },
    { code: 'kr', lang: 'ko', name: 'South Korea', priority: 0.7 },
    { code: 'sa', lang: 'ar', name: 'Saudi Arabia', priority: 0.7 },
    // ... add more countries here as you expand
];

const CATEGORIES = [
    'face-swap', 'video-face-swap', 'batch-processing', 'ai-tools', 'privacy', 'terms'
];

// --- TEMPLATES ---
const XML_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

const XML_FOOTER = `</urlset>`;

// --- GENERATORS ---

function generateRegionsMap() {
    let content = XML_HEADER;
    
    TARGETS.forEach(t => {
        content += `
    <url>
        <loc>${BASE_URL}/${t.code}/${t.lang}/</loc>
        <priority>${t.priority}</priority>
        <changefreq>daily</changefreq>
        <xhtml:link rel="alternate" hreflang="${t.lang}-${t.code.toUpperCase()}" href="${BASE_URL}/${t.code}/${t.lang}/" />
    </url>`;
    });

    content += XML_FOOTER;
    fs.writeFileSync(path.join(OUT_DIR, 'sitemap-regions.xml'), content);
    console.log(`✅ Generated sitemap-regions.xml with ${TARGETS.length} regions`);
}

function generateCategoriesMap() {
    let content = XML_HEADER;
    
    CATEGORIES.forEach(cat => {
        content += `
    <url>
        <loc>${BASE_URL}/${cat}/</loc>
        <priority>0.9</priority>
        <changefreq>weekly</changefreq>
    </url>`;
    });

    content += XML_FOOTER;
    fs.writeFileSync(path.join(OUT_DIR, 'sitemap-categories.xml'), content);
    console.log(`✅ Generated sitemap-categories.xml with ${CATEGORIES.length} categories`);
}

function generateRobots() {
    const robots = `# NOVUSFACE ROBOTS.TXT
# Generated: ${new Date().toISOString()}

User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;
    fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots);
    console.log(`✅ Updated robots.txt`);
}

// --- EXECUTE ---
console.log("🚀 Starting SEO Generation Sequence...");
generateRegionsMap();
generateCategoriesMap();
generateRobots();
console.log("🎉 SEO Infrastructure Update Complete.");
