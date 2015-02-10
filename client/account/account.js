(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .config(function($stateProvider) {
        $stateProvider
        .state('account', {
            url: '/account',
            templateUrl: '/account/account.html',
            controller: 'Account',
            controllerAs: 'vm'
        });
    });

})();
