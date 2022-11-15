// get form, form inputs & thbody element of table
const formDOM = document.querySelector('#myForm'),
  titleInputDOM = document.querySelector('#title'),
  authorInputDOM = document.querySelector('#author'),
  isbnInputDOM = document.querySelector('#isbn'),
  tbodyDOM = document.querySelector('#booklist');

// 1.Class for Book Object Constructor
class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// 2.Class for UI Constructor
class UI {
  // make tr element of tbody and add 4 columns with book title, author, isbn & trash icon of Bootstrap
  addBook(bookObject){
    const makeTr = document.createElement('tr');
    makeTr.setAttribute('scope', 'row');
    makeTr.classList.add('newbook');
    makeTr.innerHTML = `
    <td scope='col'>${bookObject.title}</td>
    <td scope='col'>${bookObject.author}</td>
    <td scope='col'>${bookObject.isbn}</td>
    <td scope='col'><i class="bi bi-trash3"></i></td>
    `;
    tbodyDOM.appendChild(makeTr);
  }
  // get alert depending on situation whether be success or failure
  showAlert(message, alertClass){
    const makeAlertDiv = document.createElement('div');
    const getformParent = document.querySelector('#alert-parent');
    makeAlertDiv.classList.add('alert', alertClass);
    makeAlertDiv.appendChild(document.createTextNode(message));
    getformParent.insertBefore(makeAlertDiv, formDOM);
    setTimeout(() => {
      return document.querySelector('.alert').remove();
    }, 2000)
  }
  // clear inputs of form
  clearInputs(){
    titleInputDOM.value = '';
    authorInputDOM.value = '';
    isbnInputDOM.value = '';
  }
  // del a book (tr element of tbody) on the page when you click trash icon
  delBook(e){
    const getTrashIcons = document.querySelectorAll('.bi');
    getTrashIcons.forEach(icon => {
      if(e.target == icon){
        e.target.parentElement.parentElement.remove();
      }
    })
  }

}

// 3.Class for local Storage

class LS {
  // declare books variable. If there is no 'books' key on the local storage, It will make an emty list. If there is, It will take from LS.
  static getBookLS(){
    let books;
    if(localStorage.getItem('books') == null){
      books = [];
    }else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }
  // Get content From LS (which is a List) and load the page with addBook function of UI.
  static loadContentfromLS(){
    const bookList = LS.getBookLS();
    bookList.forEach(book =>{
      const newUI = new UI();
      newUI.addBook(book);  
    })
  }
  // Attention here getBookLS() is used. This book parameter come from newBook. After all add this to LS.
  static addBookLS(book){
    const bookList = LS.getBookLS()
    bookList.push(book);
    return localStorage.setItem('books', JSON.stringify(bookList));
  }
  // when you click the trah icon, it will remove from LS as well.
  static removebookLS(e){
    const bookList = LS.getBookLS();
    bookList.forEach((item,index) => {
      if(item.isbn == e.target.parentElement.previousElementSibling.firstChild.textContent){
        bookList.splice(index, 1);
      }
    })
    return localStorage.setItem('books', JSON.stringify(bookList));
  }

}


// 1.Event submit event for Form

formDOM.addEventListener('submit', addBookFunct);

function addBookFunct(e){
  e.preventDefault();
  // Instantiaze Book Class (Because functions are not static in the Book class)
  const newBook = new Book(titleInputDOM.value, authorInputDOM.value, isbnInputDOM.value);
  // Instantiaze UI Class
  const newUI = new UI();
  // Validation of form inputs
  if(titleInputDOM.value == false || authorInputDOM.value == false || isbnInputDOM.value == false ){
    newUI.showAlert('Please do not space necessary areas!', 'error');
  }else{
    // adding book on the page
    newUI.addBook(newBook);
    // adding book local storage
    LS.addBookLS(newBook);
    // clear inputs of form
    newUI.clearInputs();
    // alert
    newUI.showAlert('New book succesfully added', 'success')
  }
}

// 2.Event click for deleting books

tbodyDOM.addEventListener('click', delBook);

function delBook(e){
  // you have to instanzialize the object to be able to the function because the function is not static
  const newUI = new UI();
  // del book from page
  newUI.delBook(e);
  // del book from local storage
  LS.removebookLS(e);
  // show alert after deleting book on the page
  newUI.showAlert('The book was removed successfully', 'success')  
}

// 3.Event DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{
  // load page from local storage
  LS.loadContentfromLS();
})


