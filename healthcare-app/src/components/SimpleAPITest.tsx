import React, { useState } from 'react';

const SimpleAPITest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [testing, setTesting] = useState(false);

  const testDirectAPI = async () => {
    setTesting(true);
    setResult('Testing...');
    
    try {
      const API_KEY = 'AIzaSyCHRhKRdpK2FErXOrfDksJhlS7_OYWd5j4';
      
      // Test the simplest possible request with correct model name
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Say hello"
            }]
          }]
        })
      });

      console.log('Direct API test response:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Direct API data:', data);
        
        // Extract the actual AI text response
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log('AI Text:', aiText);
        
        if (aiText) {
          setResult(`✅ SUCCESS! API is working!\n\n🤖 AI Response: "${aiText}"\n\n📊 Full Response: ${JSON.stringify(data, null, 2)}`);
        } else {
          setResult(`⚠️ API responded but no AI text found\n\nFull Response: ${JSON.stringify(data, null, 2)}`);
        }
      } else {
        const errorText = await response.text();
        console.error('Direct API error:', errorText);
        setResult(`❌ FAILED - Status: ${response.status}\nError: ${errorText}`);
      }
    } catch (error) {
      console.error('Direct API test error:', error);
      setResult(`❌ ERROR: ${error}`);
    }
    
    setTesting(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', margin: '20px' }}>
      <h3>🧪 Simple Direct API Test</h3>
      <button onClick={testDirectAPI} disabled={testing}>
        {testing ? 'Testing...' : 'Test Gemini API Direct'}
      </button>
      <pre style={{ marginTop: '10px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '5px', fontSize: '12px', whiteSpace: 'pre-wrap' }}>
        {result}
      </pre>
    </div>
  );
};

export default SimpleAPITest;
