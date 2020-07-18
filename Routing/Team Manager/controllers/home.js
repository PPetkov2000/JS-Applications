import extend from "../utils/context.js";

export default {
  get: {
    home(ctx) {
      extend(ctx).then(function () {
        this.partial("../templates/home/home.hbs");
      });
    },
    about(ctx) {
      extend(ctx).then(function () {
        this.partial("../templates/about/about.hbs");
      });
    },
  },
  post: {},
};
