(function() {
    'use strict';

    angular.module('ngBoilerplate', [
        'ui.router',
        'components',
        'ngAnimate',
        'ngCookies',
        'ngResource'
    ])
    .config(function($urlRouterProvider,
                      $locationProvider,
                      $urlMatcherFactoryProvider,
                      $httpProvider) {
        $urlMatcherFactoryProvider.strictMode(false);
        $urlRouterProvider.otherwise('/main');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })
    .run(function($rootScope, $location, Auth) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            Auth.isLoggedInAsync(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    });
})();
