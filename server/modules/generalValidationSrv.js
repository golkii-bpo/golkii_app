angular
    .module('appGolkii')
    .factory('generalValidationSrv', [() => {
        var validate = {};
        validate.rangeValue = (value, min, max, lbl) => {
            if (typeof value === 'undefined') {
                return (`Debe ingresar un valor para el ${lbl}`)
            }
            else if (isNaN(value)) {
                return (`El valor del ${lbl} debe ser numerico`);
            }
            else if (value < min || value > max) {
                return (`El valor del ${lbl} debe ser mayor que ${min} y menor que ${max}`);
            }
            return null;
        }
        validate.notNullValue = (v, lbl) => {
            if (typeof (v) == "undefined"|| !v || v == '' ) {
                return (`El campo ${lbl} es requerido`);
            }
            return null;
        }
        validate.minLength = (array,minLength,strict) => {
            if(strict) {
                if(array.length <= minLength)
                    return false;
            }
            else
                if(array.length < minLength)
                    return false;
            return true;
        }
        return validate;
    }]);