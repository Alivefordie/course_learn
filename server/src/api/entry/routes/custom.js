"use strict";

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/courses/:id/like",
      handler: "entry.like",
    },
  ],
};
