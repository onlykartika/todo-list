import TodoList from  "./todolist.js"
import TodoItem from "./todoitem.js"

const DoList = new TodoList()

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission();
    });
};

const clearItems = document.getElementById("clearItems")
clearItems.addEventListener("click", (event) => {
    const list = DoList.getList()
    if(list.length) {
        const confirmed = confirm("Are you sure?")

        if(confirmed){
            DoList.clearList()
            updatePersistenData(DoList.getList())
            refreshThePage()
        }
    }

    loadListObject()
    refreshThePage()
})

const loadListObject = () => {
    const storedList = localStorage.getItem("myToDoList")
    if (typeof storedList !== "string") return
    const parsedList = JSON.parse(storedList)
    parsedList.forEach(itemObj => {
        const newToDoItem = createNewItem(itemObj._id, itemObj._item)
        DoList.addItemToList(newToDoItem)
    })
}

const refreshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItemEntry();
};

const clearListDisplay = () => {
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderList = () => {
    const list = DoList.getList();
    list.forEach((item) => {
        buildListItem(item);
    });
};

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId(); // Use getId() method
    check.tabIndex = 0;

    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem(); // Use getItem() method

    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById("listItems");
    container.appendChild(div);

    addClickListenerToCheckbox(check);
};

const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        DoList.removeItemFromList(checkbox.id);
        updatePersistenData(DoList.getList())
        setTimeout(() => {
            refreshThePage();
        }, 1000);
    });
};

const updatePersistenData = (listArray) => {
    localStorage.setItem("myTodoList", JSON.stringify(listArray))
}

const clearItemEntryField = () => {
    document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = () => {
    document.getElementById("newItem").focus();
};

const processSubmission = () => {
    const newEntryText = getUserEntry();
    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText);
    DoList.addItemToList(toDoItem);
    updatePersistenData(DoList.getList())
    refreshThePage();
};

const getUserEntry = () => {
    return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = DoList.getList();
    if (list.length > 0) {
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
};

const createNewItem = (itemId, itemText) => {
    const toDo = new TodoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
};

