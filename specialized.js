// specialized-analysis.js - Enhanced health analysis functions with better formatting and more detailed information

function analyzeStomachIssues(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Stomach Issues Analysis</h3>
            <div class="health-icon">🤢</div>
        </div>
        <div class="analysis-content">
            <h4>Possible conditions based on your symptoms 🪪:</h4>
            <ul class="condition-list">
                <li><strong>Indigestion/Dyspepsia</strong> - Bloating, discomfort after eating</li>
                <li><strong>Gastritis</strong> - Burning pain, nausea, feeling full quickly</li>
                <li><strong>GERD</strong> - Heartburn, acid regurgitation, chronic cough</li>
                <li><strong>IBS</strong> - Abdominal pain with diarrhea/constipation</li>
                <li><strong>Food Intolerance</strong> - Bloating, diarrhea after specific foods</li>
            </ul>
            
            <h4>Contributing factors from your profile:</h4>
            <ul>`;
    
    if (healthData.foodChoices.some(f => ["fried", "fastfood", "processed"].includes(f))) {
        analysis += `<li>Diet high in unhealthy fats</li>`;
    }
    if (healthData.foodChoices.includes("dairy")) {
        analysis += `<li>Possible lactose intolerance</li>`;
    }
    if (healthData.waterIntake < 2) {
        analysis += `<li>Low water intake (only ${healthData.waterIntake}L)</li>`;
    }
    if (healthData.sleepDuration < 6) {
        analysis += `<li>Inadequate sleep (only ${healthData.sleepDuration} hours)</li>`;
    }
    
    analysis += `</ul>
            
            <div class="recovery tips">
                <h4>Recovery Tips 🛡:</h4>
                <ol>
                    <li>Follow a <strong>low-FODMAP diet</strong> for 2-4 weeks to identify triggers</li>
                    <li>Eat smaller, more frequent meals</li>
                    <li>Avoid eating 3 hours before bedtime</li>
                    <li>Try peppermint tea or ginger for natural relief</li>
                    <li>Practice stress-reduction techniques</li>
                </ol>
                
                <div class="emergency-warning">
                    <h4> Seek immediate medical attention 🩺 if you experience ⚠️:</h4>
                    <ul>
                        <li>Severe, persistent abdominal pain</li>
                        <li>Blood in vomit or stool</li>
                        <li>Unintentional weight loss</li>
                        <li>Difficulty swallowing</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}

function analyzeFatigue(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Fatigue Analysis</h3>
            <div class="health-icon">😴</div>
        </div>
        <div class="analysis-content">
            <h4>Potential underlying causes:</h4>
            <ul class="condition-list">
                <li><strong>Anemia</strong> - Pale skin, dizziness, shortness of breath</li>
                <li><strong>Thyroid Disorders</strong> - Weight changes, temperature sensitivity</li>
                <li><strong>Sleep Apnea</strong> - Loud snoring, waking up gasping</li>
                <li><strong>Depression</strong> - Low mood, loss of interest in activities</li>
            </ul>
            
            <h4>Lifestyle factors from your profile 🪪:</h4>
            <ul>`;
    
    if (parseFloat(healthData.sleepDuration) < 7) {
        analysis += `<li>Inadequate sleep (only ${healthData.sleepDuration} hours)</li>`;
    }
    if (healthData.activityLevel < 1.375) {
        analysis += `<li>Sedentary lifestyle</li>`;
    }
    if (healthData.waterIntake < 2) {
        analysis += `<li>Dehydration (only ${healthData.waterIntake}L water)</li>`;
    }
    if (healthData.foodChoices.includes("processed")) {
        analysis += `<li>Processed foods causing energy crashes</li>`;
    }
    
    analysis += `</ul>
            
            <div class="energy-boost">
                <h4>Energy Restoration Plan ⚡:</h4>
                <div class="two-column">
                    <div>
                        <h5>Morning Routine:</h5>
                        <ol>
                            <li>Hydrate with 500ml water upon waking</li>
                            <li>10 min sunlight exposure</li>
                            <li>Protein-rich breakfast</li>
                        </ol>
                    </div>
                    <div>
                        <h5>Daily Habits:</h5>
                        <ol>
                            <li>Take movement breaks every 90 min</li>
                            <li>20 min power nap if needed</li>
                            <li>Complex carbs + protein snacks</li>
                        </ol>
                    </div>
                </div>
                
                <div class="warning-box">
                    <h4>When to see a doctor 🩺:</h4>
                    <p>Fatigue accompanied by any of these symptoms requires medical evaluation:</p>
                    <ul>
                        <li>Unexplained weight changes</li>
                        <li>Swollen lymph nodes</li>
                        <li>Persistent muscle aches</li>
                        <li>Cognitive difficulties</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}

