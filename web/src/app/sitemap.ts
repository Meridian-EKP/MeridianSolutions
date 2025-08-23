import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap Generation
 * 
 * This file generates a sitemap.xml for the MeridianSolutions website,
 * helping search engines discover and index all pages efficiently.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://meridiansolutions.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}



