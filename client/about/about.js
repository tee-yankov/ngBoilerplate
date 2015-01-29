(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .config(function($stateProvider) {
        $stateProvider
        .state('about', {
            url: '/about',
            templateUrl: '/about/about.html',
            controller: 'About',
            controllerAs: 'vm'
        });
    });

})();
