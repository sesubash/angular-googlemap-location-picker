angular.module("angular-location-picker", []).directive("googleMapLocator", function ($window) {
  return {
    restrict: "E",
    replace: true,
    template: "<div data-tap-disabled='true'></div>",
    scope: {
      location: "@",
      radius: "@",
      options: "@",
      onLocationInitialize: "&",
      onLocationChange: "&",
      onMapLoaded: "&"
    },
    link: function (scope, element, attrs) {
      var callbackName = 'InitMapCb';
      // callback when google maps is loaded
      $window[callbackName] = function () {
        initPicker();
      };

      if (!$window.google || !$window.google.maps) {
        loadGMaps();
      } else {
        initPicker();
      }

      function loadGMaps() {
        var script = $window.document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&callback=InitMapCb';
        $window.document.body.appendChild(script);
      }

      function onChanged(location) {
        scope.onLocationChange({
          location: location
        });
      }

      function onInitialized(location) {
        scope.onLocationInitialize({
          location: location
        });
      }

      function onMapLoaded(map) {
        scope.onMapLoaded({
          map: map
        });
      }

      function initPicker() {
        if (!scope.location) {
          initPicker
          getLocation();
        } else {
          scope.location = JSON.parse(scope.location);
          initLocationPicker();
        }
      }

      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("====Geolocation is not supported by this browser====");
          // TODO: find a way to get lat, long of the user
          showPosition({
            coords: {
              latitude: 12.8139068,
              longitude: 77.65166829999998
            }
          });
        }
      }

      function showPosition(position) {
        scope.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        initLocationPicker();
      }

      function initLocationPicker() {
        if (!scope.options) {
          scope.options = {
            autocomplete: true,
            inputName: false
          };
        } else {
          scope.options = JSON.parse(scope.options);
        }

        $(element).locationpicker({
          location: scope.location,
          radius: scope.radius,
          onchanged: function (currentLocation, radius, isMarkerDropped) {
            var location = $(this).locationpicker('map').location;
            onChanged(location);
          },
          inputBinding: {
            locationNameInput: $(scope.options['inputName'])
          },
          enableAutocomplete: scope.options['autocomplete'],
          oninitialized: function (component) {
            var location = $(component).locationpicker('map').location;
            onInitialized(location);
            var mapContext = $(element).locationpicker('map');
            onMapLoaded(mapContext.map);
          }
        });
      }

    }
  }
})
