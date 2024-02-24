"use strict";

/**
 * course router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::course.course", {
  config: {
    update: {
      middlewares: ["api::course.is-owner"],
    },
    delete: {
      middlewares: ["api::course.is-owner"],
    },
  },
});
