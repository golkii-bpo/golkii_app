
// Directives based on element names (E), attributes (A), class names (C), and comments (M).

angular
.module('appGolkii')
.directive('money',()=>{
    return{
        restrict: 'A',
        link: (scope, elm, attrs)=>{
            scope.$watch(attrs.ngModel, (newValue, oldValue)=>{
                if (isNaN(newValue) && newValue != '') {
                    if (!isNaN(oldValue)) {
                        scope[attrs.ngModel] = oldValue;
                    } else {
                        scope[attrs.ngModel] = 0;
                    }
                }
            });
        }
    };
})
.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})
.directive('decimalsOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element,attrs,ngModelCtrl) {
            element.on('keypress', (event) => {
                var lastvalue = ngModelCtrl.$viewValue
                if(lastvalue){
                var dotCount = lastvalue.split('.').length - 1;
                const k = event.key;
                if (isNaN(k)){
                    if (lastvalue.length < 1 && k == "."){
                        ngModelCtrl.$setViewValue("0");
                        ngModelCtrl.$render(); 
                        return;
                    }
                    if (k == "." && dotCount < 1)
                        return;
                    event.preventDefault(); 
                }
            }
            });
            element.on('click',(event)=>{
                if (ngModelCtrl.$viewValue == 0 ){
                    ngModelCtrl.$setViewValue ("");
                    ngModelCtrl.$render();
                }
            });
            element.on('focusout', () => {
                if(""==ngModelCtrl.$viewValue){
                    ngModelCtrl.$setViewValue("0");
                    ngModelCtrl.$render();
                }
            });
            scope.$watch(attrs.ngModel, (newValue, oldValue) => {
                if(newValue)
                if (isNaN(newValue) && newValue != '') {
                    var 
                        transformedInput = newValue.replace(/[^0-9|.]/g, "");
                        transformedInput = transformedInput.replace(/[.]\d*$/g, "");
                    if (transformedInput !== newValue) {
                        if (transformedInput == "" && newValue == "."){
                            ngModelCtrl.$setViewValue("0.");
                        } else {
                            ngModelCtrl.$setViewValue(0);
                        }
                        ngModelCtrl.$render();
                    }                    
                }
            });

        }
    };
})