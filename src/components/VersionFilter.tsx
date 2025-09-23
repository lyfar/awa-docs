import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

const VersionFilter: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState('0.1');
  const location = useLocation();

  useEffect(() => {
    // Extract version from URL or localStorage
    const savedVersion = localStorage.getItem('awa-docs-version') || '0.1';
    setCurrentVersion(savedVersion);
    
    // Apply version filtering to sidebar
    applyVersionFilter(savedVersion);
  }, []);

  const applyVersionFilter = (version: string) => {
    // Hide/show features based on version
    const featureItems = document.querySelectorAll('[data-version]');
    featureItems.forEach((item) => {
      const itemVersion = item.getAttribute('data-version');
      const parent = item.closest('.menu__list-item');
      
      if (parent) {
        if (itemVersion === version) {
          parent.style.display = 'block';
        } else {
          parent.style.display = 'none';
        }
      }
    });
  };

  const handleVersionChange = (version: string) => {
    setCurrentVersion(version);
    localStorage.setItem('awa-docs-version', version);
    applyVersionFilter(version);
  };

  const versions = [
    { value: '0.1', label: '0.1 Photon (MVP)' },
    { value: '0.2', label: '0.2 Spark (Advanced Practices)' },
    { value: '0.3', label: '0.3 Ember (Basic Masters)' },
    { value: '0.4', label: '0.4 Flicker (AWA Units)' },
    { value: '0.5', label: '0.5 Glow (AWAWAY Streaks)' },
    { value: '0.6', label: '0.6 Ray (Basic Missions)' },
    { value: '0.7', label: '0.7 INT Beam (Advanced Features)' },
    { value: '0.8', label: '0.8 INT Flame (Advanced Features)' },
    { value: '0.9', label: '0.9 INT Blaze (Advanced Features)' },
    { value: '1.0', label: '1.0 Ignition (Full Platform)' },
  ];

  return (
    <div style={{ 
      padding: '10px', 
      backgroundColor: '#f8f9fa', 
      border: '1px solid #e9ecef',
      borderRadius: '4px',
      margin: '10px 0'
    }}>
      <label htmlFor="version-select" style={{ 
        display: 'block', 
        marginBottom: '5px', 
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        Filter by Version:
      </label>
      <select
        id="version-select"
        value={currentVersion}
        onChange={(e) => handleVersionChange(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ced4da',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        {versions.map((version) => (
          <option key={version.value} value={version.value}>
            {version.label}
          </option>
        ))}
      </select>
      <div style={{ 
        marginTop: '5px', 
        fontSize: '12px', 
        color: '#6c757d' 
      }}>
        Currently viewing: {versions.find(v => v.value === currentVersion)?.label}
      </div>
    </div>
  );
};

export default VersionFilter;
