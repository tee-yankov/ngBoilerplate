(function() {
    'use strict';

    angular.module('ngBoilerplate')
    .controller('Register', Register);

    Register.$inject = ['Auth', '$state'];

    function Register(Auth, $state) {
        var vm = this;
        vm.registerUser = registerUser;

        /**
         * Uses the Auth service to send user credentials to the server.
         *
         * @param {object} vm.user - Passes the vm.user object to
         * the Auth service if the object exists.
         * Otherwise logs an error.
         */
        function registerUser() {
            if (validateUser(vm.user)) {
                return Auth.registerUser(vm.user)
                .then(logUserIn);
            } else { console.log('Invalid credentials!'); }
        }

        /**
         * Log the user in after they have registered.
         */
        function logUserIn(data) {
            if (data.hasOwnProperty('token')) {
                console.log(data);
                $state.go('main');
            }
            else { registerFailed(data); }
        }

        function registerFailed(data) {
            console.log(data);
        }

        /**
     * Validates the structure of the user object passed to it/
     *
     * @param {object} user - The user object passed to check.
     * @return {boolean} true - if the object meets the criteria
     * @return {boolean} false - if the object fails to meet the criteria
     */
        function validateUser(user) {
            if (user &&
                user.hasOwnProperty('password') &&
                user.password.length > 0 &&
                user.hasOwnProperty('email') &&
                user.email.length > 0 &&
                user.hasOwnProperty('name') &&
                user.password.length > 0 &&
                user.password === user.passwordConfirm) {
                return true;
            } else { return false; }
        }
    }

})();
