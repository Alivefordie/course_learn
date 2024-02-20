"use strict";

/**
 * `haveEntry` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    const entry = await strapi.db.query("api::entry.entry").findMany({
      where: {
        owner: user.id,
        course: entryId,
      },
      populate: { owner: true },
    });
    if (Object.keys(entry).length == 0) {
      await strapi.db.query("api::entry.entry").create({
        data: {
          owner: user.id,
          course: entryId,
        },
      });
    }
    return next();
  };
};
