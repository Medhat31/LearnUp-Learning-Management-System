document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('loggedInUser');
    if (!currentUser) return; // auth.js will handle the redirect

    // 1. Clock functionality
    const timeDisplay = document.querySelector('.time div p:nth-child(2)');
    if (timeDisplay) {
        setInterval(() => {
            timeDisplay.textContent = new Date().toLocaleTimeString();
        }, 1000);
    }

    // 2. Announcements
    const announcements = [
        "Welcome to the LearnUp LMS!",
        "Midterm exams begin next week.",
        "System maintenance scheduled for Friday night."
    ];
    let annIndex = 0;
    
    const annContent = document.querySelector('.announcements .content');
    const nextBtn = document.querySelector('.announcements .header button');
    
    if (annContent && nextBtn) {
        annContent.textContent = announcements[annIndex];
        
        nextBtn.addEventListener('click', () => {
            annIndex = (annIndex + 1) % announcements.length;
            annContent.textContent = announcements[annIndex];
        });
    }

    // 3. Statistics - USER SPECIFIC ISOLATION
    const tasksKey = `tasks_${currentUser}`;
    const coursesKey = `courses_${currentUser}`;

    const tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
    const courses = JSON.parse(localStorage.getItem(coursesKey)) || [];

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    const pending = total - completed;

    const totalTasksEl = document.querySelector('.total-tasks p:first-child');
    const completedEl = document.querySelector('.completed p:first-child');
    const pendingEl = document.querySelector('.pending p:first-child');
    const coursesEl = document.querySelector('.active-courses p:first-child');

    if (totalTasksEl) totalTasksEl.textContent = total;
    if (completedEl) completedEl.textContent = completed;
    if (pendingEl) pendingEl.textContent = pending;
    if (coursesEl) coursesEl.textContent = courses.length;
});