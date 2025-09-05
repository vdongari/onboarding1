import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OnboardingFlow from './components/OnboardingFlow';
import AdminPanel from './components/AdminPanel';
import DataTable from './components/DataTable';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <div className="nav-content">
              <Link to="/" className="nav-brand">
                Onboarding Flow
              </Link>
              <div className="nav-links">
                <Link to="/" className="nav-link">Onboarding</Link>
                <Link to="/admin" className="nav-link">Admin</Link>
                <Link to="/data" className="nav-link">Data</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <div className="fade-in-up">
            <Routes>
              <Route path="/" element={<OnboardingFlow />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/data" element={<DataTable />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
