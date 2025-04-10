class ToDoItem {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const toDoProject = {
    list: [],
    addItemToProject: (toDoItem) => {
        list.push(toDoItem);
    },
    removeItemFromProjct: (toDoItem) => {
        list.pop(toDoItem);
    }
}

const toDoItems = {
    list: [
        {
            id: crypto.randomUUID(),
            title: "noteOne",
            description: "noteOneDescription",
            dueDate: "noteOneDueDate",
            priority: "noteOnePriority"
        },
        {
            id: crypto.randomUUID(),
            title: "noteTwo",
            description: "noteTwoDescription",
            dueDate: "noteTwoDueDate",
            priority: "noteTwoPriority"
        },
        {
            id: crypto.randomUUID(),
            title: "noteThree",
            description: "noteThreeDescription",
            dueDate: "noteThreeDueDate",
            priority: "noteThreePriority"
        },
        {
            id: crypto.randomUUID(),
            title: "noteThree",
            description: "noteThreeDescription",
            dueDate: "noteThreeDueDate",
            priority: "noteThreePriority"
        },
        {
            id: crypto.randomUUID(),
            title: "noteThree",
            description: "noteThreeDescription",
            dueDate: "noteThreeDueDate",
            priority: "noteThreePriority"
        }
    ],
    addItemToProject: (toDoItem) => {
        list.push(toDoItem);
    },
    removeItemFromProjct: (toDoItem) => {
        //use item id to remove item from array
    },
    getItems: () => {
        return this.list;
    }
}

export { ToDoItem, toDoProject, toDoItems };