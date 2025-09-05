import React from 'react';

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        let stepClass = 'step';
        
        if (stepNumber < currentStep) {
          stepClass += ' completed';
        } else if (stepNumber === currentStep) {
          stepClass += ' active';
        } else {
          stepClass += ' inactive';
        }
        
        return (
          <div key={stepNumber} className={stepClass}>
            {stepNumber < currentStep ? '✓' : stepNumber}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
