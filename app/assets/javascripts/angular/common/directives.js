// myApp.directive("splMenuBar", function() {
//   return {
//     restrict: "C",
//     link: function(scope, element, attrs) {
//       $('.navbarCommonTwo .navbar-brand').click(function(){
//         $('.splMenuBar').animate({'left':0},400);
//         if($('.splMenuBar').css('top') == "0px"){
//           $('.main').css('display', 'none');
//         }
//       });
      
//       $('.splMenuList, .splMenu-header').click(function(){
//         $('.splMenuBar').animate({'left':'-1024px'},400);
//         if($('.splMenuBar').css('top') == "0px"){
//           $('.main').css('display', 'block');
//         }
//       });
//     }
//   };
// });

// myApp.directive("mainBar", function() {
//   return {
//     restrict: "C",
//     link: function(scope, element, attrs) {
//       $('.searchHeading').click(function(){
//         $('.sidebarContainer').animate({'left':0},400);
//         $('.mainBar').fadeToggle('fast')
//       });

//       $('.cancelSidebar').click(function(){
//         $('.sidebarContainer').animate({'left':'-1024px'},400);
//         $('.mainBar').fadeToggle('fast');
//       });
//     }
//   };
// });

// myApp.directive("backTop", function() {
//   return {
//     restrict: "C",
//     link: function(scope, element, attrs) {
//       $("#back-top").hide();
//       // fade in #back-top
//       $(function () {
//         $(window).scroll(function () {
//           if ($(this).scrollTop() > 100) {
//             $('#back-top').fadeIn();
//           } else {
//             $('#back-top').fadeOut();
//           }
//         });

//       // scroll body to 0px on click
//       $('#back-top').click(function () {
//         $('body,html').animate({
//           scrollTop: 0
//         }, 800);
//         return false;
//       });
//       });
//       }
//   };
// });

// myApp.directive("mainSignup", function() {
//   return {
//     restrict: "C",
//     link: function(scope, element, attrs) {
//       $('.radio').click(function(){
//         $(this).parent('.polymer-radio').find('i').removeClass('fa-circle');
//         $(this).find('i').addClass('fa-circle');
//         var input = $(this).parent().find('input');
//         var value = $(this).attr('data-value');
//         input.val(value).trigger('input');
//       });
//     }
//   };
// });

// myApp.directive('ngEnter', function() {
//     return function(scope, element, attrs) {
//         element.bind("keydown keypress", function(event) {
//             if(event.which === 13) {
//                 scope.$apply(function(){
//                     scope.$eval(attrs.ngEnter, {'event': event});
//                 });

//                 event.preventDefault();
//             }
//         });
//     };
// });

// // myApp.directive("graph", function() {
// //   return {
// //     restrict: "A",
// //     link: function(scope, element, attrs) {
// //         scope.$watch("userResume[0].skills", function(newValue, oldValue){
// //           console.log("Changed Scope !!");
// //           var data = []
// //           $.each(newValue, function(key,value){
// //             if(value._destroy != 1)
// //             {
// //               var points = [];
// //               points.push(parseInt(value.percentage))
// //               var options = {}
// //               options["label"] = value.title
// //               points.push(options)
// //               data.push(points);
// //             }
// //           });
// //           drawGraph(element,data);
// //       },true);

// //       function drawGraph(element,data) {
// //         $(element).tufteBar({
// //           data: data,
// //           barWidth: 0.8,
// //           barLabel:  function(index) { return this[0] + '%' },
// //           axisLabel: function(index) { return this[1].label },
// //           color:     function(index) { return ['#E57536', '#82293B'][index % 2] }
// //         });
// //       }
// //     }
// //   };
// // });