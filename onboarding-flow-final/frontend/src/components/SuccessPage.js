import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = ({ user, onReset }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const generateConfetti = () => {
    const confetti = [];
    for (let i = 0; i < 50; i++) {
      confetti.push(
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      );
    }
    return confetti;
  };

  const generateSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 20; i++) {
      sparkles.push(
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        />
      );
    }
    return sparkles;
  };

  const handleStartOver = () => {
    if (onReset) {
      onReset();
    } else {
      navigate('/');
    }
  };

  const handleViewData = () => {
    navigate('/data');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="success-page">
      {showConfetti && generateConfetti()}
      {generateSparkles()}
      
      <div className="success-icon">🎉</div>
      
      <h1 className="success-title">Congratulations!</h1>
      <p className="success-subtitle">
        You've successfully completed the onboarding process!
      </p>
      
      <div className="success-card">
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Welcome aboard! 🚀
        </h2>
        
        <div className="success-stats">
          <div className="stat-item">
            <div className="stat-number">✅</div>
            <div className="stat-label">Onboarding Complete</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{user?.email ? '👤' : '🎯'}</div>
            <div className="stat-label">Profile Created</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3/3</div>
            <div className="stat-label">Steps Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>

        {user && (
          <div style={{ 
            margin: '30px 0', 
            padding: '20px', 
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '15px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <h3 style={{ 
              color: '#333', 
              marginBottom: '15px',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              📋 Your Profile Summary
            </h3>
            <div style={{ textAlign: 'left', color: '#666' }}>
              <p><strong>Email:</strong> {user.email}</p>
              {user.aboutMe && <p><strong>About You:</strong> {user.aboutMe}</p>}
              {user.birthdate && <p><strong>Birthdate:</strong> {user.birthdate}</p>}
              {user.streetAddress && (
                <p><strong>Address:</strong> {user.streetAddress}, {user.city}, {user.state} {user.zip}</p>
              )}
              <p><strong>Joined:</strong> {formatDate(user.createdAt)}</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px' }}>
          <button 
            className="celebration-button"
            onClick={handleStartOver}
          >
            🔄 Start New Onboarding
          </button>
          <button 
            className="celebration-button"
            onClick={handleViewData}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}
          >
            📊 View All Data
          </button>
        </div>

        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: 'rgba(40, 167, 69, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(40, 167, 69, 0.2)'
        }}>
          <h4 style={{ 
            color: '#28a745', 
            marginBottom: '10px',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            🎯 What's Next?
          </h4>
          <p style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
            Your profile is now complete and ready to use! You can start exploring all the features 
            available to you, or begin a new onboarding process if needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
