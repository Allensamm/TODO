// text formating
const editor = document.getElementById("editor");
const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const bulletedBtn = document.getElementById("bulletedBtn");
const numberedBtn = document.getElementById("numberedBtn");

// Add event listeners to the formatting buttons
boldBtn.addEventListener("click", () => {
  document.execCommand("bold", false, null);
  console.log("this.com");
});

italicBtn.addEventListener("click", () => {
  document.execCommand("italic", false, null);
});

bulletedBtn.addEventListener("click", () => {
  document.execCommand("insertUnorderedList", false, null);
});

numberedBtn.addEventListener("click", () => {
  document.execCommand("insertOrderedList", false, null);
});

document.getElementById('search').addEventListener('keyup', searchTodos);

document.addEventListener("DOMContentLoaded", getTodos);
var body = document.querySelector("body");
var modal = document.querySelector(".modal");
var list = document.querySelector(".list");

document.querySelector(".add").addEventListener("click", () => {
  modal.classList.toggle("hidden");
  var userwrite = document.querySelector(".TODO");
  var listappend = document.createElement("div");

  listappend.classList.add("bg-gray-800", "mt-10", "mb-10", "notes");

  userwrite.addEventListener("keyup", () => {
    listappend.innerHTML = `
    <div class="text-white px-5 todo flex justify-between">
      <div>${userwrite.innerHTML}</div>
      <div>
        <button class='edit'>🖊</button>
        <button class="delete">🗑</button>
      </div>
    </div>
  `;

    list.appendChild(listappend);
    clearall();
  });

  var addtodo = document.querySelector(".addtodo");
  addtodo.addEventListener("click", () => {
    if (userwrite.innerHTML !== "") {
      var todoItem = document.createElement("div");
      todoItem.classList.add(
        "text-white",
        "px-5",
        "todo",
        "bg-gray-800",
        "mt-10",
        "mb-10",
        "notes"
      );
      todoItem.innerHTML = `
      <div class="text-white px-5 todo flex justify-between">
      <div>${userwrite.innerHTML}</div>
      <div>
        <button class='edit'>🖊</button>
        <button onclick="deleteParentElement(this)" class="delete">🗑</button>
      </div>
    </div>
    `;
      list.appendChild(todoItem);
      saveLocalTodos(userwrite.textContent);
      userwrite.textContent = "";
      clearall();
    } else {
      if (userwrite.textContent === "") {
        listappend.style.display = "none";
      }
    }
  });
  function clearall() {
    if (userwrite.textContent == "") {
      listappend.style.display = "none";
    } else {
      listappend.style.display = "block";
    }
  }
});

// save in local storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get the local value storages
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    var listappend = document.createElement("div");
    listappend.classList.add("bg-gray-800", "mt-10", "mb-10", "notes");
    listappend.innerHTML = `
      <div class="text-white px-5 todo flex justify-between">
        <div class="individual">${todo}</div>
        <div>
          <button class='edit'>🖊</button>
          <button onclick="deleteParentElement(this) " class="delete">🗑</button>
        </div>
      </div>
    `;
    list.appendChild(listappend);
    searchTodos()
  });
}

function deleteParentElement(button) {
  const parentElement = button.parentElement.parentElement.parentElement;
  removeTodo(parentElement)
  parentElement.style.display = 'none'
}



function removeTodo(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function searchTodos() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  const todos = document.querySelectorAll('.individual');

  todos.forEach(todo => {
    const todoText = todo.textContent.toLowerCase();
    todo = todo.parentElement.parentElement
    if (todoText.includes(searchInput)) {
      todo.style.display = 'block';
    } else {
      todo.style.display = 'none';
    }
  });
}
