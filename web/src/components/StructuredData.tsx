export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://meridiansolutions.com",
"name": "MeridianSolutions",
    "alternateName": "Meridian Digital",
    "description": "Digital marketing agency specialising in local business growth through conversion-driven websites, local SEO, and data-powered marketing systems.",
    "url": "https://meridiansolutions.com",
    "telephone": "+1-234-567-8900",
    "email": "hello@meridiansolutions.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Business Centre Dr",
      "addressLocality": "Your City",
      "addressRegion": "Your State",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128",
      "longitude": "-74.0060"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "40.7128",
        "longitude": "-74.0060"
      },
      "geoRadius": "50000"
    },
    "priceRange": "$$",
    "image": [
      "https://meridiansolutions.com/og.png"
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://meridiansolutions.com/logo.png",
      "width": "200",
      "height": "60"
    },
    "sameAs": [
      "https://www.facebook.com/meridiansolutions",
"https://www.linkedin.com/company/meridiansolutions",
"https://twitter.com/meridiansolutions",
"https://www.instagram.com/meridiansolutions"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development",
            "description": "Custom, conversion-optimised websites for local businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO",
            "description": "Search engine optimisation for local business visibility"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Profile Optimisation",
            "description": "Complete optimisation of Business Profile for local search"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Management",
            "description": "Strategic social media management for local businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing Consulting",
            "description": "Growth strategy and digital marketing consulting"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Campaigns",
            "description": "High-ROI marketing campaigns and advertising management"
          }
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Mitchell"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "MeridianSolutions completely transformed our business. We went from 5-10 customers per day to being fully booked weeks in advance."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Dr. James Chen"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "The website they built for our medical practice is incredible. We're getting 4x more appointment bookings than before."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
