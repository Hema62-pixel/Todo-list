const STORAGE_KEY = "todos";

let state = {
  todos: [],
  filter: "all"
};

const list = document.getElementById("todo-list");

// Load Saved Data
function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    state.todos = JSON.parse(saved);
  }
}

// Save Data
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
}

// Create Task
function addTodo(text) {
  state.todos.push({
    id: Date.now(),
    text,
    completed: false
  });

  saveTodos();
  render();
}

// Edit Task
function editTodo(id) {
  const todo = state.todos.find(t => t.id === id);

  const newText = prompt("Edit task:", todo.text);

  if (!newText || newText.trim() === "") return;

  todo.text = newText.trim();

  saveTodos();
  render();
}

// Toggle Complete
function toggleTodo(id) {
  const todo = state.todos.find(t => t.id === id);

  todo.completed = !todo.completed;

  saveTodos();
  render();
}

// Delete Task
function deleteTodo(id) {
  state.todos = state.todos.filter(todo => todo.id !== id);

  saveTodos();
  render();
}

// Filter Tasks
function getFilteredTodos() {
  switch (state.filter) {
    case "active":
      return state.todos.filter(todo => !todo.completed);

    case "completed":
      return state.todos.filter(todo => todo.completed);

    default:
      return state.todos;
  }
}

// Render Tasks
function render() {
  list.innerHTML = "";

  const todos = getFilteredTodos();

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.dataset.id = todo.id;

    if (todo.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${todo.text}</span>

      <div class="actions">
        <button class="toggle">
          ${todo.completed ? "Undo" : "Done"}
        </button>

        <button class="edit">
          Edit
        </button>

        <button class="delete">
          Delete
        </button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Add Task Event
document.getElementById("todo-form").addEventListener("submit", e => {
  e.preventDefault();

  const input = document.getElementById("todo-input");
  const text = input.value.trim();

  if (!text) return;

  addTodo(text);

  input.value = "";
});

// Delegated Events
list.addEventListener("click", e => {
  const li = e.target.closest("li");

  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.classList.contains("toggle")) {
    toggleTodo(id);
  }

  if (e.target.classList.contains("edit")) {
    editTodo(id);
  }

  if (e.target.classList.contains("delete")) {
    deleteTodo(id);
  }
});

// Filter Buttons
document.querySelector(".filters").addEventListener("click", e => {
  if (!e.target.dataset.filter) return;

  state.filter = e.target.dataset.filter;

  document
    .querySelectorAll(".filters button")
    .forEach(btn => btn.classList.remove("active"));

  e.target.classList.add("active");

  render();
});

// Initialize App
function init() {
  loadTodos();
  render();
}

init();
