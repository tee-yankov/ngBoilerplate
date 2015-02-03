(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .config(function($stateProvider) {
        $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: '/register/register.html',
            controller: 'Register',
            controllerAs: 'vm'
        });
    });

})();
