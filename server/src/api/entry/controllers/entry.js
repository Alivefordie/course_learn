"use strict";

/**
 * entry controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::entry.entry", ({ strapi }) => ({
  async like(ctx) {
    const entityId = ctx.params.id;
    const userId = ctx.state.user.id;
    try {
      const entry = await strapi.entityService.findMany("api::entry.entry", {
        filters: { owner: userId, course: entityId },
      });
      if (!entry[0].like) {
        await strapi.entityService.update("api::entry.entry", entry[0].id, {
          data: { like: new Date() },
        });
      } else {
        await strapi.entityService.update("api::entry.entry", entry[0].id, {
          data: { like: null },
        });
      }
      const [, count] = await strapi.db
        .query("api::entry.entry")
        .findWithCount({
          where: { course: entityId, like: { $notNull: true } },
        });
      await strapi.entityService.update("api::course.course", entityId, {
        data: { likeCount: count },
      });
      ctx.body = { ok: 1, likeCount: count };
    } catch (err) {
      ctx.body = err;
    }
  },
}));