function analyzeSleepIssues(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Sleep Health Analysis</h3>
            <div class="health-icon">🌙</div>
        </div>
        <div class="analysis-content">
            <h4>Possible sleep disorders:</h4>
            <ul class="condition-list">
                <li><strong>Insomnia</strong> - Difficulty falling/staying asleep</li>
                <li><strong>Sleep Apnea</strong> - Breathing pauses, daytime sleepiness</li>
                <li><strong>Restless Leg Syndrome</strong> - Urge to move legs at night</li>
                <li><strong>Circadian Rhythm Disorder</strong> - Mismatched sleep-wake cycle</li>
            </ul>
            
            <h4>Sleep influencers from your profile 🪪:</h4>
            <ul>`;
    
    if (healthData.foodChoices.includes("caffeine")) {
        analysis += `<li>Caffeine ☕ consumption affecting sleep</li>`;
    }
    if (healthData.activityLevel < 1.375) {
        analysis += `<li>Insufficient physical activity</li>`;
    }
    if (healthData.activityLevel > 1.55) {
        analysis += `<li>Intense exercise close to bedtime</li>`;
    }
    if (healthData.bmi > 30) {
        analysis += `<li>Higher BMI may affect sleep quality</li>`;
    }
    if (healthData.sleepDuration < 5){
        analysis += 'Try to sleep atleast 7-9 hours';
    }
    
    analysis += `</ul>
            
            <div class="sleep-plan">
                <h4>Sleep Optimization Protocol 🥱:</h4>
                <div class="sleep-tips">
                    <div class="tip">
                        <h5>Pre-Bed Routine (1-2 hours before):</h5>
                        <ul>
                            <li>Dim lights and avoid screens</li>
                            <li>Take warm bath/shower</li>
                            <li>Practice relaxation techniques</li>
                        </ul>
                    </div>
                    <div class="tip">
                        <h5>Bedroom Environment:</h5>
                        <ul>
                            <li>Keep temperature 18-20°C (65-68°F)</li>
                            <li>Use blackout curtains</li>
                            <li>Consider white noise machine</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}
function analyzeHeadache(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Headache Analysis</h3>
            <div class="health-icon">🤕</div>
        </div>
        <div class="analysis-content">
            <h4>Possible headache types:</h4>
            <ul class="condition-list">
                <li><strong>Tension Headache</strong> - Dull, constant pain on both sides</li>
                <li><strong>Migraine</strong> - Throbbing pain, often with nausea/sensitivity</li>
                <li><strong>Cluster Headache</strong> - Severe pain around one eye</li>
                <li><strong>Sinus Headache</strong> - Pain in forehead/cheekbones</li>
                <li><strong>Caffeine-Withdrawal Headache</strong> - From missing usual caffeine</li>
            </ul>
            
            <h4>Contributing factors from your profile 🪪:</h4>
            <ul>`;
    
    if (healthData.sleepDuration < 6) {
        analysis += `<li>Sleep deprivation (only ${healthData.sleepDuration} hours)</li>`;
    }
    if (healthData.waterIntake < 2) {
        analysis += `<li>Dehydration (only ${healthData.waterIntake}L water)</li>`;
    }
    if (healthData.foodChoices.includes("caffeine")) {
        analysis += `<li>Caffeine consumption may cause rebound headaches</li>`;
    }
    if (healthData.activityLevel < 1.375) {
        analysis += `<li>Sedentary lifestyle contributing to tension</li>`;
    }
    
    analysis += `</ul>
            
            <div class="recovery-tips">
                <h4>Headache Relief Strategies 😮‍💨:</h4>
                <div class="two-column">
                    <div>
                        <h5>Immediate Relief:</h5>
                        <ul>
                            <li>Apply cold/warm compress to forehead/neck</li>
                            <li>Massage temples and neck muscles</li>
                            <li>Rest in quiet, dark room</li>
                            <li>Hydrate with electrolyte solution</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Prevention:</h5>
                        <ul>
                            <li>Maintain regular sleep schedule</li>
                            <li>Practice stress management techniques</li>
                            <li>Keep headache diary to identify triggers</li>
                            <li>Stay hydrated throughout day</li>
                        </ul>
                    </div>
                </div>
                
                <div class="emergency-warning">
                    <h4>Seek immediate medical attention 🩺 if:</h4>
                    <ul>
                        <li>Sudden, severe "thunderclap" headache</li>
                        <li>Headache after head injury</li>
                        <li>Accompanied by fever, stiff neck, confusion</li>
                        <li>Weakness/numbness or vision/speech changes</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}

