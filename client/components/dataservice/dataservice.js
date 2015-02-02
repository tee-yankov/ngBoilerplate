(function() {
    'use strict';

    angular.module('components')
    .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];

    function dataservice($http) {
        return {
            getMain: getMain,
            postMain: postMain
        };

        function getMain() {
            return $http.get('/api/main')
            .then(requestCompleted)
            .catch(requestFailed);
        }

        function postMain(input) {
            return $http.post('/api/main/', {message: input})
            .then(requestCompleted)
            .catch(requestFailed);
        }

        function requestCompleted(res) {
            return res.data;
        }

        function requestFailed(err) {
            console.log('XHR Failed for Main ' + err.data);
            return err.data;
        }
    }

})();
