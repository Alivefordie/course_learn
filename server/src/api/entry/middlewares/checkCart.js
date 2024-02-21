"use strict";

/**
 * `checkCart` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const Id = ctx.params.id;
    const arrayId = Id.split(",");
    const CourseId = arrayId.sort((a, b) => Number(a) - Number(b));
    const userId = ctx.state.user.id;
    const CountEntryInEnroll = await Promise.all(
      CourseId.map((entryid) =>
        strapi.db.query("api::entry.entry").count({
          where: {
            course: { id: entryid },
            owner: { id: userId },
            enroll: { $notNull: true },
          },
        })
      )
    );
    const InEnroll = CourseId.filter((_, i) => CountEntryInEnroll[i] > 0);
    const CountEntryInCart = await Promise.all(
      CourseId.map((entryid) =>
        strapi.db.query("api::entry.entry").count({
          where: {
            course: { id: entryid },
            owner: { id: userId },
            cart: { $notNull: true },
          },
        })
      )
    );
    const NotInCart = CourseId.filter((_, i) => CountEntryInCart[i] == 0);
    if (CourseId.length != 1 && NotInCart.length > 0 && InEnroll.length > 0) {
      return ctx.badRequest(
        `course id: ${InEnroll.join(
          ","
        )} have already been registered , course id: ${NotInCart.join(
          ","
        )} is not in cart`
      );
    } else if (InEnroll.length > 0) {
      return ctx.badRequest(
        `course id: ${InEnroll.join(",")} have already been registered`
      );
    } else if (NotInCart.length > 0) {
      return ctx.badRequest(`course id: ${NotInCart.join(",")} is not in cart`);
    }
    ctx.params.id = CourseId;
    return next();
  };
};
