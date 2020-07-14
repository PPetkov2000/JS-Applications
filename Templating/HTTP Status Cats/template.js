(() => {
  renderCatTemplate();

  async function renderCatTemplate() {
    const source = await fetch("./all-cats.hbs").then((res) => res.text());
    const templateFn = Handlebars.compile(source);
    document.getElementById("allCats").innerHTML = templateFn({ cats });

    document.querySelectorAll(".showBtn").forEach((btn) => {
      const status = btn.nextElementSibling;
      btn.addEventListener("click", function () {
        if (btn.textContent === "Show status code") {
          btn.textContent = "Hide status code";
          status.style.display = "block";
        } else {
          btn.textContent = "Show status code";
          status.style.display = "none";
        }
      });
    });
  }
})();
