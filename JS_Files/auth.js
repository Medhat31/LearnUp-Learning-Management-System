document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('loggedInUser');
    const path = window.location.pathname;
    
    // Redirect to login if not logged in
    if (!currentUser && !path.includes('login.html')) {
        window.location.href = 'login.html';
    }

    // Dynamically set the username in the Top Navbar
    const navNameDivs = document.querySelectorAll('nav div:nth-child(2)');
    navNameDivs.forEach(div => {
        if (path.includes('dashboard.html')) {
            div.textContent = `Hello '${currentUser}'`;
        } else {
            div.textContent = currentUser;
        }
    });

    // Handle Logout
    const logoutBtns = document.querySelectorAll('.logout');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser'); // Clears localStorage
            window.location.href = 'login.html'; // Returns to login page
        });
    });
});