const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const todosEl = document.getElementById('todos');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoText = inputEl.value;

    if (todoText) {
        const todoEl = document.createElement('li');

        todoEl.innerText = todoText;
        todosEl.appendChild(todoEl);

        inputEl.value = '';
    }

});