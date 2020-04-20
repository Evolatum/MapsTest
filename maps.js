var map;
var directionsRenderer;
var directionsService;


function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 19.4, lng: -99.17}
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'))
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
      }
    });
}

