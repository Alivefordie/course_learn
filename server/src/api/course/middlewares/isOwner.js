"use strict";

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    let entry = {};
    if (entryId) {
      entry = await strapi.entityService.findOne(
        "api::course.course",
        entryId,
        { populate: "owner" }
      );
    }
    if (user.id !== entry.owner?.id) {
      return ctx.unauthorized("This action is unauthorized.");
    } else {
      return next();
    }
  };
};
