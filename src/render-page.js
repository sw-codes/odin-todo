import toDoItems from "./todoitems.js";

const showPage = {
    displayAllNotes: (noteArray) => {
        noteArray.forEach(element => {
            const noteDiv = document.querySelector('.note-div');
            const toDoItemDiv = document.createElement('div');
            const toDoTitle = document.createElement('h3');
            const toDoP = document.createElement('p');

            toDoItemDiv.setAttribute('class', 'item-div');
            toDoTitle.textContent = element.title;
            toDoP.textContent = element.description;

            toDoItemDiv.appendChild(toDoTitle);
            toDoItemDiv.appendChild(toDoP);
            noteDiv.appendChild(toDoItemDiv);
        });
    }
}

export {showPage};