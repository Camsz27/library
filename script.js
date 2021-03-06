const bookContainer = document.querySelector("#bookContainer");
const orderContainer = document.querySelector("#orderContainer");
const addBookButton = document.querySelector("button");
const addBookForm = document.getElementById("addBook");
const deleteButtons = document.querySelectorAll(".delete");
const sortCriteria = document.getElementById("filter");
const sortOrder = document.getElementById("order");

let myLibrary = [];
let bookNumber = 0;
let booksRead = 0;
let booksNotRead = 0;
let bookTitle;
let bookAuthor;
let bookPages;
let bookStatus;

addBookButton.addEventListener("click", addBookToLibrary);
sortOrder.addEventListener("change", changeOrder);
sortCriteria.addEventListener("change", changeCriteria);

function Book(title, author, pageNum, read) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.read = read;
  this.date = new Date();
}

function numberOfBooks() {
  bookNumber = myLibrary.length;
}

function getInputValue() {
  bookTitle = document.getElementById("title").value;
  bookAuthor = document.getElementById("author").value;
  bookPages = Number(document.getElementById("pages").value);
  bookStatus = document.getElementById("read").value;
}

function resetInputValues() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").value = "";
}

function addBookToLibrary() {
  getInputValue();
  if (alreadyAdded() === true) {
    return;
  }
  if (
    bookTitle === "" ||
    bookAuthor === "" ||
    bookPages === "" ||
    bookStatus === ""
  ) {
    alert("Please fill all the fields");
    return;
  } else if (
    bookPages < 0 ||
    typeof bookPages !== typeof 1 ||
    isNaN(bookPages)
  ) {
    alert("Please enter a valid number");
    return;
  }
  const book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
  myLibrary.push(book);
  addBookToContainer();
  numberOfBooks();
  countBooksRead();
  changeOrderContainer();
  resetInputValues();
  changeCriteria();
}

function changeOrderContainer() {
  const numberOfBooks = document.querySelector("#numberOfBooks");
  const booksReadText = document.querySelector("#booksRead");
  const booksNotReadText = document.querySelector("#booksNotRead");
  numberOfBooks.textContent = `Total number of books: ${bookNumber}`;
  booksReadText.textContent = `Read: ${booksRead}`;
  booksNotReadText.textContent = `Left to Read: ${booksNotRead}`;
}

function addBookToContainer() {
  const block = document.createElement("ul");
  const deleteButton = document.createElement("input");
  const titleText = document.createElement("li");
  const authorText = document.createElement("li");
  const pagesText = document.createElement("li");
  const statusText = document.createElement("li");
  const input = document.createElement("input");
  const text = document.createTextNode(`${bookStatus}`);
  if (bookStatus === "Read") {
    input.setAttribute("src", "Images/checked.png");
  } else {
    input.setAttribute("src", "Images/warning.png");
  }
  deleteButton.setAttribute("type", "image");
  deleteButton.setAttribute("src", "Images/close_icon.png");
  deleteButton.setAttribute("class", "delete");
  deleteButton.addEventListener("click", deleteBook);
  block.classList.add("bookContainer");
  titleText.textContent = `${bookTitle}`;
  titleText.classList.add("title");
  authorText.textContent = `Author: ${bookAuthor}`;
  authorText.classList.add("info");
  pagesText.textContent = `Number of pages: ${bookPages}`;
  pagesText.classList.add("info");
  input.classList.add("status");
  input.setAttribute("type", "image");
  input.addEventListener("click", changeStatus);
  statusText.appendChild(input);
  statusText.appendChild(text);
  statusText.classList.add("info");
  block.append(deleteButton);
  block.append(titleText);
  block.append(authorText);
  block.append(pagesText);
  block.append(statusText);
  bookContainer.append(block);
}

function deleteBook() {
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    if (
      book.title === this.parentNode.childNodes[1].textContent &&
      "Author: " + book.author === this.parentNode.childNodes[2].textContent
    ) {
      myLibrary.splice(i, 1);
    }
  }
  this.parentNode.remove();
  numberOfBooks();
  countBooksRead();
  changeOrderContainer();
}

function changeStatus() {
  let status = 0;
  if (this.getAttribute("src") === "Images/checked.png") {
    this.setAttribute("src", "Images/warning.png");
    this.parentNode.appendChild(document.createTextNode("Not Read"));
  } else {
    this.setAttribute("src", "Images/checked.png");
    this.parentNode.appendChild(document.createTextNode("Read"));
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    if (
      book.title === this.parentNode.parentNode.childNodes[1].textContent &&
      "Author: " + book.author ===
        this.parentNode.parentNode.childNodes[2].textContent
    ) {
      if (book.read === "Read") {
        book.read = "Not Read";
      } else if (book.read === "Not Read") {
        book.read = "Read";
      }
    }
  }
  this.parentNode.childNodes[1].remove();
  countBooksRead();
  changeOrderContainer();
}

function changeOrder() {
  myLibrary = myLibrary.reverse();
  deleteAll();
  addAllBooks();
}

function changeCriteria() {
  if (sortCriteria.value === "numPages") {
    myLibrary.sort((a, b) => a.pageNum - b.pageNum);
  } else {
    myLibrary.sort((a, b) => a.date - b.date);
  }
  deleteAll();
  addAllBooks();
}

function deleteAll() {
  while (bookContainer.firstChild) {
    bookContainer.lastChild.remove();
  }
}

function addAllBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    bookTitle = book.title;
    bookAuthor = book.author;
    bookPages = book.pageNum;
    bookStatus = book.read;
    addBookToContainer();
  }
}

function alreadyAdded() {
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    if (book.title === bookTitle && book.author === bookAuthor) {
      alert("Book already added");
      return true;
    }
  }
  return false;
}

function countBooksRead() {
  booksRead = 0;
  booksNotRead = 0;
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    if (book.read === "Read") {
      booksRead++;
    } else {
      booksNotRead++;
    }
  }
}

numberOfBooks();
countBooksRead();
changeOrderContainer();
