export default function (ctx) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      ctx.isLoggedIn = true;
      ctx.email = user.email;
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("email", user.email);
    } else {
      ctx.isLoggedIn = false;
      ctx.email = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
    }
  });

  return ctx.loadPartials({
    header: "../views/common/header.hbs",
    footer: "../views/common/footer.hbs",
  });
}
