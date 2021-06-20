function Book (title, author, pageNum, read) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pageNum}, ${read}`;
    }
}

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');

console.log(hobbit.info());