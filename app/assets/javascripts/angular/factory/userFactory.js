myApp.factory('Userfactory', ["Auth", "$http", "$location", "$rootScope", "$q", "$timeout", function(Auth,$http,$location,$rootScope,$q,$timeout){
  var Userfactory = {}
  
  Userfactory.model = {
    detail: undefined,
    active: false,
    loginError: undefined,
    regError: {}
  }
  
  Userfactory.isLogged = function(){
    if(!Userfactory.model.active){
      return Auth.currentUser().then(function(user) {
        Userfactory.model.detail = user
        $rootScope.loggedUser = true
      }, function(error) {
        $rootScope.loggedUser = false;
      });
    } else {
      return Userfactory.model.active
    }

  }

  Userfactory.login = function(user) {
    Auth.login(user).then(function(user) {
      Userfactory.model.detail = user
      $rootScope.loggedUser = true;
      Userfactory.model.loginError = ""
      $location.path( "/dashboard" );
    }, function(error) {
      Userfactory.model.loginError = error.data.error
    });
  }

  Userfactory.forgotPassword = function(emailToSend){
    var user = {user:{email:emailToSend}};
    return $http.post('/users/password.json', user);
  }

  Userfactory.register = function(user){
    if(user !== undefined) {
      if(user.password == user.password_confirmation) {
        Auth.register(user).then(function(user) {
          Userfactory.model.detail = user
          $rootScope.loggedUser = true;
        }, function(error) {
          Userfactory.model.regError = error.data.errors
        });
      } else {
        Userfactory.model.regError = {"conpassword": ["Not matching."]}
      }
    }
  }

  return Userfactory;
}])
