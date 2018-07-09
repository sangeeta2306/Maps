var app = angular.module('addressApp',['ui.bootstrap']);


app.controller('addressController',['$scope','$http','addressBook',function($scope,$http,addressBook){
	//not used because of Chrome CORS
	/*$http.get('./address.json').success(function(data){
		console.log(data);
	},function(error){
		console.log(error);
	})*/
	$scope.data = addressBook;

 var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(51.508742,-0.120850),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

$scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              $scope.createMarker = function (orderedList){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(orderedList.latitude, orderedList.longitude),
                      title: orderedList.location
                  });
                  marker.content = '<div class="infoWindowContent">' + orderedList.orderedItem + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
              for (i = 0; i < $scope.data.length; i++){
                   $scope.createMarker($scope.data[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }
            
 			$scope.addMarker = function(data){
 				for (i = 0; i < $scope.markers.length; i++){
                   $scope.markers[i].setMap(null);
                }
 				 $scope.markers.length = 0;
 				 $scope.createMarker(data[0]) ;
 			}
}])