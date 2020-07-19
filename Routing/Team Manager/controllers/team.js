import extend from "../utils/context.js";
import models from "../models/index.js";

export default {
  get: {
    catalog(ctx) {
      models.team
        .getAll()
        .then((response) => {
          const teams = response.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          ctx.teams = teams;
          ctx.hasNoTeam = true;

          extend(ctx, {
            team: "../templates/catalog/team.hbs",
          }).then(function () {
            this.partial("../templates/catalog/teamCatalog.hbs");
          });
        })
        .catch(console.error);
    },
    create(ctx) {
      extend(ctx, {
        createForm: "../templates/create/createForm.hbs",
      }).then(function () {
        this.partial("../templates/create/createPage.hbs");
      });
    },
  },
  post: {
    create(ctx) {
      const { name, comment } = ctx.params;

      models.team
        .create({ name, comment })
        .then(() => {
          ctx.redirect("#/catalog");
        })
        .catch(console.error);
    },
  },
};
