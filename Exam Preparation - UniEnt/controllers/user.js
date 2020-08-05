import extend from "../utils/context.js";
import docModifier from "../utils/docModifier.js";
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
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    profile(ctx) {
      const username = localStorage.getItem("username");

      models.event
        .getByCriteria("organizer", username)
        .then((events) => {
          const eventsData = events.docs.map(docModifier);
          ctx.events = eventsData;
          ctx.organizer = username;

          extend(ctx).then(function () {
            this.partial("../views/user/profile.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  post: {
    register(ctx) {
      const { username, password, rePassword } = ctx.params;

      if (password !== rePassword) {
        notifications.showError(
          "The repeat password should be equal to the password"
        );
        return;
      }

      models.user
        .register(username, password)
        .then(() => {
          notifications.showSuccess("User registration successful.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    login(ctx) {
      const { username, password } = ctx.params;

      models.user
        .login(username, password)
        .then(() => {
          notifications.showSuccess("Login successful.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
};

