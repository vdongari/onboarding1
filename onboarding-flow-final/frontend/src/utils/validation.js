// Validation utilities for the onboarding form
// TODO: Add more validation rules later

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateZipCode = (zip) => {
  // Must be exactly 5 digits
  const zipRegex = /^\d{5}$/;
  return zipRegex.test(zip);
};

export const validateBirthdate = (birthdate) => {
  if (!birthdate) return false;
  
  const selectedDate = new Date(birthdate);
  const today = new Date();
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  
  // Birthdate must be in the past
  return selectedDate < today;
};

export const validatePassword = (password) => {
  // At least 6 characters - TODO: Add more complexity requirements
  return password && password.length >= 6;
};

export const getValidationMessage = (field, value) => {
  switch (field) {
    case 'email':
      if (!value) return 'Email is required';
      if (!validateEmail(value)) return 'Please enter a valid email address';
      return null;
    
    case 'password':
      if (!value) return 'Password is required';
      if (!validatePassword(value)) return 'Password must be at least 6 characters';
      return null;
    
    case 'zip':
      if (!value) return 'ZIP code is required';
      if (!validateZipCode(value)) return 'ZIP code must be exactly 5 digits';
      return null;
    
    case 'birthdate':
      if (!value) return 'Birthdate is required';
      if (!validateBirthdate(value)) return 'Birthdate must be in the past';
      return null;
    
    default:
      return null;
  }
};

/**
 * Validate form data against required fields
 * @param {Object} formData - The form data to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} Validation result with isValid flag and errors object
 */
export const validateFormData = (formData, requiredFields = []) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    const error = getValidationMessage(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
