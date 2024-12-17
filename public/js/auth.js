document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Add your login logic here
            console.log('Login attempt:', { email, password });
        });
    }

    if (registerForm) {
        const roleSelect = document.getElementById('role');
        
        // Add role-specific validation
        roleSelect.addEventListener('change', function() {
            const selectedRole = this.value;
            const phoneInput = document.getElementById('phone');
            
            switch(selectedRole) {
                case 'admin':
                    // Admin requires special validation
                    phoneInput.setAttribute('pattern', '^[0-9]{10}$');
                    phoneInput.setAttribute('title', 'Phone number must be 10 digits');
                    break;
                case 'teacher':
                    // Teachers need valid phone numbers
                    phoneInput.setAttribute('pattern', '^[0-9]{10}$');
                    phoneInput.setAttribute('title', 'Phone number must be 10 digits');
                    break;
                case 'guardian':
                    // Guardians must provide valid contact number
                    phoneInput.setAttribute('pattern', '^[0-9]{10}$');
                    phoneInput.setAttribute('title', 'Please provide a valid contact number');
                    break;
            }
        });

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userName = document.getElementById('userName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const role = document.getElementById('role').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }

            // Role-specific validation
            if (!validateRoleSpecificRequirements(role, { phone, email })) {
                return;
            }

            // Add your registration logic here
            console.log('Registration attempt:', { 
                userName, 
                email, 
                phone, 
                role, 
                password 
            });
        });

        // Password strength indicator
        const passwordInput = document.getElementById('password');
        const strengthIndicator = document.getElementById('passwordStrength');

        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let message = '';

            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;

            switch (strength) {
                case 0:
                case 1:
                    message = '<span class="text-danger">Weak password</span>';
                    break;
                case 2:
                case 3:
                    message = '<span class="text-warning">Medium password</span>';
                    break;
                case 4:
                case 5:
                    message = '<span class="text-success">Strong password</span>';
                    break;
            }

            strengthIndicator.innerHTML = message;
        });
    }

    // Helper function for role-specific validation
    function validateRoleSpecificRequirements(role, data) {
        const { phone, email } = data;
        
        // Common phone number validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return false;
        }

        // Role-specific validations
        switch(role) {
            case 'admin':
                // Add any admin-specific validation
                if (!email.endsWith('@admin.com')) {
                    alert('Admin email must end with @admin.com');
                    return false;
                }
                break;
            case 'teacher':
                // Add any teacher-specific validation
                if (!email.includes('@')) {
                    alert('Please enter a valid email address');
                    return false;
                }
                break;
            case 'guardian':
                // Add any guardian-specific validation
                if (!email.includes('@')) {
                    alert('Please enter a valid email address');
                    return false;
                }
                break;
            default:
                alert('Please select a valid role');
                return false;
        }

        return true;
    }

    // Password visibility toggle
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Add loading state to buttons
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const button = this.querySelector('button[type="submit"]');
            button.disabled = true;
            button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
            // Remove loading state after 2 seconds (simulate API call)
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = button.getAttribute('data-original-text') || 'Submit';
            }, 2000);
        });
    });
}); 