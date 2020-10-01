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
          notifications.showSuccess("Logout successful.");
          ctx.redirect("#/login");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  post: {
    register(ctx) {
      const { email, password, repeatPassword } = ctx.params;

      if (password !== repeatPassword) {
        notifications.showError(
          "The repeat password should be equal to the password"
        );
        return;
      }

      models.user
        .register(email, password)
        .then(() => {
          notifications.showSuccess("Successful registration!");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    login(ctx) {
      const { email, password } = ctx.params;

      models.user
        .login(email, password)
        .then(() => {
          notifications.showSuccess("Login successful.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
          ctx.redirect("#/login");
        });
    },
  },
};