function analyzeFever(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Fever Analysis</h3>
            <div class="health-icon">🤒</div>
        </div>
        <div class="analysis-content">
            <h4>Possible causes of fever:</h4>
            <ul class="condition-list">
                <li><strong>Viral Infection</strong> - Common cold, flu, COVID-19</li>
                <li><strong>Bacterial Infection</strong> - Strep throat, UTI, pneumonia</li>
                <li><strong>Inflammatory Condition</strong> - Autoimmune disorders</li>
                <li><strong>Heat Exhaustion</strong> - From overexertion in heat</li>
                <li><strong>Vaccine Reaction</strong> - Temporary immune response</li>
            </ul>
            
            <h4>Fever Management:</h4>
            <div class="two-column">
                <div>
                    <h5>Home Care (for mild fever):</h5>
                    <ul>
                        <li>Stay hydrated with water/clear fluids</li>
                        <li>Rest in comfortable environment</li>
                        <li>Use lukewarm sponge bath (not cold)</li>
                        <li>Dress in lightweight clothing</li>
                    </ul>
                </div>
                <div>
                    <h5>Medication Guidance:</h5>
                    <ul>
                        <li>Acetaminophen or ibuprofen as directed</li>
                        <li>Avoid aspirin for children/teens</li>
                        <li>Don't combine fever reducers without advice</li>
                        <li>Follow dosage instructions carefully</li>
                    </ul>
                </div>
            </div>
            
            <div class="emergency-warning">
                <h4>Seek medical care immediately 🩺 if:</h4>
                <ul>
                    <li>Fever above 103°F (39.4°C) in adults</li>
                    <li>Fever lasting more than 3 days</li>
                    <li>Difficulty breathing or chest pain</li>
                    <li>Severe headache/stiff neck</li>
                    <li>Seizures or confusion</li>
                </ul>
            </div>
        </div>
    </div>`;
    
    return analysis;
}

function analyzeJointPain(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Joint Pain Analysis</h3>
            <div class="health-icon">🦵</div>
        </div>
        <div class="analysis-content">
            <h4>Possible joint conditions:</h4>
            <ul class="condition-list">
                <li><strong>Osteoarthritis</strong> - Wear-and-tear, common in weight-bearing joints</li>
                <li><strong>Rheumatoid Arthritis</strong> - Symmetrical joint swelling/stiffness</li>
                <li><strong>Gout</strong> - Sudden severe pain, often in big toe</li>
                <li><strong>Bursitis</strong> - Inflammation of fluid-filled cushions</li>
                <li><strong>Tendinitis</strong> - Overuse injury of tendons</li>
            </ul>
            
            <h4>Factors from your profile:</h4>
            <ul>`;
    
    if (healthData.bmi > 25) {
        analysis += `<li>Excess weight putting stress on joints (BMI ${healthData.bmi})</li>`;
    }
    if (healthData.activityLevel > 1.55) {
        analysis += `<li>High activity level may cause overuse injuries</li>`;
    }
    if (healthData.activityLevel < 1.375) {
        analysis += `<li>Sedentary lifestyle contributing to stiffness</li>`;
    }
    if (healthData.foodChoices.some(f => ["processed", "redmeat", "alcohol"].includes(f))) {
        analysis += `<li>Diet may contribute to inflammation</li>`;
    }
    
    analysis += `</ul>
            
            <div class="pain-management">
                <h4>Joint Pain Relief Plan:</h4>
                <div class="two-column">
                    <div>
                        <h5>Immediate Relief:</h5>
                        <ul>
                            <li>Apply ice (acute) or heat (chronic)</li>
                            <li>Gentle range-of-motion exercises</li>
                            <li>Over-the-counter anti-inflammatories</li>
                            <li>Supportive braces if needed</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Long-term Care:</h5>
                        <ul>
                            <li>Low-impact exercise (swimming, cycling)</li>
                            <li>Weight management if needed</li>
                            <li>Anti-inflammatory diet (omega-3s, antioxidants)</li>
                            <li>Physical therapy exercises</li>
                        </ul>
                    </div>
                </div>
                
                <div class="warning-box">
                    <h4>When to see a doctor 🩺:</h4>
                    <ul>
                        <li>Joint redness/swelling/warmth</li>
                        <li>Inability to bear weight</li>
                        <li>Pain lasting more than 2 weeks</li>
                        <li>Fever with joint pain</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}

function analyzeThroatPain(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Throat Pain Analysis</h3>
            <div class="health-icon">🗣️</div>
        </div>
        <div class="analysis-content">
            <h4>Possible throat conditions:</h4>
            <ul class="condition-list">
                <li><strong>Strep Throat</strong> - Sudden severe pain, fever, no cough</li>
                <li><strong>Viral Pharyngitis</strong> - Often with cold/flu symptoms</li>
                <li><strong>Tonsillitis</strong> - Swollen tonsils, possible white patches</li>
                <li><strong>Laryngitis</strong> - Hoarseness, voice loss</li>
                <li><strong>GERD/Heartburn</strong> - Acid reflux irritating throat</li>
            </ul>
            
            <h4>Symptom Relief:</h4>
            <div class="two-column">
                <div>
                    <h5>Home Remedies:</h5>
                    <ul>
                        <li>Warm salt water gargles</li>
                        <li>Honey (not for infants) in warm tea</li>
                        <li>Throat lozenges or hard candy</li>
                        <li>Humidifier to moisten air</li>
                    </ul>
                </div>
                <div>
                    <h5>Comfort Measures:</h5>
                    <ul>
                        <li>Stay hydrated with cool/warm fluids</li>
                        <li>Rest your voice</li>
                        <li>Eat soft, soothing foods</li>
                        <li>Over-the-counter pain relievers</li>
                    </ul>
                </div>
            </div>
            
            <div class="emergency-warning">
                <h4>Seek medical attention 🩺 if:</h4>
                <ul>
                    <li>Difficulty breathing/swallowing</li>
                    <li>Severe pain lasting >48 hours</li>
                    <li>High fever (>101°F/38.3°C)</li>
                    <li>Swollen lymph nodes or rash</li>
                    <li>Blood in saliva/phlegm</li>
                </ul>
            </div>
        </div>
    </div>`;
    
    return analysis;
}

