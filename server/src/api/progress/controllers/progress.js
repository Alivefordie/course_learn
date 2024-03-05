"use strict";

/**
 * progress controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::progress.progress", {
  async update(ctx) {
    const body = ctx.request["body"].data;
    ctx.request["body"] = { data: { value: body.value } };
    const result = await super.update(ctx);
    return result;
  },
});
