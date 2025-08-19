"use client";

/**
 * Contact Form Component
 * 
 * A comprehensive contact form for the "Free Digital Health Check" feature.
 * Includes form validation, spam prevention (honeypot), international phone support,
 * and submission handling with user feedback.
 * 
 * Features:
 * - Client-side validation with real-time error display
 * - International phone number support with country code selection
 * - Honeypot field for basic spam prevention
 * - Loading states and success/error feedback
 * - Responsive design with glassmorphism styling
 * - Accessibility features (ARIA labels, keyboard navigation)
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  businessName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  message: string;
  honeypot: string; // Hidden field for spam prevention
}

interface FormErrors {
  [key: string]: string;
}

// Common country codes
const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+46", country: "SE", flag: "🇸🇪" },
  { code: "+47", country: "NO", flag: "🇳🇴" },
  { code: "+45", country: "DK", flag: "🇩🇰" },
  { code: "+41", country: "CH", flag: "🇨🇭" },
  { code: "+43", country: "AT", flag: "🇦🇹" },
  { code: "+32", country: "BE", flag: "🇧🇪" },
  { code: "+353", country: "IE", flag: "🇮🇪" },
  { code: "+351", country: "PT", flag: "🇵🇹" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+971", country: "AE", flag: "🇦🇪" }
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    businessName: "",
    email: "",
    phoneCountry: "+1", // Default to US
    phone: "",
    message: "",
    honeypot: "", // Hidden honeypot field
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Validates the form data and sets error messages
   * 
   * Performs comprehensive validation including:
   * - Required field checks
   * - Email format validation using regex
   * - Phone number validation (international format, 6-15 digits)
   * - Honeypot field validation (should be empty)
   * 
   * @returns boolean - true if form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    // Email validation with regex pattern
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation (international format)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      // Remove common formatting characters for validation
      const cleanPhone = formData.phone.replace(/[\s\-\(\)\.]/g, "");
      // Validate against international standard (6-15 digits)
      if (!/^[0-9]{6,15}$/.test(cleanPhone)) {
        newErrors.phone = "Please enter a valid phone number (6-15 digits)";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your business goals";
    }

    // Honeypot validation - if this field is filled, it's likely spam
    if (formData.honeypot.trim()) {
      // Silently fail for spam prevention
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: "",
          businessName: "",
          email: "",
          phoneCountry: "+1",
          phone: "",
          message: "",
          honeypot: "",
        });
      } else {
        // Handle validation errors from server
        if (data.errors && Array.isArray(data.errors)) {
          setErrors({ submit: data.errors.join(', ') });
        } else {
          setErrors({ submit: data.error || "Something went wrong. Please try again." });
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Unable to send your request. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="mb-6">
          <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted text-lg max-w-md mx-auto">
            Your request has been received. We'll be in touch shortly to discuss your digital health check and growth strategy.
          </p>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-accent hover:text-accent/80 transition-colors"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold mb-3">Get Your Free Digital Health Check</h3>
        <p className="text-muted">
          Tell us about your business and we'll create a custom growth strategy for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field for spam prevention - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 hover:bg-white/8 ${
                errors.name ? "border-red-500/50" : "border-white/10 focus:border-accent/30"
              }`}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)'
              }}
              placeholder="John Smith"
            />
            {errors.name && (
              <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                <AlertCircle className="size-4" />
                {errors.name}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="businessName" className="block text-sm font-medium mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 hover:bg-white/8 ${
                errors.businessName ? "border-red-500/50" : "border-white/10 focus:border-accent/30"
              }`}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)'
              }}
              placeholder="Your Business Name"
            />
            {errors.businessName && (
              <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                <AlertCircle className="size-4" />
                {errors.businessName}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 hover:bg-white/8 ${
                errors.email ? "border-red-500/50" : "border-white/10 focus:border-accent/30"
              }`}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)'
              }}
              placeholder="john@yourbusiness.com"
            />
            {errors.email && (
              <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                <AlertCircle className="size-4" />
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number *
            </label>
            <div className="flex gap-3">
              <select
                name="phoneCountry"
                value={formData.phoneCountry}
                onChange={handleChange}
                className={`phone-country-select px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 hover:bg-white/8 ${
                  errors.phone ? "border-red-500/50" : "border-white/10 focus:border-accent/30"
                }`}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  minWidth: '120px'
                }}
              >
                {countryCodes.map((country) => (
                  <option 
                    key={country.code} 
                    value={country.code}
                  >
                    {country.flag} {country.code} {country.country}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`flex-1 px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 hover:bg-white/8 ${
                  errors.phone ? "border-red-500/50" : "border-white/10 focus:border-accent/30"
                }`}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)'
                }}
                placeholder="123 456 7890"
              />
            </div>
            {errors.phone && (
              <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                <AlertCircle className="size-4" />
                {errors.phone}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Tell us about your business goals *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 hover:bg-white/8 resize-none ${
              errors.message ? "border-red-500/50" : "border-white/10 focus:border-accent/30"
            }`}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)'
            }}
            placeholder="What are your main business challenges? What growth goals do you have? Any specific areas you'd like us to focus on?"
          />
          {errors.message && (
            <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
              <AlertCircle className="size-4" />
              {errors.message}
            </div>
          )}
        </div>

        {errors.submit && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertCircle className="size-5" />
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full btn-primary glow-ring rounded-xl py-4 px-6 font-medium transition-all duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                Sending...
              </>
            ) : (
              <>
                Get My Free Digital Health Check
                <ArrowRight className="size-5" />
              </>
            )}
          </span>
        </button>

        <p className="text-center text-sm text-muted">
          We respect your privacy. Your information will never be shared or sold.
        </p>
      </form>
    </motion.div>
  );
}


