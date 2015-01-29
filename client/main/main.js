(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .config(function($stateProvider) {
        $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/client/main/main.html',
            controller: 'Main',
            controllerAs: 'vm'
        });
    });
})();
