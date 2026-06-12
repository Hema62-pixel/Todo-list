const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${todo}
      <button onclick="deleteTodo(${index})">Delete</button>
    `;

    todoList.appendChild(li);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const task = input.value.trim();

  if (task === "") return;

  todos.push(task);

  saveTodos();
  renderTodos();

  input.value = "";
});

function deleteTodo(index) {
  todos.splice(index, 1);

  saveTodos();
  renderTodos();
}

renderTodos();

