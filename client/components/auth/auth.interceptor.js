(function() {
    'use strict';

    angular.module('components')
    .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$location'];

    function authInterceptor($rootScope, $q, $cookieStore, $location) {
        var service = {
            request: request,
            responseError: responseError
        };

        return service;

        function request(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config
                .headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }

            return config;
        }

        function responseError(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove old tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    }

})();
