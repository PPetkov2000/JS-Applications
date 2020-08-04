import controllers from "../controllers/index.js";

const app = Sammy("#main", function () {
  this.use("Handlebars", "hbs");

  this.get("#/home", controllers.home.get.home);

  this.get("#/register", controllers.user.get.register);
  this.get("#/login", controllers.user.get.login);
  this.get("#/logout", controllers.user.get.logout);
  this.get("#/profile", controllers.user.get.profile);

  this.post("#/register", controllers.user.post.register);
  this.post("#/login", controllers.user.post.login);

  this.get("#/organize", controllers.event.get.organize);
  this.get("#/details/:id", controllers.event.get.details);
  this.get("#/edit/:id", controllers.event.get.edit);

  this.post("#/organize", controllers.event.post.organize);

  this.post("#/edit/:id", controllers.event.put.edit);
  this.get("#/join/:id", controllers.event.put.join);

  this.get("#/close/:id", controllers.event.delete.close);
});

app.run("#/home");
