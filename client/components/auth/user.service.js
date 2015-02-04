/**
 * Service for RESTful interaction with the
 * user API route.
 *
 * @param {string} id - the user's id
 */
(function() {
    'use strict';

    angular.module('components')
    .factory('User', User);

    User.$inject = ['$resource'];

    function User($resource) {
        return $resource('/api/user/:id', {
            id: '@_id'
        },
                         {
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
    }

})();
