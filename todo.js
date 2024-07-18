// let todos = [];
let filterValue = "all";
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");


// events
todoForm.addEventListener("submit", addNewTodo);

selectFilter.addEventListener("change", (e) => {
    filterValue = e.target.value;
    filterTodos();
});

document.addEventListener("DOMContentLoaded", (e) => {
    const todos = getAllTodos();
    createTodoList(todos);
});

// functions 
function addNewTodo(e) {
    e.preventDefault();
    if (!todoInput.value) return;
    const newTodo = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        title: todoInput.value,
        isCompleted: false
    };
    // todos.push(newTodo);
    saveTodos(newTodo);
    filterTodos();
}

function createTodoList(todos) {
    let result = "";
    todos.forEach((todo) => {
        result += `<li class="todo">
        <p class="todo__title ${todo.isCompleted && "completed"}">${todo.title}</p>
        <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
        <button class="todo__check" data-todo-id = ${todo.id}><i class="far fa-check-square"></i></button>
        <button class="todo__remove" data-todo-id = ${todo.id}><i class ="far fa-trash-alt"></i></button>
      </li> `
    });
    todoList.innerHTML = result;
    todoInput.value = "";

    const removeBtns = document.querySelectorAll(".todo__remove");
    removeBtns.forEach((btn) => { btn.addEventListener("click", removeTodo) });

    const checkTodos = document.querySelectorAll(".todo__check");
    checkTodos.forEach((ct) => { ct.addEventListener("click", completedTodo) });
}

function removeTodo(e) {
    let todos = getAllTodos();
    const todoId = parseInt(e.target.dataset.todoId);
    const filteredTodos = todos.filter((t) => t.id !== todoId);
    todos = filteredTodos;
    saveAllTodos(todos);
    filterTodos();
}

function filterTodos() {
    const todos = getAllTodos();
    switch (filterValue) {
        case "all": {
            createTodoList(todos);
            break;
        }

        case "completed": {
            const filteredTodos = todos.filter((t) => t.isCompleted);
            createTodoList(filteredTodos);
            break;
        }

        case "uncompleted": {
            const filteredTodos = todos.filter((t) => !t.isCompleted);
            createTodoList(filteredTodos);
            break;
        }

        default:
            return todos;
    }
}

function completedTodo(e) {
    let todos = getAllTodos();
    const todoId = Number(e.target.dataset.todoId);
    const todo = todos.find((t) => t.id === todoId);
    todo.isCompleted = !todo.isCompleted;
    saveAllTodos(todos);
    filterTodos();
}

//localstorage : web api
function getAllTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return savedTodos;
}

function saveTodos(todo) {
    // const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const savedTodos = getAllTodos();
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    return savedTodos;
}

function saveAllTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}