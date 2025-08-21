let conversationHistory = [];

function showSaaraChatbot() {
    document.getElementById("saaraChatbot").style.display = "block";
    const healthData = getUserHealthData();
    const greeting = `Hello ${healthData.name}! I'm Saara, your health assistant. ` +
                    'Describe your symptomes and I will gide you '
    
    addBotMessage(greeting);
}

function getUserHealthData() {
    return {
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        weight: parseFloat(document.getElementById("weight").value),
        height: parseFloat(document.getElementById("height").value),
        bmi: parseFloat((document.getElementById("weight").value / 
             ((document.getElementById("height").value/100) ** 2)).toFixed(2)),
        sleepDuration: calculateSleepDuration(
            document.getElementById("bedtime").value,
            document.getElementById("wakeTime").value
        ),
        waterIntake: parseFloat(document.getElementById("waterIntake").value),
        activityLevel: document.getElementById("activityLevel").value,
        foodChoices: Array.from(document.querySelectorAll(".food-options input:checked"))
                      .map(item => item.value)
    };
}

function calculateSleepDuration(bedtime, wakeTime) {
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
    
    // Handle overnight sleep (if wake time is earlier than bedtime, it's next day)
    if (wakeTimeDate <= bedtimeDate) {
        wakeTimeDate.setDate(wakeTimeDate.getDate() + 1);
    }
    
    const diffMs = wakeTimeDate - bedtimeDate;
    return (diffMs / (1000 * 60 * 60)).toFixed(1); // Return hours with 1 decimal
}

