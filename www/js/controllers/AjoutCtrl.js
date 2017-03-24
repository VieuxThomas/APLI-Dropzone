app.controller('AjoutCtrl', function ($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http, $ionicPopup, $ionicHistory) {

  var options = {
   types: ['(cities)'],
   componentRestrictions: {country: 'fr'}
};
var input = document.getElementById('nouveauTrajet');
autocomplete = new google.maps.places.Autocomplete(input, options);
var input2 = document.getElementById('arrivTrajet');
autocomplete2 = new google.maps.places.Autocomplete(input2, options);
arrivTrajet

google.maps.event.addListener(autocomplete, 'place_changed', function() {
   var place = autocomplete.getPlace();
   if (place.geometry.viewport) {
      geomap.fitBounds(place.geometry.viewport);
   } else {
      geomap.setCenter(place.geometry.location);
      geomap.setZoom(17);
   }
});

google.maps.event.addListener(autocomplete2, 'place_changed', function() {
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
    var villeDepart = document.getElementById('nouveauTrajet').value;
    var villeArrive = document.getElementById('arrivTrajet').value;
    var detour = document.getElementById('detour').value;
    var frequence = document.getElementById('frequence').value;
    var dateDebut = document.getElementById('dateDebut').value;
    var dateFin = document.getElementById('dateFin').value;
    var villeDepartSplit = villeDepart.split(',', 1);
    var villeArriveSplit = villeArrive.split(',', 1);
    var latDep = "";
    var lngDep = "";
    var latArv = "";
    var lngArv = "";
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+villeDepartSplit+",%20France&key=AIzaSyAcyR2wezmmCvm_aLm1-xTsVSmFmAAnIYQ")
    .success ((response) => {
      console.log("https://maps.googleapis.com/maps/api/geocode/json?address="+villeDepartSplit+",%20France&key=AIzaSyAcyR2wezmmCvm_aLm1-xTsVSmFmAAnIYQ");
      depart = response;
      console.log(depart.results[0].geometry.location.lat);
      latDep = depart.results[0].geometry.location.lat;
      lngDep = depart.results[0].geometry.location.lng;


    $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+villeArriveSplit+"&key=AIzaSyAcyR2wezmmCvm_aLm1-xTsVSmFmAAnIYQ")
    .success ((response) => {
      arrive = response;
      console.log(arrive.results[0].geometry.location.lng);
      latArv = arrive.results[0].geometry.location.lat;
      lngArv = arrive.results[0].geometry.location.lng;


    //console.log("http://thomasvieux.fr/Webservice/ajoutTrajet.php?idUsers="+sessionStorage.IdUsers+"&&nameDep="+villeDepart+"&&nameArv="+villeArrive+"&&latitudeArv="+latArv+"&&latitudeDep="+latDep+"&&longitudeDep="+lngDep+"&&longitudeArv="+lngArv+"&&detour="+detour+"&&frequence="+frequence+"&&date="+date+"");
    $http.get("http://thomasvieux.fr/Webservice/ajoutTrajet.php?idUsers="+sessionStorage.IdUsers+"&&nameDep="+villeDepart+"&&nameArv="+villeArrive+"&&latitudeDep="+latDep+"&&latitudeArv="+latArv+"&&longitudeDep="+lngDep+"&&longitudeArv="+lngArv+"&&detour="+detour+"&&frequence="+frequence+"&&dateFin="+dateFin+"&&dateDebut="+dateDebut)
    .success(function(response){
    });
    })
    })

    var alertPopup = $ionicPopup.alert({
        title: 'Ajout Réussi',
        template: 'Bravo, votre trajet quotidien a bien été enregistré'

      });

      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.motion');




}
$scope.activSelect = function(){
  var checkbox1 = document.getElementById('check');
  if(checkbox1.checked = true)
  {
  document.getElementById('buttonRecherche').innerHTML = "Déclarer un trajet";
  }else{
  document.getElementById('buttonRecherche').innerHTML = "Commencer la recherche";
}
}


});
