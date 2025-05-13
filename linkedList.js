class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default class LinkedList {
  #head = null;

  append(value) {
    const newNode = new Node(value);

    if (this.#head === null) {
      this.#head = newNode;
    } else {
      let current = this.#head;

      while (current.nextNode !== null) {
        current = current.nextNode;
      }

      current.nextNode = newNode;
    }
    return newNode;
  }

  size() {
    let total = 0;

    let head = this.#head;
    while (head !== null) {
      total++;

      head = head.nextNode;
    }

    return total;
  }

  at(index) {
    if (index > this.size()) {
      return null;
    }

    let i = 0;
    let item = this.#head;
    while (i < index) {
      item = item.nextNode;
      i++;
    }

    return item;
  }

  contains(value) {
    let currentNode = this.#head;

    while (currentNode !== null) {
      if (
        typeof currentNode.value === "string" &&
        currentNode.value === value
      ) {
        return true;
      } else if (
        typeof currentNode.value === "object" &&
        Object.values(currentNode.value)[0] === value
      ) {
        return true;
      }

      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    let currentNode = this.#head;
    let index = 0;

    while (currentNode !== null) {
      if (
        typeof currentNode.value === "string" &&
        currentNode.value === value
      ) {
        return index;
      } else if (
        typeof currentNode.value === "object" &&
        Object.values(currentNode.value)[0] === value
      ) {
        return index;
      }

      index++;
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  removeAt(index) {
    if (index > this.size() || index < 0) {
      return null;
    } else if (!index) {
      const removedEle = this.#head;
      this.#head = this.#head.nextNode;
      removedEle.nextNode = null;
      return removedEle;
    }

    let currentNode = this.#head;
    let i = 1;
    while (i < index) {
      currentNode = currentNode.nextNode;
      i++;
    }

    const removedEle = currentNode.nextNode;
    currentNode.nextNode = currentNode.nextNode.nextNode;

    return removedEle;
  }

  clearList() {
    this.#head = null;
  }

  // this method will traverse and push all values of each Node in Array and Return it.

  traverse() {
    let valueArr = [];

    let currentNode = this.#head;

    while (currentNode !== null) {
      valueArr.push(currentNode.value);

      currentNode = currentNode.nextNode;
    }

    return valueArr;
  }
}
