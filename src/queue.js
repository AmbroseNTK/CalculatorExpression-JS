// Linked Tail - >

import { LinkedList, Node } from "./linked_list";

function Queue() {
  this.list = new LinkedList();
}

Queue.prototype.enQueue = function(node) {
  if (node != null) {
    this.list.addTail(node);
  }
};

Queue.prototype.deQueue = function() {
  let tempHead = this.list.head;
  if (tempHead != null) {
    let data = this.list.head.data;
    this.list.deleteHead();
    return data;
  }
  return null;
};

module.exports = Queue;
