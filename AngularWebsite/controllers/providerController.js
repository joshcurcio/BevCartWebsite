var app = angular.module('providerApp', ["firebase"]);
app.controller('providerController', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://bevcart.firebaseio.com/");
    $scope.authData = ref.getAuth();
    console.log($scope.authData);
    $scope.role = null;
    if ($scope.authData) {
        //What role are we?
        ref.child("role").child(authData.uid).on("value", function (data) {
            //set role to user, admin, or provider
            $scope.role = data.val();
        });

        //if we still alive we are logged in
        $scope.userEmail = $scope.authData.password.email;

        //get the data for our pending service requests
        var service_requests = ref.child("service_requests");
        $scope.service_request_data = $firebaseArray(service_requests.orderByChild("provider"));

        $scope.acceptJob = function () {
            service_requests.child($scope.jobID).update({
                provider: $scope.authData.uid
            });
        }

        $scope.logout = function () {
            ref.unauth();
            window.location.href = "index.html";
        }
    }
});
