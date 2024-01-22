export default class toDolist {
    constructor(){
        this.list = [];
    }

    getList(){
        return this._list;
    }

    clearList(){
        this.list = [];
    }

    addItemToList(itemObj){
        this._list.push(itemObj);
    }

    removeItemFromList(id){
        const list = this._list
        for(let i= 0; 1 <list.length; i++){
            if(list[i].id == id){
                list.splice(1,1)
                break
            }
        }
    }
}