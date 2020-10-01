import controllers from "../controllers/index.js";

const app = Sammy("#container", function () {
  this.use("Handlebars", "hbs");

  this.get("#/home", controllers.home.get.home);
  this.get("#/search", controllers.home.get.search);

  this.get("#/register", controllers.user.get.register);
  this.get("#/login", controllers.user.get.login);
  this.get("#/logout", controllers.user.get.logout);

  this.post("#/register", controllers.user.post.register);
  this.post("#/login", controllers.user.post.login);

  this.get("#/create", controllers.movie.get.create);
  this.get("#/details/:id", controllers.movie.get.details);
  this.get("#/edit/:id", controllers.movie.get.edit);

  this.post("#/create", controllers.movie.post.create);

  this.post("#/edit/:id", controllers.movie.put.edit);
  this.get("#/like/:id", controllers.movie.put.like);

  this.get("#/delete/:id", controllers.movie.delete.delete);
});

app.run("#/home");
