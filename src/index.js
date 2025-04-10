import "./styles.css";
import {showPage} from "./render-page.js";
import {toDoItems} from "./todoitems.js";

const toDoList = {
    init: function() {
        showPage.displayAllNotes(toDoItems.list);
    }
}

toDoList.init();