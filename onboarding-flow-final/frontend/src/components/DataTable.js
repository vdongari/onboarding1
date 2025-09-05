import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Backend not available, loading from localStorage:', err);
      // Fallback: load from localStorage
      const localUsers = JSON.parse(localStorage.getItem('onboardingUsers') || '[]');
      setUsers(localUsers);
      setError('Backend not available - showing local data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getCurrentStepText = (step) => {
    switch (step) {
      case 1:
        return 'Account Creation';
      case 2:
        return 'Additional Information';
      case 3:
        return 'Profile Completion';
      default:
        return `Step ${step}`;
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h1>User Data</h1>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card floating">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 className="page-title">📊 User Data</h1>
          <button className="btn" onClick={loadUsers}>
            🔄 Refresh Data
          </button>
        </div>
        
        {error && <div className="error">{error}</div>}
        
        {users.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>No user data available. Start the onboarding process to see data here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Current Step</th>
                  <th>About Me</th>
                  <th>Street Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>ZIP</th>
                  <th>Birthdate</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{getCurrentStepText(user.currentStep)}</td>
                    <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
                      {user.aboutMe || 'N/A'}
                    </td>
                    <td>{user.streetAddress || 'N/A'}</td>
                    <td>{user.city || 'N/A'}</td>
                    <td>{user.state || 'N/A'}</td>
                    <td>{user.zip || 'N/A'}</td>
                    <td>{user.birthdate || 'N/A'}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>{formatDate(user.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="admin-section" style={{ marginTop: '40px' }}>
          <h3 className="section-title">📈 Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>{users.length}</div>
              <div>Total Users</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>{users.filter(u => u.currentStep === 1).length}</div>
              <div>Step 1</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>{users.filter(u => u.currentStep === 2).length}</div>
              <div>Step 2</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(220, 53, 69, 0.1)', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>{users.filter(u => u.currentStep === 3).length}</div>
              <div>Step 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
