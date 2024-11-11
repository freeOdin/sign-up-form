document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    // Add 'touched' class when user interacts with a field
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            this.classList.add('touched');
        });
    });

    // Password validation
    function validatePassword() {
        if (!password.classList.contains('touched')) return;
        
        const passwordValue = password.value;
        const minLength = 8;
        
        // Password requirements
        const hasUpperCase = /[A-Z]/.test(passwordValue);
        const hasLowerCase = /[a-z]/.test(passwordValue);
        const hasNumbers = /\d/.test(passwordValue);
        const hasSpecialChar = /[!@#$%^&*]/.test(passwordValue);
        
        if (passwordValue.length < minLength) {
            password.setCustomValidity('Password must be at least 8 characters long');
        } else if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
            password.setCustomValidity('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        } else {
            password.setCustomValidity('');
        }
    }

    // Confirm password validation
    function validateConfirmPassword() {
        if (!confirmPassword.classList.contains('touched')) return;
        
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    // Phone number validation
    function validatePhone() {
        if (!phone.classList.contains('touched')) return;
        
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.value) && phone.value !== '') {
            phone.setCustomValidity('Please enter a valid 10-digit phone number');
        } else {
            phone.setCustomValidity('');
        }
    }

    // Real-time validation
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);
    phone.addEventListener('input', validatePhone);
    
    // Validate on password change
    password.addEventListener('change', function() {
        validatePassword();
        validateConfirmPassword();
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        // Mark all fields as touched on form submission
        inputs.forEach(input => {
            input.classList.add('touched');
        });

        validatePassword();
        validateConfirmPassword();
        validatePhone();

        if (!form.checkValidity()) {
            e.preventDefault();
            // Show all validation messages
            const invalidInputs = form.querySelectorAll(':invalid');
            invalidInputs.forEach(input => {
                input.classList.add('error');
            });
        }
    });

    // Remove error class on input
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});
