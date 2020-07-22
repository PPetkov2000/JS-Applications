import extend from "../utils/context.js";
import models from "../models/index.js";

export default {
  get: {
    create(ctx) {
      extend(ctx, {
        createForm: "../templates/create/createForm.hbs",
      }).then(function () {
        this.partial("../templates/create/createPage.hbs");
      });
    },
    catalog(ctx) {
      Promise.all([
        models.team.getAll(),
        models.team.getUser("username", localStorage.getItem("username")),
      ])
        .then(([teams, user]) => {
          const teamsData = teams.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          ctx.teams = teamsData;
          ctx.hasNoTeam = user.docs.length === 0;
          extend(ctx, {
            team: "../templates/catalog/team.hbs",
          }).then(function () {
            this.partial("../templates/catalog/teamCatalog.hbs");
          });
        })
        .catch(console.error);
    },
    details(ctx) {
      models.team
        .get(ctx.params.id)
        .then((team) => {
          ctx.name = team.data().name;
          ctx.comment = team.data().comment;
          ctx.members = team.data().members;
          ctx.isAuthor = team.data().author === localStorage.getItem("userId");
          ctx.isOnTeam =
            team
              .data()
              .members.find(
                (member) => member.username === localStorage.getItem("username")
              ) !== undefined;
          ctx.teamId = team.id;

          extend(ctx, {
            teamControls: "../templates/catalog/teamControls.hbs",
          }).then(function () {
            this.partial("../templates/catalog/details.hbs");
          });
        })
        .catch(console.error);
    },
    edit(ctx) {
      models.team
        .get(ctx.params.id)
        .then((response) => {
          ctx.name = response.data().name;
          ctx.comment = response.data().comment;
          ctx.teamId = ctx.params.id;
          extend(ctx, {
            editForm: "../templates/edit/editForm.hbs",
          }).then(function () {
            this.partial("../templates/edit/editPage.hbs");
          });
        })
        .catch(console.error);
    },
    join(ctx) {
      const teamData = {
        members: firebase.firestore.FieldValue.arrayUnion({
          username: localStorage.getItem("username"),
        }),
      };
      Promise.all([
        models.team.getUser("username", localStorage.getItem("username")),
        models.team.update(ctx.params.id, teamData),
      ])
        .then(([user, updatedTeam]) => {
          if (user.docs.length === 0) {
            models.team.createUser({
              teamId: ctx.params.id,
              username: localStorage.getItem("username"),
            });
          }
          ctx.redirect("#/catalog");
        })
        .catch(console.error);
    },
  },
  post: {
    create(ctx) {
      const data = {
        ...ctx.params,
        author: localStorage.getItem("userId"),
        members: [{ username: localStorage.getItem("username") }],
      };
      models.team
        .create(data)
        .then((team) => {
          ctx.redirect("#/catalog");
          return models.team.createUser({
            teamId: team.id,
            username: localStorage.getItem("username"),
          });
        })
        .catch(console.error);
    },
  },
  put: {
    edit(ctx) {
      const data = {
        name: ctx.params.name,
        comment: ctx.params.comment,
      };
      models.team
        .update(ctx.params.id, data)
        .then(() => {
          ctx.redirect("#/catalog");
        })
        .catch(console.error);
    },
  },
  delete: {
    leave(ctx) {
      Promise.all([
        models.team.get(ctx.params.id),
        models.team.getUser("username", localStorage.getItem("username")),
      ])
        .then(([team, user]) => {
          // remove the whole user from the users collection
          user.docs.forEach((doc) => {
            models.team
              .removeUser(doc.id)
              .then(() => {})
              .catch(console.error);
          });
          const isAuthor =
            team.data().author === localStorage.getItem("userId");
          if (isAuthor) {
            // remove the whole team
            return models.team
              .remove(ctx.params.id)
              .then(() => {
                ctx.redirect("#/catalog");
              })
              .catch(console.error);
          } else {
            // remove the user from the members array
            const data = {
              members: firebase.firestore.FieldValue.arrayRemove({
                username: localStorage.getItem("username"),
              }),
            };
            return models.team
              .update(ctx.params.id, data)
              .then(() => {
                ctx.redirect("#/catalog");
              })
              .catch(console.error);
          }
        })
        .catch(console.error);
    },
  },
};
