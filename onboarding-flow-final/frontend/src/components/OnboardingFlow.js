import React, { useState, useEffect } from 'react';
import { userAPI, configAPI } from '../services/api';
import StepIndicator from './StepIndicator';
import OnboardingStep from './OnboardingStep';
import SuccessPage from './SuccessPage'; // Added import for SuccessPage

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [configuration, setConfiguration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // Added state for success page

  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    try {
      const response = await configAPI.getConfiguration();
      setConfiguration(response.data);
    } catch (err) {
      console.error('Failed to load configuration:', err);
      // Fallback to default configuration if backend is not available
      setConfiguration({
        page2_components: ['about_me', 'birthdate'],
        page3_components: ['address']
      });
    }
  };

  const handleStep1Submit = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      // Check if user already exists
      try {
        const existingUser = await userAPI.getUser(formData.email);
        if (existingUser.data) {
          setUser(existingUser.data);
          setCurrentStep(existingUser.data.currentStep || 2);
        }
      } catch (err) {
        // User doesn't exist, create new one
        const newUser = await userAPI.register(formData);
        setUser(newUser.data);
        setCurrentStep(2);
      }
    } catch (err) {
      console.error('Backend not available, using local state:', err);
      // Fallback: create user object locally if backend is not available
      const newUser = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        currentStep: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUser(newUser);
      
      // Save to localStorage for data table
      const existingUsers = JSON.parse(localStorage.getItem('onboardingUsers') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('onboardingUsers', JSON.stringify(existingUsers));
      
      setCurrentStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleStepSubmit = async (stepData) => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const updateData = {
        ...stepData,
        currentStep: currentStep + 1
      };

      const updatedUser = await userAPI.updateUser(user.email, updateData);
      setUser(updatedUser.data);
      
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Onboarding complete - show success page
        setShowSuccess(true);
      }
    } catch (err) {
      console.error('Backend not available, using local state:', err);
      // Fallback: update user object locally and save to localStorage
      const updatedUser = {
        ...user,
        ...stepData,
        currentStep: currentStep + 1,
        id: user.id || Date.now(), // Generate ID if not present
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUser(updatedUser);
      
      // Save to localStorage for data table
      const existingUsers = JSON.parse(localStorage.getItem('onboardingUsers') || '[]');
      const userIndex = existingUsers.findIndex(u => u.email === user.email);
      
      if (userIndex >= 0) {
        existingUsers[userIndex] = updatedUser;
      } else {
        existingUsers.push(updatedUser);
      }
      
      localStorage.setItem('onboardingUsers', JSON.stringify(existingUsers));
      
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Onboarding complete - show success page
        setShowSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get components for current step based on admin configuration
  const getComponentsForCurrentStep = () => {
    if (!configuration) return [];
    
    if (currentStep === 2) {
      return configuration.page2Components || configuration.page2_components || [];
    } else if (currentStep === 3) {
      return configuration.page3Components || configuration.page3_components || [];
    }
    return [];
  };

  const resetOnboarding = () => {
    setCurrentStep(1);
    setUser(null);
    setShowSuccess(false);
    setError('');
  };

  // Show success page if onboarding is complete
  if (showSuccess) {
    return <SuccessPage user={user} onReset={resetOnboarding} />;
  }

  return (
    <div className="container">
      <div className="card floating">
        <h1 className="page-title">✨ User Onboarding</h1>
        
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        
        {error && <div className="error">{error}</div>}
        
        {currentStep === 1 ? (
          <OnboardingStep
            step={1}
            components={['email', 'password']}
            onSubmit={handleStep1Submit}
            loading={loading}
            user={user}
          />
        ) : (
          <OnboardingStep
            step={currentStep}
            components={getComponentsForCurrentStep()}
            onSubmit={handleStepSubmit}
            onPrevious={handlePrevious}
            loading={loading}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
