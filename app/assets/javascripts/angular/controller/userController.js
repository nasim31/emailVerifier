myApp.controller('userController',
  ['$scope','$location','Auth','$rootScope','$routeParams','$http','Userfactory','DocFactory',
    function($scope,$location,Auth,$rootScope,$routeParams,$http,Userfactory,DocFactory) {
  
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
    }
  ]
)