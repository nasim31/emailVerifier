// myApp.filter('isEmpty', function () {
//   var bar;
//   return function (obj) {
//     for (bar in obj) {
//       if (obj.hasOwnProperty(bar)) {
//         return false;
//       }
//     }
//     return true;
//   };
// });

// myApp.filter('inYear', function () {
//   return function (obj,year) {
//     var data = '-';
//     angular.forEach(obj, function(item) {
//       if(item.months == (year*12)) {
//         data = item.return.toFixed(1) + " %"
//       }
//     });
//     return data;
//   };
// });

// myApp.filter('schemeTypeAbbr', function () {
//   return function (obj) {
//     if(obj == "G")
//       return "Growth"
//     else
//       return "Dividend"
//   };
// });

// myApp.filter('formatFreq', function () {
//   return function (obj) {
//     if(obj == "M")
//       return "Monthly"
//     else if(obj == "W")
//       return "Weekly"
//     else if(obj == "Q")
//       return "Quarterly"
//   };
// });

// myApp.filter('formatFreqLabel', function () {
//   return function (obj) {
//     if(obj == "M")
//       return "Months"
//     else if(obj == "W")
//       return "Weeks"
//     else if(obj == "Q")
//       return "Quarters"
//   };
// });

// myApp.filter('isMandate',function(){
//   return function (obj) {
//     var toSend = []
//     angular.forEach(obj, function(bank) {
//       if(bank.sipmandate.status) {
//         toSend.push(bank)
//       }
//     });
//     return toSend;
//   };
// });

// myApp.filter('amcFilter', function(){
//   return function(items, option ) {
//     if(option === undefined || option == '')
//       return items;
//     var schemes = []
//     angular.forEach(items, function(value){
//       if(value.amc.amcCode == option){
//         schemes.push(value);
//       }
//     });
//     return schemes;
//   };
// });

// myApp.filter('categoryFilter', function(){
//   return function(items, options ) {
//     var filters = [];
//     angular.forEach(options, function(value,key){
//       if(value)
//         filters.push(key.replace(/_/g, " ").toUpperCase());
//     })
//     if(filters.length ==0)
//       return items;

//     var schemes = []
//     angular.forEach(items, function(value){
//       if($.inArray(value.schemeCategory, filters) != -1){
//         schemes.push(value);
//       }
//     });
//     return schemes;
//   };
// });

// myApp.filter('optionFilter', function(){
//   return function(items, options ) {
//     var filters = [];
//     angular.forEach(options, function(value,key){
//       if(value)
//         filters.push(key);
//     })
//     if(filters.length == 0)
//       return items;
    
//     var schemes = []
//     angular.forEach(items, function(value){
//       if($.inArray(value.option, filters) != -1){
//         schemes.push(value);
//       }
//     });
//     return schemes;
//   };
// });

// myApp.filter('nospace', function () {
//     return function (value) {
//       return (!value) ? '' : value.replace(/ /g, '-');
//     };
// });