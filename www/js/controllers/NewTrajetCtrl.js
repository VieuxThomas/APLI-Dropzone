app.controller('NewTrajetCtrl', function ($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http) {

  var options = {
   types: ['(cities)'],
   componentRestrictions: {country: 'fr'}
};
var input = document.getElementById('nouveauTrajet');
autocomplete = new google.maps.places.Autocomplete(input, options);

google.maps.event.addListener(autocomplete, 'place_changed', function() {
   var place = autocomplete.getPlace();
   if (place.geometry.viewport) {
      geomap.fitBounds(place.geometry.viewport);
   } else {
      geomap.setCenter(place.geometry.location);
      geomap.setZoom(17);
   }
});

$scope.afficheKm = function() {
  var kilometre = $scope.detour;
  console.log(kilometre);
}

$scope.recherche = function() {
  var villeArrive = document.getElementById('nouveauTrajet').value;
  var ville = villeArrive.split(',', 1);
  tabVille = [];
  console.log(ville);
  console.log("http://thomasvieux.fr/Webservice/rechercheVille.php?ville="+ville+",%20France");
  $http.get("http://thomasvieux.fr/Webservice/rechercheVille.php?ville="+ville+",%20France")
  .success (function(response){
    ville = response;
    var listTransport = ville.listTransport;
    console.log(ville);
    for(var num in listTransport)
    {
      let trajet = listTransport[num];
      console.log(trajet.id);
      tabVille.push(trajet.id);
    }
    console.log(tabVille);
    sessionStorage.idTrajet = tabVille;
    sessionStorage.depotRetirMax = parseFloat(document.getElementById('detour').value);
  //  sessionStorage.depotRetirMax =

    $state.go('app.map');
  });


}


});
