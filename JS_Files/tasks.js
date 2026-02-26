document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('loggedInUser');
    const storageKey = `tasks_${currentUser}`; // User-specific key

    const titleInput = document.getElementById('title');
    const dateInput = document.getElementById('date');
    const priorityInput = document.getElementById('priority');
    const addBtn = document.querySelector('.add-button button');
    const searchInput = document.getElementById('search');
    const table = document.querySelector('table');

    let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

    function renderTasks(filteredTasks = tasks) {
        const headerRow = table.querySelector('tr:first-child').outerHTML;
        table.innerHTML = headerRow;

        filteredTasks.forEach((task) => {
            const realIndex = tasks.findIndex(t => t === task);
            const tr = document.createElement('tr');
            
            if (task.status === "Done") {
                tr.style.textDecoration = "line-through";
            }
            
            tr.innerHTML = `
                <td>${task.title}</td>
                <td>${task.date}</td>
                <td>${task.priority}</td>
                <td>${task.status}</td>
                <td>
                    <button onclick="toggleTask(${realIndex})">Mark as ${task.status === "Done" ? "Not Done" : "Done"}</button>
                    <button onclick="deleteTask(${realIndex})">Delete</button>
                </td>
            `;
            table.appendChild(tr);
        });
    }

    addBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const date = dateInput.value;
        const priority = priorityInput.value;

        if (title && date && priority) {
            tasks.push({ title, date, priority, status: 'Not Done' });
            localStorage.setItem(storageKey, JSON.stringify(tasks)); // Save to specific user
            renderTasks();
            
            titleInput.value = '';
            dateInput.value = '';
            priorityInput.value = 'Low';
        } else {
            alert("Please fill in all task fields.");
        }
    });

    window.toggleTask = (index) => {
        tasks[index].status = tasks[index].status === 'Done' ? 'Not Done' : 'Done';
        localStorage.setItem(storageKey, JSON.stringify(tasks)); // Save to specific user
        
        const term = searchInput.value.toLowerCase();
        renderTasks(tasks.filter(t => t.title.toLowerCase().includes(term)));
    };

    window.deleteTask = (index) => {
        if(confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(tasks)); // Save to specific user
            
            const term = searchInput.value.toLowerCase();
            renderTasks(tasks.filter(t => t.title.toLowerCase().includes(term)));
        }
    };

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        renderTasks(tasks.filter(t => t.title.toLowerCase().includes(term)));
    });

    renderTasks();
});