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
    const user = ctx.state.user;
    const entries = await strapi.db.query("api::course.course").findMany({
      ...Parameters,
      where: {
        entries: {
          like: { $notNull: true },
          owner: { id: user.id },
        },
      },
      populate: {
        picture: true,
        entries: {
          select: ["id", "like"],
          where: { owner: user.id },
        },
      },
    });
    return this.transformResponse(entries);
  },
  async cart(ctx) {
    const user = ctx.state.user;
    const entries = await strapi.db.query("api::course.course").findMany({
      ...Parameters,
      where: {
        entries: {
          cart: { $notNull: true },
          owner: { id: user.id },
        },
      },
      populate: {
        picture: true,
        entries: {
          select: ["id", "cart"],
          where: { owner: user.id },
        },
      },
    });
    return this.transformResponse(entries);
  },
  async mycourses(ctx) {
    const user = ctx.state.user;
    const entries = await strapi.db.query("api::course.course").findMany({
      ...Parameters,
      where: {
        entries: {
          enroll: { $notNull: true },
          owner: { id: user.id },
        },
      },
      populate: {
        picture: true,
        entries: {
          select: ["id", "enroll"],
          where: { owner: user.id },
        },
      },
    });
    return this.transformResponse(entries);
  },
  async find(ctx) {
    const user = ctx.state.user;
    const haveLikemost = ctx.request.query.likeMost
      ? { likeCount: "desc" }
      : undefined;
    const haveNewest = ctx.request.query.Newest
      ? { publishedAt: "desc" }
      : undefined;
    const userLike = user
      ? {
          entries: {
            select: ["id", "like"],
            where: { owner: user.id },
          },
        }
      : undefined;
    const Owned =
      user && ctx.request.query.owner
        ? {
            owner: user.id,
          }
        : undefined;
    const entries = await strapi.db.query("api::course.course").findMany({
      ...Parameters,
      where: {
        entries: {
          like: { $null: true },
          cart: { $null: true },
        },
        ...Owned,
      },
      populate: {
        picture: true,
        owner: {
          select: "username",
        },
        ...userLike,
      },
      orderBy: { ...haveLikemost, ...haveNewest },
    });
    return this.transformResponse(entries);
  },
  async create(ctx) {
    const { user } = ctx.state;
    ctx.request["body"].data = {
      ...ctx.request["body"].data,
      owner: { connect: [user.id] },
    };
    const response = await super.create(ctx);
    return response;
  },
  async findOne(ctx) {
    ctx.request.query = {
      populate: {
        // @ts-ignore
        owner: { fields: "username" },
        picture: true,
        course_syllabus: true,
      },
    };
    const response = await super.findOne(ctx);
    return response;
  },
}));
