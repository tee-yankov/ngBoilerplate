(function() {
    'use strict';

    angular.module('ngBoilerplate', [
        'ui.router'
    ])
    .config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');
    });

})();
