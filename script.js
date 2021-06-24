const bookContainer = document.querySelector("#bookContainer");
const orderContainer = document.querySelector("#orderContainer");
const addBookButton = document.querySelector("button");
const addBookForm = document.getElementById("addBook");

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

console.log(addBookButton);
