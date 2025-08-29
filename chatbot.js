async function askSaara() {
    const userQuery = document.getElementById("userQuery").value.trim();
    if (!userQuery) return;

    addUserMessage(userQuery);
    document.getElementById("userQuery").value = "";

    // Add typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.id = "typing-indicator";
    typingIndicator.classList.add("chatbot-message", "bot-message");
    typingIndicator.textContent = "Saara is thinking...";
    document.getElementById("chatbotMessages").appendChild(typingIndicator);

    try {
        // 🔹 Step 1: Call Gemini API
        const geminiResponse = await callGeminiAPI(userQuery);

        // Extract text
        let reply = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

        // 🔹 Step 2: If Gemini gives nothing OR vague reply, fallback to health rules
        if (!reply || reply.trim() === "" || reply.includes("SORRY")) {
            reply = generateSaaraResponse(userQuery);
        }

        // Remove typing indicator
        document.getElementById("typing-indicator").remove();

        addBotMessage(reply);

    } catch (err) {
        console.error("Gemini API error:", err);

        // Remove typing indicator
        const indicator = document.getElementById("typing-indicator");
        if (indicator) indicator.remove();

        // Fallback to rule-based response
        const fallback = generateSaaraResponse(userQuery);
        addBotMessage(fallback || "⚠ I couldn't process your request.");
    }
}

let conversationHistory = [];

function showSaaraChatbot() {
    document.getElementById("saaraChatbot").style.display = "block";
    const healthData = getUserHealthData();
    const greeting = `Hello ${healthData.name}! I'm Saara, your health assistant. ` +
                    'Describe your symptoms and I will guide you. How are you feeling today?'
    
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
}

function addUserMessage(message) {
    addMessage("user", message);
}

function generateSaaraResponse(query) {
    const healthData = getUserHealthData();
    query = query.toLowerCase();
    
    // Stomach/Digestive Issues
    if (query.includes("stomach") || query.includes("abdominal") || query.includes("digest") || 
        query.includes("bloat") || query.includes("nausea") || query.includes("heartburn") ||
        query.includes("gastric") || query.includes("indigestion") || query.includes("constipation") ||
        query.includes("diarrhea") || query.includes("vomit") || query.includes("acid reflux") ||
        query.includes("ulcer") || query.includes("loose motion")) {
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
             query.includes("hot") || query.includes("body") || query.includes("chills") ||
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
    // Thank you/Goodbye
    else if (query.includes("ok") || query.includes("thank you") || query.includes("good bye") || 
        query.includes("see you") || query.includes("good") || query.includes("bye") ||
        query.includes("thanks") || query.includes("appreciate") || query.includes("grateful") ||
        query.includes("cheers") || query.includes("take care") || query.includes("later")) {
        return analyzeThankYou(query, healthData);
    }
    // General Health Advice
    else {
        return `I understand you're asking about "${query}". Based on your health profile, I recommend consulting with a healthcare professional for personalized advice. In the meantime, ensure you're getting adequate sleep (${healthData.sleepDuration} hours currently), staying hydrated (${healthData.waterIntake}L daily), and maintaining a balanced diet. Is there a specific symptom you'd like me to help analyze?`;
    }
}
