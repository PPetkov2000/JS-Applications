import controllers from "../controllers/index.js";

const app = Sammy("#container", function () {
  this.use("Handlebars", "hbs");

  this.get("#/home", controllers.home.get.home);

  this.get("#/register", controllers.user.get.register);
  this.get("#/login", controllers.user.get.login);
  this.get("#/logout", controllers.user.get.logout);

  this.post("#/register", controllers.user.post.register);
  this.post("#/login", controllers.user.post.login);

  this.get("#/cinema", controllers.movie.get.cinema);
  this.get("#/create", controllers.movie.get.create);
  this.get("#/profile", controllers.movie.get.profile);
  this.get("#/details/:id", controllers.movie.get.details);
  this.get("#/edit/:id", controllers.movie.get.edit);
  this.get("#/delete/:id", controllers.movie.get.delete);
  this.get("#/search", controllers.movie.get.search);

  this.post("#/create", controllers.movie.post.create);

  this.get("#/buyTicket/:id", controllers.movie.put.buyTicket);
  this.post("#/edit/:id", controllers.movie.put.edit);

  this.post("#/delete/:id", controllers.movie.delete.delete);
});

app.run("#/home");

