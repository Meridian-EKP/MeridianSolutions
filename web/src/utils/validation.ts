/**
 * Validation Utilities
 * 
 * This file contains reusable validation functions for forms and data validation.
 * These functions can be used across different components to ensure consistent validation.
 * 
 * Used by: ContactForm component and other form components
 */

/**
 * Validates an email address using a comprehensive regex pattern
 * 
 * @param email - The email address to validate
 * @returns boolean - true if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a phone number (international format)
 * Removes common formatting characters and validates against international standard
 * 
 * @param phone - The phone number to validate
 * @returns boolean - true if phone number is valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove common formatting characters for validation
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");
  // Validate against international standard (6-15 digits)
  const phoneRegex = /^[0-9]{6,15}$/;
  return phoneRegex.test(cleanPhone);
};

/**
 * Validates that a required field is not empty
 * 
 * @param value - The value to validate
 * @returns boolean - true if field has content, false otherwise
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validates honeypot field (should be empty for legitimate submissions)
 * 
 * @param honeypotValue - The honeypot field value
 * @returns boolean - true if honeypot is empty (legitimate), false if filled (likely spam)
 */
export const isValidHoneypot = (honeypotValue: string): boolean => {
  return honeypotValue.trim().length === 0;
};

/**
 * Generates validation error messages for common validation failures
 * 
 * @param fieldName - The name of the field being validated
 * @param validationType - The type of validation that failed
 * @returns string - Human-readable error message
 */
export const getValidationErrorMessage = (fieldName: string, validationType: string): string => {
  const errorMessages: { [key: string]: string } = {
    required: `${fieldName} is required`,
    email: "Please enter a valid email address",
    phone: "Please enter a valid phone number (6-15 digits)",
    honeypot: "Invalid submission detected"
  };
  
  return errorMessages[validationType] || `${fieldName} is invalid`;
};
