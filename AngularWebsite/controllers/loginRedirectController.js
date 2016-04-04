var app = angular.module('indexApp');
app.controller('loginRedirect', function ($scope, $firebaseArray) {

    var ref = new Firebase("https://bevcart.firebaseio.com/");
    var authData = ref.getAuth();

    if (!authData) {
        window.location.href = "index.html";
    }
});
