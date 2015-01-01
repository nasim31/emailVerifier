myApp.factory('DocFactory', ["Auth", "$http", "$location", "$rootScope", "$q", "$timeout","Doc", function(Auth,$http,$location,$rootScope,$q,$timeout,Doc){
  var DocFactory = {}
  
  DocFactory.model = {}
  
  DocFactory.uploadFiles = function(){
    console.log("Checking is logged")
  }

  return DocFactory;
}])
