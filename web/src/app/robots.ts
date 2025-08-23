import { MetadataRoute } from 'next'

/**
 * Robots.txt Generation
 * 
 * This file generates a robots.txt file that provides crawling instructions
 * to search engine bots for the MeridianSolutions website.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: 'https://meridiansolutions.com/sitemap.xml',
  }
}



