document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("userQuery").addEventListener("keypress", function(e) {
        if (e.key === "Enter") askSaara();
    });
});

function startInput() {
    document.getElementById("inputSection").style.display = "block";
}

function validateAndAnalyze() {
    clearErrors();
    let isValid = true;

    document.getElementById("loadingGif").style.display = "block";

    // Validate all fields
    let name = document.getElementById("name").value.trim();
    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required.";
        isValid = false;
    }

    let age = document.getElementById("age").value;
    if (age === "" || age < 1 || age > 100) {
        document.getElementById("ageError").innerText = "Age must be between 1 and 100.";
        isValid = false;
    }

    let weight = document.getElementById("weight").value;
    if (weight === "" || weight < 10 || weight > 250) {
        document.getElementById("weightError").innerText = "Weight must be between 10 and 250 kg.";
        isValid = false;
    }

    let height = document.getElementById("height").value;
    if (height === "" || height < 20 || height > 250) {
        document.getElementById("heightError").innerText = "Height must be between 20 and 250 cm.";
        isValid = false;
    }

    let gender = document.getElementById("gender").value;
    if (gender === "") {
        document.getElementById("genderError").innerText = "Gender is required.";
        isValid = false;
    }

    let activityLevel = document.getElementById("activityLevel").value;
    if (activityLevel === "") {
        document.getElementById("activityLevelError").innerText = "Activity Level is required.";
        isValid = false;
    }

    let waterIntake = document.getElementById("waterIntake").value;
    if (waterIntake === "" || waterIntake <= 0) {
        document.getElementById("waterIntakeError").innerText = "Water intake must be a positive number.";
        isValid = false;
    }

    if (isValid) {
        setTimeout(() => {
            analyzeHealth();
            showSaaraChatbot();
            document.getElementById("loadingGif").style.display = "none";
        }, 2000);
    } else {
        document.getElementById("loadingGif").style.display = "none";
    }
}

function clearErrors() {
    let errorElements = document.querySelectorAll(".error");
    errorElements.forEach((element) => {
        element.innerText = "";
    });
}