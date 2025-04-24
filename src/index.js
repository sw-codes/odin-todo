import "./styles.css";
import { TodoItem } from "./todo-classes";

const app = {
    init: function () {

    }
}

//app.init();

//arrays for todo storage
let todoCollections = [];
let items = [];

const addTodoDialog = document.querySelector('#add-todo-dialog');
const newCollectionDialog = document.querySelector('#new-collection-dialog');

//create and show sidebar content

//show add todo item dialog
const sidebarAddItemButton = document.createElement('button');
sidebarAddItemButton.textContent = 'Add Todo';

sidebarAddItemButton.addEventListener('click', () => {
    addTodoDialog.showModal();
})
//

//show add project dialog
const sidebarAddCollectionButton = document.createElement('button');
sidebarAddCollectionButton.textContent = 'Create Collection';

sidebarAddCollectionButton.addEventListener('click', () => {
    newCollectionDialog.showModal();
})
//

const userProjectTitle = document.querySelector('#user-collection-title');
const newProjectConfirmButton = document.querySelector('#new-collection-confirm-button');

newCollectionDialog.addEventListener('close', () => {
    if (newCollectionDialog.returnValue === 'cancel') {
        return;
    } else if (newCollectionDialog.returnValue === '') {
        return;
    } else {
        createCollectionTab(newCollectionDialog.returnValue);
        userProjectTitle.value = '';
    }

})
newProjectConfirmButton.addEventListener('click', () => {
    event.preventDefault();
    newCollectionDialog.close(userProjectTitle.value);
})

//add sidebar content
const sidebarButtonDiv = document.querySelector('#sidebar-button-div');
sidebarButtonDiv.appendChild(sidebarAddCollectionButton);
sidebarButtonDiv.appendChild(sidebarAddItemButton);

//collect the input data from the add todo item form and open and close the dialog
const userTodoTitle = document.querySelector('#todo-title');
const userTodoDesc = document.querySelector('#todo-desc');
const userTodoCollection = document.querySelector('#todo-collections');
const userTodoPriority = document.querySelector('#todo-priority');
const addTodoConfirmBtn = document.querySelector('#dialog-confirm-btn');

addTodoDialog.addEventListener('close', () => {
    if (addTodoDialog.returnValue === 'cancel') {
        return;
    } else if (addTodoDialog.returnValue === '') {
        return;
    } else {
        items.push(
            new TodoItem(
                userTodoTitle.value,
                userTodoDesc.value,
                userTodoPriority.value,
                userTodoCollection.value)
        )
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

//set home list item event listener
const homeH4 = document.querySelector('#home-collection-h4');
homeH4.addEventListener('click', () => {
    titleh1.textContent = 'home';
    renderItems();
})

//show all items in the items array on the page
function renderItems() {

    titleh1.textContent = 'home';

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

        const collectionP = document.createElement('p');
        collectionP.textContent = items[i].getCollection();

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.setAttribute('class', 'todo-delete-button');
        deleteButton.addEventListener('click', () => {
            items.splice(items.indexOf(items[i]), 1);
            renderItems();
        })

        todoDiv.appendChild(titleP);
        todoDiv.appendChild(descP);
        todoDiv.appendChild(priorityP);
        todoDiv.appendChild(collectionP);
        todoDiv.appendChild(deleteButton);
        todoContentDiv.appendChild(todoDiv);
    }
}

//render only the items with the given collection name
function renderItemsByCollectionName(collectionName) {
    const todoContentDiv = document.querySelector('#todo-content');
    while (todoContentDiv.firstChild) {
        todoContentDiv.removeChild(todoContentDiv.lastChild);
    }

    titleh1.textContent = collectionName;

    for (let i = 0; i < items.length; i++) {
        if (items[i].getCollection() === collectionName) {
            const todoDiv = document.createElement('div');
            todoDiv.setAttribute('class', 'todo-div');

            const titleP = document.createElement('p');
            titleP.textContent = items[i].title;

            const descP = document.createElement('p');
            descP.textContent = items[i].description;

            const priorityP = document.createElement('p');
            priorityP.textContent = items[i].priority;

            const collectionP = document.createElement('p');
            collectionP.textContent = items[i].collection;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.addEventListener('click', () => {
                items.splice(items.indexOf(items[i]), 1);
                renderItems();
            })

            todoDiv.appendChild(titleP);
            todoDiv.appendChild(descP);
            todoDiv.appendChild(priorityP);
            todoDiv.appendChild(collectionP);
            todoDiv.appendChild(deleteButton);
            todoContentDiv.appendChild(todoDiv);
        }
    }
}

//create project button in the sidebar
function createCollectionTab(collectionTitle) {

    todoCollections.push(collectionTitle);

    const collectionListDiv = document.querySelector('.user-collection-div');

    const collectionLiDiv = document.createElement('div');
    collectionLiDiv.setAttribute('class', 'collection-li-div');

    const collectionLi = document.createElement('li');

    const collectionLiH4 = document.createElement('h4');
    collectionLiH4.setAttribute('class', 'collection-h4');
    collectionLiH4.textContent = collectionTitle;

    const collectionDeleteBtn = document.createElement('button');
    collectionDeleteBtn.textContent = 'x';
    collectionDeleteBtn.setAttribute('class', 'collection-del-btn');

    collectionDeleteBtn.addEventListener('click', () => {
        removeCollection(collectionTitle);
    })

    collectionLi.addEventListener('click', () => {
        renderItemsByCollectionName(collectionTitle);
    })

    collectionLi.appendChild(collectionLiH4);
    collectionLiDiv.appendChild(collectionLi);
    collectionLiDiv.appendChild(collectionDeleteBtn);
    collectionListDiv.appendChild(collectionLiDiv);

    populateCollectionList();
}

//remove collection from todoCollections array
function removeCollection(collectionTitle) {
    for (let i = 0; i < todoCollections.length; i++) {
        if (todoCollections[i] === collectionTitle) {
            todoCollections.splice(todoCollections.indexOf(todoCollections[i]), 1);
        }
    }
    renderCollectionList();
}

//show list of collections in sidebar
function renderCollectionList() {
    const collectionListDiv = document.querySelector('.user-collection-div');
    while (collectionListDiv.firstChild) {
        collectionListDiv.removeChild(collectionListDiv.lastChild);
    }
    for (let i = 0; i < todoCollections.length; i++) {
        const collectionLiDiv = document.createElement('div');
        collectionLiDiv.setAttribute('class', 'collection-li-div');

        const collectionLi = document.createElement('li');

        const collectionLiH4 = document.createElement('h4');
        collectionLiH4.setAttribute('class', 'collection-h4');
        collectionLiH4.textContent = todoCollections[i];

        const collectionDeleteBtn = document.createElement('button');
        collectionDeleteBtn.textContent = 'delete';

        collectionDeleteBtn.addEventListener('click', () => {
            removeCollection(todoCollections[i]);
        })

        collectionLi.addEventListener('click', () => {
            renderItemsByCollectionName(todoCollections[i]);
        })

        collectionLi.appendChild(collectionLiH4);
        collectionLiDiv.appendChild(collectionLi);
        collectionLiDiv.appendChild(collectionDeleteBtn);
        collectionListDiv.appendChild(collectionLiDiv);
    }
}

//adds items to the select dropdown in todo creation
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