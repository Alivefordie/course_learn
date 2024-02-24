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
    const EntriesInEnroll = await strapi.db.query("api::entry.entry").findMany({
      where: {
        course: { id: CourseId },
        owner: { id: userId },
        enroll: { $notNull: true },
      },
      populate: { course: true },
    });
    const InEnroll = EntriesInEnroll.map((e) => e?.course.id);
    const EntriesInCart = await strapi.db.query("api::entry.entry").findMany({
      where: {
        course: { id: CourseId },
        owner: { id: userId },
        cart: { $notNull: true },
      },
      populate: { course: true },
    });
    const InCartId = EntriesInCart.map((e) => String(e?.course.id));
    const NotInCart = CourseId.filter((e) => !InCartId.includes(e));
    if (InEnroll.length > 0) {
      return ctx.badRequest(
        `course : ${InEnroll.join(",")} have already been registered`
      );
    } else if (NotInCart.length > 0) {
      return ctx.badRequest(`course : ${NotInCart.join(",")} is not in cart`);
    }
    ctx.params.id = CourseId;
    return next();
  };
};
