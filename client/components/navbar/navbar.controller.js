(function() {
    'use strict';

    angular.module('components')
    .controller('Navbar', Navbar);

    function Navbar() {
        var vm = this;
        vm.items = [
            { name:'Home', link:'main' },
            { name:'About', link:'about' }
        ];
    }

})();
