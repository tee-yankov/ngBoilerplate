(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .controller('Login', Login);

    Login.$inject = ['Auth', '$state'];

    function Login(Auth, $state) {
        var vm = this;
        vm.loginUser = loginUser;

        /**
         * Logs the user in
         *
         * @param {object} vm.user - user credentials
         */
        function loginUser() {
            if (validateUser(vm.user) === true) {
                return Auth.loginUser(vm.user)
                .then(loginCompleted);
            } else { console.log('Invalid input!'); }
        }

        /**
         * Executes on finished login request
         * Determines if the request was succesful
         * Redirects the user to the main page
         */
        function loginCompleted(data) {
            if (data.hasOwnProperty('token')) {
                $state.go('main');
            } else { window.alert('Invalid Credentials'); }
        }

        /**
         * Validates the user object
         *
         * @param {object} user - the user's credentials
         */
        function validateUser(user) {
            if (user &&
                user.hasOwnProperty('email') &&
                user.email.length > 0 &&
                user.hasOwnProperty('password') &&
                user.password.length > 0) {
                return true;
            } else { return false; }
        }
    }

})();
