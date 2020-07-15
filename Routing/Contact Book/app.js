const app = Sammy("#main", function () {
  this.use("Handlebars", "hbs");

  this.get("#/");
});

app.run();
