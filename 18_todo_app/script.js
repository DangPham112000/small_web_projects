const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const todosEl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
    updateLS();
});

function addTodo(todo) {   

    let todoText = inputEl.value;
    
    if (todoText || todo) {
        const todoEl = document.createElement('li');
        todoEl.innerHTML = `            
            <div class="front">
                <i class="fas fa-check"></i>
                <p></p>
            </div>
            <i class="back fas fa-times"></i>
        `;
        
        if (todo) {
            todoText = todo.text;
            if (todo.completed) {
                todoEl.classList.add('completed');
            }
        }

        todoEl.querySelector('.front > p').innerText = todoText;
        todosEl.appendChild(todoEl);

        todoEl.querySelector('.front > i').addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });
        todoEl.querySelector('i.back').addEventListener('click', (e) => {
            todoEl.remove();
            updateLS();
        });


        inputEl.value = '';
    }
}

function updateLS() {
    const todoEls = document.querySelectorAll('li');

    const todos = [];

    todoEls.forEach(todoEl => {
        todos.push({
            text: todoEl.querySelector('.front > p').innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}