function analyzeBreathingIssues(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Breathing Difficulty Analysis</h3>
            <div class="health-icon">🌬️</div>
        </div>
        <div class="analysis-content">
            <h4>Possible respiratory conditions:</h4>
            <ul class="condition-list">
                <li><strong>Asthma</strong> - Wheezing, chest tightness, often at night</li>
                <li><strong>COPD/Emphysema</strong> - Chronic smokers, progressive</li>
                <li><strong>Pneumonia</strong> - Fever, productive cough, fatigue</li>
                <li><strong>Allergic Reaction</strong> - Sudden onset with swelling</li>
                <li><strong>Anxiety/Panic Attack</strong> - Hyperventilation, tingling</li>
            </ul>
            
            <h4>Factors from your profile:</h4>
            <ul>`;
    
    if (healthData.activityLevel < 1.375) {
        analysis += `<li>Low fitness level may contribute to breathlessness</li>`;
    }
    if (healthData.bmi > 30) {
        analysis += `<li>Higher weight may affect breathing (BMI ${healthData.bmi})</li>`;
    }
    if (healthData.foodChoices.includes("processed")) {
        analysis += `<li>Processed foods may contribute to inflammation</li>`;
    }
    
    analysis += `</ul>
            
            <div class="breathing-help">
                <h4>Breathing Support:</h4>
                <div class="two-column">
                    <div>
                        <h5>For Mild Symptoms:</h5>
                        <ul>
                            <li>Pursed-lip breathing technique</li>
                            <li>Sit upright, lean forward slightly</li>
                            <li>Stay calm and relax shoulders</li>
                            <li>Use humidifier/inhale steam</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Prevention:</h5>
                        <ul>
                            <li>Avoid known triggers/allergens</li>
                            <li>Practice regular cardio exercise</li>
                            <li>Maintain healthy weight</li>
                            <li>Don't smoke/vape</li>
                        </ul>
                    </div>
                </div>
                
                <div class="emergency-alert">
                    <h4>EMERGENCY 🩺- Call for help if:</h4>
                    <ul>
                        <li>Lips/nails turning blue</li>
                        <li>Severe chest pain/pressure</li>
                        <li>Confusion or difficulty speaking</li>
                        <li>Rapid worsening of symptoms</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}
