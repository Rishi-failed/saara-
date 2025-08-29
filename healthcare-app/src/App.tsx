import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HealthAssessment from './components/HealthAssessment';
import Chatbot from './components/Chatbot';
import AuthModal from './components/AuthModal';
import './App.css';

// Type definitions for assessment results
interface PersonalInfo {
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: number;
  foodChoices: string[];
  waterIntake: number;
  bedtime: string;
  wakeTime: string;
  breakfastTime: string;
  lunchTime: string;
  dinnerTime: string;
}

interface HealthMetrics {
  bmi: number;
  bmr: number;
  sleepDuration: number;
  healthScore: number;
  bmiCategory: string;
  tdee: number;
  calorieIntake: number;
}

interface AssessmentResults {
  personalInfo: PersonalInfo;
  metrics: HealthMetrics;
  recommendations: any;
  comprehensiveRecommendations: any;
  healthInsights: string[];
  mealTimingAdvice: string[];
}

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleOpenAuth = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  const handleAnalysisComplete = (results: AssessmentResults) => {
    setAssessmentResults(results);
    setCurrentView('results');
    // Auto-show chatbot after results
    setTimeout(() => setShowChatbot(true), 2000);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setAssessmentResults(null);
    setShowChatbot(false);
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <div className="App">
      <Header />
      
      {currentView === 'home' && (
        <>
          <HeroSection 
            onStartAssessment={handleStartAssessment}
            onOpenAuth={handleOpenAuth}
          />
        </>
      )}

      {currentView === 'assessment' && (
        <HealthAssessment 
          onAnalysisComplete={handleAnalysisComplete}
        />
      )}

      {currentView === 'results' && assessmentResults && (
        <div className="results-section">
          <div className="container">
            <div className="results-container">
              <button 
                onClick={handleBackToHome}
                className="back-button"
              >
                ← Back to Home
              </button>
              
              <div className="results-content">
                <h2>Your Health Analysis Results</h2>
                
                <div className="results-grid">
                  <div className="result-card">
                    <h3>📊 Personal Information</h3>
                    <p><strong>Name:</strong> {assessmentResults.personalInfo.name}</p>
                    <p><strong>Age:</strong> {assessmentResults.personalInfo.age} years</p>
                    <p><strong>Gender:</strong> {assessmentResults.personalInfo.gender}</p>
                    <p><strong>Weight:</strong> {assessmentResults.personalInfo.weight} kg</p>
                    <p><strong>Height:</strong> {assessmentResults.personalInfo.height} cm</p>
                  </div>

                  <div className="result-card">
                    <h3>📈 Health Metrics</h3>
                    <p><strong>BMI:</strong> {assessmentResults.metrics.bmi} ({assessmentResults.metrics.bmiCategory})</p>
                    <p><strong>Health Score:</strong> {assessmentResults.metrics.healthScore}/100</p>
                    <p><strong>BMR:</strong> {Math.round(assessmentResults.metrics.bmr)} cal/day</p>
                    <p><strong>TDEE:</strong> {Math.round(assessmentResults.metrics.tdee)} cal/day</p>
                    <p><strong>Sleep Duration:</strong> {assessmentResults.metrics.sleepDuration} hours</p>
                  </div>

                  <div className="result-card">
                    <h3>💧 Lifestyle Factors</h3>
                    <p><strong>Water Intake:</strong> {assessmentResults.personalInfo.waterIntake} L/day</p>
                    <p><strong>Activity Level:</strong> {assessmentResults.personalInfo.activityLevel}x</p>
                    <p><strong>Estimated Calorie Intake:</strong> {assessmentResults.metrics.calorieIntake} cal/day</p>
                    <p><strong>Food Choices:</strong> {assessmentResults.personalInfo.foodChoices.length} items selected</p>
                  </div>
                </div>

                {/* Health Insights Section */}
                {assessmentResults.healthInsights && assessmentResults.healthInsights.length > 0 && (
                  <div className="insights-card">
                    <h3>💡 Health Insights</h3>
                    <ul>
                      {assessmentResults.healthInsights.map((insight: string, index: number) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Comprehensive Recommendations */}
                {assessmentResults.comprehensiveRecommendations && (
                  <div className="comprehensive-recommendations">
                    {assessmentResults.comprehensiveRecommendations.diet.length > 0 && (
                      <div className="recommendation-category">
                        <h4>🥗 Diet Recommendations</h4>
                        <ul>
                          {assessmentResults.comprehensiveRecommendations.diet.map((rec: string, index: number) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {assessmentResults.comprehensiveRecommendations.exercise.length > 0 && (
                      <div className="recommendation-category">
                        <h4>🏃‍♀️ Exercise Recommendations</h4>
                        <ul>
                          {assessmentResults.comprehensiveRecommendations.exercise.map((rec: string, index: number) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {assessmentResults.comprehensiveRecommendations.lifestyle.length > 0 && (
                      <div className="recommendation-category">
                        <h4>🌟 Lifestyle Recommendations</h4>
                        <ul>
                          {assessmentResults.comprehensiveRecommendations.lifestyle.map((rec: string, index: number) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {assessmentResults.comprehensiveRecommendations.medical.length > 0 && (
                      <div className="recommendation-category medical">
                        <h4>⚕️ Medical Recommendations</h4>
                        <ul>
                          {assessmentResults.comprehensiveRecommendations.medical.map((rec: string, index: number) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Meal Timing Advice */}
                {assessmentResults.mealTimingAdvice && assessmentResults.mealTimingAdvice.length > 0 && (
                  <div className="meal-timing-card">
                    <h3>🍽️ Meal Timing Advice</h3>
                    <ul>
                      {assessmentResults.mealTimingAdvice.map((advice: string, index: number) => (
                        <li key={index}>{advice}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="recommendations-card">
                  <h3>Basic Health Recommendations</h3>
                  <ul>
                    {assessmentResults.recommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div className="chatbot-controls">
                  <button 
                    onClick={toggleChatbot}
                    className="chatbot-toggle-btn"
                  >
                    💬 Chat with Saara
                  </button>
                </div>

                <div className="feedback-section">
                  <button 
                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSckR3xG5mkceASCFH76ROyTiGUEInTUp_K2qOnYUP1sTq8-rw/viewform', '_blank')}
                    className="feedback-button"
                  >
                    Give Feedback
                  </button>
                  <p>We value your feedback!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        show={showAuthModal} 
        onClose={handleCloseAuth}
      />

      {/* Chatbot Component */}
      <Chatbot 
        show={showChatbot} 
        userHealthData={assessmentResults?.personalInfo}
        onClose={closeChatbot}
      />

      {/* Floating Chatbot Button */}
      {currentView === 'results' && !showChatbot && (
        <button 
          onClick={toggleChatbot}
          className="floating-chat-btn"
        >
          💬
        </button>
      )}
    </div>
  );
}

export default App;
