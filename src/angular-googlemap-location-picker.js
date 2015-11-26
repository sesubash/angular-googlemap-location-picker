angular.module("angular-location-picker", []).
directive("googleMapLocator",function($window){
  return{
    restrict: "E",
    replace: true,
    template: "<div data-tap-disabled='true'></div>",
    scope: {
      location: "@",
      radius: "@",
      onLocationInitialize: "&",
      onLocationChange: "&",

    },
    link: function(scope, element, attrs){
      var callbackName = 'InitMapCb';
      // callback when google maps is loaded
      $window[callbackName] = function () {
          initPicker();
      };

      if (!$window.google || !$window.google.maps) {
          loadGMaps();
      }
      else {
          initPicker();
      }

      function loadGMaps() {
          var script = $window.document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&callback=InitMapCb';
          $window.document.body.appendChild(script);
      }

      function onChanged(addressComponents) {
          scope.onLocationChange({addressComponents: addressComponents});
      }

      function onInitialized(addressComponents){
          scope.onLocationInitialize({addressComponents: addressComponents});
      }

      function initPicker() {
        $(element).locationpicker({
            location: (scope.location != undefined) ? scope.location : {latitude: 42.00, longitude: -73.82480799999996},
            radius: scope.radius,
            onchanged: function (currentLocation, radius, isMarkerDropped) {
                var addressComponents = $(this).locationpicker('map').location.addressComponents;
                onChanged(addressComponents);
            },
            oninitialized: function(component) {
                var addressComponents = $(component).locationpicker('map').location.addressComponents;
                onInitialized(addressComponents);
            }
        });
      }

    }
  }
})
