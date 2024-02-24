"use strict";

const { forEach } = require("../../../../config/middlewares");

/**
 * `checkCapacity` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const entriesID = ctx.params.id;
    const Courses = await strapi.db.query("api::course.course").findMany({
      where: { id: entriesID },
    });
    const FullCourses = Courses.filter((c) => c.amount >= c.maxCapacity);
    debugger;
    if (FullCourses.length > 0) {
      return ctx.badRequest(
        `can not enroll course id :${FullCourses.join(",")} is full:`
      );
    }
    return next();
  };
};
