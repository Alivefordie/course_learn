"use strict";

/**
 * `haveEntry` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const body = ctx.request["body"];
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    const response = await strapi.db.query("api::course.course").findOne({
      where: { id: entryId },
      populate: {
        course_syllabus: {
          on: {
            "activity.video": {
              where: { id: body.data.id },
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
    // console.log(response.course_syllabus);
    const progresses = response.course_syllabus[0]
      ? response.course_syllabus[0].progresses[0]
      : undefined;
    // console.log(progresses);
    if (!progresses) {
      const course = await strapi.db.query("api::course.course").findOne({
        where: { id: entryId },
        populate: { course_syllabus: { populate: true } },
      });
      const resp = await strapi.db.query("api::progress.progress").create({
        data: {
          users_permissions_user: user.id,
        },
      });
      const unsyllabus = course.course_syllabus.map((s) =>
        s.id != body.data.id
          ? s
          : {
              id: response.course_syllabus[0].id,
              __component: "activity.video",
              progresses: [...s.progresses, resp.id],
            }
      );
      console.log(unsyllabus);

      await strapi.entityService.update("api::course.course", entryId, {
        data: {
          course_syllabus: unsyllabus,
        },
      });
      ctx.params = { id: resp.id };
    } else {
      ctx.params = { id: progresses.id };
    }
    return next();
  };
};