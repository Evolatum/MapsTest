var map;
var directionsRenderer;
var directionsService;
var stepDisplay;
var markerArray = [];


function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 19.4, lng: -99.17}
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'))
    stepDisplay = new google.maps.InfoWindow();
    calcRoute();
}

function calcRoute() {
    var request = {
      origin: 'Medikatalogo, Calle Pennsylvania, Colonia Napoles, Mexico City, CDMX',
      destination: 'LaLeo, Avenida Cuauhtémoc, Roma Sur, Mexico City, CDMX',
      provideRouteAlternatives: true,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
        showSteps(result);
      }
    });
}

function showSteps(directionResult) {
    var myRoute = directionResult.routes[0].legs[0];
  
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = new google.maps.Marker({
          position: myRoute.steps[i].start_point,
          map: map
        });
        attachInstructionText(marker, myRoute.steps[i].instructions);
        markerArray[i] = marker;
    }
  }
  
function attachInstructionText(marker, text) {
    google.maps.event.addListener(marker, 'click', function() {
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}