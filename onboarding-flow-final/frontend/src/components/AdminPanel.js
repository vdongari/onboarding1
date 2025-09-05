import React, { useState, useEffect } from 'react';
import { configAPI } from '../services/api';

const AdminPanel = () => {
  const [configuration, setConfiguration] = useState({
    page2Components: [],
    page3Components: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const availableComponents = [
    { id: 'about_me', label: 'About Me' },
    { id: 'address', label: 'Address' },
    { id: 'birthdate', label: 'Birthdate' }
  ];

  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    try {
      const response = await configAPI.getConfiguration();
      const data = response.data;
      // Handle both camelCase and snake_case formats
      setConfiguration({
        page2Components: data.page2Components || data.page2_components || [],
        page3Components: data.page3Components || data.page3_components || []
      });
    } catch (err) {
      console.error('Failed to load configuration:', err);
      setMessage('Failed to load configuration');
    }
  };

  const handleComponentToggle = (pageNumber, componentId) => {
    const pageKey = `page${pageNumber}Components`;
    const currentComponents = configuration[pageKey] || [];
    
    let newComponents;
    if (currentComponents.includes(componentId)) {
      // Remove component
      newComponents = currentComponents.filter(id => id !== componentId);
    } else {
      // Add component
      newComponents = [...currentComponents, componentId];
    }
    
    setConfiguration(prev => ({
      ...prev,
      [pageKey]: newComponents
    }));
  };

  const handleSave = async () => {
    // Validate that each page has at least one component
    if (configuration.page2Components.length === 0) {
      setMessage('Page 2 must have at least one component');
      return;
    }
    
    if (configuration.page3Components.length === 0) {
      setMessage('Page 3 must have at least one component');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await configAPI.updateConfiguration(configuration);
      setMessage('Configuration saved successfully!');
    } catch (err) {
      setMessage('Failed to save configuration');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderComponentSelector = (pageNumber) => {
    const pageKey = `page${pageNumber}Components`;
    const selectedComponents = configuration[pageKey] || [];

    return (
      <div className="admin-section">
        <h3>Page {pageNumber} Components</h3>
        <p>Select which components should appear on page {pageNumber}:</p>
        
        <div className="component-list">
          {availableComponents.map(component => (
            <div
              key={component.id}
              className={`component-item ${selectedComponents.includes(component.id) ? 'selected' : ''}`}
              onClick={() => handleComponentToggle(pageNumber, component.id)}
            >
              {component.label}
            </div>
          ))}
        </div>
        
        <p><strong>Selected:</strong> {selectedComponents.length} component(s)</p>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="card floating">
        <h1 className="page-title">⚙️ Admin Panel</h1>
        <p className="section-title">Configure which components appear on each page of the onboarding flow.</p>
        
        {message && (
          <div className={message.includes('successfully') ? 'success' : 'error'}>
            {message}
          </div>
        )}
        
        {renderComponentSelector(2)}
        {renderComponentSelector(3)}
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button
            className="btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span> Saving...
              </>
            ) : (
              '💾 Save Configuration'
            )}
          </button>
        </div>
        
        <div className="admin-section" style={{ marginTop: '40px' }}>
          <h3 className="section-title">📋 Current Configuration Preview</h3>
          <p><strong>Page 2:</strong> {configuration.page2Components.join(', ') || 'None'}</p>
          <p><strong>Page 3:</strong> {configuration.page3Components.join(', ') || 'None'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
