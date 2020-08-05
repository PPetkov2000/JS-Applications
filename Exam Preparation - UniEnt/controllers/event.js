import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";
import notifications from "../scripts/notifications.js";

export default {
  get: {
    organize(ctx) {
      extend(ctx).then(function () {
        this.partial("../views/event/organize.hbs");
      });
    },
    details(ctx) {
      models.event
        .get(ctx.params.id)
        .then((event) => {
          const eventData = docModifier(event);
          Object.assign(ctx, eventData);
          ctx.isOrganizer =
            eventData.organizer === localStorage.getItem("username");

          extend(ctx).then(function () {
            this.partial("../views/event/details.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    edit(ctx) {
      models.event
        .get(ctx.params.id)
        .then((event) => {
          const eventData = docModifier(event);
          Object.assign(ctx, eventData);

          extend(ctx).then(function () {
            this.partial("../views/event/edit.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  post: {
    organize(ctx) {
      const { name, dateTime, description, imageURL } = ctx.params;
      const data = {
        name,
        dateTime,
        description,
        imageURL,
        organizer: localStorage.getItem("username"),
        peopleInterestedIn: 0,
      };

      models.event
        .create(data)
        .then(() => {
          notifications.showSuccess("Event created successfully.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  put: {
    edit(ctx) {
      const { id, name, dateTime, description, imageURL } = ctx.params;
      const newData = {
        name,
        dateTime,
        description,
        imageURL,
      };

      models.event
        .update(id, newData)
        .then(() => {
          notifications.showSuccess("Event edited successfully.");
          ctx.redirect(`#/home`);
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    join(ctx) {
      models.event
        .get(ctx.params.id)
        .then((event) => {
          const eventData = docModifier(event);
          eventData.peopleInterestedIn += 1;

          models.event
            .update(ctx.params.id, eventData)
            .then(() => {
              notifications.showSuccess("You join the event successfully.");
              ctx.redirect(`#/details/${ctx.params.id}`);
            })
            .catch((err) => {
              notifications.showError(err.message);
            });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  delete: {
    close(ctx) {
      models.event
        .remove(ctx.params.id)
        .then(() => {
          notifications.showSuccess("Event deleted successfully.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
};

