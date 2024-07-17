import { observerMixin } from "./mixin.js";
export class TodoItem {
  constructor(text) {
    this.text = text;
  }

  equals(obj) {
    return this.text === obj.text;
  }
}

export class TodoList {
  #data = new Set();

  constructor() {
    if (this.instance) {
      throw new Error(
        "Can't create TodoList class instance twice, prevented by default."
      );
    }
  }
  get items() {
    return this.#data;
  }

  static instance = null;
  static {
    this.instance = new TodoList();
  }
  static getInstance() {
    return this.instance;
  }
  add(item) {
    const array = Array.from(this.#data);
    const todoExist = array.filter((todo) => todo.text===item.text);
    if (todoExist.length===0) {
      this.#data.add(item);
      this.notify();
    }
  }
  delete(todo_text) {
    const array = Array.from(this.#data);
    const todoToDelete = array.filter((todo) => todo.text === todo_text)[0];
    if (todoToDelete) {
      this.#data.delete(todoToDelete);
      this.notify();
    }
  }
  find(todo_text) {
    const array = Array.from(this.#data);
    return array.filter((todo) => todo.text === todo_text)[0];
  }
  replace(list) {
    this.#data = new Set([...list]);
    this.notify();
  }
}

Object.assign(TodoList.prototype, observerMixin);
