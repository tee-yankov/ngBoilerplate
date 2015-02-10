(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .controller('Account', Account);

    Account.$inject = ['Auth'];

    function Account(Auth) {
        var vm = this;
        vm.currentUser = Auth.getCurrentUser();
    }

})();
