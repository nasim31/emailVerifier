myApp.factory('Docfactory', ["Auth", "$http", "$location", "$rootScope", "$q", "$timeout","Doc", function(Auth,$http,$location,$rootScope,$q,$timeout,Doc){
  var Docfactory = {}
  
  Docfactory.model = {
    files: undefined,
    currentDoc: undefined
  }

  Docfactory.getFiles = function(){
    console.log("Document");
    Doc.query().then(function(data){
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

  Docfactory.parseFile = function(file){
    Docfactory.changeStatus(file,"Parsing");
    var index = Docfactory.model.files.indexOf(file);
    Doc.$post('/doc/parseFile',{"id":file._id}).then(function(data){
       Docfactory.model.files[index] = data
    })
  }

  Docfactory.abortJob = function(file){
    Docfactory.changeStatus(file,"Aborted");
    var index = Docfactory.model.files.indexOf(file);
    Doc.$post('/doc/abortJob',{"id":file._id}).then(function(data){
       Docfactory.model.files[index] = data
    })
  }

  Docfactory.getRecords = function(id){
    Docfactory.model.currentDoc = undefined
    Doc.get(id).then(function(data){
      Docfactory.model.currentDoc = data
    })
  }

  Docfactory.verificationRequest = function(file,column){
    Docfactory.changeStatus(file,"Verifying");
    var index = Docfactory.model.files.indexOf(file);
    Docfactory.model.files[index].columnToVerify = column
    
    Doc.$post('/doc/verifyRecords',{"id":file._id,"field":column}).then(function(data){
       Docfactory.model.files[index] = data
    })
  }
  Docfactory.downloadRequest = function(file){
    Doc.$post('/doc/downloadRequest',{"id":file._id}).then(function(data){
       Docfactory.model.files[index] = data
    })
  }

  Docfactory.changeStatus = function(file,status){
    var index = Docfactory.model.files.indexOf(file);
    Docfactory.model.files[index].status = status
  }

  return Docfactory;
}])
