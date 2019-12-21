const Node = function(data = {}) {
  this.data = data;
  this.next = null;
};

function LinkedList() {
  this.head = null;
  this.tail = null;
}

LinkedList.prototype.addTail = function(node) {
  let tail = this.head;
  if (tail == null) {
    this.addHead(node);
  }
  if (tail != null) {
    while (tail.next != null) {
      tail = tail.next;
    }
    tail.next = node;
    this.tail = node;
  }
};

LinkedList.prototype.addHead = function(node) {
  if (this.head == null) {
    this.head = node;
    this.tail = node;
  } else {
    node.next = this.head;
    this.head = node;
    let tail = node;
    while (tail.next != null) {
      tail = tail.next;
    }
  }
};

LinkedList.prototype.deleteHead = function() {
  if (this.head != null) {
    this.head = this.head.next;
    if (this.head == null) this.tail = null;
    return 1;
  }
  return -1;
};

module.exports = {
  LinkedList: LinkedList,
  Node: Node
};
