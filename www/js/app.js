// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova', 'ionic-material']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.map', {
      url: '/map',
      views: {
          'menuContent': {
      templateUrl: 'templates/map.html',
      //templateUrl: 'templates/menu.html',
      controller: 'MapCtrl'
    }
  }
    })

    .state('app.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'ListsCtrl'
            }
        }
    })

    .state('app.ajout', {
        url: '/ajout',
        views: {
            'menuContent': {
                templateUrl: 'templates/ajout.html',
                controller: 'AjoutCtrl'
            }
        }
    })

    .state('app.inscription', {
        url: '/inscription',
        views: {
            'menuContent': {
                templateUrl: 'templates/Inscription.html',
                controller: 'InscriptionCtrl'
            }
        }
    })

    .state('app.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })
    .state('app.newTrajet', {
        url: '/newTrajet',
        views: {
            'menuContent': {
                templateUrl: 'templates/newTrajet.html',
                controller: 'NewTrajetCtrl'
            }
        }
    })

    .state('app.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })
  ;

    $urlRouterProvider.otherwise('/app/components');

})



app.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $http, $timeout) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


    var mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var rayon = parseFloat(sessionStorage.depotRetirMax) * parseFloat(500);
    console.log(parseFloat(sessionStorage.depotRetirMax));

    var myCity = new google.maps.Circle({
    center: latLng,
    radius: rayon,
    strokeColor: "#0000FF",
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: "#0000FF",
    fillOpacity: 0.2
  });


    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    myCity.setMap($scope.map);


    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });
      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
      var tabTrajet = sessionStorage.idTrajet;


        var requete = "http://thomasvieux.fr/Webservice/markers.php?id="+sessionStorage.IdUsers+"&&longitude="+position.coords.longitude+"&&latitude="+position.coords.latitude+"&&idTrajet="+sessionStorage.idTrajet+"&&depotRetirMax="+sessionStorage.depotRetirMax;
        console.log("http://thomasvieux.fr/Webservice/markers.php?id="+sessionStorage.IdUsers+"&&longitude="+position.coords.longitude+"&&latitude="+position.coords.latitude+"&&idTrajet="+sessionStorage.idTrajet+"&&depotRetirMax="+sessionStorage.depotRetirMax);
        $http.get(requete)
        .success ((response) => {
        console.log("http://thomasvieux.fr/Webservice/markers.php?id="+sessionStorage.IdUsers+"&&longitude="+position.coords.longitude+"&&latitude="+position.coords.latitude+"&&idTrajet="+sessionStorage.idTrajet+"&&depotRetirMax="+sessionStorage.depotRetirMax);
        delete(marker);
        var marker = response;

        console.log(marker);
        //console.log(marker.data.markers[1])
        var tabMarkers = response.markers;
        console.log(response.success);
        image = "img/box.png";

        for(var mark in tabMarkers) {

          var record = tabMarkers[mark];
          var markerPos = new google.maps.LatLng(record.lat, record.lng);
          console.log(record.description);
          // Add the markerto the map
          var marker = new google.maps.Marker({
              map: $scope.map,
              icon : image,
              animation: google.maps.Animation.DROP,
              position: markerPos
          });
          console.log(sessionStorage.villeTrajet);
          var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h4 id="firstHeading" class="firstHeading">Description du trajet</h4>'+
        '<div id="bodyContent">'+
        '<p>'+record.description+'</p>'+
        '<h5 id="firstHeading" class="firstHeading">Destination du trajet</h5>'+
        '<p>'+sessionStorage.villeTrajet+'</p>'+
        '<form action="tel:'+record.tel+'">'+
        '<input type="submit" value="Appeler"><i class="ion-android-phone-portrait"</i></input>'+
        '</form>'+
        '</div>'+
        '</div>';


          var infoWindow = new google.maps.InfoWindow({
              content:contentString
          });

          google.maps.event.addListener(marker, 'click', function () {
            image2 = "img/drapeau.png"
              infoWindow.open($scope.map, marker);
              $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+sessionStorage.villeTrajet+"&key=AIzaSyAcyR2wezmmCvm_aLm1-xTsVSmFmAAnIYQ")
              .success ((response) => {
                arrive = response;
                console.log(arrive.results[0].geometry.location.lng);
                latMarker = arrive.results[0].geometry.location.lat;
                lngMarker = arrive.results[0].geometry.location.lng;
                var markerPos = new google.maps.LatLng(latMarker, lngMarker);
                // Add the markerto the map
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    icon : image2,
                    animation: google.maps.Animation.DROP,
                    position: markerPos
                })
          });
          delete(marker);

        });

        //$timeout(resetMap(), 5000);
        //marker.setMap(null);


}

  }, function(error){
    console.log("Could not get location");
  });


});


/*app.factory('Markers', function($http, $cordovaGeolocation) {
var options = {timeout: 10000, enableHighAccuracy: true};
$cordovaGeolocation.getCurrentPosition(options).then(function(position){
  var markers = [];

  return {
    getMarkers: function(){

      return $http.get("http://thomasvieux.fr/Webservice/markers.php?id="+sessionStorage.IdUsers+"&&longitude="+position.coords.latitude+"&&latitude="+position.coords.longitude+"").then(function(response){
          markers = response;

          return markers;
      });

    }
  }
});
})
*/
});
})
