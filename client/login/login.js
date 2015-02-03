(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .config(function($stateProvider) {
        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/login/login.html',
            controller: 'Login',
            controllerAs: 'vm'
        });
    });

})();
