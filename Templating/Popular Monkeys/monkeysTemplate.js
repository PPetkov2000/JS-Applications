async function getMonkeys() {
  const source = await fetch("./monkeys.hbs").then((res) => res.text());
  const templateFn = Handlebars.compile(source);
  document.querySelector(".monkeys").innerHTML = templateFn({ monkeys });

  document.querySelectorAll(".info").forEach((btn) => {
    btn.addEventListener("click", function () {
      const info = btn.nextElementSibling;
      if (info.style.display === "none") {
        info.style.display = "block";
      } else {
        info.style.display = "none";
      }
    });
  });
}

getMonkeys();
