(function() {
  angular.module('validation.rule', ['validation'])
  .config(['$validationProvider',
    function($validationProvider) {

      var expression = {
        required: function(value) {
          return !!value;
        },
        checkBoxRequired: function(value, scope, element, attrs) {
          return ($(element).prop('checked') == true)? true:false;
        },
        minValue: function(value, scope, element, attrs) {
          return (parseInt(element[0].min) < parseInt(value)) ? true:false;
        },
        minDate: function(value, scope, element, attrs) {
          var todayDate = new Date();
          var selectedDate = new Date(value);
          return  selectedDate > todayDate.setDate(todayDate.getDate() + parseInt(attrs.mindays))
        },
        selectRequired: function(value, scope, element, attrs){
          return (value != "? undefined:undefined ?")? true:false
        },
        url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        number: /^\d+$/
      };

      var defaultMsg = {
        required: {
          error: 'This should be required',
          success: ''
        },
        checkBoxRequired: {
          error: '* req',
          success: ''
        },
        selectRequired: {
          error: 'This should be required',
          success: ''
        },
        minValue: {
          error: 'Should be higher minimum value',
          success: ''
        },
        minDate: {
          error: 'Date should be above minimum',
          success: ''
        },
        url: {
          error: 'This should be url',
          success: ''
        },
        email: {
          error: 'This should be email',
          success: ''
        },
        number: {
          error: 'This should be number',
          success: ''
        }
      };

      $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

    }
    ]);

}).call(this);
