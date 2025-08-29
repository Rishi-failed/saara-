import React, { useState } from 'react';

const APITestComponent = () => {
  const [apiStatus, setApiStatus] = useState('Not tested');
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testGeminiAPI = async () => {
    setIsLoading(true);
    setApiStatus('Testing...');
    
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCHRhKRdpK2FErXOrfDksJhlS7_OYWd5j4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Hello! Please respond with just "API Working" to confirm connection.'
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response text';
        setApiStatus('✅ SUCCESS - API is working!');
        setApiResponse(responseText);
      } else {
        setApiStatus(`❌ FAILED - Status: ${response.status} ${response.statusText}`);
        setApiResponse('API request failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setApiStatus(`❌ ERROR - ${errorMessage}`);
      setApiResponse('Connection error occurred');
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #007bff', 
      borderRadius: '10px', 
      margin: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3>🔧 Gemini API Test</h3>
      <p><strong>Status:</strong> {apiStatus}</p>
      {apiResponse && (
        <div style={{ 
          backgroundColor: '#e7f3ff', 
          padding: '10px', 
          borderRadius: '5px',
          marginTop: '10px'
        }}>
          <strong>API Response:</strong>
          <pre>{apiResponse}</pre>
        </div>
      )}
      <button 
        onClick={testGeminiAPI} 
        disabled={isLoading}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        {isLoading ? 'Testing...' : 'Test API Connection'}
      </button>
    </div>
  );
};

export default APITestComponent;
