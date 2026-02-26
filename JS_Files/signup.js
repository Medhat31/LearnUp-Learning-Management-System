document.addEventListener('DOMContentLoaded', () => {
    console.log("Signup script loaded successfully."); // Debug check

    if (localStorage.getItem('loggedInUser')) {
        window.location.href = 'dashboard.html';
        return; 
    }

    const signupForm = document.getElementById('signupForm');
    const errorDiv = document.getElementById('signupError');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            console.log("Signup Submit clicked, page refresh prevented."); // Debug check
            
            errorDiv.style.display = 'none'; 

            const username = document.getElementById('newUserName').value.trim();
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!username || !password || !confirmPassword) {
                console.log("Error: Fields are empty.");
                errorDiv.textContent = 'All fields are required.';
                errorDiv.style.display = 'block';
                return;
            }

            if (password.length < 6) {
                console.log("Error: Password too short.");
                errorDiv.textContent = 'Password must be at least 6 characters.';
                errorDiv.style.display = 'block';
                return;
            }

            if (password !== confirmPassword) {
                console.log("Error: Passwords do not match.");
                errorDiv.textContent = 'Passwords do not match.';
                errorDiv.style.display = 'block';
                return;
            }

            let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            
            const userExists = registeredUsers.find(u => u.username === username);
            if (userExists) {
                console.log("Error: Username taken.");
                errorDiv.textContent = 'Username already exists. Please choose another.';
                errorDiv.style.display = 'block';
                return;
            }

            console.log("Signup successful! Saving user and redirecting...");
            registeredUsers.push({ username, password });
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'dashboard.html';
        });
    } else {
        console.error("Could not find a form with id='signupForm'");
    }
});