function analyzeHeartIssues(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Heart Health Analysis</h3>
            <div class="health-icon">🫀</div>
        </div>
        <div class="analysis-content">
            <h4>Possible cardiac conditions:</h4>
            <ul class="condition-list">
                <li><strong>Angina</strong> - Chest pressure/pain during exertion</li>
                <li><strong>Arrhythmia</strong> - Irregular or abnormal heart rhythm</li>
                <li><strong>Heart Failure</strong> - Fatigue, swelling, shortness of breath</li>
                <li><strong>Hypertension</strong> - Chronically elevated blood pressure</li>
                <li><strong>Pericarditis</strong> - Sharp chest pain worsened by breathing</li>
            </ul>
            
            <h4>Risk factors from your profile ❤️‍🩹:</h4>
            <ul>`;
    
    if (healthData.bmi > 25) {
        analysis += `<li>Elevated BMI (${healthData.bmi}) increases cardiac workload</li>`;
    }
    if (healthData.activityLevel < 1.375) {
        analysis += `<li>Sedentary lifestyle affects cardiovascular health</li>`;
    }
    if (healthData.foodChoices.some(f => ["fried", "fastfood", "processed"].includes(f))) {
        analysis += `<li>Diet high in unhealthy fats may impact cholesterol</li>`;
    }
    if (healthData.age > 45) {
        analysis += `<li>Age-related risk factors (${healthData.age} years old)</li>`;
    }
    
    analysis += `</ul>
            
            <div class="cardiac-care">
                <h4>Heart Health Recommendations:</h4>
                <div class="two-column">
                    <div>
                        <h5>Lifestyle Changes:</h5>
                        <ul>
                            <li>Adopt a heart-healthy diet (Mediterranean style)</li>
                            <li>Engage in regular aerobic exercise</li>
                            <li>Manage stress through relaxation techniques</li>
                            <li>Monitor blood pressure regularly</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Symptom Management:</h5>
                        <ul>
                            <li>Track symptoms with a journal</li>
                            <li>Learn to check your pulse</li>
                            <li>Recognize early warning signs</li>
                            <li>Follow prescribed medications strictly</li>
                        </ul>
                    </div>
                </div>
                
                <div class="emergency-alert">
                    <h4>CARDIAC EMERGENCY 💔 - Call emergency services if:</h4>
                    <ul>
                        <li>Chest pain lasting more than 15 minutes</li>
                        <li>Pain radiating to arm/jaw/back</li>
                        <li>Sudden severe shortness of breath</li>
                        <li>Fainting or near-fainting episode</li>
                        <li>Irregular pulse with dizziness</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}

