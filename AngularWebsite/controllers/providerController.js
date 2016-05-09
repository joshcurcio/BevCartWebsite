var app = angular.module('bevcartApp');
app.controller('providerController', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://bevcart.firebaseio.com/");
    var authData = ref.getAuth();
    $scope.myUID = authData.uid;

    //get the data for our pending service requests
    var service_requests = ref.child("service_requests");
    $scope.service_request_data = $firebaseArray(service_requests);

    $scope.service_request_data.$loaded().then(function (data) {
        $scope.myAccountTotal = 0;
        angular.forEach(data, function (obj, key) {
            console.log("checking: " + obj);
            console.log("key " + key);
            if (obj.completed == true && obj.provider == $scope.myUID) {
                $scope.myAccountTotal += (obj.cost / 100 * 0.8);
            }
        });
    });

    $scope.claimRequest = function (obj) {
        obj.provider = authData.uid;
        $scope.service_request_data.$save(obj);
    };

    $scope.completeRequest = function (obj) {
        obj.completed = true;
        $scope.service_request_data.$save(obj);
    };
});
