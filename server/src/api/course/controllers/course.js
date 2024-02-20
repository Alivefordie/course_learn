"use strict";

/**
 * course controller
 */
const Parameters = {
  select: [
    "id",
    "title",
    "description",
    "duration",
    "price",
    "amount",
    "maxCapacity",
    "likeCount",
  ],
};
const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::course.course", ({ strapi }) => ({
  async favorite(ctx) {
    const entries = await strapi.db.query("api::course.course").findMany({
      ...Parameters,
      where: {
        entries: {
          like: {
            $notNull: true,
          },
        },
      },
      populate: { picture: true, entries: { select: ["id", "like"] } },
    });
    return entries;
  },
  async cart(ctx) {
    const entries = await strapi.db.query("api::course.course").findMany({
      ...Parameters,
      where: {
        entries: {
          cart: {
            $notNull: true,
          },
        },
      },
      populate: { picture: true, entries: { select: ["id", "cart"] } },
    });
    return entries;
  },
  async find(ctx) {
    const entries = await strapi.db.query("api::course.course").findMany({
      ...Parameters,
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
      //orderBy: [{ id: "desc" }, { entries: { enroll: "asc" } }],
      //orderBy: [{ amount: "desc" }, { id: "desc" }],
      populate: { picture: true, entries: { select: ["id", "like"] } },
    });
    return entries;
  },
}));
