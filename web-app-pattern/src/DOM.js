import { Command, CommandExecutor, Commands } from "./command.js";
import { TodoList } from "./classes.js";
import { LocalStorage } from "./storage.js";

globalThis.DOM = {};

const DOM = globalThis.DOM;

function renderList() {
  DOM.todoList.innerHTML = "";
  const list = TodoList.getInstance().items;

  for (let todo of list) {
    const todoItem = document.createElement("li");
    todoItem.dataset.name = todo.text;
    todoItem.classList.add("app__item");
    todoItem.dataset.name = todo.text;
    todoItem.innerHTML = `
     ${todo.text}
     <button class="app__item-delete">Delete</button>
    `;
    DOM.todoList.appendChild(todoItem);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  TodoList.getInstance().addObserver(renderList);
});

document.addEventListener("DOMContentLoaded", () => {
  DOM.todoList = document.querySelector(".app__list") || null;
  DOM.todoInput = document.querySelector(".app__input") || null;
  DOM.addBtn = document.querySelector(".app__button") || null;
});

document.addEventListener("DOMContentLoaded", () => {
  DOM.addBtn.addEventListener("click", () => {
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("app__item-delete")) {
      const textToDelete = event.target.parentNode.dataset.name;
      const cmd = new Command(Commands.DELETE, [textToDelete]);
      CommandExecutor.execute(cmd);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  LocalStorage.load();
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  }
});
