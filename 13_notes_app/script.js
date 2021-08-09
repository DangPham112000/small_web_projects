const addNoteBtn = document.querySelector('.add-btn');

addNoteBtn.addEventListener('click', () => {
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');

    noteEl.innerHTML = `
        <div class="tools">
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main hidden">
        </div>
        <textarea></textarea>
    `;
    
    const editBtn = noteEl.querySelector('.edit-btn');
    const deleteBtn = noteEl.querySelector('.delete-btn');

    const mainEl = noteEl.querySelector('.main');
    const textareaEl = noteEl.querySelector('textarea');

    editBtn.addEventListener('click', () => {
        mainEl.classList.toggle('hidden');
        textareaEl.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        noteEl.remove();
    });

    textareaEl.addEventListener('input', (e) => {
        const value = e.target.value;

        mainEl.innerHTML = marked(value);
    });

    document.body.appendChild(noteEl);
});






