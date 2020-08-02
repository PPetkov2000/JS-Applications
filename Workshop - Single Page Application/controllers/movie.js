import extend from "../utils/context.js";
import docModifier from "../utils/docModifier.js";
import models from "../models/index.js";
import notifications from "../scripts/notifications.js";

export default {
  get: {
    create(ctx) {
      extend(ctx).then(function () {
        this.partial("../views/movie/create.hbs");
      });
    },
    cinema(ctx) {
      models.movie
        .getAll()
        .then((movies) => {
          const moviesData = movies.docs
            .map(docModifier)
            .sort((a, b) => b.tickets - a.tickets);
          ctx.movies = moviesData;
          ctx.origin = encodeURIComponent(`#/cinema`);

          extend(ctx).then(function () {
            this.partial("../views/movie/cinema.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    details(ctx) {
      models.movie
        .get(ctx.params.id)
        .then((movie) => {
          const movieData = docModifier(movie);
          Object.assign(ctx, movieData);
          ctx.origin = encodeURIComponent(`#/details/${ctx.params.id}`);

          extend(ctx).then(function () {
            this.partial("../views/movie/details.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    profile(ctx) {
      models.movie
        .getByCriteria("creator", localStorage.getItem("userId"))
        .then((movie) => {
          const moviesData = movie.docs.map(docModifier);
          ctx.movies = moviesData;
          ctx.origin = encodeURIComponent(`#/profile`);

          extend(ctx).then(function () {
            this.partial("../views/movie/profile.hbs");
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
    delete(ctx) {
      models.movie
        .get(ctx.params.id)
        .then((movie) => {
          const movieData = docModifier(movie);
          Object.assign(ctx, movieData);

          extend(ctx).then(function () {
            this.partial("../views/movie/delete.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    search(ctx) {
      models.movie
        .getAll()
        .then((movies) => {
          const filteredMovies = movies.docs
            .map(docModifier)
            .filter((movie) =>
              movie.genres
                .map((genre) => genre.toLowerCase())
                .includes(ctx.params.search.toLowerCase())
            );
          ctx.movies = filteredMovies;

          extend(ctx).then(function () {
            this.partial("../views/movie/cinema.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  post: {
    create(ctx) {
      const { title, imageUrl, description, genres, tickets } = ctx.params;
      const data = {
        title,
        imageUrl,
        description,
        genres: genres.split(","),
        tickets,
        creator: localStorage.getItem("userId"),
      };

      models.movie
        .create(data)
        .then(() => {
          notifications.showInfo("Movie created successfully.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  put: {
    buyTicket(ctx) {
      models.movie
        .get(ctx.params.id)
        .then((movie) => {
          const newData = docModifier(movie);
          newData.tickets -= 1;

          return models.movie
            .update(ctx.params.id, newData)
            .then(() => {
              notifications.showInfo(
                `Successfully bought ticket for ${newData.title}!`
              );
              ctx.redirect(ctx.params.origin);
            })
            .catch((err) => {
              notifications.showError(err.message);
            });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    edit(ctx) {
      const { id, title, imageUrl, description, genres, tickets } = ctx.params;
      const newData = {
        title,
        imageUrl,
        description,
        genres: genres.split(" "),
        tickets,
      };

      models.movie
        .update(id, newData)
        .then(() => {
          notifications.showInfo("Successfully updated.");
          ctx.redirect("#/profile");
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
          notifications.showInfo("Successfully deleted.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
};
