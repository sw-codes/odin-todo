import "./styles.css";
import { domController } from "./dom-controller";

const app = {
    init: function () {
        domController.init();
    }
}

//app.init();

class TodoItem {
    constructor(title, description, priority, collection) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.collection = collection;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getPriority() {
        return this.priority;
    }
}

class TodoCollection {
    items = [];

    constructor(title) {
        this.title = title;
    }
}

//arrays for todo storage
let todoCollections = [];
let items = [];


const addTodoDialog = document.querySelector('#add-todo-dialog');
const newProjectDialog = document.querySelector('#new-project-dialog');

//create and show sidebar content

//show add todo item dialog
const sidebarAddItemButton = document.createElement('button');
sidebarAddItemButton.textContent = 'add todo';

sidebarAddItemButton.addEventListener('click', () => {
    addTodoDialog.showModal();
})
//

//show add project dialog
const sidebarAddProjectButton = document.createElement('button');
sidebarAddProjectButton.textContent = 'create project';

sidebarAddProjectButton.addEventListener('click', () => {
    newProjectDialog.showModal();
})
//

const userProjectTitle = document.querySelector('#user-project-title');
const newProjectConfirmButton = document.querySelector('#new-project-confirm-button');

newProjectDialog.addEventListener('close', () => {
    createProjectTab(newProjectDialog.returnValue);
    userProjectTitle.value = '';
})
newProjectConfirmButton.addEventListener('click', () => {
    event.preventDefault();
    newProjectDialog.close(userProjectTitle.value);
})

//add sidebar content
const sidebarButtonDiv = document.querySelector('#sidebar-button-div');
sidebarButtonDiv.appendChild(sidebarAddProjectButton);
sidebarButtonDiv.appendChild(sidebarAddItemButton);

//collect the input data from the add todo item form and open and close the dialog
const userTodoTitle = document.querySelector('#todoTitle');
const userTodoDesc = document.querySelector('#todoDesc');
const userTodoPriority = document.querySelector('#todoPriority');
const addTodoConfirmBtn = document.querySelector('#dialogConfirmBtn');

addTodoDialog.addEventListener('close', () => {
    if (addTodoDialog.returnValue === 'cancel') {
        return;
    } else if (addTodoDialog.returnValue === '') {
        return;
    } else {
        items.push(new TodoItem(userTodoTitle.value, userTodoDesc.value, userTodoPriority.value))
        renderItems(items);

        userTodoTitle.value = '';
        userTodoDesc.value = '';
        userTodoPriority.setAttribute('selected', 'high');
    }
})

addTodoConfirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addTodoDialog.close(userTodoTitle.value);
});

//set the page header
const headerDiv = document.querySelector('#content-header');
const titleh1 = document.createElement('h2');
titleh1.textContent = 'home';
headerDiv.appendChild(titleh1);

//show a single item from the items array on the page
function renderItem(item) {
    const todoContentDiv = document.querySelector('#todo-content');

    const todoDiv = document.createElement('div');
    todoDiv.setAttribute('class', 'todo-div');

    const titleP = document.createElement('p');
    titleP.textContent = item.title;

    const descP = document.createElement('p');
    descP.textContent = item.description;

    const priorityP = document.createElement('p');
    priorityP.textContent = item.priority;

    todoDiv.appendChild(titleP);
    todoDiv.appendChild(descP);
    todoDiv.appendChild(priorityP);
    todoContentDiv.appendChild(todoDiv);
}

//show all items in the items array on the page
function renderItems() {
    const todoContentDiv = document.querySelector('#todo-content');
    while (todoContentDiv.firstChild) {
        todoContentDiv.removeChild(todoContentDiv.lastChild);
    }

    for (let i = 0; i < items.length; i++) {
        const todoDiv = document.createElement('div');
        todoDiv.setAttribute('class', 'todo-div');

        const titleP = document.createElement('p');
        titleP.textContent = items[i].title;

        const descP = document.createElement('p');
        descP.textContent = items[i].description;

        const priorityP = document.createElement('p');
        priorityP.textContent = items[i].priority;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', () => {
            items.splice(items.indexOf(items[i]), 1);
            renderItems();
        })

        todoDiv.appendChild(titleP);
        todoDiv.appendChild(descP);
        todoDiv.appendChild(priorityP);
        todoDiv.appendChild(deleteButton);
        todoContentDiv.appendChild(todoDiv);
    }
}

//create project button in the sidebar
function createProjectTab(projectTitle) {
    const projectListDiv = document.querySelector('#project-list');
    const projectButton = document.createElement('button');
    projectButton.setAttribute('class', 'project-button');
    projectButton.textContent = projectTitle;
    projectButton.addEventListener('click', () => {
        console.log('project button name: ' + projectButton.textContent);
    })

    projectListDiv.appendChild(projectButton);
    todoCollections.push(projectTitle);
    populateCollectionList();
}

function populateCollectionList() {
    const todoCollectionsSelect = document.querySelector('#todo-collections')
    while (todoCollectionsSelect.firstChild) {
        todoCollectionsSelect.removeChild(todoCollectionsSelect.lastChild);
    }

    for (let i = 0; i < todoCollections.length; i++) {
        const collectionOption = document.createElement('option');
        collectionOption.textContent = todoCollections[i];



        todoCollectionsSelect.appendChild(collectionOption);

    }
    const noCollectionOption = document.createElement('option');
    noCollectionOption.textContent = 'none';
    todoCollectionsSelect.appendChild(noCollectionOption);
}

populateCollectionList();