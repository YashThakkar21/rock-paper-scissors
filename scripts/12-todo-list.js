const todoList = [];

function renderTodoList() {
  let todoListHTML = ``;

  todoList.forEach((todoObject, index) => {
    
    const {name, date} = todoObject;

    const html = `
    <div>${name}</div>
    <div>${date}</div>
    <button class='delete-button'>Delete</button>
    `;

    todoListHTML+=html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.delete-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList(); 
      })
    })
}

document.querySelector('.add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

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