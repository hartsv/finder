// Initialize stats starting at zero
let totalRenters = 0;
let totalUnits = 0;

// DOM Elements
const rentersElement = document.getElementById('renters-count');
const unitsElement = document.getElementById('units-count');
const uploadButton = document.getElementById('simulate-upload-btn');

// Function to update the DOM with animation effect
function updateStatsDisplay() {
    rentersElement.textContent = totalRenters;
    unitsElement.textContent = totalUnits;
}

// Function triggered when a new upload happens
function handleNewUpload() {
    totalRenters += 1; // Increment user count
    totalUnits += 1;   // Increment unit count
    
    updateStatsDisplay();
    
    // Optional pulse animation effect
    rentersElement.style.transform = 'scale(1.1)';
    unitsElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        rentersElement.style.transform = 'scale(1)';
        unitsElement.style.transform = 'scale(1)';
    }, 200);
}

// Hook this function to your actual form submission or use this button for testing
uploadButton.addEventListener('click', handleNewUpload);

// Initial render call
updateStatsDisplay();