/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kleindigitalsolutions.de', // <-- Hier deine Domain eintragen!
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin',
    '/login',
    '/signup',
    '/demos/*',
    '/leistungen/website/fitness-crm/intervention',
  ],
};
