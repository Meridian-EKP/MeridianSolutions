"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your business goals";
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

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
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
            We've received your request and will be in touch within 24 hours with your custom digital health check.
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
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.name ? "border-red-500" : "border-white/10 focus:border-accent/30"
              }`}
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
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.businessName ? "border-red-500" : "border-white/10 focus:border-accent/30"
              }`}
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
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.email ? "border-red-500" : "border-white/10 focus:border-accent/30"
              }`}
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
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                errors.phone ? "border-red-500" : "border-white/10 focus:border-accent/30"
              }`}
              placeholder="(555) 123-4567"
            />
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
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none ${
              errors.message ? "border-red-500" : "border-white/10 focus:border-accent/30"
            }`}
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
