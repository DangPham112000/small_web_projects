const addNoteBtn = document.querySelector('.add-btn');

const notesData = JSON.parse(localStorage.getItem('notes'));

if (notesData) {
    notesData.forEach(noteData => {
        addNewNote(noteData);
    });
}

addNoteBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(noteData = '') {
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
    textareaEl.value = noteData;

    editBtn.addEventListener('click', () => {
        mainEl.classList.toggle('hidden');
        textareaEl.classList.toggle('hidden');
    });
    if (noteData) {
        editBtn.click();
        mainEl.innerHTML = marked(noteData);
    }

    deleteBtn.addEventListener('click', () => {
        noteEl.remove();
    });

    textareaEl.addEventListener('input', (e) => {
        const value = e.target.value;

        mainEl.innerHTML = marked(value);

        updateLS();
    });

    document.body.appendChild(noteEl);
}


function updateLS() {
    const textareaEls = document.querySelectorAll('textarea');

    const notesData = [];
    textareaEls.forEach(textareaEl => notesData.push(textareaEl.value));

    localStorage.setItem('notes', JSON.stringify(notesData));
}






