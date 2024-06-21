const todoList = [];

function renderTodoList() {
  let todoListHTML = ``;

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];

    //destructuring
    const {name, date} = todoObject;

    const html = `
    <div>${name}</div>
    <div>${date}</div>

    <button onclick="
      todoList.splice(${i}, 1);
      renderTodoList(); 
    " class='delete-button'>Delete</button>
    
    `;

    todoListHTML+=html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  
}


function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const dateElement = document.querySelector('.js-date-input');
  todoList.push({
    name:inputElement.value, 
    date: dateElement.value
  });

  inputElement.value = '';

  renderTodoList();
}