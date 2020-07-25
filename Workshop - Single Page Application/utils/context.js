export default function (ctx) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      ctx.isLoggedIn = true;
      ctx.username = user.email;
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("username", user.email);
    } else {
      ctx.isLoggedIn = false;
      ctx.username = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
    }
  });

  return ctx.loadPartials({
    navigation: "../views/common/navigation.hbs",
    footer: "../views/common/footer.hbs",
  });
}
