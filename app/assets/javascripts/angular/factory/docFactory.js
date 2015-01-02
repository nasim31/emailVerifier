myApp.factory('Docfactory', ["Auth", "$http", "$location", "$rootScope", "$q", "$timeout","Doc", function(Auth,$http,$location,$rootScope,$q,$timeout,Doc){
  var Docfactory = {}
  
  Docfactory.model = {
    files: undefined
  }
  
  Docfactory.uploadFiles = function(){
    console.log("Checking Upload file")
  }

  Docfactory.getFiles = function(){
    console.log("Document");
    Doc.query().then(function(data){
      console.log(data);
      Docfactory.model.files = data;
    })
  }

  Docfactory.delete  = function(File){
    File.id = File._id;
    if(confirm("Are you sure?"))
    {
      File.delete().then(function(data){
        console.log(Docfactory.model.files);
        var index = Docfactory.model.files.indexOf(data);
        Docfactory.model.files.slice(index,1);
        console.log(Docfactory.model.files);
      })
    }
  }

  return Docfactory;
}])
