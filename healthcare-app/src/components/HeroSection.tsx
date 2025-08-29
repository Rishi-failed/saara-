import React from 'react';
import './HeroSection.css';

interface HeroSectionProps {
  onStartAssessment: () => void;
  onOpenAuth: () => void;
}

const HeroSection = ({ onStartAssessment, onOpenAuth }: HeroSectionProps) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">WebDoc</span>
            </h1>
            <p className="hero-subtitle">Your personalized health guide!</p>
            <h2 className="hero-mission">Your Health, Our Mission</h2>
            <p className="hero-description">
              Get comprehensive health analysis, personalized recommendations, and expert guidance 
              powered by AI technology. Start your journey to better health today.
            </p>
            
            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={onStartAssessment}
              >
                <span className="btn-text">Let's Start</span>
                <span className="btn-icon">🚀</span>
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={onOpenAuth}
              >
                <span className="btn-text">Login / Register</span>
                <span className="btn-icon">👤</span>
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <img 
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXlhd3JkM2RrMnVzZ3Nkb242emZiY215enByNHVpeGVzanFvcDNxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M9ZMQFPANNm0b9uBhc/giphy.gif" 
              alt="Health Assessment" 
              className="hero-gif"
            />
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>AI Health Analysis</h3>
            <p>Advanced algorithms analyze your health data</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Saara Chatbot</h3>
            <p>24/7 health assistant powered by AI</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Personalized Reports</h3>
            <p>Detailed insights and recommendations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
