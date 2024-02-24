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
      if (!entry[0].like) {
        ctx.body = { like: "ok", likeCount: count };
      } else {
        ctx.body = { unlike: "ok", likeCount: count };
      }
    } catch (err) {
      ctx.body = err;
    }
  },
  async toCart(ctx) {
    const entityId = ctx.params.id;
    const userId = ctx.state.user.id;
    try {
      const entry = await strapi.entityService.findMany("api::entry.entry", {
        filters: { owner: userId, course: entityId },
      });
      if (!entry[0].cart) {
        await strapi.entityService.update("api::entry.entry", entry[0].id, {
          data: { cart: new Date() },
        });
        ctx.body = { AddToCart: "ok", courseID: entityId };
      } else {
        await strapi.entityService.update("api::entry.entry", entry[0].id, {
          data: { cart: null },
        });
        ctx.body = { RemoveFromCart: "ok", courseID: entityId };
      }
    } catch (err) {
      ctx.body = err;
    }
  },
  async enroll(ctx) {
    const CourseId = ctx.params.id;
    const entriesID = Object.values(CourseId);
    const userId = ctx.state.user.id;
    const toUpdate = await strapi.db.query("api::entry.entry").findMany({
      where: {
        course: { id: entriesID },
        owner: { id: userId },
        cart: { $notNull: true },
      },
      populate: { course: true, owner: true },
    });
    await strapi.db.query("api::entry.entry").updateMany({
      where: {
        id: { $in: toUpdate.map(({ id }) => id) },
      },
      data: { cart: null, enroll: new Date() },
    });
    const count = await Promise.all(
      entriesID.map((entryid) =>
        strapi.db.query("api::entry.entry").count({
          where: {
            course: { id: entryid },
            enroll: { $notNull: true },
          },
        })
      )
    );
    await Promise.all(
      entriesID.map((courseId, index) => {
        strapi.db.query("api::course.course").update({
          where: { id: courseId },
          data: { amount: count[index] },
        });
      })
    );
    ctx.body = { enroll: "ok", enroll_ID: entriesID };
  },
}));
