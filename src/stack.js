import { LinkedList, Node } from "./linked_list";

function Stack() {
  this.list = new LinkedList();
}

Stack.prototype.push = function(data) {
  let p = new Node(data);

  if (p == null) return -1;

  this.list.addHead(p);
};

Stack.prototype.pop = function() {
  if (this.list.head == null) return null;
  let p = this.list.head;
  this.list.deleteHead();
  return p;
};

Stack.prototype.getTop = function() {
  if (this.list.head != null) return this.list.head.data;
  return null;
};

Stack.prototype.isEmpty = function() {
  return this.list.head == null;
};

module.exports = Stack;
