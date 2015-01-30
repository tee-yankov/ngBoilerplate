(function() {
    'use strict';

    angular.module('components')
    .directive('carousel', carousel);

    function carousel() {
        var directive = {
            restrict: 'E',
            templateUrl: '/components/carousel/carousel.html',
            link: link
        };

        return directive;

        function link(scope, element) {
            scope.vm.currentImage = 1;
            scope.vm.isHidden = true;
            var forward = element[0].lastElementChild
            .lastElementChild.lastElementChild;
            var back = element[0].lastElementChild
            .lastElementChild.firstElementChild;
            element.on('mouseover', function() {
                scope.vm.isHidden = false;
                scope.$apply();
            });
            element.on('mouseout', function() {
                scope.vm.isHidden = true;
                scope.$apply();
            });
            back.addEventListener('click', function() {
                if (scope.vm.currentImage > 1) {
                    switchImage('back');
                } else { switchImage(3); }
            });
            forward.addEventListener('click', function() {
                if (scope.vm.currentImage < 3) {
                    switchImage('forward');
                } else { switchImage(1); }
            });

            function switchImage(value) {
                switch (value) {
                    case 1:
                        scope.vm.currentImage = 1;
                        scope.$apply();
                        break;
                    case 3:
                        scope.vm.currentImage = 3;
                        scope.$apply();
                        break;
                    case 'forward':
                        scope.vm.currentImage += 1;
                        scope.$apply();
                        break;
                    case 'back':
                        scope.vm.currentImage -= 1;
                        scope.$apply();
                        break;
                    default:
                        scope.vm.currentImage = 1;
                        scope.$apply();
                }
            }
        }

    }

})();
