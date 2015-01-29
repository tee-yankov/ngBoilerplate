(function() {
    'use strict';

    angular.module('ngBoilerplate', [
        'ui.router'
    ])
    .config(function($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/main');
        $locationProvider.html5Mode(true);
    });

})();