function analyzeDizziness(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Dizziness Analysis</h3>
            <div class="health-icon">🌀</div>
        </div>
        <div class="analysis-content">
            <h4>Possible causes of dizziness:</h4>
            <ul class="condition-list">
                <li><strong>Vertigo (BPPV)</strong> - Brief spinning sensation with head movement</li>
                <li><strong>Low Blood Pressure</strong> - Especially when standing up</li>
                <li><strong>Inner Ear Problems</strong> - Often with hearing changes</li>
                <li><strong>Dehydration</strong> - From inadequate fluid intake</li>
                <li><strong>Anemia</strong> - With fatigue and pale skin</li>
                <li><strong>Anxiety Disorders</strong> - During panic attacks</li>
            </ul>
            
            <h4>Contributing factors from your profile:</h4>
            <ul>`;
    
    if (healthData.waterIntake < 2) {
        analysis += `<li>Low hydration (only ${healthData.waterIntake}L daily)</li>`;
    }
    if (healthData.sleepDuration < 6) {
        analysis += `<li>Insufficient sleep (${healthData.sleepDuration} hours)</li>`;
    }
    if (healthData.foodChoices.includes("caffeine")) {
        analysis += `<li>Caffeine may affect blood pressure regulation</li>`;
    }
    if (healthData.activityLevel < 1.375) {
        analysis += `<li>Low activity level may affect circulation</li>`;
    }
    
    analysis += `</ul>
            
            <div class="dizziness-management">
                <h4>Dizziness Relief Strategies:</h4>
                <div class="two-column">
                    <div>
                        <h5>Immediate Actions:</h5>
                        <ul>
                            <li>Sit or lie down immediately when dizzy</li>
                            <li>Focus on a stationary object</li>
                            <li>Hydrate with electrolyte solution</li>
                            <li>Perform slow head movements (for vertigo)</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Prevention:</h5>
                        <ul>
                            <li>Rise slowly from sitting/lying positions</li>
                            <li>Maintain consistent meal schedule</li>
                            <li>Practice balance exercises</li>
                            <li>Ensure adequate iron intake</li>
                        </ul>
                    </div>
                </div>
                
                <div class="emergency-warning">
                    <h4>Seek urgent medical care if dizziness occurs with:</h4>
                    <ul>
                        <li>Severe headache</li>
                        <li>Chest pain or palpitations</li>
                        <li>Difficulty speaking or walking</li>
                        <li>Fainting or loss of consciousness</li>
                        <li>Numbness/weakness in limbs</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}
