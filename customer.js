// Switches view from the support ticket form to the quick survey component upon submission
function handleSupportSubmit(event) {
  event.preventDefault();
  document.getElementById('support-form-section').classList.add('hidden');
  document.getElementById('survey-section').classList.remove('hidden');
}

// Handles survey submission and displays a final thank you prompt
function handleSurveySubmit(event) {
  event.preventDefault();
  document.getElementById('survey-section').classList.add('hidden');
  document.getElementById('survey-thankyou').classList.remove('hidden');
}