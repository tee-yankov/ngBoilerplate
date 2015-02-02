(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .controller('Main', Main);

    Main.$inject = ['dataservice'];

    function Main(dataservice) {
        var vm = this;
        vm.submitMain = submitMain;

        activate();

        function activate() {
            return getMain();
        }

        function getMain() {
            return dataservice.getMain()
            .then(function(data) {
                vm.status = data.message;
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
