export default function (ctx, template) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      ctx.loggedIn = true;
      ctx.uid = user.uid;
      ctx.username = user.email;
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("username", user.email);
    } else {
      ctx.loggedIn = false;
      ctx.uid = null;
      ctx.username = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
    }
  });

  const partials = {
    header: "../templates/common/header.hbs",
    footer: "../templates/common/footer.hbs",
  };

  if (template) {
    Object.assign(partials, template);
  }

  return ctx.loadPartials(partials);

  // return ctx.loadPartials({
  //   header: "../templates/common/header.hbs",
  //   footer: "../templates/common/footer.hbs",
  // });
}
