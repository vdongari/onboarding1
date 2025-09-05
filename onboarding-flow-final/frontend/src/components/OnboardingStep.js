import React, { useState, useEffect, useMemo, memo } from 'react';
import { validateFormData, getValidationMessage } from '../utils/validation';

const OnboardingStep = ({ step, components, onSubmit, onPrevious, loading, user }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        password: user.password || '',
        aboutMe: user.aboutMe || '',
        streetAddress: user.streetAddress || '',
        city: user.city || '',
        state: user.state || '',
        zip: user.zip || '',
        birthdate: user.birthdate || ''
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    const requiredFields = [];
    components.forEach(component => {
      if (component === 'email') requiredFields.push('email');
      if (component === 'password') requiredFields.push('password');
      if (component === 'about_me') requiredFields.push('aboutMe');
      if (component === 'address') {
        requiredFields.push('streetAddress', 'city', 'state', 'zip');
      }
      if (component === 'birthdate') requiredFields.push('birthdate');
    });
    
    const validation = validateFormData(formData, requiredFields);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    // Filter out empty fields and password for non-step-1 submissions
    const submitData = { ...formData };
    if (step > 1) {
      delete submitData.password;
    }
    
    // Only include fields that are in the current step's components
    const filteredData = {};
    components.forEach(component => {
      if (component === 'email' && submitData.email) {
        filteredData.email = submitData.email;
      } else if (component === 'password' && submitData.password) {
        filteredData.password = submitData.password;
      } else if (component === 'about_me' && submitData.aboutMe) {
        filteredData.aboutMe = submitData.aboutMe;
      } else if (component === 'address') {
        if (submitData.streetAddress) filteredData.streetAddress = submitData.streetAddress;
        if (submitData.city) filteredData.city = submitData.city;
        if (submitData.state) filteredData.state = submitData.state;
        if (submitData.zip) filteredData.zip = submitData.zip;
      } else if (component === 'birthdate' && submitData.birthdate) {
        filteredData.birthdate = submitData.birthdate;
      }
    });
    
    onSubmit(filteredData);
  };

  const renderComponent = (component) => {
    switch (component) {
      case 'email':
        return (
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              disabled={step > 1}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
        );
      
      case 'password':
        return (
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={formData.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
        );
      
      case 'about_me':
        return (
          <div className="form-group">
            <label className="form-label">About Me</label>
            <textarea
              className="form-textarea"
              value={formData.aboutMe || ''}
              onChange={(e) => handleInputChange('aboutMe', e.target.value)}
              placeholder="Tell us about yourself..."
              required
            />
          </div>
        );
      
      case 'address':
        return (
          <div className="form-group">
            <label className="form-label">Address Information</label>
            <input
              type="text"
              className={`form-input ${errors.streetAddress ? 'error' : ''}`}
              value={formData.streetAddress || ''}
              onChange={(e) => handleInputChange('streetAddress', e.target.value)}
              placeholder="Street Address"
              required
            />
            {errors.streetAddress && <div className="error">{errors.streetAddress}</div>}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <input
                type="text"
                className={`form-input ${errors.city ? 'error' : ''}`}
                value={formData.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="City"
                required
                style={{ flex: 1 }}
              />
              <input
                type="text"
                className={`form-input ${errors.state ? 'error' : ''}`}
                value={formData.state || ''}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="State"
                required
                style={{ flex: 1 }}
              />
              <input
                type="text"
                className={`form-input ${errors.zip ? 'error' : ''}`}
                value={formData.zip || ''}
                onChange={(e) => handleInputChange('zip', e.target.value)}
                placeholder="ZIP Code (5 digits)"
                required
                style={{ flex: 1 }}
                maxLength="5"
                pattern="[0-9]{5}"
              />
            </div>
            {(errors.city || errors.state || errors.zip) && (
              <div className="error">
                {errors.city || errors.state || errors.zip}
              </div>
            )}
          </div>
        );
      
      case 'birthdate':
        return (
          <div className="form-group">
            <label className="form-label">Birthdate</label>
            <input
              type="date"
              className={`form-input ${errors.birthdate ? 'error' : ''}`}
              value={formData.birthdate || ''}
              onChange={(e) => handleInputChange('birthdate', e.target.value)}
              required
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
            />
            {errors.birthdate && <div className="error">{errors.birthdate}</div>}
          </div>
        );
      
      default:
        return null;
    }
  };

  const stepTitle = useMemo(() => {
    switch (step) {
      case 1:
        return 'Create Your Account';
      case 2:
        return 'Additional Information';
      case 3:
        return 'Complete Your Profile';
      default:
        return `Step ${step}`;
    }
  }, [step]);

  return (
    <div>
      <h2>{stepTitle}</h2>
      <p>Step {step} of 3</p>
      
      <form onSubmit={handleSubmit}>
        {components.map((component, index) => (
          <div key={index}>
            {renderComponent(component)}
          </div>
        ))}
        
        <div className="navigation">
          {step > 1 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onPrevious}
              disabled={loading}
            >
              Previous
            </button>
          )}
          
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ marginLeft: step === 1 ? 'auto' : '0' }}
          >
            {loading ? 'Saving...' : (step === 3 ? 'Complete' : 'Next')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(OnboardingStep);
