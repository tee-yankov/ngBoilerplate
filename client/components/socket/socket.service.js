(function() {
    'use strict';

    angular.module('components')
    .factory('socket', socket);

    function socket() {
        var socketIo = io();
        var service = {
            syncUpdates: syncUpdates,
            unsyncUpdates: unsyncUpdates
        };

        return service;

        function syncUpdates(modelName, array, cb) {


            cb = cb || angular.noop;

            socketIo.on(modelName + ':save', function(item) {
                var oldItem = _.find(array, {_id: item._id});
                var index = array.indexOf(oldItem);
                var event = 'created';

                if (oldItem) {
                    array.splice(index, 1, item);
                    event = 'updated';
                } else {
                    array.push(item);
                }

                cb(event, item, array);
            });


            socketIo.on(modelName + ':remove', function(item) {
                var event = 'deleted';
                _.remove(array, { _id: item._id });
                cb(event, item, array);
            });
        }

        function unsyncUpdates(modelName) {
            socketIo.removeAllListeners(modelName + ':save');
            socketIo.removeAllListeners(modelName + 'remove');
        }

    }

})();
