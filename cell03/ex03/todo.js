function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function initToDoList() {
  const ftList = document.getElementById('ft_list');
  const tasks = loadTasks();

  tasks.forEach(task => addTaskToDOM(task));

  document.getElementById('newTask').addEventListener('click', () => {
    const task = prompt('Enter a new TO DO:');
    if (task) {
      tasks.push(task); 
      addTaskToDOM(task);
      saveTasks(tasks); 
    }
  });

  function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.textContent = task;
    taskDiv.addEventListener('click', () => {
      if (confirm('Do you want to remove this TO DO?')) {
        const index = tasks.indexOf(task);
        if (index > -1) {
          tasks.splice(index, 1);
          ftList.removeChild(taskDiv);
          saveTasks(tasks); 
        }
      }
    });
    ftList.appendChild(taskDiv);  
  }
}

document.addEventListener('DOMContentLoaded', initToDoList);
