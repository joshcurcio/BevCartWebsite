var app = angular.module('bevcartApp');
app.controller('userController', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://bevcart.firebaseio.com/");
    var authData = ref.getAuth();
    console.log(authData);


    //get the data for our pending service requests
    var service_requests = ref.child("service_requests");
    $scope.service_request_data = $firebaseArray(service_requests.orderByChild("user").equalTo(authData.uid));

    $scope.submit = function () {
        //save the new service request to firebase
        service_requests.push({
            user: authData.uid,
            beer: $scope.numOfBeer,
            hot_dog: $scope.numOfHotDogs,
            burger: $scope.numOfBurgers,
            chips: $scope.numOfChips,
            hole: $scope.holeNumber,
            provider: "n/a",
            completed: false
        });
    }

    function clearOrderFields ()
    {
      $scope.numOfBeer = "";
      $scope.numOfHotDogs = "";
      $scope.numOfBurgers = "";
      $scope.numOfChips = "";
      $scope.holeNumber = "";

    }
});
