angular.module('dots', [])

.constant('dotsConfig', {
   max: 5,
   min: 0,
   type: 0,
   stateOn: null,
   stateOff: null
})
.controller('dotsController', ['$scope', '$attrs', 'dotsConfig',
   function($scope, $attrs, dotsConfig) {
      var ngModelCtrl = {
         $setViewValue: angular.noop
      };

      this.init = function(ngModelCtrl_) {
         ngModelCtrl = ngModelCtrl_;
         ngModelCtrl.$render = this.render;

         
         this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : dotsConfig.stateOn;
          this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : dotsConfig.stateOff;
        
        this.max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : dotsConfig.max;
      this.min = angular.isDefined($attrs.min) ? $scope.$parent.$eval($attrs.min) : dotsConfig.min;
         
            this.type =  angular.isDefined($attrs.type) ? $scope.$parent.$eval($attrs.type) : dotsConfig.type;
         
         switch(this.type)
         {
            
            case 1: this.stateOn ='fa-square';this.stateOff =  'fa-square-o'; break;
            default: this.stateOn ='fa-dot-circle-o';this.stateOff =  'fa-circle-o'; break;

         }
         var dotsStates = angular.isDefined($attrs.dotsStates) ? $scope.$parent.$eval($attrs.dotsStates) :
            new Array(this.max);
         $scope.range = this.buildTemplateObjects(dotsStates);
      };

      this.buildTemplateObjects = function(states) {
         for (var i = 0, n = states.length; i < n; i++) {
            states[i] = angular.extend({index: i}, {stateOn: this.stateOn, stateOff: this.stateOff }, states[i]);
         }
         
         return states;
      };

      
      $scope.$watch('max', function(newVal, oldVal, scope) {
           if(angular.isDefined(newVal))
           {console.log(newVal+" "+oldVal);
           var states = new Array(newVal);
           var on = scope.range[0].stateOn;
           var off = scope.range[0].stateOff;
        for (var i = 0, n = states.length; i < n; i++) {
            states[i] = angular.extend({index: i}, {stateOn: on, stateOff: off }, states[i]);
         }
        scope.range = states;
           }
        
      });
      
      $scope.rate = function(value) {
         if (!$scope.readonly) {
            this.min = angular.isDefined($attrs.min) ? $scope.$parent.$eval($attrs.min) : dotsConfig.min;
            if (value > this.min && value <= $scope.range.length) {
               if ($scope.value == value)
                  value--;

            } 
            else
            {
               if(value < this.min)
               value = this.min;
               if(value > $scope.range.length)
               value = $scope.range.length;
            }
            ngModelCtrl.$setViewValue(value);
            ngModelCtrl.$render();
         }
      };
      
      $scope.onKeydown = function(evt) {
         if (/(37|38|39|40)/.test(evt.which)) {
          evt.preventDefault();
      evt.stopPropagation();
      $scope.rate( $scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1) );
         }
      };

      this.render = function() {
         $scope.value = ngModelCtrl.$viewValue;
      };
   }
])

.directive('dots', function() {
   return {
      restrict: 'EA',
      require: ['dots', 'ngModel'],
      scope: {
         readonly: '=?',
         max: '=max',
         min: '=min',
         type: '=type'
      },
      controller: 'dotsController',
      templateUrl: 'dots.html',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
         var dotsCtrl = ctrls[0],
            ngModelCtrl = ctrls[1];

         if (ngModelCtrl) {
            dotsCtrl.init(ngModelCtrl);
         }
      }
   };
});