myApp.config(["railsSerializerProvider", function(railsSerializerProvider) {
    railsSerializerProvider.underscore(angular.identity).camelize(angular.identity);
}]);

// myApp.factory('Account', ['railsResourceFactory','railsSerializer', function (railsResourceFactory,railsSerializer) {
//   var account = railsResourceFactory({
//     url: '/accounts',
//     name: 'account',
//     serializer: railsSerializer(function () {
//       this.nestedAttribute('address','nominee_information','additional_investor','bank_accounts');
//     })
//   });
//   return account;
// }]);

myApp.factory('Document', ['railsResourceFactory','railsSerializer', function (railsResourceFactory,railsSerializer) {
  var documents = railsResourceFactory({
    url: '/documents',
    name: 'documents',
  });
  return documents;
}]);