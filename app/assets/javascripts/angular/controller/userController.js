myApp.controller('userController',
  ['$scope','$location','Auth','$rootScope','$routeParams','$http','Userfactory','Docfactory',
    function($scope,$location,Auth,$rootScope,$routeParams,$http,Userfactory,Docfactory) {
      
      $scope.userModel = Userfactory.model

      $scope.login = function(){
        Userfactory.login($scope.user)
      }

      $scope.register = function(){
        Userfactory.register($scope.user);
      }

      $scope.forgotPassword = function(){
        $scope.forgotPasswordError = ''
        $scope.forgotPasswordMailSending = true;
        Userfactory.forgotPassword($scope.forgotPasswordEmail).then(
          function(data){
            if(data.status == 201){
              $scope.forgotPasswordMailSent = true
            }
          },
          function(response){
            $scope.forgotPasswordMailSending = false;
            $scope.forgotPasswordError = response.data.errors
          }
        );
      }

      $scope.uploadFile  = function(files) {
        $scope.files = files
        for (var i = 0; i < $scope.files.length; i++) {
          var fd = new FormData();
          $scope.files[i].status = "Uploading"
          fd.append("file", $scope.files[i]);
          fd.append("id",i);
          $http.post('/doc', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
          }).success( function(data){
            if(data.status == true) {
              $scope.files[data.id].status = "Success";
            } else {
              $scope.files[data.id].status = "Error";
            }
          }).error(function(){
            console.log("Failure");
          });
        }
      }
    }
  ]
)