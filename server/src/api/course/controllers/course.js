"use strict";

/**
 * course controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::course.course", ({ strapi }) => ({
  async favorite(ctx) {},
}));
