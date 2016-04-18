var app = angular.module('bevcartApp');
app.controller('userController', function ($scope, $firebaseArray) {

    var ref = new Firebase("https://bevcart.firebaseio.com/");
    var authData = ref.getAuth();

    //get the data for our pending service requests
    var orders = ref.child("orders");
    //$scope.service_request_data = $firebaseArray(service_requests.orderByChild("user").equalTo(authData.uid));


    $scope.newServiceRequest = function (cost) {
        //save the new service request to firebase
        $scope.$apply();
        orders.push({
            user: authData.uid,
            beer: $scope.numOfBeer,
            hot_dog: $scope.numOfHotDogs,
            burger: $scope.numOfBurgers,
            chips: $scope.numOfChips,
            hole: $scope.holeNumber,
            price: cost,
            provider: "n/a",
            completed: false
        });

    }

    $scope.reset = function()
    {
      $scope.numOfBeer = "";
      $scope.numOfHotDogs = "";
      $scope.numOfBurgers = "";
      $scope.numOfChips = "";
      $scope.orderTotal = 0;
      $scope.holeNumber = "";
      $scope.cost=0;

    }
});
