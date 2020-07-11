const loadBooksBtn = document.getElementById("loadBooks");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const isBnInput = document.getElementById("isbn");
const createBookBtn = document.getElementById("createBook");
const tbody = document.querySelector("tbody");

const baseUrl = "https://books-9bb27.firebaseio.com/";
const makeUrl = (x) => `${baseUrl}/${x}.json`;

async function loadBooks() {
  const books = await fetchData(makeUrl("Books"));
  tbody.innerHTML = "";

  Object.entries(books).forEach(([bookId, book]) => {
    const tr = renderBook(book, bookId);
    tbody.appendChild(tr);
  });
}

function renderBook(book, bookId) {
  const editBtn = createElement("button", "Edit");
  const deleteBtn = createElement("button", "Delete");

  editBtn.addEventListener("click", () => {
    const confirmBtn = createElement("button", "Save");
    const cancelBtn = createElement("button", "Cancel");

    confirmBtn.addEventListener("click", () => {
      const edited = {
        title: edit.title.value,
        author: edit.author.value,
        isBn: edit.isBn.value,
      };

      if (isValidInput(edited) === false) {
        return;
      }

      const result = updateBook(edited, bookId);
      tbody.replaceChild(renderBook(result, bookId), editor);
    });

    cancelBtn.addEventListener("click", () => {
      tbody.replaceChild(tr, editor);
    });

    const edit = {
      title: createElement("input", "", { type: "text", value: book.title }),
      author: createElement("input", "", { type: "text", value: book.author }),
      isBn: createElement("input", "", { type: "text", value: book.isBn }),
    };

    const editor = createElement(
      "tr",
      [
        createElement("td", edit.title),
        createElement("td", edit.author),
        createElement("td", edit.isBn),
        createElement("td", [confirmBtn, cancelBtn]),
      ],
      { id: bookId }
    );

    tbody.replaceChild(editor, tr);
  });

  deleteBtn.addEventListener("click", () => {
    return fetchData(makeUrl(`Books/${bookId}`), "DELETE")
      .then(() => {
        console.log("Book deleted!");
        tr.remove();
      })
      .catch(console.error);
  });

  const tr = createElement(
    "tr",
    [
      createElement("td", book.title),
      createElement("td", book.author),
      createElement("td", book.isBn),
      createElement("td", [editBtn, deleteBtn]),
    ],
    { id: bookId }
  );

  return tr;
}

function updateBook(book, bookId) {
  const newData = {
    title: book.title,
    author: book.author,
    isBn: book.isBn,
  };

  fetchData(makeUrl(`Books/${bookId}`), "PUT", newData)
    .then(() => {
      console.log("Book updated!");
    })
    .catch(console.error);

  return newData;
}

function createBook(e) {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const isBn = isBnInput.value;
  const book = {
    title,
    author,
    isBn,
  };

  if (isValidInput(book) === false) {
    return;
  }

  return fetchData(makeUrl("Books"), "POST", book)
    .then((data) => {
      tbody.appendChild(renderBook(book, data.name));
      console.log("Book created!");
    })
    .catch(console.error);
}

function isValidInput(book) {
  let isValid = true;

  Object.entries(book).forEach(([key, value]) => {
    if (value === null || value === "") {
      console.log(`${key} cannot be empty!`);
      isValid = false;
      return;
    }
  });

  return isValid;
}

function fetchData(url, method, data) {
  const headers = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET" || method !== "DELETE") {
    headers.body = JSON.stringify(data);
  }

  return fetch(url, headers)
    .then((x) => {
      if (!x.ok) {
        throw new Error(x.statusText);
      }
      return x;
    })
    .then((res) => res.json());
}

function createElement(type, content, attributes) {
  const element = document.createElement(type);

  if (attributes !== undefined) {
    // Object.assign(element, attributes);
    Object.keys(attributes).forEach((key) => {
      element[key] = attributes[key];
    });
  }

  if (Array.isArray(content)) {
    content.forEach(append);
  } else {
    append(content);
  }

  function append(node) {
    if (typeof node === "string" || typeof node === "number") {
      node = document.createTextNode(node);
    }
    element.appendChild(node);
  }

  return element;
}

loadBooksBtn.addEventListener("click", loadBooks);
createBookBtn.addEventListener("click", createBook);
