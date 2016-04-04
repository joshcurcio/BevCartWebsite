var app = angular.module('bevcartApp');
app.controller('userController', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://bevcart.firebaseio.com/");
    var authData = ref.getAuth();
    console.log(authData);

    //get the data for our pending service requests
    var orders = ref.child("orders");
    //$scope.service_request_data = $firebaseArray(service_requests.orderByChild("user").equalTo(authData.uid));


    $scope.submit = function () {
        //save the new service request to firebase
        $scope.orderTotal = 0;

        $scope.orderTotal = $scope.numOfBeer * 250 + $scope.numOfHotDogs * 150 + $scope.numOfBurgers * 300 + $scope.numOfChips * 100;

  		  // Close Checkout on page navigation
        var handler = StripeCheckout.configure({
          key: 'pk_test_Fl7f4dTgK6cFSuhJxjT1i19p',
          image: '/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          token: function(token)
          {
                $.post( "http://localhost:3000/checkout", { stripeToken: token.id, amount: 2000 }, function(result)
                {
                console.log(result);
            });

            // Use the token to create the charge with a server-side script.
            // You can access the token ID with `token.id`
          }
        });
        $('#customButton').on('click', function(e)
        {
          // Open Checkout with further options
          handler.open({
            name: 'Demo Site',
            description: '2 widgets',
            amount: 2000
          });
          e.preventDefault();
        });
        // Close Checkout on page navigation
        $(window).on('popstate', function() {
          handler.close();
        });

        orders.push({
            user: authData.uid,
            beer: $scope.numOfBeer,
            hot_dog: $scope.numOfHotDogs,
            burger: $scope.numOfBurgers,
            chips: $scope.numOfChips,
            hole: $scope.holeNumber,
            price: $scope.orderTotal,
            provider: "n/a",
            completed: false
        });

        clearOrderFields();
    }

    function clearOrderFields ()
    {
      $scope.numOfBeer = "";
      $scope.numOfHotDogs = "";
      $scope.numOfBurgers = "";
      $scope.numOfChips = "";
      $scope.orderTotal = 0;
      $scope.holeNumber = "";

    }
});
