import extend from "../utils/context.js";
import docModifier from "../utils/docModifier.js";
import models from "../models/index.js";
import notifications from "../scripts/notifications.js";

export default {
  get: {
    home(ctx) {
      models.event
        .getAll()
        .then((events) => {
          const eventsData = events.docs
            .map(docModifier)
            .sort((a, b) => b.peopleInterestedIn - a.peopleInterestedIn);
          ctx.events = eventsData;

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

