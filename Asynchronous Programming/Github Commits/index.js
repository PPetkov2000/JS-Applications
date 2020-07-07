function loadCommits() {
  const usernameInput = document.querySelector("#username");
  const repoInput = document.querySelector("#repo");

  fetch(
    `https://api.github.com/repos/${usernameInput.value}/${repoInput.value}/commits`
  )
    .then((x) => {
      if (!x.ok) {
        throw new Error(x.statusText);
      }
      return x;
    })
    .then((x) => x.json())
    .then((data) => {
      Object.keys(data).forEach((x) => {
        const username = data[x].author.login;
        const message = data[x].commit.message;
        const li = createElement("li", `${username}: ${message}`);
        html["commits"]().appendChild(li);
      });
    })
    .catch((err) => console.error(err));
}

const actions = {
  loadCommits: () => loadCommits(),
};

const html = {
  username: () => document.querySelector("#username"),
  repo: () => document.querySelector("#repo"),
  commits: () => document.querySelector("#commits"),
};

function createElement(tag, content) {
  const el = document.createElement(tag);

  if (content) {
    el.innerHTML = content;
  }

  return el;
}

function handleEvents(e) {
  if (typeof actions[e.target.id] === "function") {
    actions[e.target.id]();
  }
}
