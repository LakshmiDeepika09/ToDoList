document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('search-bar').addEventListener('input', filterTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.category, task.priority, task.dueDate);
        document.getElementById('task-list').appendChild(li);
    });
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('task-list').getElementsByTagName('li');
    
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        const text = task.firstChild.textContent;
        const category = task.dataset.category;
        const priority = task.dataset.priority;
        const dueDate = task.dataset.dueDate;
        tasks.push({ text, category, priority, dueDate });
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = document.getElementById('task-input').value.trim();
    const category = document.getElementById('task-category').value;
    const priority = document.getElementById('task-priority').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskText === '') return;

    const li = createTaskElement(taskText, category, priority, dueDate);
    document.getElementById('task-list').appendChild(li);

    // Save tasks after adding a new one
    saveTasks();
    document.getElementById('task-input').value = '';
}

function createTaskElement(text, category, priority, dueDate) {
    const li = document.createElement('li');
    li.textContent = `${text} - Due: ${dueDate}`;
    li.classList.add(category, priority);
    li.dataset.category = category;
    li.dataset.priority = priority;
    li.dataset.dueDate = dueDate;

    // Task Click (Mark as Done)
    li.addEventListener('click', () => {
        li.classList.toggle('done');
        saveTasks();  // Save tasks after marking as done
    });

    // Add Delete Button
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = () => {
        li.remove();
        saveTasks();  // Save tasks after deletion
    };
    li.appendChild(delBtn);

    return li;
}

function filterTasks() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const tasks = document.getElementById('task-list').getElementsByTagName('li');
    
    for (let task of tasks) {
        const taskText = task.firstChild.textContent.toLowerCase();
        if (taskText.includes(searchQuery)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    }
}

// Load tasks when the page loads
window.onload = loadTasks;