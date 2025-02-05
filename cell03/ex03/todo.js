document.addEventListener('DOMContentLoaded', function() {
    const savedTodo = getCookie('todo');
    if (savedTodo) {
        addTodo(savedTodo);
    }

    document.getElementById('new').addEventListener('click', function() {
        const todo = prompt('Enter a new TODO:');
        if (todo && todo.trim()) {
            addTodo(todo);
            document.cookie = 'todo=' + todo + ';path=/;max-age=31536000';
        }
    });
});

function addTodo(text) {
    const div = document.createElement('div');
    div.textContent = text;
    
    div.addEventListener('click', function() {
        if (confirm('Do you want to remove this TODO?')) {
            div.remove();
            document.cookie = 'todo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    });

    const list = document.getElementById('ft_list');
    list.insertBefore(div, list.firstChild);
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[1];
    return null;
}
