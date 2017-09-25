const Node = require('./node');

class LinkedList {
    
    constructor(){
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data){
        let node = new Node(data);

        if(this.isEmpty()){
            this._tail = node;
            this._head = node;
        }
        else {
            this._tail.next = node;
            this._tail = node;
            node.prev = this._tail;
        }

        this.length++;
        return this;
    }

    head(){
        return this._head && this._head.data;
    }

    tail(){
        return this._tail && this._tail.data;
    }

    at(index){
        if(index < 0 || index >= this.length || this.length === 0) throw new Error();
        return this.getNodeByIndex(index).data;
    }

    insertAt(index, data) {
        if (index < 0 || index > this.length) throw new Error();

        if (index === this.length) {
            this.append(data);
        }
        else{
            if(index === 0){
                let node = new Node(data, null, this._head);
                this._head.prev = node;
                node.next = this._head;
                this._head = node;
            }
            else {
                let node = new Node(data, this.getNodeByIndex(index - 1), this.getNodeByIndex(index));
                this.getNodeByIndex(index - 1).next = node;
                this.getNodeByIndex(index).prev = node;
            }
        }

        this.length++;
        return this;
    }

    isEmpty(){
        return this.length  === 0;
    }

    clear(){
        this._tail = null;
        this._head = null;
        this.length = 0;
        return this;
    }

    deleteAt(index){

        if(index < 0 || index >= this.length || this.length === 0) throw new Error();

        if(this.length === 1){
            return this.clear();
        }

        this.getNodeByIndex(index - 1).next = this.getNodeByIndex(index + 1);
        this.getNodeByIndex(index + 1).prev = this.getNodeByIndex(index - 1);

        this.length--;
        return this;

    }

    reverse(){
        for(let i = 0; i < Math.floor(this.length/2); i++){
            let curNode = this.getNodeByIndex(i);
            let lastNode = this.getNodeByIndex(this.length - 1 - i);
            let temp = curNode.data;
            curNode.data = lastNode.data;
            lastNode.data = temp;
        }

        return this;
    }

    indexOf(data){
        for(let i = 0; i < this.length; i++){
            if(this.at(i) === data){
                return i;
            }
        }
        return -1;
    }

    getNodeByIndex(index){
        let node = this._head;

        for(let i = 0; i < index; i++){
            node = node.next;
        }
        return node;
    }

}

module.exports = LinkedList;
