'use strict';

/**
 * course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course.course', ({ strapi }) => ({
  async like(ctx) {
    const entityId = ctx.params.id;
    try {
      let course = await strapi.entityService.findOne('api::course.course', entityId)
      course = await strapi.entityService.update('api::course.course', entityId, { data: { likeCount: (course.likeCount + 1) } })
      ctx.body = { ok: 1, likeCount: course.likeCount };
    } catch (err) {
      ctx.body = err;
    }
  },


})); 
