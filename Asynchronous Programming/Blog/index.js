const baseUrl = "https://blog-apps-c12bf.firebaseio.com/";
const mkUrl = (x) => `${baseUrl}${x}/.json`;

const html = {
  select: () => document.getElementById("posts"),
  title: () => document.getElementById("post-title"),
  body: () => document.getElementById("post-body"),
  comments: () => document.getElementById("post-comments"),
};

const actions = {
  btnLoadPosts: async () => {
    const posts = await fetchData(mkUrl("posts"));
    displayPosts(posts);
  },
  btnViewPost: async () => {
    const post = await fetchData(mkUrl(`posts/${html.select().value}`));
    const comments = await fetchData(mkUrl("comments"));
    displayPost(post);
    displayComments(comments, post);
  },
};

function displayPosts(posts) {
  html.select().innerHTML = "";
  const fragment = document.createDocumentFragment();
  Object.keys(posts).forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = posts[key].title;
    fragment.appendChild(option);
  });
  html.select().appendChild(fragment);
}

function displayPost(post) {
  Object.keys(post).forEach((key) => {
    if (typeof html[key] === "function") {
      html[key]().innerHTML = post[key];
    }
  });
}

function displayComments(comments, post) {
  html.comments().innerHTML = "";
  const fragment = document.createDocumentFragment();
  Object.keys(comments)
    .filter((x) => comments[x].postId === post.id)
    .map((x) => {
      const li = document.createElement("li");
      li.textContent = comments[x].text;
      return li;
    })
    .forEach((x) => {
      fragment.appendChild(x);
    });
  html.comments().appendChild(fragment);
}

function fetchData(url) {
  return fetch(url)
    .then((x) => {
      if (!x.ok) {
        throw new Error(x.statusText);
      }
      return x;
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

function handleEvents(e) {
  if (typeof actions[e.target.id] === "function") {
    actions[e.target.id]();
  }
}

document.addEventListener("click", handleEvents);
