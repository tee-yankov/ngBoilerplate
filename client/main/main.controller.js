(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .controller('Main', Main);

    Main.$inject = ['dataservice', 'Auth'];

    function Main(dataservice, Auth) {
        var vm = this;
        vm.submitMain = submitMain;
        vm.isLoggedIn = Auth.isLoggedIn;

        console.log(Auth.isLoggedIn());
        console.log(Auth.getCurrentUser());

        activate();

        function activate() {
            return getMain();
        }

        function getMain() {
            return dataservice.getMain()
            .then(function(data) {
                vm.status = data.message ? data.message : {};
                return data;
            });
        }

        function submitMain(input) {
            return dataservice.postMain(input)
            .then(function(data) {
                console.log(data);
                getMain();
                return data;
            });
        }
    }

})();
