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
        Userfactory.isLogged().then(
        function(user) {
          authenticate(next);
        }, 
        function(error) {
          notLogged(next)
        });
      } else if ( $rootScope.loggedUser == true ) {
        authenticate(next);
        console.log("Authenticate",next.login);
      } else if ( $rootScope.loggedUser == false) {
        console.log("Not Logged",next.login);
        notLogged(next)
      }
    });

    function notLogged(next){
      console.log("Not Logged",next.login);
      $rootScope.loggedUser = false;
      if ( next.login )  {
        $location.path( "/login" );
      }
    }

    function authenticate(next){  
      console.log("Logged",next.login);    
      $rootScope.loggedUser = true;
      // var noaccess = ["/assets/user/login.html",
      //                 "/assets/user/forgotPassword.html",
      //                 "/assets/user/register.html"]
      
      // if($.inArray(next.$$route.templateUrl,noaccess) != -1) {
      //   $location.path('/dashboard')
      // }
      if ( !next.login )  {
        $location.path( "/dashboard" );
      }
    }
 }]);