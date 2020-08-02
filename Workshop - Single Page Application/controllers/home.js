import extend from "../utils/context.js";

export default {
  get: {
    home(ctx) {
      extend(ctx).then(function () {
        this.partial("../views/home/home.hbs");
      });
    },
  },
  post: {},
};
