document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const saveBtn = document.querySelector('.cont button');

    // Display current username
    const currentUser = localStorage.getItem('loggedInUser');
    if (currentUser) {
        usernameInput.value = currentUser;
    }

    saveBtn.addEventListener('click', () => {
        const newUsername = usernameInput.value.trim();
        
        if (newUsername && newUsername !== currentUser) {
            
            // 1. Migrate user's Tasks
            const oldTasks = localStorage.getItem(`tasks_${currentUser}`);
            if (oldTasks) {
                localStorage.setItem(`tasks_${newUsername}`, oldTasks);
                localStorage.removeItem(`tasks_${currentUser}`);
            }

            // 2. Migrate user's Courses
            const oldCourses = localStorage.getItem(`courses_${currentUser}`);
            if (oldCourses) {
                localStorage.setItem(`courses_${newUsername}`, oldCourses);
                localStorage.removeItem(`courses_${currentUser}`);
            }

            // 3. Update the global loggedInUser token
            localStorage.setItem('loggedInUser', newUsername);
            
            // 4. Update the 'registeredUsers' array if you are using the signup page logic
            let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            let userIndex = registeredUsers.findIndex(u => u.username === currentUser);
            if(userIndex !== -1) {
                registeredUsers[userIndex].username = newUsername;
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            }

            alert('Username updated and data migrated successfully!');
            
            // Update the navbar name immediately
            const navNameDiv = document.querySelector('nav div:nth-child(2)');
            if (navNameDiv) navNameDiv.textContent = newUsername;
            
            // Refresh to ensure all current-page variables pick up the new name
            window.location.reload(); 

        } else if (!newUsername) {
            alert('Username cannot be empty.');
        } else {
            alert('No changes made.');
        }
    });
});