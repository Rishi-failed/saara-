import React, { useState } from 'react';
import { HealthAnalysisService } from '../services/HealthAnalysisService';
import './HealthAssessment.css';

interface HealthData {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: string;
  breakfastTime: string;
  lunchTime: string;
  dinnerTime: string;
  activityLevel: number;
  bedtime: string;
  wakeTime: string;
  waterIntake: number;
  foodChoices: string[];
}

interface HealthAssessmentProps {
  onAnalysisComplete: (results: any) => void;
}

const HealthAssessment = ({ onAnalysisComplete }: HealthAssessmentProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    weight: 0,
    height: 0,
    gender: '',
    breakfastTime: '',
    lunchTime: '',
    dinnerTime: '',
    activityLevel: 0,
    bedtime: '',
    wakeTime: '',
    waterIntake: 0,
    foodChoices: [] as string[]
  });
  const [errors, setErrors] = useState({} as any);

  const foodOptions = [
    { value: 'rice', label: 'Rice (White rice)' },
    { value: 'meat', label: 'Meat' },
    { value: 'flour', label: 'Flour Items (Ragi, Aata, etc.)' },
    { value: 'fastfood', label: 'Fast Food' },
    { value: 'fried', label: 'Fried Items (Chips, Chicken Fries, etc.)' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'nuts', label: 'Nuts & Millets' },
    { value: 'sugary', label: 'Sugary Foods (Cake, Pastries, Sugar Candy)' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'dairy', label: 'Dairy Products (Milk-based)' },
    { value: 'alcohol', label: 'Alcohol' },
    { value: 'processed', label: 'Processed Food (Ready to Eat)' },
    { value: 'softDrinks', label: 'Soft Drinks' },
    { value: 'caffeine', label: 'Caffeinated drinking' }
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' || name === 'activityLevel' || name === 'waterIntake' 
        ? Number(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFoodChoice = (value: string) => {
    setFormData(prev => ({
      ...prev,
      foodChoices: prev.foodChoices.includes(value)
        ? prev.foodChoices.filter(choice => choice !== value)
        : [...prev.foodChoices, value]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: any = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.age || formData.age < 1 || formData.age > 100) newErrors.age = 'Age must be between 1-100';
      if (!formData.weight || formData.weight < 10 || formData.weight > 250) newErrors.weight = 'Weight must be between 10-250 kg';
      if (!formData.height || formData.height < 20 || formData.height > 250) newErrors.height = 'Height must be between 20-250 cm';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData.breakfastTime) newErrors.breakfastTime = 'Breakfast time is required';
      if (!formData.lunchTime) newErrors.lunchTime = 'Lunch time is required';
      if (!formData.dinnerTime) newErrors.dinnerTime = 'Dinner time is required';
      if (!formData.activityLevel) newErrors.activityLevel = 'Activity level is required';
    }

    if (step === 3) {
      if (!formData.bedtime) newErrors.bedtime = 'Bedtime is required';
      if (!formData.wakeTime) newErrors.wakeTime = 'Wake-up time is required';
      if (!formData.waterIntake || formData.waterIntake <= 0) newErrors.waterIntake = 'Water intake is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const calculateBMI = (weight: number, height: number): number => {
    return HealthAnalysisService.calculateBMI(weight, height);
  };

  const calculateBMR = (gender: string, weight: number, height: number, age: number): number => {
    return HealthAnalysisService.calculateBMR(gender, weight, height, age);
  };

  const calculateSleepDuration = (bedtime: string, wakeTime: string): number => {
    return HealthAnalysisService.calculateSleepDuration(bedtime, wakeTime);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);

    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const bmi = calculateBMI(formData.weight, formData.height);
      const bmr = calculateBMR(formData.gender, formData.weight, formData.height, formData.age);
      const sleepDuration = calculateSleepDuration(formData.bedtime, formData.wakeTime);
      const healthScore = HealthAnalysisService.generateHealthScore(formData);
      const comprehensiveRecommendations = HealthAnalysisService.generateComprehensiveRecommendations(formData);
      const healthInsights = HealthAnalysisService.getHealthInsights(formData);
      const mealTimingAdvice = HealthAnalysisService.analyzeMealTiming(formData.breakfastTime, formData.lunchTime, formData.dinnerTime);

      const results = {
        personalInfo: formData,
        metrics: {
          bmi,
          bmr,
          sleepDuration,
          healthScore,
          bmiCategory: HealthAnalysisService.getBMICategory(bmi),
          tdee: HealthAnalysisService.calculateTDEE(bmr, formData.activityLevel),
          calorieIntake: HealthAnalysisService.calculateCalorieIntake(formData.foodChoices)
        },
        recommendations: generateRecommendations(formData, bmi, sleepDuration),
        comprehensiveRecommendations,
        healthInsights,
        mealTimingAdvice
      };

      onAnalysisComplete(results);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateRecommendations = (data: HealthData, bmi: number, sleepDuration: number): string[] => {
    const recommendations: string[] = [];

    if (bmi < 18.5) {
      recommendations.push("Your BMI indicates you're underweight. Consider consulting a nutritionist for a healthy weight gain plan.");
    } else if (bmi > 25) {
      recommendations.push("Your BMI indicates you're overweight. Focus on balanced nutrition and regular exercise.");
    } else {
      recommendations.push("Great! Your BMI is in the healthy range. Keep maintaining your current lifestyle.");
    }

    if (sleepDuration < 7) {
      recommendations.push("You're getting less than 7 hours of sleep. Try to improve your sleep schedule for better health.");
    } else if (sleepDuration > 9) {
      recommendations.push("You're sleeping more than 9 hours. Consider evaluating your sleep quality and daily routine.");
    }

    if (data.waterIntake < 2) {
      recommendations.push("Increase your daily water intake. Aim for at least 2-3 liters per day.");
    }

    return recommendations;
  };

  return (
    <div className="health-assessment">
      <div className="assessment-container">
        <div className="progress-bar">
          <div className="progress-steps">
            {[1, 2, 3].map((step) => (
              <div 
                key={step}
                className={`progress-step ${currentStep >= step ? 'active' : ''}`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="progress-line">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {currentStep === 1 && (
          <div className="step-content">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  max="100"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  className={errors.age ? 'error' : ''}
                />
                {errors.age && <span className="error-text">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  min="10"
                  max="250"
                  value={formData.weight || ''}
                  onChange={handleInputChange}
                  className={errors.weight ? 'error' : ''}
                />
                {errors.weight && <span className="error-text">{errors.weight}</span>}
              </div>

              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  min="20"
                  max="250"
                  value={formData.height || ''}
                  onChange={handleInputChange}
                  className={errors.height ? 'error' : ''}
                />
                {errors.height && <span className="error-text">{errors.height}</span>}
              </div>

              <div className="form-group full-width">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-content">
            <h2>Meal Schedule & Activity</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Breakfast Time</label>
                <input
                  type="time"
                  name="breakfastTime"
                  value={formData.breakfastTime}
                  onChange={handleInputChange}
                  className={errors.breakfastTime ? 'error' : ''}
                />
                {errors.breakfastTime && <span className="error-text">{errors.breakfastTime}</span>}
              </div>

              <div className="form-group">
                <label>Lunch Time</label>
                <input
                  type="time"
                  name="lunchTime"
                  value={formData.lunchTime}
                  onChange={handleInputChange}
                  className={errors.lunchTime ? 'error' : ''}
                />
                {errors.lunchTime && <span className="error-text">{errors.lunchTime}</span>}
              </div>

              <div className="form-group">
                <label>Dinner Time</label>
                <input
                  type="time"
                  name="dinnerTime"
                  value={formData.dinnerTime}
                  onChange={handleInputChange}
                  className={errors.dinnerTime ? 'error' : ''}
                />
                {errors.dinnerTime && <span className="error-text">{errors.dinnerTime}</span>}
              </div>

              <div className="form-group full-width">
                <label>Activity Level</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  className={errors.activityLevel ? 'error' : ''}
                >
                  <option value="">Select Activity Level</option>
                  <option value="1.2">Sedentary (little or no exercise)</option>
                  <option value="1.375">Lightly Active (light exercise/sports 1-3 days/week)</option>
                  <option value="1.55">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                  <option value="1.725">Very Active (hard exercise/sports 6-7 days/week)</option>
                  <option value="1.9">Extra Active (very hard exercise/sports & physical job)</option>
                </select>
                {errors.activityLevel && <span className="error-text">{errors.activityLevel}</span>}
              </div>
            </div>

            <div className="food-choices-section">
              <h3>Food Choices</h3>
              <div className="food-options-grid">
                {foodOptions.map((option) => (
                  <div key={option.value} className="food-option">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.foodChoices.includes(option.value)}
                        onChange={() => handleFoodChoice(option.value)}
                      />
                      <span className="checkmark"></span>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-content">
            <h2>Sleep & Water Intake</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Bedtime</label>
                <input
                  type="time"
                  name="bedtime"
                  value={formData.bedtime}
                  onChange={handleInputChange}
                  className={errors.bedtime ? 'error' : ''}
                />
                {errors.bedtime && <span className="error-text">{errors.bedtime}</span>}
              </div>

              <div className="form-group">
                <label>Wake-up Time</label>
                <input
                  type="time"
                  name="wakeTime"
                  value={formData.wakeTime}
                  onChange={handleInputChange}
                  className={errors.wakeTime ? 'error' : ''}
                />
                {errors.wakeTime && <span className="error-text">{errors.wakeTime}</span>}
              </div>

              <div className="form-group full-width">
                <label>Daily Water Intake (Liters/day)</label>
                <input
                  type="number"
                  name="waterIntake"
                  step="0.1"
                  min="0.1"
                  value={formData.waterIntake || ''}
                  onChange={handleInputChange}
                  placeholder="Enter water intake"
                  className={errors.waterIntake ? 'error' : ''}
                />
                {errors.waterIntake && <span className="error-text">{errors.waterIntake}</span>}
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Previous
            </button>
          )}
          
          {currentStep < 3 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="btn btn-primary"
              disabled={isLoading}
            >
              Next
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-content">
                  <span className="spinner"></span>
                  Analyzing...
                </span>
              ) : (
                'Get Results'
              )}
            </button>
          )}
        </div>

        {isLoading && (
          <div className="loading-section">
            <img 
              src="https://www.neelkanthhospitalpatna.com/wp-content/uploads/2022/07/image_processing20210217-5094-11l9lea.gif" 
              alt="Loading..." 
              className="loading-gif"
            />
            <p>Analyzing your health data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAssessment;
