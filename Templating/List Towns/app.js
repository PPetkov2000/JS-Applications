const townsInput = document.getElementById("towns");
const btnLoadTowns = document.getElementById("btnLoadTowns");
const root = document.getElementById("root");

function attachEvents() {
  btnLoadTowns.addEventListener("click", loadTowns);

  async function loadTowns() {
    const towns = townsInput.value.split(", ");
    const source = await fetch("./towns-template.hbs").then((res) =>
      res.text()
    );
    const templateFn = Handlebars.compile(source);
    const html = templateFn({ towns });

    root.innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", attachEvents);
