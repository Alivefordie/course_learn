"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/favorite",
      handler: "course.favorite",
    },
    {
      method: "GET",
      path: "/cart",
      handler: "course.cart",
    },
    {
      method: "GET",
      path: "/my-courses",
      handler: "course.mycourses",
    },
  ],
};
