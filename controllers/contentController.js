var app = angular.module('snowmanApp');
app.controller('contentController', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://bevcart.firebaseio.com/");
    var authData = ref.getAuth();
    $scope.role = "null";
    $scope.pageMode = "NORMAL";
    $scope.fname = "Bob";
    if (authData) {
        //What role are we?
        ref.child("role").child(authData.uid).on("value", function (data) {
            //set role to user, admin, or provider
            $scope.role = data.val();
        });

        //if we still alive we are logged in
        //get profile info
        var profile = ref.child("profile");


        $scope.email = authData.password.email;

        //get the data for our pending service requests
        var service_requests = ref.child("service_requests");
        $scope.service_request_data = $firebaseArray(service_requests.orderByChild("user").equalTo(authData.uid));

        $scope.logout = function () {
            ref.unauth();
            window.location.href = "index.html";
        }

        $scope.profile = function () {
            $scope.pageMode = "PROFILE";

        }

        $scope.normal = function () {
            $scope.pageMode = "NORMAL";
        }

        $scope.updateProfile = function () {
            console.log("HERE -> " + $scope.fname);
            console.log("HERE -> " + $scope.lname);
            profile.child(authData.uid).set({
                fname: $scope.fname,
                lname: $scope.lname,
                phone: $scope.phone,
                street: $scope.street,
                city: $scope.city,
                state: $scope.state,
                zip: $scope.zip
            });
        }
    }
});
