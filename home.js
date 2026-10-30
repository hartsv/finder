// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const authModal = document.getElementById('authModal');
    const navAuthBtn = document.getElementById('navAuthBtn');
    const closeModal = document.getElementById('closeModal');

    const tabSignin = document.getElementById('tabSignin');
    const tabSignup = document.getElementById('tabSignup');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    // Open modal when clicking navigation button
    if (navAuthBtn) {
        navAuthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.classList.add('show');
        });
    }

    // Close modal on 'X'
    closeModal.addEventListener('click', () => {
        authModal.classList.remove('show');
    });

    // Close modal on background click
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('show');
        }
    });

    // Switch to Sign In Tab
    tabSignin.addEventListener('click', () => {
        tabSignin.classList.add('active');
        tabSignup.classList.remove('active');
        signInForm.classList.add('active');
        signUpForm.classList.remove('active');
    });

    // Switch to Sign Up Tab
    tabSignup.addEventListener('click', () => {
        tabSignup.classList.add('active');
        tabSignin.classList.remove('active');
        signUpForm.classList.add('active');
        signInForm.classList.remove('active');
    });
});

// Google Sign In Callback
function handleCredentialResponse(response) {
    console.log("Google JWT Token:", response.credential);
    alert("Successfully authenticated with Google!");
    document.getElementById('authModal').classList.remove('show');
}