(function() {
    'use strict';

    angular.module('components')
    .directive('spinner', spinner);

    spinner.$inject = ['$http'];

    function spinner($http) {
        var directive = {
            restrict: 'E',
            templateUrl: '/components/spinner/spinner.html',
            link: link
        };

        return directive;

        function link(scope, element) {
            scope.isLoading = function() {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function(v) {
                if(v){
                    element.css({
                        display: "block"
                    });
                } else {
                    element.css({
                        display: "none"
                    });
                }
            });
        }}

})();
