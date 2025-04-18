import { TodoItem } from "./projects";

const items = []
// const formDialog = document.querySelector('#form-dialog');
// const sidebar = document.querySelector('#sidebar');

// const sidebarTitle = document.createElement('h1');
// sidebarTitle.textContent = 'do your todo';

// const sidebarAddItemButton = document.createElement('button');
// sidebarAddItemButton.textContent = 'add todo';
// sidebarAddItemButton.addEventListener('click', () => {
//     formDialog.showModal();
// })

// sidebar.appendChild(sidebarTitle);
// sidebar.appendChild(sidebarAddItemButton);

// formDialog.addEventListener('close', () => {
//     domController.renderItems()
// })


const domController = {
    init: function () {
        this.renderSidebar();
        this.renderHeader();
    },
    renderSidebar: function () {
        const formDialog = document.querySelector('#form-dialog');
        const sidebar = document.querySelector('#sidebar');

        const sidebarTitle = document.createElement('h1');
        sidebarTitle.textContent = 'do your todo';

        const sidebarAddItemButton = document.createElement('button');
        sidebarAddItemButton.textContent = 'add todo';
        sidebarAddItemButton.addEventListener('click', () => {
            formDialog.showModal();
            this.renderFormContent();
        })

        sidebar.appendChild(sidebarTitle);
        sidebar.appendChild(sidebarAddItemButton);
    },
    renderFormContent: function () {
        const formDialog = document.querySelector('#form-dialog');
        const formTodoTitle = document.querySelector('#todoTitle');
        const formTodoDesc = document.querySelector('#todoDesc');
        const formTodoPriority = document.querySelector('#todoPriority');
        const formConfirmBtn = document.querySelector('#dialogConfirmBtn');

        formTodoTitle.value = '';
        formTodoDesc.value = '';
        formTodoPriority.value = '';

        formDialog.addEventListener('close', () => {
            if (formTodoTitle === '') {

            } else {
                items.push(new TodoItem(formTodoTitle.value, formTodoDesc.value, formTodoPriority.value))
                this.renderItem(new TodoItem(formTodoTitle.value, formTodoDesc.value, formTodoPriority.value));
                console.log('items length: ' + items.length);
                //this.renderItems();
                console.log(items);
            }
        })

        formConfirmBtn.addEventListener('click', (event) => {
            event.preventDefault();
            formDialog.close();
        });

    },
    renderItem: function (item) {
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
    },
    renderItems: function () {
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

            todoDiv.appendChild(titleP);
            todoDiv.appendChild(descP);
            todoDiv.appendChild(priorityP);
            todoContentDiv.appendChild(todoDiv);
        }
    },
    renderHeader: function () {
        const headerDiv = document.querySelector('#content-header');
        const titleh1 = document.createElement('h2');
        titleh1.textContent = 'home';
        headerDiv.appendChild(titleh1);
    }
}

export { domController };