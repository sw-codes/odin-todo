class Project {
    constructor() {
        
    }
}

class TodoItem {
    constructor(title, description, priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
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

export {Project, TodoItem};