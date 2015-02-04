(function() {
    'use strict';

    angular.module('components')
    .controller('Navbar', Navbar);

    Navbar.$inject = ['Auth'];

    function Navbar(Auth) {
        var vm = this;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.getCurrentUser = Auth.getCurrentUser;
        vm.logout = Auth.logout;
        vm.items = [
            { name:'Home', link:'main' },
            { name:'About', link:'about' },
            { name:'Login', link:'login' },
            { name:'Register', link:'register' }
        ];
    }

})();
