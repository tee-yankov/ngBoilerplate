/**
 * Authentication Service
 * Exposes various means of authentication to the server.
 */
(function() {
    'use strict';

    angular.module('components')
    .factory('Auth', Auth);

    Auth.$inject = ['$http', '$cookieStore', '$q', 'User'];

    function Auth($http, $cookieStore, $q, User) {
        var service = {
            loginUser: loginUser,
            registerUser: registerUser,
            logout: logout,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            getToken: getToken,
            isLoggedInAsync: isLoggedInAsync
        };
        var currentUser = {};
        if($cookieStore.get('token')) {
            currentUser = User.get();
        }

        return service;

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
            .then(loginCompleted)
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
            .then(loginCompleted)
            .catch(requestFailed);
        }

        function logout() {
            $cookieStore.remove('token');
            currentUser = {};
        }

        function getCurrentUser() {
            return currentUser;
        }

        function isLoggedIn() {
            return currentUser.hasOwnProperty('role');
        }

        function isAdmin() {
            return currentUser.role === 'admin';
        }

        function getToken() {
            return $cookieStore.get('token');
        }

        function isLoggedInAsync(cb) {
            if(currentUser.hasOwnProperty('$promise')) {
                currentUser.$promise.then(function() {
                    cb(true);
                }).catch(function() {
                    cb(false);
                });
            } else if(currentUser.hasOwnProperty('role')) {
                cb(true);
            } else {
                cb(false);
            }
        }

        function loginCompleted(data) {
            $cookieStore.put('token', data.data.token);
            currentUser = User.get();
            return data.data;
        }

    }

    /**
     * Executes on successful request.
     *
     * @return {object} data - User data received from the server.
     * Might need to reduce the amount of information exposed later on.
     */
    /*    function requestCompleted(data) {
        return data.data;
    }*/

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
