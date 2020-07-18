import controllers from "../controllers/index.js";

const app = Sammy("#main", function () {
  this.use("Handlebars", "hbs");

  this.get("#/home", controllers.home.get.home);
  this.get("#/about", controllers.home.get.about);

  this.get("#/register", controllers.user.get.register);
  this.get("#/login", controllers.user.get.login);
});

app.run("#/home");
