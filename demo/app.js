var app = angular.module('angular-location-picker-demo', ['angular-location-picker']);

app.controller('MainCtrl', function($scope) {

  console.log("SAdsad");
  $scope.location = {latitude: 12.8139068, longitude: 77.6516683};
  $scope.onLocationInitialize = function(location){
    console.log("=====from controller=======");
    console.log(location);
  }

  $scope.onLocationChange = function(location){
    console.log("=====from controller=======")
    console.log(location);
  }

  $scope.onMapLoaded = function(map){
    console.log("=====from controller=======")
    console.log(map);
  }

});
