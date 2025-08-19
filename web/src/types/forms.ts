/**
 * Form Types
 * 
 * This file contains TypeScript interfaces for form-related data structures
 * used throughout the application.
 * 
 * Used by: ContactForm component and other form-related components
 */

/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  message: string;
  honeypot: string; // Hidden field for spam prevention
}

/**
 * Form validation errors structure
 */
export interface FormErrors {
  [key: string]: string;
}

/**
 * Service card data structure
 */
export interface ServiceCard {
  id: number;
  title: string;
  desc: string;
  fullDesc: string;
  detailedDesc: string;
  pricing: string;
  benefits: string[];
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Cycle card data structure for the "Why Meridian?" section
 */
export interface CycleCard {
  id: number;
  title: string;
  subtitle: string;
  detailedTitle: string;
  detailedContent: string;
}

/**
 * Case study data structure
 */
export interface CaseStudy {
  title: string;
  industry: string;
  result: string;
  description: string;
  metrics: string[];
}
