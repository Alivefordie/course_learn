"use strict";

/**
 * course controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::course.course", ({ strapi }) => ({
  async favorite(ctx) {
    const entries = await strapi.db.query("api::course.course").findMany({
      where: {
        entries: {
          like: {
            $notNull: true,
          },
        },
      },
    });
    const sanitizedResults = await this.sanitizeOutput(entries, ctx);
    return this.transformResponse(sanitizedResults);
  },
}));
