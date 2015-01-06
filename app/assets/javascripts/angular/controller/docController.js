myApp.controller('docController',
  ['$scope','$location','Auth','$rootScope','$routeParams','$http','Userfactory','Docfactory',
    function($scope,$location,Auth,$rootScope,$routeParams,$http,Userfactory,Docfactory) {
      
      $scope.userModel = Userfactory.model
      
      Docfactory.getFiles();
      $scope.docModel = Docfactory.model

      $scope.delete = function(file){
        Docfactory.delete(file);
      }

      $scope.parseFile = function(file){
        Docfactory.parseFile(file);
      }

      $scope.abortJob = function(file){
        Docfactory.abortJob(file);
      }

      $scope.verificationRequest = function(){
        $('#myModal').modal('hide')
        Docfactory.verificationRequest($scope.currentFile,$scope.selectedColumnToVerify)
      }

      $scope.downloadRequest = function(file){
        Docfactory.downloadRequest(file)
      }

      $scope.verifyModel = function(file){
        $scope.currentFile = file
        $scope.currentHeader = file.file_header
        $('#myModal').modal('show')
      }

      $scope.columnToVerify = function(key,value){
        if(key.substring(0,6) == "column")
          if(value !== null)
            return true
        
        return false
      }
      $scope.selectedColumn = function(key){
        $scope.selectedColumnToVerify = key
      }

      if($routeParams.id !== undefined){
        Docfactory.getRecords($routeParams.id).then(function(){
          $scope.options = {thickness: 50};
          $scope.data = [
            {label: "Active", value: $scope.docModel.currentDoc.active,color: "#00ff00"},
            {label: "In Active", value: $scope.docModel.currentDoc.inactive, color: "rgb(0, 0, 255)"},
            {label: "Error", value: $scope.docModel.currentDoc.err, color: "red"}
          ];
        });
      }
    }
  ]
)