var app = angular.module('angular-location-picker-demo', ['angular-location-picker']);

app.controller('MainCtrl', function($scope) {

  console.log("SAdsad");
  $scope.onLocationInitialize = function(addressComponents){
    console.log("=====from controller=======");
    console.log(addressComponents);
  }

  $scope.onLocationChange = function(addressComponents){
    console.log("=====from controller=======")
    console.log(addressComponents);
  }

});
