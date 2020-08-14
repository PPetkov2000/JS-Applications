import extend from "../utils/context.js";
import docModifier from "../utils/docModifier.js";
import models from "../models/index.js";
import notifications from "../scripts/notifications.js";

export default {
  get: {
    create(ctx) {
      extend(ctx).then(function () {
        this.partial("../views/recipe/create.hbs");
      });
    },
    details(ctx) {
      models.recipe
        .get(ctx.params.id)
        .then((recipe) => {
          const recipeData = docModifier(recipe);
          Object.assign(ctx, recipeData);
          ctx.isCreator =
            recipeData.creator === localStorage.getItem("username");

          extend(ctx).then(function () {
            this.partial("../views/recipe/details.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
    edit(ctx) {
      models.recipe
        .get(ctx.params.id)
        .then((recipe) => {
          const recipeData = docModifier(recipe);
          Object.assign(ctx, recipeData);

          extend(ctx).then(function () {
            this.partial("../views/recipe/edit.hbs");
          });
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  post: {
    create(ctx) {
      const categoriesImages = {
        "Vegetables and legumes/beans":
          "https://tastethefood.weebly.com/uploads/5/2/4/1/52410647/8600737_orig.jpg",
        Fruits:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlTxho4ctAuGF119v5lR4Qe1Xfj7l13gg7Cw&usqp=CAU",
        "Grain Food":
          "https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO%20Images%202019/Health/11November/CR-Health-Inlinehero-Anti-Aging-Whole-Grains-1119",
        "Milk, cheese, eggs and alternatives":
          "https://media.wsimag.com/attachments/e93e9eb9c2850d7ffe69d0383ed27baf224eafd3/store/fill/690/388/35defd11ef8de6b2a0af60645188fd44f1fdcc1e7ed397421e56f58cd7c7/Eggs-milk-and-cheese.jpg",
        "Lean meats and poultry, fish and alternatives":
          "https://i2.wp.com/www.daybyday.website/wp-content/uploads/2018/10/Nuts-And-Lean-Meat.jpeg?resize=618%2C412&ssl=1",
      };
      const {
        meal,
        ingredients,
        prepMethod,
        description,
        foodImageURL,
        category,
      } = ctx.params;
      const data = {
        meal,
        ingredients: ingredients.split(","),
        prepMethod,
        description,
        foodImageURL,
        category,
        likesCounter: 0,
        categoryImageURL: categoriesImages[category],
        creator: localStorage.getItem("username"),
      };

      models.recipe
        .create(data)
        .then(() => {
          notifications.showSuccess("Recipe shared successfully!");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  put: {
    like(ctx) {
      models.recipe
        .get(ctx.params.id)
        .then((recipe) => {
          let likesCounter = recipe.data().likesCounter;
          likesCounter += 1;

          return models.recipe
            .update(ctx.params.id, { likesCounter })
            .then(() => {
              notifications.showSuccess(`You liked that recipe.`);
              ctx.redirect("#/home");
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
      const categoriesImages = {
        "Vegetables and legumes/beans":
          "https://tastethefood.weebly.com/uploads/5/2/4/1/52410647/8600737_orig.jpg",
        Fruits:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlTxho4ctAuGF119v5lR4Qe1Xfj7l13gg7Cw&usqp=CAU",
        "Grain Food":
          "https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO%20Images%202019/Health/11November/CR-Health-Inlinehero-Anti-Aging-Whole-Grains-1119",
        "Milk, cheese, eggs and alternatives":
          "https://media.wsimag.com/attachments/e93e9eb9c2850d7ffe69d0383ed27baf224eafd3/store/fill/690/388/35defd11ef8de6b2a0af60645188fd44f1fdcc1e7ed397421e56f58cd7c7/Eggs-milk-and-cheese.jpg",
        "Lean meats and poultry, fish and alternatives":
          "https://i2.wp.com/www.daybyday.website/wp-content/uploads/2018/10/Nuts-And-Lean-Meat.jpeg?resize=618%2C412&ssl=1",
      };
      const {
        id,
        meal,
        ingredients,
        prepMethod,
        description,
        foodImageURL,
        category,
      } = ctx.params;
      const newData = {
        meal,
        ingredients: ingredients.split(","),
        prepMethod,
        description,
        foodImageURL,
        category,
        categoryImageURL: categoriesImages[category],
      };

      models.recipe
        .update(id, newData)
        .then(() => {
          notifications.showSuccess("Successfully edited recipe.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
  delete: {
    archive(ctx) {
      models.recipe
        .remove(ctx.params.id)
        .then(() => {
          notifications.showSuccess("Your recipe was archived.");
          ctx.redirect("#/home");
        })
        .catch((err) => {
          notifications.showError(err.message);
        });
    },
  },
};

