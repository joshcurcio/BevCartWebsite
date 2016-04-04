var app = angular.module('adminApp', ["firebase"]);
app.controller('adminController', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://bevcart.firebaseio.com/");
    var authData = ref.getAuth();
    console.log(authData);
    $scope.role = null;
    if (authData) {
        //What role are we?
        ref.child("role").child(authData.uid).on("value", function (data) {
            //set role to user, admin, or provider
            $scope.role = data.val();
        });

        //if we still alive we are logged in
        $scope.userEmail = authData.password.email;

        //get the data for our pending service requests
        var service_requests = ref.child("service_requests");
        $scope.service_request_data = $firebaseArray(service_requests);

        $scope.logout = function () {
            ref.unauth();
            window.location.href = "index.html";
        }
    }
});
