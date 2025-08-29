// Gemini AI Service for enhanced health analysis
export class GeminiAIService {
  private static readonly API_KEY = 'AIzaSyCHRhKRdpK2FErXOrfDksJhlS7_OYWd5j4';
  private static readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  // Test API connection
  static async testConnection(): Promise<boolean> {
    try {
      const response = await this.callGeminiAPI('Hello, please respond with just "API Connected"');
      console.log('🔧 Connection test result:', response);
      return response !== null;
    } catch (error) {
      console.error('🔧 Connection test failed:', error);
      return false;
    }
  }

  static async callGeminiAPI(prompt: string): Promise<string | null> {
    try {
      console.log('🔧 Calling Gemini API with prompt:', prompt.substring(0, 100) + '...');
      
      // Use the exact same endpoint that works in SimpleAPITest
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      console.log('🔧 API Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('🔧 API Response data:', data);
        
        // Extract AI text exactly like SimpleAPITest
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log('🔧 Extracted AI text:', aiText);
        
        if (aiText) {
          console.log('✅ Successfully got AI response!');
          return aiText;
        } else {
          console.log('❌ No AI text found in response');
          return null;
        }
      } else {
        const errorText = await response.text();
        console.error('🔧 API Error:', response.status, errorText);
        return null;
      }
    } catch (error) {
      console.error('🔧 Gemini API error:', error);
      return null;
    }
  }

  static async analyzeHealthWithAI(healthData: any, query: string): Promise<string> {
    console.log('🔧 Starting AI analysis with query:', query);
    console.log('🔧 Health data:', healthData);
    
    // Create a more dynamic, conversational prompt that encourages varied responses
    const prompt = `
      You are Saara, a friendly and empathetic AI health assistant. You're having a natural conversation with ${healthData.name}.
      
      Here's their health profile:
      - Name: ${healthData.name}, Age: ${healthData.age}, Gender: ${healthData.gender}
      - BMI: ${healthData.bmi}, Weight: ${healthData.weight}kg, Height: ${healthData.height}cm
      - Sleep: ${healthData.sleepDuration} hours, Water: ${healthData.waterIntake}L/day
      - Activity: ${healthData.activityLevel}, Diet: ${healthData.foodChoices?.join(', ') || 'Not specified'}
      
      Current conversation context: "${query}"
      
      Please respond naturally and conversationally. Vary your responses - don't use the same phrases repeatedly. Be:
      - Personable and caring (use their name naturally)
      - Specific to their situation and health data
      - Helpful with actionable advice
      - Conversational, not robotic
      - Different each time they ask similar questions
      
      Keep it under 150 words. Make each response feel fresh and personalized.
      
      Important: Always remind that you're AI assistance, not medical diagnosis, and suggest seeing healthcare providers for serious concerns.
    `;

    try {
      console.log('🔧 Calling Gemini API...');
      const aiResponse = await this.callGeminiAPI(prompt);
      console.log('🔧 AI Response received:', aiResponse);
      
      if (aiResponse && aiResponse.trim()) {
        console.log('✅ Using AI response');
        return aiResponse;
      } else {
        console.log('❌ AI response was empty, using fallback');
      }
    } catch (error) {
      console.error('🔧 AI analysis failed:', error);
    }

    // Fallback to rule-based response
    console.log('🔧 Using fallback response');
    return this.generateFallbackResponse(query, healthData);
  }

  private static generateFallbackResponse(query: string, healthData: any): string {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('stomach') || queryLower.includes('nausea') || queryLower.includes('bloat')) {
      return this.analyzeStomachIssues(healthData);
    }
    
    if (queryLower.includes('tired') || queryLower.includes('fatigue') || queryLower.includes('energy')) {
      return this.analyzeFatigue(healthData);
    }
    
    if (queryLower.includes('weight') || queryLower.includes('diet')) {
      return this.analyzeWeightConcerns(healthData);
    }
    
    if (queryLower.includes('sleep') || queryLower.includes('insomnia')) {
      return this.analyzeSleepIssues(healthData);
    }
    
    if (queryLower.includes('headache') || queryLower.includes('migraine')) {
      return this.analyzeHeadaches(healthData);
    }
    
