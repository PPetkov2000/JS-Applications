import extend from "../utils/context.js";
import docModifier from "../utils/docModifier.js";
import models from "../models/index.js";
import notifications from "../scripts/notifications.js";

export default {
  get: {
    home(ctx) {
      models.movie
        .getAll()
        .then((movies) => {
          const moviesData = movies.docs.map(docModifier);
          ctx.movies = moviesData;

          extend(ctx).then(function () {
            this.partial("../views/home/home.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    search(ctx) {
      const { searchedMovie } = ctx.params;

      models.movie
        .getAll()
        .then((movies) => {
          const moviesData = movies.docs.map(docModifier);
          const filteredMovies = moviesData.filter((x) =>
            x.title.toLowerCase().match(new RegExp(searchedMovie, "i"))
          );
          ctx.movies = filteredMovies;
          ctx.searchedMovie = searchedMovie;

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
