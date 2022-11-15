// Book constructor Function
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

// UI constructor function 
function UI(){};

// UI addBookFunc in prototype
UI.prototype.addBookFunc = function(book){
  const booklistDOM = document.querySelector('#booklist');
  const makeTr = document.createElement('tr');
  makeTr.setAttribute('scope', 'row');
  makeTr.innerHTML = `
    <td scope='col'>${book.title}</td>
    <td scope='col'>${book.author}</td>
    <td scope='col'>${book.isbn}</td>
    <td scope='col'><i class="bi bi-trash3"></i></td>  
  `;
  booklistDOM.appendChild(makeTr)
  
};

// UI showAlert Function in prototype
UI.prototype.showAlert = function (message, className){
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert',className);
  alertDiv.appendChild(document.createTextNode(message));

  const alertParent = document.querySelector('#alert-parent');
  const alertBefore =document.querySelector('#myForm');
  alertParent.insertBefore(alertDiv, alertBefore);

  setTimeout(function(){
    document.querySelector(`.alert.${className}`).remove();
  }, 2000)
}

//  UI clearInputFunct in prototype
UI.prototype.clearInputFunc = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// UI delBook Funct in Prototype
UI.prototype.delBook = function(target){
  const icon = document.querySelector('.bi.bi-trash3');
  if(target === icon){
    icon.parentElement.parentElement.remove();

  }
}




// Form submit event
const formDOM = document.querySelector('#myForm');
formDOM.addEventListener('submit', addBookFunction);
// addBookFunction()
function addBookFunction(e){
  e.preventDefault();

  const titleInputDOM = document.querySelector('#title').value,
    authorInputDOM = document.querySelector('#author').value,
    isbnInputDOM = document.querySelector('#isbn').value;

  // Instantiate Book
  const book = new Book(titleInputDOM, authorInputDOM, isbnInputDOM);

  // Instantiate UI
  const ui = new UI()

  // Validation
  if(titleInputDOM === '' || authorInputDOM === '' || isbnInputDOM === ''){
    ui.showAlert('You should add a book!', 'error');
  }else{
    ui.addBookFunc(book)
    ui.clearInputFunc()
    ui.showAlert('The book was added', 'success');
  }
  
}


// Add click event to delete books (Event Delegation)

document.querySelector('#booklist').addEventListener('click', delBookFunct);

function delBookFunct (e){
  const ui = new UI();
  ui.delBook(e.target);
  ui.showAlert('The book was removed', 'success')
}






