import controllers from "../controllers/index.js";

const app = Sammy("#main", function () {
  this.use("Handlebars", "hbs");

  this.get("#/home", controllers.home.get.home);
  this.get("#/about", controllers.home.get.about);

  this.get("#/register", controllers.user.get.register);
  this.get("#/login", controllers.user.get.login);
  this.get("#/logout", controllers.user.get.logout);

  this.post("#/register", controllers.user.post.register);
  this.post("#/login", controllers.user.post.login);

  this.get("#/catalog", controllers.team.get.catalog);
  this.get("#/catalog/:id", controllers.team.get.catalog);
  this.get("#/create", controllers.team.get.create);

  this.post("#/create", controllers.team.post.create);
});

app.run("#/home");
