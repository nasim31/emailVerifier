myApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when("/",
      { 
        templateUrl: "/assets/index.html",
        controller: "userController",
        login: false
      })
    .when("/login",
      { 
        templateUrl: "/assets/user/login.html",
        controller: "userController",
        login: false
      })
    .when("/forgotPassword",
      { 
        templateUrl: "/assets/user/forgotPassword.html",
        controller: "userController",
        login: false
      })
    .when("/register",
      { 
        templateUrl: "/assets/user/register.html",
        controller: "userController",
        login: false
      })
    .when("/dashboard",
      { 
        templateUrl: "/assets/user/dashboard.html",
        controller: "userController",
        login: true
      })
    .when("/documents",
      { 
        templateUrl: "/assets/doc/documents.html",
        controller: "docController",
        login: true
      })
    .when("/document/:id",
      { 
        templateUrl: "/assets/doc/records.html",
        controller: "docController",
        login: true
      })
    .otherwise({ redirectTo: "/" });

}]).run( 

 ["$rootScope", "$location", "$route", "Auth", "Userfactory", "$timeout", function($rootScope, $location, $route,Auth,Userfactory,$timeout) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if($rootScope.loggedUser === undefined) {
        Userfactory.isLogged().then(function(){
          if($rootScope.loggedUser == true) {
            authenticate(next);
          }
          if($rootScope.loggedUser == false) {
            notLogged(next)
          }
        });
      } else if($rootScope.loggedUser == true) {
        authenticate(next);
      } else if ( $rootScope.loggedUser == false) {
        notLogged(next)
      }
    });

    function notLogged(next){
      $rootScope.loggedUser = false;
      if ( next.login )  {
        $location.path( "/login" );
      }
    }

    function authenticate(next){  
      $rootScope.loggedUser = true;
      if ( !next.login )  {
        $location.path( "/dashboard" );
      }
    }
 }]);