function analyzeFoodPassion(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Nutrition & Food Passion Analysis</h3>
            <div class="health-icon">🍎</div>
        </div>
        <div class="analysis-content">
            <h4>Your Current Food Preferences:</h4>
            <ul class="food-choices">`;
    
    // Display user's selected food choices
    if (healthData.foodChoices.length > 0) {
        healthData.foodChoices.forEach(food => {
            analysis += `<li>${food.charAt(0).toUpperCase() + food.slice(1)}</li>`;
        });
    } else {
        analysis += `<li>No specific preferences indicated</li>`;
    }
    
    analysis += `</ul>
            
            <h4>Personalized Nutrition Advice:</h4>
            <div class="two-column">
                <div>
                    <h5>Based on Your Profile:</h5>
                    <ul>`;
    
    // BMI-based advice
    if (healthData.bmi < 18.5) {
        analysis += `<li>Increase calorie-dense foods: nuts, avocados, whole grains</li>`;
    } else if (healthData.bmi > 25) {
        analysis += `<li>Focus on fiber-rich foods to manage weight: vegetables, legumes</li>`;
    }
    
    // Activity level advice
    if (healthData.activityLevel > 1.55) {
        analysis += `<li>Increase protein intake for muscle recovery: ${healthData.weight * 1.2}g+ daily</li>`;
    }
    
    // General advice
    analysis += `<li>Hydration target: ${(healthData.weight * 0.033).toFixed(1)}L water daily</li>`;
    
    analysis += `</ul>
                </div>
                <div>
                    <h5>Healthy Food Passion Tips:</h5>
                    <ul>
                        <li>Try new colorful vegetables each week</li>
                        <li>Experiment with herbs/spices instead of salt</li>
                        <li>Prep healthy snacks in advance</li>
                        <li>Join local cooking classes</li>
                        <li>Start a small herb garden</li>
                    </ul>
                </div>
            </div>
            
            <div class="recipe-suggestions">
                <h4>Recipe Ideas You Might Enjoy:</h4>
                <ol>
                    <li><strong>Breakfast:</strong> Greek yogurt with mixed berries and chia seeds</li>
                    <li><strong>Lunch:</strong> Quinoa salad with roasted vegetables and lemon-tahini dressing</li>
                    <li><strong>Dinner:</strong> Grilled salmon with steamed broccoli and sweet potato mash</li>
                    <li><strong>Snack:</strong> Apple slices with almond butter</li>
                </ol>
            </div>
        </div>
    </div>`;
    
    return analysis;
}
function analyzeSkinIssues(query, healthData) {
    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Skin Redness & Itching Analysis</h3>
            <div class="health-icon">🧴</div>
        </div>
        <div class="analysis-content">
            <h4>Possible Skin Conditions:</h4>
            <ul class="condition-list">
                <li><strong>Eczema/Dermatitis</strong> - Dry, itchy patches, often in folds</li>
                <li><strong>Allergic Reaction</strong> - Sudden redness, hives, swelling</li>
                <li><strong>Psoriasis</strong> - Thick red patches with silvery scales</li>
                <li><strong>Rosacea</strong> - Facial redness, visible blood vessels</li>
                <li><strong>Contact Irritation</strong> - From soaps, fabrics, or chemicals</li>
            </ul>
            
            <h4>Contributing Factors:</h4>
            <ul>`;
    
    // Personalized factors
    if (healthData.foodChoices.some(f => ["dairy", "gluten", "processed"].includes(f))) {
        analysis += `<li>Diet may contain common irritants</li>`;
    }
    if (healthData.waterIntake < 2) {
        analysis += `<li>Dehydration can worsen skin conditions</li>`;
    }
    if (healthData.sleepDuration < 6) {
        analysis += `<li>Poor sleep reduces skin repair</li>`;
    }
    
    analysis += `</ul>
            
            <div class="skin-care-plan">
                <h4>Skin Relief Protocol:</h4>
                <div class="two-column">
                    <div>
                        <h5>Immediate Soothing:</h5>
                        <ul>
                            <li>Apply cold compress for 15 minutes</li>
                            <li>Use fragrance-free moisturizer</li>
                            <li>Try colloidal oatmeal baths</li>
                            <li>Wear loose, breathable clothing</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Long-term Care:</h5>
                        <ul>
                            <li>Identify and eliminate triggers</li>
                            <li>Use gentle, pH-balanced cleansers</li>
                            <li>Increase omega-3 fatty acids in diet</li>
                            <li>Manage stress through meditation/yoga</li>
                        </ul>
                    </div>
                </div>
                
                <div class="emergency-warning">
                    <h4>Seek Medical Help If:</h4>
                    <ul>
                        <li>Skin is blistering or peeling</li>
                        <li>Fever accompanies rash</li>
                        <li>Swelling affects breathing</li>
                        <li>Condition spreads rapidly</li>
                        <li>No improvement after 2 weeks</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    return analysis;
}
function analyzeThankYou(query, healthData) {
    // Safely get the user's name with a fallback
    const userName = healthData?.name || 'there';
    
    let message = '';
    if (query.includes('bye') || query.includes('see you')) {
        message = `It was a pleasure assisting you, ${userName}. Wishing you good health and happiness! Take care and see you next time.`;
    } else if (query.includes('thank') || query.includes('thanks') || query.includes('appreciate')) {
        message = `You're very welcome, ${userName}! Remember, your health matters. If you have more questions, I'm always here to help.`;
    } else if (query.includes('good') || query.includes('great') || query.includes('helpful')) {
        message = `I'm glad I could help, ${userName}. Stay positive and keep taking care of yourself!`;
    } else {
        message = `Thank you, ${userName}, for chatting with me! Feel free to ask more health questions whenever you need. Remember to stay hydrated, eat well, and get enough rest.`;
    }

    let analysis = `
    <div class="health-analysis">
        <div class="analysis-header">
            <h3>Thank You!</h3>
        </div>
        <div class="analysis-content">
            <p>${message}</p>
            <ul>
                <li>Tip: Regular checkups help you stay healthy.</li>
                <li>Tip: Small lifestyle changes can make a big difference.</li>
            </ul>
        </div>
    </div>`;
    return analysis;
}