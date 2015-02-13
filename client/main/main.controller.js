(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .controller('Main', Main);

    Main.$inject = ['dataservice', 'Auth', 'socket'];

    function Main(dataservice, Auth, socket) {
        var vm = this;
        vm.submitMain = submitMain;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.deleteMain = deleteMain;

        activate();

        /** Runs when the controller initializes. */
        function activate() {
            return getMain();
        }

        /**
         * Fetches data from the Main collection and syncs
         * its updates via socket.io
         */
        function getMain() {
            return dataservice.getMain()
            .then(function(data) {
                vm.status = data.message ? data.message : {};
                socket.syncUpdates('main', vm.status);
                return data;
            });
        }

        /**
         * Submits a new message to the Main collection
         * @param {string} input - the message to be sent
         */
        function submitMain(input) {
            return dataservice.postMain(input)
            .then(function(data) {
                return data;
            });
        }

        /**
         * Deletes and item from the Main collection.
         * @param {objectId} id - the id of the item to be deleted
         */
        function deleteMain(id) {
            return dataservice.deleteMain(id)
            .then(function(data) {
                return data;
            });
        }
    }

})();
