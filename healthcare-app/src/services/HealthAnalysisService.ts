// Health Analysis Service - Comprehensive health calculations and analysis
export class HealthAnalysisService {
  
  static calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
  }

  static getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  static calculateBMR(gender: string, weight: number, height: number, age: number): number {
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  }

  static calculateTDEE(bmr: number, activityLevel: number): number {
    return bmr * activityLevel;
  }

  static calculateCalorieIntake(foodChoices: string[]): number {
    const calorieMap: { [key: string]: number } = {
      rice: 130,
      meat: 250,
      flour: 364,
      fastfood: 540,
      fried: 365,
      fruits: 60,
      vegetables: 25,
      nuts: 553,
      sugary: 387,
      seafood: 206,
      dairy: 150,
      alcohol: 231,
      processed: 300,
      softDrinks: 139,
      caffeine: 2
    };

    return foodChoices.reduce((total, food) => {
      return total + (calorieMap[food] || 0);
    }, 0);
  }

  static calculateSleepDuration(bedtime: string, wakeTime: string): number {
    if (!bedtime || !wakeTime) return 0;
    
    const bedtimeParts = bedtime.split(':');
    const wakeTimeParts = wakeTime.split(':');
    
    const bedtimeDate = new Date();
    bedtimeDate.setHours(parseInt(bedtimeParts[0]));
    bedtimeDate.setMinutes(parseInt(bedtimeParts[1]));
    bedtimeDate.setSeconds(0);
    
    const wakeTimeDate = new Date();
    wakeTimeDate.setHours(parseInt(wakeTimeParts[0]));
    wakeTimeDate.setMinutes(parseInt(wakeTimeParts[1]));
    wakeTimeDate.setSeconds(0);
    
    if (wakeTimeDate <= bedtimeDate) {
      wakeTimeDate.setDate(wakeTimeDate.getDate() + 1);
    }
    
    const diffMs = wakeTimeDate.getTime() - bedtimeDate.getTime();
    return Number((diffMs / (1000 * 60 * 60)).toFixed(1));
  }

  static analyzeMealTiming(breakfastTime: string, lunchTime: string, dinnerTime: string): string[] {
    const recommendations: string[] = [];
    
    const breakfastHour = parseInt(breakfastTime.split(':')[0]);
    if (breakfastHour > 9) {
      recommendations.push('Try to eat breakfast within 1-2 hours of waking up to kickstart your metabolism.');
    }
    
    const lunchHour = parseInt(lunchTime.split(':')[0]);
    const dinnerHour = parseInt(dinnerTime.split(':')[0]);
    
    const lunchDinnerGap = dinnerHour - lunchHour;
    if (lunchDinnerGap > 7) {
      recommendations.push('The gap between lunch and dinner is quite long. Consider a healthy snack in between.');
    }
    
    if (dinnerHour > 21) {
      recommendations.push('Try to have dinner at least 3 hours before bedtime for better digestion.');
    }
    
    return recommendations;
  }

  static generateHealthScore(data: any): number {
    let score = 100;
    
    // BMI scoring
    const bmi = this.calculateBMI(data.weight, data.height);
    if (bmi < 18.5 || bmi > 30) score -= 15;
    else if (bmi > 25) score -= 8;
    
    // Sleep scoring
    const sleepDuration = this.calculateSleepDuration(data.bedtime, data.wakeTime);
    if (sleepDuration < 6 || sleepDuration > 9) score -= 10;
    
    // Water intake scoring
    if (data.waterIntake < 2) score -= 8;
    else if (data.waterIntake < 1.5) score -= 15;
    
    // Food choices scoring
    const unhealthyFoods = ['fastfood', 'fried', 'processed', 'sugary', 'softDrinks'];
    const unhealthyCount = data.foodChoices.filter((food: string) => unhealthyFoods.includes(food)).length;
    score -= unhealthyCount * 5;
    
    const healthyFoods = ['fruits', 'vegetables', 'nuts'];
    const healthyCount = data.foodChoices.filter((food: string) => healthyFoods.includes(food)).length;
    score += healthyCount * 3;
    
    // Activity level scoring
    if (data.activityLevel < 1.375) score -= 10;
    else if (data.activityLevel > 1.55) score += 5;
    
    return Math.max(Math.min(score, 100), 0);
  }

  static generateComprehensiveRecommendations(data: any): any {
    const recommendations = {
      diet: [] as string[],
      exercise: [] as string[],
      lifestyle: [] as string[],
      medical: [] as string[]
    };
    
    const bmi = this.calculateBMI(data.weight, data.height);
    const sleepDuration = this.calculateSleepDuration(data.bedtime, data.wakeTime);
    const healthScore = this.generateHealthScore(data);
    
    // Diet recommendations
    if (bmi > 25) {
      recommendations.diet.push('Focus on portion control and calorie-dense foods');
      recommendations.diet.push('Increase protein intake to maintain muscle mass while losing weight');
    } else if (bmi < 18.5) {
      recommendations.diet.push('Increase caloric intake with nutrient-dense foods');
      recommendations.diet.push('Add healthy fats like nuts, avocados, and olive oil');
    }
    
    if (data.foodChoices.includes('fastfood') || data.foodChoices.includes('processed')) {
      recommendations.diet.push('Reduce processed and fast food consumption');
      recommendations.diet.push('Cook more meals at home using fresh ingredients');
    }
    
    if (!data.foodChoices.includes('vegetables')) {
      recommendations.diet.push('Include at least 5 servings of vegetables daily');
    }
    
    if (!data.foodChoices.includes('fruits')) {
      recommendations.diet.push('Add 2-3 servings of fresh fruits to your daily diet');
    }
    
    if (data.waterIntake < 2.5) {
      recommendations.diet.push(`Increase water intake to at least 2.5 liters daily (currently ${data.waterIntake}L)`);
    }
    
    // Exercise recommendations
    if (data.activityLevel < 1.375) {
      recommendations.exercise.push('Start with 30 minutes of moderate exercise 3 times per week');
      recommendations.exercise.push('Try walking, swimming, or cycling for cardiovascular health');
    } else if (data.activityLevel > 1.725) {
      recommendations.exercise.push('Ensure adequate rest days to prevent overtraining');
      recommendations.exercise.push('Focus on recovery and flexibility exercises');
    }
    
    if (bmi > 25) {
      recommendations.exercise.push('Combine cardio with strength training for optimal weight loss');
    } else if (bmi < 18.5) {
      recommendations.exercise.push('Focus on strength training to build muscle mass');
    }
    
    // Lifestyle recommendations
    if (sleepDuration < 7) {
      recommendations.lifestyle.push('Aim for 7-9 hours of quality sleep nightly');
      recommendations.lifestyle.push('Establish a consistent bedtime routine');
    }
    
    if (sleepDuration > 9) {
      recommendations.lifestyle.push('Excessive sleep may indicate underlying issues - monitor your energy levels');
    }
    
    const dinnerHour = parseInt(data.dinnerTime.split(':')[0]);
    if (dinnerHour > 21) {
      recommendations.lifestyle.push('Have dinner at least 3 hours before bedtime for better digestion');
    }
    
    if (data.foodChoices.includes('alcohol')) {
      recommendations.lifestyle.push('Limit alcohol consumption to recommended guidelines');
    }
    
    if (data.foodChoices.includes('caffeine')) {
      recommendations.lifestyle.push('Avoid caffeine 6 hours before bedtime');
    }
    
    // Medical recommendations
    if (healthScore < 70) {
      recommendations.medical.push('Consider consulting a healthcare provider for a comprehensive health assessment');
    }
    
    if (bmi > 30 || bmi < 16) {
      recommendations.medical.push('Consult a physician or registered dietitian for personalized guidance');
    }
    
    if (data.age > 40 && data.activityLevel < 1.375) {
      recommendations.medical.push('Regular health screenings become more important after 40');
    }
    
    return recommendations;
  }

  static getHealthInsights(data: any): string[] {
    const insights: string[] = [];
    const bmi = this.calculateBMI(data.weight, data.height);
    const bmr = this.calculateBMR(data.gender, data.weight, data.height, data.age);
    const tdee = this.calculateTDEE(bmr, data.activityLevel);
    const calorieIntake = this.calculateCalorieIntake(data.foodChoices);
    const sleepDuration = this.calculateSleepDuration(data.bedtime, data.wakeTime);
    
    // Caloric balance insight
    const weeklyTDEE = tdee * 7;
    const weeklyIntake = calorieIntake * 7;
    const calorieBalance = weeklyIntake - weeklyTDEE;
    
    if (calorieBalance > 3500) {
      insights.push(`You're consuming approximately ${Math.round(calorieBalance)} extra calories per week, which could lead to gaining about ${(calorieBalance/3500).toFixed(1)} pounds per week.`);
    } else if (calorieBalance < -3500) {
      insights.push(`You have a calorie deficit of approximately ${Math.abs(calorieBalance)} calories per week, which could lead to losing about ${(Math.abs(calorieBalance)/3500).toFixed(1)} pounds per week.`);
    }
    
    // Metabolic insights
    if (data.gender === 'female' && data.age > 30) {
      insights.push('Women typically lose 3-8% of muscle mass per decade after 30. Strength training is crucial for maintaining metabolism.');
    }
    
    if (data.gender === 'male' && data.age > 30) {
      insights.push('Men typically experience a 1% decline in testosterone per year after 30. Regular exercise can help maintain hormonal balance.');
    }
    
    // Sleep insights
    if (sleepDuration < 7) {
      insights.push('Insufficient sleep can reduce metabolism by up to 20% and increase hunger hormones, making weight management more difficult.');
    }
    
    // Hydration insights
    const idealWaterIntake = data.weight * 0.033;
    if (data.waterIntake < idealWaterIntake) {
      insights.push(`Based on your weight, you should drink approximately ${idealWaterIntake.toFixed(1)}L of water daily (currently ${data.waterIntake}L).`);
    }
    
    return insights;
  }
}
