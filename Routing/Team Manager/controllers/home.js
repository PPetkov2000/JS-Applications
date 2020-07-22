import extend from "../utils/context.js";
import models from "../models/index.js";

export default {
  get: {
    home(ctx) {
      models.team
        .getUser("username", localStorage.getItem("username"))
        .then((user) => {
          ctx.hasTeam = user.docs.length > 0;
          ctx.teamId = user.docs.map((doc) => doc.data().teamId)[0];

          extend(ctx).then(function () {
            this.partial("../templates/home/home.hbs");
          });
        })
        .catch(console.error);
    },
    about(ctx) {
      extend(ctx).then(function () {
        this.partial("../templates/about/about.hbs");
      });
    },
  },
  post: {},
};
