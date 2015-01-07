// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.

//= require jquery
//= require jquery_ujs
//= require bootstrap.min
//= require angular.min
//= require angular-resource
//= require angular-route
//= require angularjs/rails/resource
//= require angular/extDirectives/devise
//= require angular/extDirectives/readable-time.min
//= require angular/extDirectives/pie-chart.min
//= require angular/extDirectives/d3.min
//= require angular/app
//= require angular/common/resources
//= require angular/factory/userFactory
//= require angular/factory/docFactory
//= require private_pub
//= require_tree .

$(document).ready(function(){
  var channel = $("#currentSession").val()
  PrivatePub.subscribe("/"+channel, function(data, channel) {
    // var ele = $("#"+data.addUp);
    // ele.html(parseInt(ele.html())+1)
    
    var scope = angular.element($("#"+data.addUp)).scope()
    var status = data.addUp.split('_')[1]
    scope.$apply(function(){
      if(status == "Active") {
        scope.docModel.currentDoc.active += 1
        scope.data[0].value += 1;
      }
      if(status == "InActive") {
        scope.docModel.currentDoc.inactive += 1
        scope.data[1].value += 1;
      }
      if(status == "Error") {
        scope.docModel.currentDoc.err += 1
        scope.data[2].value += 1;
      }
    });
  });
})
