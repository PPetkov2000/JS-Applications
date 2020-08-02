import extend from "../utils/context.js";
import models from "../models/index.js";
import notifications from "../scripts/notifications.js";

export default {
  get: {
    register(ctx) {
      extend(ctx).then(function () {
        this.partial("../views/user/register.hbs");
      });
    },
    login(ctx) {
      extend(ctx).then(function () {
        this.partial("../views/user/login.hbs");
      });
    },
    logout(ctx) {
      models.user
        .logout()
        .then(() => {
          notifications.showInfo("Logout successful.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  post: {
    register(ctx) {
      const { username, password, repeatPassword } = ctx.params;

      if (password === repeatPassword) {
        models.user
          .register(username, password)
          .then(() => {
            notifications.showInfo("User registration successful.");
            ctx.redirect("#/home");
          })
          .catch((err) => {
            notifications.showError(err.message);
          });
      }
    },
    login(ctx) {
      const { username, password } = ctx.params;

      models.user
        .login(username, password)
        .then(() => {
          notifications.showInfo("Login successful.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
};
