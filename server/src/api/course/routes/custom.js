'use strict';

module.exports = {
  routes: [ //custom routes
    {
      method: 'GET',
      path: '/courses/:id/like',
      handler: 'course.like'
    }
  ]
}
