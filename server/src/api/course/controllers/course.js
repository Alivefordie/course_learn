"use strict";

const progress = require("../../progress/controllers/progress");

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
    "createdAt",
    "updatedAt",
    "publishedAt",
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
        owner: { select: "username" },
        entries: { where: { owner: user.id } },
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
        owner: { select: "username" },
        entries: { where: { owner: user.id } },
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
        owner: { select: "username" },
        entries: { where: { owner: user.id } },
        course_syllabus: {
          on: {
            "activity.video": {
              populate: {
                progresses: {
                  where: { users_permissions_user: user.id },
                },
              },
            },
          },
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
    const userEnrty = user
      ? { entries: { where: { owner: user.id } } }
      : undefined;
    const Owned =
      user && ctx.request.query.owner ? { owner: user.id } : undefined;
    const entries = await strapi.db.query("api::course.course").findMany({
      ...Parameters,
      where: { ...Owned },
      populate: {
        picture: true,
        owner: { select: "username" },
        ...userEnrty,
      },
      orderBy: haveLikemost ? haveLikemost : haveNewest,
    });
    return this.transformResponse(entries);
  },

  async create(ctx) {
    const { user } = ctx.state;
    if (typeof ctx.request["body"].data === "string") {
      ctx.request["body"].data = JSON.parse(ctx.request["body"].data);
      ctx.request["body"].data = JSON.stringify({
        ...ctx.request["body"].data,
        owner: { connect: [user.id] },
      });
    } else {
      ctx.request["body"].data = {
        ...ctx.request["body"].data,
        owner: { connect: [user.id] },
      };
    }
    ctx.request.query = {
      populate: {
        // @ts-ignore
        picture: "true",
        course_syllabus: {
          populate: "*",
        },
      },
    };
    const response = await super.create(ctx);
    return response;
  },

  async findOne(ctx) {
    const user = ctx.state.user;
    const entryId = ctx.params.id;

    if (!user) {
      const response = await strapi.db.query("api::course.course").findOne({
        where: { id: entryId },
        populate: {
          owner: { select: "username" },
          picture: true,
          course_syllabus: true
        },
      });
      return this.transformResponse(response);
    }
    const Owned = await strapi.db.query("api::course.course").count({
      where: {
        id: entryId,
        owner: user.id,
      },
    });
    const enrolled = await strapi.db.query("api::entry.entry").count({
      where: {
        course: entryId,
        owner: user.id,
        enroll: { $notNull: true },
      },
    });
    if (Owned) {
      const response = await strapi.db.query("api::course.course").findOne({
        where: { id: entryId },
        populate: {
          owner: { select: "username" },
          picture: true,
          course_syllabus: {
            on: {
              "activity.file": { populate: true },
              "activity.review": { populate: true },
              "activity.text": true,
              "activity.video": { populate: { videoFile: true } },
            },
          },
        },
      });
      return this.transformResponse(response);
    }
    if (enrolled) {
      const response = await strapi.db.query("api::course.course").findOne({
        where: { id: entryId },
        populate: {
          owner: { select: "username" },
          picture: true,
          entries: { filters: { owner: user.id } },
          course_syllabus: {
            on: {
              "activity.file": { populate: true },
              "activity.review": { populate: true },
              "activity.text": true,
              "activity.video": {
                populate: {
                  videoFile: true,
                  progresses: {
                    where: { users_permissions_user: user.id },
                  },
                },
              },
            },
          },
        },
      });
      return this.transformResponse(response);
    }
    const response = await strapi.db.query("api::course.course").findOne({
      where: { id: entryId },
      populate: {
        owner: { select: "username" },
        picture: true,
        course_syllabus: {
            on: {
              "activity.file": { populate: true },
              "activity.review": { populate: true },
              "activity.text": true,
              "activity.video": {
                populate: {
                  videoFile: true,
                  progresses: {
                    where: { users_permissions_user: user.id },
                  },
                },
              },
            },
          },
        entries: { filters: { owner: user.id } },
      },
    });
    return this.transformResponse(response);
  },
}));
