document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('loggedInUser');
    const storageKey = `courses_${currentUser}`; // User-specific key

    const courseNameInput = document.getElementById('course-name');
    const instructorInput = document.getElementById('instructor');
    const saveBtn = document.querySelector('.fields button');
    const table = document.querySelector('table');

    let courses = JSON.parse(localStorage.getItem(storageKey)) || [];

    function renderCourses() {
        // Keep the top header row, clear the rest
        const headerRow = table.querySelector('tr:first-child').outerHTML;
        table.innerHTML = headerRow;

        courses.forEach((course, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${course.name}</td>
                <td>${course.instructor}</td>
                <td><button onclick="deleteCourse(${index})">Delete</button></td>
            `;
            table.appendChild(tr);
        });
    }

    saveBtn.addEventListener('click', () => {
        const name = courseNameInput.value.trim();
        const inst = instructorInput.value.trim();
        
        if (name && inst) {
            courses.push({ name, instructor: inst });
            localStorage.setItem(storageKey, JSON.stringify(courses)); // Save to specific user
            renderCourses();
            
            // Clear inputs
            courseNameInput.value = '';
            instructorInput.value = '';
        } else {
            alert("Please fill in both fields.");
        }
    });

    window.deleteCourse = (index) => {
        if(confirm("Are you sure you want to delete this course?")) {
            courses.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(courses)); // Save to specific user
            renderCourses();
        }
    }

    // Initial load
    renderCourses();
});