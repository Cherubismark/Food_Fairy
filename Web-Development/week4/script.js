// Get the forms
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const modeLabel = document.getElementById('modeLabel');

// Check local storage for saved theme
if (localStorage.getItem('theme') === 'light') {
    enableLightMode();
}

// Add event listeners to the forms
registrationForm.addEventListener('submit', validateRegistrationForm);
loginForm.addEventListener('submit', validateLoginForm);

// Add event listener to the theme toggle
themeToggle.addEventListener('change', toggleTheme);

// Function to toggle between dark and light mode
function toggleTheme() {
    if (themeToggle.checked) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

// Enable light mode
function enableLightMode() {
    body.classList.remove('dark');
    document.querySelectorAll('form, label, input').forEach(el => el.classList.remove('dark'));
    localStorage.setItem('theme', 'light');
    modeLabel.textContent = 'Light Mode';
}

// Enable dark mode
function enableDarkMode() {
    body.classList.add('dark');
    document.querySelectorAll('form, label, input').forEach(el => el.classList.add('dark'));
    localStorage.setItem('theme', 'dark');
    modeLabel.textContent = 'Dark Mode';
}

// Function to validate the registration form
function validateRegistrationForm(event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    const age = document.getElementById('age');
    const gender = document.querySelectorAll('input[name="gender"]');
    const country = document.getElementById('country');
    const terms = document.getElementById('terms');

    if (name.value.trim() === '') { alert('Name is required'); return; }
    if (email.value.trim() === '') { alert('Email is required'); return; }
    if (password.value.trim() === '') { alert('Password is required'); return; }
    if (confirmPassword.value.trim() === '') { alert('Confirm Password is required'); return; }
    if (password.value !== confirmPassword.value) { alert('Passwords do not match'); return; }
    if (age.value < 18 || age.value > 100) { alert('Age must be between 18 and 100'); return; }

    let genderChecked = false;
    gender.forEach(radioButton => { if (radioButton.checked) genderChecked = true; });
    if (!genderChecked) { alert('Gender is required'); return; }
    if (country.value === '') { alert('Country is required'); return; }
    if (!terms.checked) { alert('You must agree to the terms and conditions'); return; }

    alert('Registration successful!');
    registrationForm.reset();
}

// Function to validate the login form
function validateLoginForm(event) {
    event.preventDefault();
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');

    if (loginEmail.value.trim() === '') { alert('Email is required'); return; }
    if (loginPassword.value.trim() === '') { alert('Password is required'); return; }

    alert('Login successful!');
    loginForm.reset();
}