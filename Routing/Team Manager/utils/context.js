export default function (ctx) {
  return ctx.loadPartials({
    header: "../templates/common/header.hbs",
    footer: "../templates/common/footer.hbs",
  });
}
