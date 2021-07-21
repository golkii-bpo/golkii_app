// Directives based on element names (E), attributes (A), class names (C), and comments (M).
angular
    .module('appGolkii')
    .directive('moneyInput', () => {
        return {
            restrict: 'E',
            // templateUrl: '/Resources/templates/inputInteger.html',
            template: "<input type='text' ng-blur='moneyText = LeaveMoney(moneyText)' ng-click='EntryMoney()' ng-model='moneyText'>",
            replace: true,
            scope: {
                moneyText: '=',
                moneyMin: '=?',
                moneyMax: '=?'
            },
            link: (scope) => {

                scope.LeaveMoney = (money) => {
                    if (money == '') {
                        return 0;
                    } else {
                        return money
                    }
                }

                scope.EntryMoney = () => {
                    if (scope.moneyText == "0") {
                        scope.moneyText = "";
                    }
                }

                scope.$watch('moneyMax', (newValue, oldValue) => {
                    if (newValue != null && newValue != oldValue) {
                        let max = parseFloat(newValue, 10), actual = parseFloat(scope.moneyText, 10);
                        if (actual > max) {
                            scope.moneyText = max;
                            return;
                        }
                    }
                });

                scope.$watch('moneyMin', (newValue, oldValue) => {
                    if (newValue != null && newValue != oldValue) {
                        let min = parseFloat(newValue, 10), actual = parseFloat(scope.moneyText, 10);
                        if (actual < min) {
                            scope.moneyText = min;
                            return;
                        }
                    }
                });

                scope.$watch('moneyText', (newValue, oldValue) => {
                    if (newValue == '') {
                        // estoy esta vacio porque no se tiene que realizar ninguna accion
                    }
                    else if (isNaN(newValue)) {
                        if (!isNaN(oldValue)) {
                            scope.moneyText = oldValue;
                            return;
                        } else {
                            scope.moneyText = 0;
                            return;
                        }
                    } else {
                        let actual = parseFloat(newValue, 10);
                        if (scope.moneyMin != null) {
                            let min = parseFloat(scope.moneyMin, 10);
                            if (actual < min) {
                                scope.moneyText = min;
                                return;
                            }
                        }
                        if (scope.moneyMax != null) {
                            let max = parseFloat(scope.moneyMax, 10);
                            if (actual > max) {
                                scope.moneyText = max;
                                return;
                            }
                        }
                    }
                });
            }
        }
    })
    .directive('integer', () => {
        return {
            restrict: 'E',
            // templateUrl: '/Resources/templates/inputInteger.html',
            template: "<input type='number' ng-blur='intText = EmptyCantidad(intText)' ng-model='intText'>",
            replace: true,
            scope: {
                intText: '=',
                intMin: '=?',
                intMax: '=?'
            },
            link: (scope) => {

                const isInt = (x) => {
                    var y = parseInt(x, 10);
                    return !isNaN(y) && x == y && x.toString() == y.toString();
                }

                scope.EmptyCantidad = (cantidad) => {
                    if (cantidad == "") {
                        return 0;
                    } else {
                        return cantidad
                    }
                }

                scope.$watch('intText', (newValue, oldValue) => {
                    if (!isInt(newValue) && newValue != '') {
                        if (isInt(oldValue)) {
                            scope.intText = oldValue;
                        } else {
                            scope.intText = 0;
                        }
                    } else {
                        let actual = parseInt(newValue, 10);
                        if (scope.intMin != null) {
                            let min = parseInt(scope.intMin, 10);
                            if (actual < min) {
                                scope.intText = min;
                            }
                        }
                        if (scope.intMax != null) {
                            let max = parseInt(scope.intMax, 10);
                            if (actual > max) {
                                scope.intText = max;
                            }
                        }
                    }
                });
            }
        }
    })