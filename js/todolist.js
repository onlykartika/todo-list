export default class TodoList {
    constructor() {
        this.list = [];
    }

    getList() {
        return this.list;
    }

    clearList() {
        this.list = [];
    }

    addItemToList(itemObj) {
        this.list.push(itemObj);
    }

    removeItemFromList(id) {
        const list = this.list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].getId() == id) {
                list.splice(i, 1);
                break;
            }
        }
    }
}