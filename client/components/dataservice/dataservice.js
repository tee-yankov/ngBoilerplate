(function() {
    'use strict';

    angular.module('components')
    .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];

    function dataservice($http) {
        return {
            getMain: getMain,
            postMain: postMain,
            deleteMain: deleteMain
        };


        /** Returns all items in the Main collection */
        function getMain() {
            return $http.get('/api/main')
            .then(requestCompleted)
            .catch(requestFailed);
        }

        /**
         * Posts an item to the Main collection
         * @param {string} input - the message to be recorder
         * Requires the message key.
         */
        function postMain(input) {
            return $http.post('/api/main/', {message: input})
            .then(requestCompleted)
            .catch(requestFailed);
        }

        /**
         * Delets a single item from the Main collection
         * @param {objectId} id - the id of the item to be deleted
         * Requires the id parameter.
         */
        function deleteMain(id) {
            return $http.delete('/api/main/' + id)
            .then(requestCompleted)
            .catch(requestFailed);
        }

        /** Callback on succesful request. */
        function requestCompleted(res) {
            return res.data;
        }

        /** Callback on failed request. */
        function requestFailed(err) {
            console.log('XHR Failed for Main ' + err.data);
            return err.data;
        }
    }

})();