    return `Hi ${healthData.name}! I understand your concern about "${query}". Based on your health profile, I'd recommend staying hydrated (you're currently drinking ${healthData.waterIntake}L daily), maintaining your ${healthData.sleepDuration} hours of sleep, and keeping up with your activity level. If symptoms persist or worsen, please consult a healthcare provider for proper evaluation.`;
  }

  private static analyzeStomachIssues(healthData: any): string {
    let response = `Hi ${healthData.name}! Based on your health profile, let me help with your stomach concerns. `;
    
    const riskFactors: string[] = [];
    if (healthData.foodChoices.includes('fried') || healthData.foodChoices.includes('fastfood')) {
      riskFactors.push('high-fat foods');
    }
    if (healthData.foodChoices.includes('processed')) {
      riskFactors.push('processed foods');
    }
    if (healthData.waterIntake < 2) {
      riskFactors.push('low water intake');
    }
    if (healthData.sleepDuration < 7) {
      riskFactors.push('insufficient sleep');
    }
    
    if (riskFactors.length > 0) {
      response += `I notice you have ${riskFactors.join(', ')} in your profile, which can contribute to digestive issues. `;
    }
    
    response += `Try eating smaller, frequent meals, avoid eating 3 hours before bed, and consider peppermint tea. Increase your water intake to at least 2.5L daily. If symptoms include severe pain, blood, or persist over 3 days, please see a doctor immediately.`;
    
    return response;
  }

  private static analyzeFatigue(healthData: any): string {
    let response = `Hi ${healthData.name}! Let's address your fatigue concerns. `;
    
    const causes: string[] = [];
    if (healthData.sleepDuration < 7) {
      causes.push(`insufficient sleep (${healthData.sleepDuration} hours)`);
    }
    if (healthData.waterIntake < 2) {
      causes.push('dehydration');
    }
    if (healthData.activityLevel < 1.375) {
      causes.push('low physical activity');
    }
    if (!healthData.foodChoices.includes('vegetables') || !healthData.foodChoices.includes('fruits')) {
      causes.push('poor nutrition');
    }
    
    if (causes.length > 0) {
      response += `Possible causes from your profile: ${causes.join(', ')}. `;
    }
    
    response += `Focus on getting 7-9 hours of sleep, drinking more water, and including iron-rich foods like leafy greens. Light exercise can actually boost energy levels. If fatigue persists despite lifestyle changes, consider blood tests to check for deficiencies.`;
    
    return response;
  }

  private static analyzeWeightConcerns(healthData: any): string {
    const bmi = healthData.weight / ((healthData.height / 100) ** 2);
    let response = `Hi ${healthData.name}! Your current BMI is ${bmi.toFixed(1)}. `;
    
    if (bmi < 18.5) {
      response += `You're underweight. Focus on calorie-dense, nutritious foods like nuts, avocados, and lean proteins. Consider consulting a nutritionist.`;
    } else if (bmi > 25) {
      response += `You're above the normal weight range. Create a moderate calorie deficit through balanced nutrition and regular exercise. Aim for 1-2 pounds per week weight loss.`;
    } else {
      response += `You're in a healthy weight range! Focus on maintaining through balanced nutrition and regular physical activity.`;
    }
    
    return response;
  }

  private static analyzeSleepIssues(healthData: any): string {
    let response = `Hi ${healthData.name}! You're currently getting ${healthData.sleepDuration} hours of sleep. `;
    
    if (healthData.sleepDuration < 7) {
      response += `This is below the recommended 7-9 hours. Try establishing a bedtime routine, avoiding screens 1 hour before bed, and keeping your room cool and dark. `;
    } else if (healthData.sleepDuration > 9) {
      response += `You're sleeping more than average. While some people need more sleep, excessive sleep can indicate underlying issues. `;
    }
    
    const dinnerHour = parseInt(healthData.dinnerTime?.split(':')[0] || '19');
    if (dinnerHour > 21) {
      response += `Try eating dinner earlier (currently around ${dinnerHour}:00) as late meals can affect sleep quality. `;
    }
    
    if (healthData.foodChoices.includes('caffeine')) {
      response += `Limit caffeine intake, especially after 2 PM. `;
    }
    
    response += `If sleep issues persist, consider consulting a sleep specialist.`;
    
    return response;
  }

  private static analyzeHeadaches(healthData: any): string {
    let response = `Hi ${healthData.name}! Let me help with your headache concerns. `;
    
    const triggers: string[] = [];
    if (healthData.waterIntake < 2) {
      triggers.push('dehydration');
    }
    if (healthData.sleepDuration < 7 || healthData.sleepDuration > 9) {
      triggers.push('irregular sleep');
    }
    if (healthData.foodChoices.includes('caffeine')) {
      triggers.push('caffeine consumption');
    }
    if (healthData.foodChoices.includes('processed')) {
      triggers.push('processed foods');
    }
    
    if (triggers.length > 0) {
      response += `Common triggers from your profile: ${triggers.join(', ')}. `;
    }
    
    response += `Ensure adequate hydration (aim for 2.5L daily), maintain regular sleep schedule, and avoid skipping meals. Keep a headache diary to identify patterns. Seek immediate medical attention for sudden, severe headaches or those with fever, vision changes, or neck stiffness.`;
    
    return response;
  }
}
