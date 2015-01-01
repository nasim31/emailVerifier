myApp.directive("dropzone", function() {
  return {
    restrict : "A",
    link: function (scope, elem) {

      elem[0].addEventListener('dragover', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        elem.addClass("dragOver");
      }, false);

      elem[0].addEventListener('dragenter', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log("Drag Enter");
        elem.addClass("dragOver");
      }, false);

      elem[0].addEventListener('dragleave', function(evt) {
         evt.preventDefault();
          evt.stopPropagation();
          console.log("Drag Leave");
          elem.removeClass("dragOver");
      }, false);

      elem[0].addEventListener('drop', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files;
        scope.uploadFile(files);
        // for (var i = 0, f; f = files[i]; i++) {
        //   var reader = new FileReader();
        //   reader.readAsArrayBuffer(f);

        //   reader.onload = (function(theFile) {
        //     return function(e) {
        //       var newFile = { name : theFile.name,
        //         type : theFile.type,
        //         size : theFile.size,
        //         lastModifiedDate : theFile.lastModifiedDate
        //       }

        //       console.log(newFile);
        //   };
        //   })(f);
      });
    }
  }
});