function addMessage(sender, message) {
    const messagesDiv = document.getElementById("chatbotMessages");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatbot-message", `${sender}-message`);
    messageDiv.innerHTML = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addBotMessage(message) {
    addMessage("bot", message);
    // Voice functionality is handled by the HTML implementation
}

function addUserMessage(message) {
    addMessage("user", message);
}

function askSaara() {
    const userQuery = document.getElementById("userQuery").value.trim();
    if (!userQuery) return;
    
    addUserMessage(userQuery);
    document.getElementById("userQuery").value = "";
    
    // Add typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.id = "typing-indicator";
    typingIndicator.classList.add("chatbot-message", "bot-message");
    typingIndicator.textContent = "Saara is analyzing your question...";
    document.getElementById("chatbotMessages").appendChild(typingIndicator);
    
    setTimeout(() => {
        // Remove typing indicator if it still exists
        const indicator = document.getElementById("typing-indicator");
        if (indicator) {
            indicator.remove();
        }
        
        const response = generateSaaraResponse(userQuery);
        addBotMessage(response);
    }, 1500);
}

function generateSaaraResponse(query) {
    const healthData = getUserHealthData();
    query = query.toLowerCase();
    
    // Stomach/Digestive Issues
    if (query.includes("stomach") || query.includes("abdominal") || query.includes("digest") || 
        query.includes("bloat") || query.includes("nausea") || query.includes("heartburn") ||
        query.includes("gastric") || query.includes("indigestion") || query.includes("constipation") ||
        query.includes("diarrhea") || query.includes("vomit") || query.includes("acid reflux") ||
        query.includes("ulcer") || query.includes("cramp") || query.includes("loose motion")) {
        return analyzeStomachIssues(query, healthData);
    }
    // Fatigue/Energy Issues
    else if (query.includes("tired") || query.includes("fatigue") || query.includes("energy") || 
             query.includes("exhaust") || query.includes("drowsy") || query.includes("letharg") ||
             query.includes("weak") || query.includes("sluggish") || query.includes("burnout") ||
             query.includes("no energy") || query.includes("sleepy")) {
        return analyzeFatigue(query, healthData);
    }
    // Sleep Issues
    else if (query.includes("sleep") || query.includes("insomnia") || query.includes("restless") || 
             query.includes("wake up") || query.includes("can't sleep") || query.includes("sleepless") ||
             query.includes("nightmare") || query.includes("bad sleep") || query.includes("sleep disorder") ||
             query.includes("not sleeping") || query.includes("broken sleep") || query.includes("sleep problem")) {
        return analyzeSleepIssues(query, healthData);
    }
    // Headache/Migraine
    else if (query.includes("headache") || query.includes("migraine") || query.includes("head pain") || 
             query.includes("head ache") || query.includes("head pound") || query.includes("temple pain") ||
             query.includes("sinus pain") || query.includes("pressure in head") || query.includes("throbbing head") ||
             query.includes("cluster headache") || query.includes("pain in skull")) {
        return analyzeHeadache(query, healthData);
    }
    // Fever
    else if (query.includes("fever") || query.includes("high temperature") || query.includes("febrile") || 
             (query.includes("hot") && query.includes("body")) || query.includes("chills") ||
             query.includes("temperature") || query.includes("sweating") || query.includes("shivering") ||
             query.includes("body heat") || query.includes("feverish")) {
        return analyzeFever(query, healthData);
    }
    // Joint/Muscle Pain
    else if (query.includes("joint") || query.includes("pain") || query.includes("ache") || 
             query.includes("muscle") || query.includes("backache") || query.includes("arthritis") ||
             query.includes("sore") || query.includes("stiff") || query.includes("cramp") ||
             query.includes("sprain") || query.includes("tendon") || query.includes("bone pain")) {
        return analyzeJointPain(query, healthData);
    }
    // Throat Pain
    else if (query.includes("throat") || query.includes("sore throat") || query.includes("swallow") || 
             query.includes("laryng") || query.includes("tonsil") || query.includes("pharyngitis") ||
             query.includes("difficulty swallowing") || query.includes("scratchy throat") ||
             query.includes("throat infection") || query.includes("dry throat")) {
        return analyzeThroatPain(query, healthData);
    }
    // Breathing Issues
    else if (query.includes("breath") || query.includes("wheeze") || query.includes("asthma") || 
             query.includes("shortness") || (query.includes("cough") && !query.includes("head")) ||
             query.includes("difficulty breathing") || query.includes("chest tightness") ||
             query.includes("respiratory") || query.includes("breathing problem") ||
             query.includes("gasping") || query.includes("trouble breathing")) {
        return analyzeBreathingIssues(query, healthData);
    }
    else if (query.includes("heart") || query.includes("chest") || query.includes("cardio") || 
             query.includes("palpitat") || query.includes("blood pressure") || query.includes("heartbeat") ||
             query.includes("angina") || query.includes("heart pain") || query.includes("chest pain") ||
             query.includes("arrhythmia") || query.includes("heart attack")) {
        return analyzeHeartIssues(query, healthData);
    }
    else if (query.includes("dizz") || query.includes("vertigo") || query.includes("lightheaded") || 
        query.includes("woozy") || query.includes("spinning") || query.includes("unsteady") ||
        query.includes("faint") || query.includes("balance") || query.includes("unstable") ||
        query.includes("dizzy spell") || query.includes("loss of balance")) {
    return analyzeDizziness(query, healthData);
}
else if (query.includes("food") || query.includes("poison") || (query.includes("vomiting") || query.includes("passion") || 
        query.includes("diarrhoea") || query.includes("lose motation") || query.includes("eat") ||
        query.includes("poisoning") || query.includes("allergy") || query.includes("intolerance") ||
        query.includes("bad food") || query.includes("contaminated") || query.includes("food sickness"))) {
    return analyzeFoodPassion(query, healthData);
}
else if (query.includes("ok") || query.includes("thank you") || query.includes("good bye") || 
        query.includes("see you") || query.includes("good") || query.includes("bye") ||
        query.includes("thanks") || query.includes("appreciate") || query.includes("grateful") ||
        query.includes("cheers") || query.includes("take care") || query.includes("later")) {
    return analyzeThankyou(query, healthData);
}
else if (query.includes("skin") || query.includes("rash") || query.includes("acne") || 
             query.includes("eczema") || query.includes("dermatitis") || query.includes("itch") ||
             query.includes("psoriasis") || query.includes("hives") || query.includes("redness") ||
             query.includes("skin allergy") || query.includes("dry skin") || query.includes("skin infection")) {
        return analyzeSkinIssues(query, healthData);
    }
    // General Health Advice
    else {
        return "I am SORRY , currently i can't answer your query,I will improve myself in future"+
               "So If you don't mind can you aks a different query ";
    }
    
}