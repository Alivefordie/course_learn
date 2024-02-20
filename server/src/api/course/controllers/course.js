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
  async find(ctx) {
    const entries = await strapi.db.query("api::course.course").findMany({
      select: [
        "title",
        "description",
        "duration",
        "price",
        "amount",
        "likeCount",
      ],
      where: {
        entries: {
          like: {
            $null: true,
          },
          cart: {
            $null: true,
          },
        },
      },
      orderBy: { id: "desc" },
      populate: { picture: true },
    });

    return entries;
  },
}));
