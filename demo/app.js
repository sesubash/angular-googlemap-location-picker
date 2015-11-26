var app = angular.module('angular-location-picker-demo', ['angular-location-picker']);

app.controller('MainCtrl', function($scope) {

  console.log("SAdsad");
  $scope.onLocationInitialize = function(location){
    console.log("=====from controller=======");
    console.log(location);
  }

  $scope.onLocationChange = function(location){
    console.log("=====from controller=======")
    console.log(location);
  }

});
