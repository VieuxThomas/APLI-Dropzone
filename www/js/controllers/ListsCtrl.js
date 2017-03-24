app.controller('ListsCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http) {

var liste = document.getElementById('listTransp');
  $http.get("http://thomasvieux.fr/Webservice/ListTransport.php?id="+sessionStorage.IdUsers)
  .success ((response) => {
   list2 = response;
   var tabList = list2.listTransport;
   var ajoutHtml = "";

   for(var mark in tabList)
   {
      let trajet = tabList[mark];
      console.log(trajet);

      $http.get("http://thomasvieux.fr/Webservice/villeNom.php?idDepart = "+trajet.villeDepart+"&&idArrive="+trajet.villeArrive+"")
      .success ((response) => {
        nomVille = response;
        var Ville = nomVille.id;
        console.log(mark);

        var divList = document.createElement('div');
        divList.setAttribute('class', 'item item-button-right');
        liste.appendChild(divList);

        var textList =document.createTextNode('Trajet N°'+trajet.id+' Destination : '+Ville);
        divList.appendChild(textList);

        var buttonnode= document.createElement('button');
        buttonnode.setAttribute('class','button bt-trajet');
        divList.appendChild(buttonnode);
        buttonnode.addEventListener('click', () => { $scope.redirectMap(trajet.villeArrive, trajet.depotRetirMax, Ville) });

        var iconeButton = document.createElement('i');
        iconeButton.setAttribute('class', 'ion-model-s center-icon');
        buttonnode.appendChild(iconeButton);



       ajoutHtml += '<div class="item item-button-right">'+
       'Trajet N°'+trajet.id+' Destination : '+Ville+''+
       '<br />'+
       '<button id="buttonVerif" class="button ink button-balanced" ng-click="redirectMap()">'+
       '<i class="icon ion-model-s"></i>'+
       '</button>'+
       '</div>';

       //liste.innerHTML = ajoutHtml;
     })

     }





 });


});
