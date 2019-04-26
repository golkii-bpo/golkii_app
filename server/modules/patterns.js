angular
    .module('appGolkii')
    .controller('REGEX',[()=>{
        scope.REGEX = {}
        scope.REGEX.cedula = '^\d{3}-\d{6}-\d{4}[A-Z]$';
        scope.REGEX.telefono = "^[2,5,6,7,8,9]\d{7}$";
    }])