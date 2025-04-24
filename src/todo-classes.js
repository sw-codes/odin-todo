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

    getCollection() {
        return this.collection;
    }
}

class TodoCollection {
    items = [];

    constructor(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}

export {TodoItem, TodoCollection};