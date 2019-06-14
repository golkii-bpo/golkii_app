angular
    .module('appGolkii')
    .factory('agregarRutaSrv', ['generalValidationSrv',validate => {
        var service = {};
        service.params = {
            insumoMinVal: 0,
            insumoMaxVal: 5000,
            insumoMinKmVal: 0,
            insumoMaxKmVal: 2000
        }
        service.generalInsumoValidation = (insumo) =>{
            const   value = insumo.v,
                    kind  = insumo.db, 
                    kilometraje = insumo.km, 
                    observacion = insumo.o;
            let err = null;
            // Validaciones generales para cada tipo de insumo
            err = validate.rangeValue(value, service.params.insumoMinVal, service.params.insumoMaxVal, 'insumo');
            // Validaciones especificas para el insumo de tipo Gasolina
            if(kind == "Gasolina" && !err){
                err = validate.rangeValue(kilometraje, service.params.insumoMinKmVal, service.params.insumoMaxKmVal, 'kilometraje');
            }
            // Validacion del campo Observación
            if (kind !== "Alimento" && !err) {
                err = validate.notNullValue(observacion,"Observación");
                if (!validate.minLength(observacion, 10) && !err)
                    err = "La Descripción de la ruta es demasiado corta."
            }
            return err;
        }
        return service;
    }]);