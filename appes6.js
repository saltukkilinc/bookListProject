class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}



class UI {
  
  addBookFunc (book) {
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

  showAlert (message, className) {
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

  clearInputFunc () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  delBook (target) {
    const icon = document.querySelector('.bi.bi-trash3');
    if(target === icon){
      icon.parentElement.parentElement.remove();
    }
  }
}


// Class Store for local storage

class Store {

  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    let books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookFunc(book);
    });
  }

  static addBook(book){
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

  


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
    // adding book
    ui.addBookFunc(book)
    // loading to local storage
    Store.addBook(book);
    // clearing inputs
    ui.clearInputFunc()
    // showing alert
    ui.showAlert('The book was added', 'success');
  }
  
}


// Add click event to delete books (Event Delegation)

document.querySelector('#booklist').addEventListener('click', delBookFunct);

function delBookFunct (e){
  const ui = new UI();
  ui.delBook(e.target);
  
  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('The book was removed', 'success')
};



