myApp.controller('docController',
  ['$scope','$location','Auth','$rootScope','$routeParams','$http','Userfactory','Docfactory',
    function($scope,$location,Auth,$rootScope,$routeParams,$http,Userfactory,Docfactory) {
      
      $scope.userModel = Userfactory.model
      Docfactory.getFiles();
      $scope.docModel = Docfactory.model

      $scope.delete = function(file){
        Docfactory.delete(file);
      }
      
    }
  ]
)