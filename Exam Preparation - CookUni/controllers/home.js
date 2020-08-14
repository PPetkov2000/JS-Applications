import extend from "../utils/context.js";
import docModifier from "../utils/docModifier.js";
import models from "../models/index.js";
import notifications from "../scripts/notifications.js";

export default {
  get: {
    home(ctx) {
      models.recipe
        .getAll()
        .then((recipes) => {
          const recipesData = recipes.docs.map(docModifier);
          ctx.recipes = recipesData;

          extend(ctx).then(function () {
            this.partial("../views/home/home.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  post: {},
};

