$(document).ready(function () {
    function getCookies() {
        const cookies = document.cookie.split('; ');
        const result = {};
        cookies.forEach(cookie => {
            const [key, value] = cookie.split('=');
            result[key] = decodeURIComponent(value);
        });
        return result;
    }

    function saveTasks(tasks) {
        document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/`;
    }

    function loadTasks() {
        const cookies = getCookies();
        return cookies.tasks ? JSON.parse(cookies.tasks) : [];
    }

    function initToDoList() {
        const $ftList = $("#ft_list");
        const tasks = loadTasks();

        tasks.forEach(task => addTaskToDOM(task));

        $("#newTask").on("click", function () {
            const task = prompt("Enter a new TO DO:");
            if (task) {
                tasks.unshift(task);
                addTaskToDOM(task);
                saveTasks(tasks);
            }
        });

        function addTaskToDOM(task) {
            const $taskDiv = $("<div>").text(task).on("click", function () {
                if (confirm("Do you want to remove this TO DO?")) {
                    const index = tasks.indexOf(task);
                    if (index > -1) {
                        tasks.splice(index, 1);
                        $taskDiv.remove();
                        saveTasks(tasks);
                    }
                }
            });
            $ftList.prepend($taskDiv);
        }
    }

    initToDoList();
});
