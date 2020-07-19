import extend from "../utils/context.js";
import models from "../models/index.js";

export default {
  get: {
    register(ctx) {
      extend(ctx, {
        registerForm: "../templates/register/registerForm.hbs",
      }).then(function () {
        this.partial("../templates/register/registerPage.hbs");
      });
    },
    login(ctx) {
      extend(ctx, { loginForm: "../templates/login/loginForm.hbs" }).then(
        function () {
          this.partial("../templates/login/loginPage.hbs");
        }
      );
    },
    logout(ctx) {
      models.user
        .logout()
        .then(() => {
          ctx.redirect("#/home");
        })
        .catch(console.error);
    },
  },
  post: {
    register(ctx) {
      const { username, password, repeatPassword } = ctx.params;

      models.user
        .register(username, password)
        .then(() => {
          ctx.redirect("#/login");
        })
        .catch(console.error);
    },
    login(ctx) {
      const { username, password } = ctx.params;

      models.user
        .login(username, password)
        .then(() => {
          ctx.redirect("#/home");
        })
        .catch(console.error);
    },
  },
};
