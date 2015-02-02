/* Posts an item to the main route
 * @param submit {function} - function use to post the item
 * Creates an isolate scope so as to not interfere with surroundings.
 */
(function() {
    'use strict';

    angular.module('components')
    .directive('addMainModal', addMainModal);

    function addMainModal() {
        var directive = {
            restrict: 'E',
            templateUrl: '/components/add-main-modal/modal.html',
            link: link,
            scope: {
                submit: '&'
            }
        };

        return directive;

        function link(scope) {
            scope.submitItem = function() {
                if (scope.input && scope.input.length > 0) {
                    scope.submit({ input: scope.input });
                    scope.input = '';
                } else { window.alert('Input is empty!'); }
            };
        }
    }

})();
