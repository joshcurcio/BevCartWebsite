var app = angular.module('profileApp', ["firebase"]);
app.controller('profileController', function ($scope, $firebaseArray) {

    var ref = new Firebase("https://bevcart.firebaseio.com/");
    var authData = ref.getAuth();
    $scope.role = null;
    if (authData) {
      var profile = ref.child("profile");
      $scope.profile_data = $firebaseArray(profile.orderByChild("uid").equalTo(authData.uid));
      //get the data for our pending service requests
      $scope.email = authData.password.email;

      console.log($scope.profile_data);

      $scope.saveProfile = function() {
        profile.child(authData.uid).set({
          fname: $scope.fname,
          lname: $scope.lname,
          email: authData.password.email,
          phone: $scope.phone,
          street: $scope.street,
          city: $scope.city,
          state: $scope.state,
          zip: $scope.zip
        });

        $scope.lname = "";
        $scope.phone = "";
        $scope.street = "";
        $scope.city = "";
        $scope.state = "";
        $scope.zip = "";
      }

      $scope.logout = function () {
          ref.unauth();
          window.location.href = "index.html";
      }

      $scope.profile = function () {
        $scope.pageMode = "Profile";
      }
      $scope.normal = function () {
        $scope.pageMode = "Normal";
      }
  }
});
