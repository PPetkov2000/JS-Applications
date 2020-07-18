import extend from "../utils/context.js";

export default {
  get: {
    register(ctx) {
      extend(ctx).then(function () {
        this.partial("../templates/register/registerPage.hbs");
      });
    },
    login(ctx) {
      extend(ctx).then(function () {
        this.partial("../templates/login/loginPage.hbs");
      });
    },
  },
  post: {},
};
