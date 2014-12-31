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
        login: false
      })
    .otherwise({ redirectTo: "/" });

}]).run( 

 ["$rootScope", "$location", "$route", "Auth", "Userfactory", "$timeout", function($rootScope, $location, $route, Auth,Userfactory,$timeout) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      $('.mainContent').hide();
      $('.apploader').show();
      if($rootScope.loggedUser === undefined) {
        Userfactory.isLogged().then(function(user) {
          $rootScope.loggedUser = true;
          $timeout(function(){
            authenticate(next);
          },500);
        }, function(error) {
            notLogged(next)
        });
      } else if ( $rootScope.loggedUser == true ) {
        authenticate(next);
      } else if ( $rootScope.loggedUser == false) {
        notLogged(next)
      }
    });

    function notLogged(next){
      $rootScope.loggedUser = false;
      $('.mainContent').show();
      $('.apploader').hide();
      if ( next.login )  {
        $location.path( "/login" );
      }
    }

    function authenticate(next){
      $rootScope.loggedUser = true;
      $('.mainContent').show();
      $('.apploader').hide();
      var noaccess = ["/assets/user/login.html",
                      "/assets/user/forgotPassword.html",
                      "/assets/user/register.html"]
      
      if(status == 3) {
        if($.inArray(next.$$route.templateUrl,noaccess) != -1) {
          $location.path('/dashboard')
        }
      }
    }
 }]);