myApp.factory('Userfactory', ["Auth", "$http", "$location", "$rootScope", "$q", "$timeout", function(Auth,$http,$location,$rootScope,$q,$timeout){
  var Userfactory = {}
  
  Userfactory.model = {
    detail: undefined,
    active: false,
    loginError: undefined,
    regError: {}
  }
  
  Userfactory.isLogged = function(){
    console.log("Checking is logged")
    if(!Userfactory.model.active){
      // var deffered = $q.defer()
      return Auth.currentUser().then(function(user) {
        Userfactory.model.detail = user
        Userfactory.model.active = true
        // deffered.resolve()
      }, function(error) {
        // deffered.reject(error)
      });
      // return deffered.promise;
    }
  }

  Userfactory.login = function(user) {
    Auth.login(user).then(function(user) {
      Userfactory.model.detail = user
      $rootScope.loggedUser = true;
      Userfactory.model.active = true
      Userfactory.model.loginError = ""
    }, function(error) {
      Userfactory.model.loginError = error.data.error
    });
  }

  Userfactory.logout = function($event){
    // $($event.target).removeClass('fa-sign-out').addClass('fa-spinner fa-spin')
    Auth.logout().then(function(user) {
      location.reload();
    }, function(error) {
      // Authentication failed...
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
          Userfactory.model.active = true
          // $location.path("/profile/personalinfo/new");
          // $('.mainContent').show();
          // $('.apploader').hide();
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
