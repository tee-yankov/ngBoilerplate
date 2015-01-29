(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .config(function($stateProvider) {
        $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/main/main.html',
            controller: 'Main',
            controllerAs: 'vm'
        });
    });
})();
