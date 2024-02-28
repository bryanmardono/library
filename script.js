let library;
const default_data = [
    {   name: "Naruto", 
        author: "Masashi Kishimoto", 
        status: "read"},
    {   name: "Harry Potter and the Goblet of Fire", 
        author: "J.K. Rowling", 
        status: "read"},
    {   name: "The Lord of the Rings", 
        author: "J.R.R. Tolkien", 
        status: "read"}
];

const $name = document.querySelector("#name");
const $author = document.querySelector("#author");
const $status = document.querySelector("#status");
const $tableBody = document.querySelector("#book-table-body");
const $form = document.querySelector("form")
const $table = document.querySelector("table")

$form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    render();
    clearForm();
})

$table.addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == 'delete') {
        deleteBook(findBook(library, currentTarget.innerText));
    }
    if (e.target.classList.contains("status-button")) {
        changeStatus(findBook(library, currentTarget.innerText));
    }
    updateLocalStorage();
    render();
})




class Book {
    constructor(name, author, status) {
        this.name = name;
        this.author = author;
        this.status = status;
    }
}

function addBookToLibrary() {
    if ($name.value.length == 0 || $author.value.length == 0) {
        alert("Please fill in the fields")
        return;
    }
    const newBook = new Book($name.value, $author.value, $status.value);

    library.push(newBook);
    updateLocalStorage();
}

function changeStatus(bookIndex) {
    if (library[bookIndex].status == "read") {
        library[bookIndex].status = "not read";
    } else {
        library[bookIndex].status = "read";
    }
}

function deleteBook(currentBookIndex) {
    library.splice (currentBookIndex, 1);
}

function findBook (libraryArray, name) {
    if (libraryArray.length == 0 || libraryArray === null) {
        return;
    }
    for (book of libraryArray)
        if (book.name === name) {
            return libraryArray.indexOf(book);
        }
}

function clearForm() {
    $name.value = "";
    $author.value = "";
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
    if (localStorage.getItem("library")) {
        library = JSON.parse(localStorage.getImte("library"));
    } else {
        library = default_data;
    }
}

function render() {
    checkLocalStorage();
    $tableBody.innerHTML = "";
    library.forEach((book) => {
        const bookHTML = `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td><button class = "status-button">${book.status}</button</td>
            <td><button class = "delete">delete</button></td>
        </tr>
            `;
        $tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    });
}


render();