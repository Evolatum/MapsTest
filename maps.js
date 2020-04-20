var map;
var directionsRenderer;
var directionsService;
var stepDisplay;
var markerArray = [];
var current = 0;
var route;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 19.4, lng: -99.17}
    });
    directionsRenderer.setMap(map);
    //directionsRenderer.setPanel(document.getElementById('directionsPanel'))
    stepDisplay = new google.maps.InfoWindow();
    calcRoute();
}

function calcRoute() {
    var request = {
      origin: 'Medikatalogo, Calle Pennsylvania, Colonia Napoles, Mexico City, CDMX',
      destination: 'LaLeo, Avenida Cuauhtémoc, Roma Sur, Mexico City, CDMX',
      provideRouteAlternatives: false,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);

        route=[result.routes[0].legs[0].start_location];
        for(var i = 0; i < result.routes[0].legs[0].steps.length; i++){
            route.push(result.routes[0].legs[0].steps[i]);
        }
        route.push(result.routes[0].legs[0].end_location);

        //showSteps(result);
      }
    });
}

/*function showSteps(directionResult) {
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
}*/

function attachInstructionTextNoEvent(marker, text) {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
}

function resetMarkers(){
    for (i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
      } 
}

$(document).on("click", "#btn_next",function() {
    if(route){
        resetMarkers();
        if(current===0){
            var marker = new google.maps.Marker({
                position: route[current++],
                map: map
            });
            attachInstructionTextNoEvent(marker, "Start of trip");
            markerArray[0] = marker;
            $('#btn_next').text("Next");
        }else if(current<route.length-1){
            var marker = new google.maps.Marker({
                position: route[current].start_point,
                map: map
            });
            attachInstructionTextNoEvent(marker, route[current].instructions);
            markerArray[0] = marker;
            current++;
        } else{
            var marker = new google.maps.Marker({
                position: route[current],
                map: map
            });
            markerArray[0] = marker;
            alert("Trip finished!");
            current=0;
            $('#btn_next').text("Start");
        }
    }else{
        alert("Route hasn't finished loading...");
    }
});