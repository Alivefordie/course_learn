"use strict";

/**
 * progress router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::progress.progress", {
  config: {
    update: {
      middlewares: ["api::progress.have-entry"],
    },
  },
});
