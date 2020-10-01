import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";
import notifications from "../scripts/notifications.js";

export default {
  get: {
    create(ctx) {
      extend(ctx).then(function () {
        this.partial("../views/movie/create.hbs");
      });
    },
    details(ctx) {
      models.movie
        .get(ctx.params.id)
        .then((movie) => {
          const movieData = docModifier(movie);
          Object.assign(ctx, movieData);
          ctx.isCreator = movieData.creator === localStorage.getItem("email");
          ctx.likes = movieData.peopleLiked.length;
          ctx.isLiked = movieData.peopleLiked.includes(
            localStorage.getItem("email")
          );

          extend(ctx).then(function () {
            this.partial("../views/movie/details.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    edit(ctx) {
      models.movie
        .get(ctx.params.id)
        .then((movie) => {
          const movieData = docModifier(movie);
          Object.assign(ctx, movieData);

          extend(ctx).then(function () {
            this.partial("../views/movie/edit.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  post: {
    create(ctx) {
      const { title, description, imageUrl } = ctx.params;
      if (
        title.length === 0 ||
        description.length === 0 ||
        imageUrl.length === 0
      ) {
        notifications.showError("Invalid inputs!");
        return;
      }
      const data = {
        title,
        description,
        imageUrl,
        creator: localStorage.getItem("email"),
        peopleLiked: [],
      };

      models.movie
        .create(data)
        .then(() => {
          notifications.showSuccess("Created successfully!");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  put: {
    edit(ctx) {
      const { id, title, description, imageUrl } = ctx.params;
      if (
        title.length === 0 ||
        description.length === 0 ||
        imageUrl.length === 0
      ) {
        notifications.showError("Invalid inputs!");
        return;
      }
      const newData = {
        title,
        description,
        imageUrl,
      };

      models.movie
        .update(id, newData)
        .then(() => {
          notifications.showSuccess("Edited successfully!");
          ctx.redirect(`#/details/${id}`);
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    like(ctx) {
      models.movie
        .get(ctx.params.id)
        .then((movie) => {
          let peopleLiked = movie.data().peopleLiked;
          peopleLiked.push(localStorage.getItem("email"));

          models.movie
            .update(ctx.params.id, { peopleLiked })
            .then(() => {
              notifications.showSuccess("Liked successfully");
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
    delete(ctx) {
      models.movie
        .remove(ctx.params.id)
        .then(() => {
          notifications.showSuccess("Deleted successfully!");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
};
