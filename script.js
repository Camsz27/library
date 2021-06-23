const bookContainer = document.querySelector("#bookContainer");
const orderContainer = document.querySelector("#orderContainer");

let myLibrary = [];
let bookNumber = 0;
let booksRead = 0;

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

console.log(myLibrary);
console.log(numberOfBooks());
