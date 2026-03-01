document.addEventListener('DOMContentLoaded', () => {
    console.log("Login script loaded successfully."); 

    if (localStorage.getItem('loggedInUser')) {
        window.location.href = 'dashboard.html';
        return; 
    }

    
    const form = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');

    const rememberMe = document.getElementById('checkbox');
    const savedUser = localStorage.getItem('rememberedUser');
    const savedPass = localStorage.getItem('rememberedPass');

    if (savedUser && savedPass) {
        document.getElementById('userName').value = savedUser;
        document.getElementById('password').value = savedPass;
        rememberMe.checked = true;
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            console.log("Submit button clicked, page refresh prevented.");
            
            errorDiv.style.display = 'none'; 
            
            const user = document.getElementById('userName').value.trim();
            const pass = document.getElementById('password').value;

            if (!user || !pass) {
                console.log("Error: Fields are empty.");
                errorDiv.textContent = 'All fields are required.';
                errorDiv.style.display = 'block';
                return;
            }

            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const foundUser = registeredUsers.find(u => u.username === user);

            if (!foundUser) {
                console.log("Error: User not found in localStorage.");
                errorDiv.textContent = 'Account not found. Please sign up first.';
                errorDiv.style.display = 'block';
                return;
            }

            if (foundUser.password !== pass) {
                console.log("Error: Password mismatch.");
                errorDiv.textContent = 'Incorrect password.';
                errorDiv.style.display = 'block';
                return;
            }

            if (rememberMe.checked) {
                localStorage.setItem('rememberedUser', user);
                localStorage.setItem('rememberedPass', pass);
            } else {
                localStorage.removeItem('rememberedUser');
                localStorage.removeItem('rememberedPass');
            }

            console.log("Login successful! Redirecting...");
            localStorage.setItem('loggedInUser', user);
            window.location.href = 'dashboard.html';
        });
    } else {
        console.error("Could not find a form with id='loginForm'");
    }
});