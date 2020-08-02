import extend from "../utils/context.js";

export default {
  get: {
    home(ctx) {
      ctx.message = {
        infoMessage: "User registration successful.",
      };
      extend(ctx).then(function () {
        this.partial("../views/home/home.hbs");
      });
    },
  },
  post: {},
};
