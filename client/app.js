(function() {
    'use strict';

    angular.module('ngBoilerplate', [
        'ui.router',
        'components',
        'ngAnimate'
    ])
    .config(function($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/main');
        $locationProvider.html5Mode(true);
    });

})();
