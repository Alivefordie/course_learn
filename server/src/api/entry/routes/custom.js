"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/courses/:id/like",
      handler: "entry.like",
      config: {
        middlewares: ["api::entry.have-entry"],
      },
    },
    {
      method: "GET",
      path: "/courses/:id/toCart",
      handler: "entry.toCart",
      config: {
        middlewares: ["api::entry.have-entry"],
      },
    },
    {
      method: "GET",
      path: "/enroll",
      handler: "entry.enroll",
    },
  ],
};
