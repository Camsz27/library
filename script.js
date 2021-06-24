const bookContainer = document.querySelector("#bookContainer");
const orderContainer = document.querySelector("#orderContainer");
const addBookButton = document.querySelector("button");
const addBookForm = document.getElementById("addBook");
const deleteButtons = document.querySelectorAll(".delete");

let myLibrary = [];
let bookNumber = 0;
let booksRead = 0;
let bookTitle;
let bookAuthor;
let bookPages;
let bookStatus;

addBookButton.addEventListener("click", addBookToLibraryNew);

function Book(title, author, pageNum, read) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pageNum}, ${read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
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

function addBookToLibraryNew() {
  getInputValue();
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
  numberOfBooks();
  changeOrderContainer();
  addBookToContainer();
  resetInputValues();
}

function changeOrderContainer() {
  const numberOfBooks = document.querySelector("#numberOfBooks");
  const booksReadText = document.querySelector("#booksRead");
  const booksNotRead = document.querySelector("#booksNotRead");
  numberOfBooks.textContent = `Total number of books: ${bookNumber}`;
  booksReadText.textContent = `Read: ${booksRead}`;
  booksNotRead.textContent = `Left to Read: ${bookNumber - booksRead}`;
}

function addBookToContainer() {
  const block = document.createElement("ul");
  const deleteButton = document.createElement("input");
  const titleText = document.createElement("li");
  const authorText = document.createElement("li");
  const pagesText = document.createElement("li");
  const statusText = document.createElement("li");
  const image = document.createElement("img");
  const text = document.createTextNode(`${bookStatus}`);
  if (bookStatus === "Read") {
    image.setAttribute("src", "Images/checked.png");
  } else {
    image.setAttribute("src", "Images/warning.png");
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
  image.classList.add("status");
  statusText.appendChild(image);
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
  this.parentNode.remove();
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
const book2 = new Book("Book 2", "Author 1", 495, "read");
const book3 = new Book("Book 3", "Author 2", 395, "not read yet");
const book4 = new Book("Book 4", "Author 3", 195, "read");
const book5 = new Book("Book 5", "Author 4", 295, "not read yet");

addBookToLibrary(hobbit);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);

numberOfBooks();
changeOrderContainer();

console.log(deleteButtons);
