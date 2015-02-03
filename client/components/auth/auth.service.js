/**
 * Authentication Service
 * Exposes various means of authentication to the server.
 */
(function() {
    'use strict';

    angular.module('components')
    .factory('Auth', Auth);

    Auth.$inject = ['$http'];

    function Auth($http) {
        var factory = {
            loginUser: loginUser,
            registerUser: registerUser
        };

        return factory;

        /**
         * Registers an user.
         *
         * @param {object} user - The user object containing user credentials
         */
        function registerUser(user) {
            return $http.post('/api/user', {
                name: user.name,
                email: user.email,
                password: user.password
            })
            .then(requestCompleted)
            .catch(requestFailed);
        }

        /**
         * Logs the user in.
         *
         * @param {object} user - The user object containing user credentials
         */
        function loginUser(user) {
            return $http.post('/auth/local', {
                email: user.email,
                password: user.password
            })
            .then(requestCompleted)
            .catch(requestFailed);
        }

    }

    /**
     * Executes on successful request.
     *
     * @return {object} data - User data received from the server.
     * Might need to reduce the amount of information exposed later on.
     */
    function requestCompleted(data) {
        return data.data;
    }

    /**
     * Executes on failed request.
     *
     * @return {object} err - Returns an object containing error information.
     * Might need to reduce the amount of information exposed later on.
     */
    function requestFailed(err) {
        console.log('XHR request failed!');
        return err;
    }

})();
