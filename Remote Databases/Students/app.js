const baseUrl = "https://students-fd724.firebaseio.com";
const makeUrl = (x) => `${baseUrl}/${x}.json`;

const tbody = document.querySelector("#results tbody");

async function getStudents() {
  const students = await fetchData(makeUrl("Students"));

  Object.keys(students).forEach((key) => {
    const tr = createElement(
      "tr",
      [
        createElement("td", students[key].ID),
        createElement("td", students[key].firstName),
        createElement("td", students[key].lastName),
        createElement("td", students[key].facultyNumber),
        createElement("td", students[key].grade),
      ],
      { id: students[key].ID }
    );
    tbody.appendChild(tr);
    Array.from(tbody.querySelectorAll("tr"))
      .sort((a, b) => a.id - b.id)
      .forEach((tr) => {
        tbody.appendChild(tr);
      });
  });
}

getStudents();

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
