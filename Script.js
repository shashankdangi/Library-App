const myLibrary = [];

//* 1. Create a Constructor to Create book object
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
//* 2. Create a function to add book object to myLibrary array
function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

//* 3. Create a function to display book object in myLibrary array
function displayBooks() {
  const booksGrid = document.querySelector(".booksGrid");
  booksGrid.innerHTML = "";
  myLibrary.forEach(({ title, author, pages, isRead }, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.innerHTML = `
        <h3>${title}</h3>
        <p class="author">"${author}"</p>
        <p>Pages : ${pages}</p>
        <p>Status: <button class="toggleRead">${
          isRead ? "👍" : "👎"
        }</button></p>
        `;
    //* Adding the js to the grid
    booksGrid.appendChild(bookCard);

    //* 4. Create a function to remove book object from myLibrary array
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeBook");
    removeButton.textContent = "Remove Book";

    bookCard.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });

    //* Toggle Between Read or not Read
    const toggleBtn = bookCard.querySelectorAll(".toggleRead");
    toggleBtn.addEventListener("click", () => {
      myLibrary[index].isRead = !myLibrary[index].isRead;
      displayBooks();
    });
  });
}

//* 5. Create a New Book Button that shows a form to add a new Book

const modal = document.querySelector(".modal");

// ! Open Modal
const addBookBtn = document.querySelector(".addBook");
addBookBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

//! Close Modal
const closeModal = document.querySelector(".closeModal");
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //! Populate the Array with the form information
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);
  displayBooks();

  //! reset the form after submission
  const modalForm = document.querySelector(".bookForm");
  modalForm.reset();

  modal.style.display = "none";
});
