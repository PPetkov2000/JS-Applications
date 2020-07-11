function attachEvents() {
  const html = {
    catches: () => document.getElementById("catches"),
    angler: () => document.querySelector("#addForm #angler"),
    weight: () => document.querySelector("#addForm #weight"),
    species: () => document.querySelector("#addForm #species"),
    location: () => document.querySelector("#addForm #location"),
    bait: () => document.querySelector("#addForm #bait"),
    captureTime: () => document.querySelector("#addForm #captureTime"),
  };

  const baseUrl = "https://fisher-game.firebaseio.com";
  const makeUrl = (x) => `${baseUrl}/${x}.json`;

  const actions = {
    add: () => {
      const formData = {
        angler: html.angler().value,
        weight: html.weight().value,
        species: html.species().value,
        location: html.location().value,
        bait: html.bait().value,
        captureTime: html.captureTime().value,
      };
      return fetchData(makeUrl("catches"), "POST", formData)
        .then(() => {
          console.log(`Added successfully!`);
        })
        .catch(console.error);
    },
    load: () => {
      return fetchData(makeUrl("catches"))
        .then(renderHTML)
        .catch(console.error);
    },
    update: (e) => {
      const catchId = e.target.parentElement.dataset.id;

      const newData = Array.from(
        e.target.parentElement.querySelectorAll("input")
      ).reduce((acc, curr) => {
        acc[curr.className] = curr.value;
        return acc;
      }, {});

      return fetchData(makeUrl(`catches/${catchId}`), "PUT", newData)
        .then(() => {
          console.log("Updated successfully!");
        })
        .catch(console.error);
    },
    delete: (e) => {
      const catchId = e.target.parentElement.dataset.id;

      return fetchData(makeUrl(`catches/${catchId}`), "DELETE")
        .then(() => {
          console.log("Deleted successfully!");
          e.target.parentElement.remove();
        })
        .catch(console.error);
    },
  };

  function renderHTML(data) {
    Object.keys(data).forEach((key) => {
      const { angler, weight, species, location, bait, captureTime } = data[
        key
      ];

      const output = `<div class="catch" data-id="${key}">
             <label>Angler</label>
             <input type="text" class="angler" value="${angler}" />
             <hr />
             <label>Weight</label>
             <input type="number" class="weight" value="${weight}" />
             <hr />
             <label>Species</label>
             <input type="text" class="species" value="${species}" />
             <hr />
             <label>Location</label>
             <input type="text" class="location" value="${location}" />
             <hr />
             <label>Bait</label>
             <input type="text" class="bait" value="${bait}" />
             <hr />
             <label>Capture Time</label>
             <input type="number" class="captureTime" value="${
               captureTime.split(":")[0]
             }" />
             <hr />
             <button id="update">Update</button>
             <button id="delete">Delete</button>
           </div>`;

      html.catches().innerHTML += output;
    });
  }

  function fetchData(url, method, data) {
    const headers = {
      method,
      headers: { "Content-type": "application/json" },
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

  function handleEvents(e) {
    if (typeof actions[e.target.id] === "function") {
      actions[e.target.id](e);
    }
  }

  document.addEventListener("click", handleEvents);
}

document.addEventListener("DOMContentLoaded", attachEvents);
