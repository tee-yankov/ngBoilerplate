/**
 * Posts an item to the main route
 * @param {function} submit - function used to post the item
 * Creates an isolate scope so as to not interfere with surroundings.
 */
(function() {
    'use strict';

    angular.module('components')
    .directive('addMainModal', addMainModal);

    addMainModal.$inject = ['$timeout'];

    function addMainModal($timeout) {
        var directive = {
            restrict: 'E',
            templateUrl: '/components/add-main-modal/modal.html',
            link: link,
            scope: {
                submit: '&'
            }
        };

        return directive;

        function link(scope, element) {
            scope.hidden = true;
            var hovering = false,
                button = element[0].firstElementChild.firstElementChild,
                modalContainer = element[0].children[1],
                input = element[0].children[1].children[1].children[0];

            modalContainer.addEventListener('mouseover', function() {
                hovering = true;
            });

            modalContainer.addEventListener('mouseout', function() {
                hovering = false;
            });

            button.addEventListener('mouseover', function() {
                hovering = true;
            });

            button.addEventListener('mouseout', function() {
                hovering = false;
            });

            button.addEventListener('click', function() {
                toggleModal();
            });

            document.addEventListener('click', function() {
                if (!hovering) {
                    toggleModal();
                }
            });

            function toggleModal() {
                if (hovering === true && scope.hidden === true) {
                    scope.hidden = false;
                    $timeout(function() {
                        input.focus();
                    }, 500);
                } else {
                    scope.hidden = true;
                }
                $timeout(function() {
                    scope.$apply();
                }, 100);
            }

            /**
             * Submits an item to the Main collection
             * @param {string} scope.input - Posts the current scope.input
             * to the Main collection. Alert if scope.input is empty.
             */
            scope.submitItem = function() {
                if (scope.input && scope.input.length > 0) {
                    scope.submit({ input: scope.input });
                    scope.input = '';
                    toggleModal();
                } else { window.alert('Input is empty!'); }
            };
        }
    }

})();
