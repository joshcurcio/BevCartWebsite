var myApp = angular.module('bevcartApp', ["firebase"]);
myApp.controller("indexController", function ($scope) {
    //CREATE A FIREBASE REFERENCE

    var ref = new Firebase("https://bevcart.firebaseio.com");
    var authData = ref.getAuth();
    $scope.isAuthenticated = false;
    $scope.authData = authData;

    if (authData) {
        $scope.isAuthenticated = true;
        $scope.userEmail = authData.password.email;
        ref.child("role").child(authData.uid).on("value", function (data) {
            //set role to user, admin, or provider
            $scope.role = data.val();
            $scope.$apply();
        });
    }

    $scope.logout = function () {
        ref.unauth();
        location.reload();
    }

    $scope.login = function () {
        ref.authWithPassword({
            email: $scope.username,
            password: $scope.password
        }, function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                location.reload();
            }
        });
    };
});
