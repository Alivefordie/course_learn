"use strict";

/**
 * `haveEntry` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const body = ctx.request["body"];
    // console.log(body)
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
    const progresses = response.course_syllabus[0]
      ? response.course_syllabus[0].progresses[0]
      : undefined;
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
      const unsyllabus = course.course_syllabus.map((sylla) => {
        // console.log(sylla.progresses);
        return sylla.id != body.data.id
          ? sylla
          : sylla.progresses
          ? {
              id: response.course_syllabus[0].id,
              __component: "activity.video",
              progresses: [...sylla.progresses, resp.id],
            }
          : {
              id: response.course_syllabus[0].id,
              __component: "activity.video",
              progresses: [resp.id],
            };
      });

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
