

        let tasks = [];
        
        // Load tasks from localStorage if available
        if (localStorage.getItem('tasks')) {
            tasks = JSON.parse(localStorage.getItem('tasks'));
            renderTasks();
        }
        
        function addTask() {
            const taskInput = document.getElementById('task-input');
            const taskText = taskInput.value.trim();
            
            if (taskText) {
                tasks.push({
                    id: Date.now(),
                    text: taskText,
                    completed: false,
                    createdAt: new Date().toISOString()
                });
                
                saveTasks();
                renderTasks();
                taskInput.value = '';
                taskInput.focus();
            }
        }
        
        function editTask(id) {
            const task = tasks.find(task => task.id === id);
            if (!task) return;
            
            const newText = prompt('Edit your task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        }
        
        function toggleComplete(id) {
            const task = tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            }
        }
        
        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }
        
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        function renderTasks() {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            
            if (tasks.length === 0) {
                taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
                updateStats();
                return;
            }
            
            // Sort tasks: incomplete first, then by creation date
            const sortedTasks = [...tasks].sort((a, b) => {
                if (a.completed === b.completed) {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                }
                return a.completed ? 1 : -1;
            });
            
            sortedTasks.forEach(task => {
                const li = document.createElement('li');
                if (task.completed) {
                    li.classList.add('completed');
                }
                
                li.innerHTML = `
                    <div class="task-text" onclick="toggleComplete(${task.id})">${task.text}</div>
                    <div class="task-actions">
                        <button class="btn-edit" onclick="editTask(${task.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                
                taskList.appendChild(li);
            });
            
            updateStats();
        }
        
        function updateStats() {
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.completed).length;
            
            document.getElementById('total-tasks').textContent = 
                `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'}`;
            document.getElementById('completed-tasks').textContent = 
                `${completedTasks} completed`;
        }
        
        // Add task when pressing Enter
        document.getElementById('task-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
