'use strict';

module.exports = {
  routes: [ 
    {
      method: 'GET',
      path: '/courses/:id/like',
      handler: 'course.like'
    }
  ]
}
