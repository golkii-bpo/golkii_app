angular
    .module('appGolkii')
    .controller('rutaCtrl', ["$scope", "$location", '$window', 'mongoFactory', 'agregarRutaSrv', 'generalValidationSrv', (scope, location, window, factory, service, gValidate) => {
        // Pageslide
        scope.showPageslide = true;
        // Modelo de resultado 
        scope.ruta = {};

        // Se preprara el SWAL2
        scope.LoadingState = false;
        scope.Loading = function (state) {
            if (scope.LoadingState != state) {
                scope.LoadingState = state;
                if (state) {
                    swLoading.fire({});
                } else {
                    swLoading.close();
                }
            }
        }
        scope.Init = async () => {
            // Se activa el Spinner de "CARGANDO"
            scope.Loading(true);
            // Ejecucion de una lista de promesas
            await Promise
                .all([
                    // Promesa de cargado de ruta
                    factory.getRuta(scope.ruta)
                ])
                .then((data) => {
                    // Llenado de modelo de datos
                    fillRuta(data[0]);
                    // Se aplican todos los cambios al DOM
                    scope.$apply();
                    // Se desactiva el Spinner de "CARGANDO"
                    scope.Loading(false);
                })
                .catch((error) => {
                    // log error
                    console.log(error);
                })
        }
        // Metodo de tratamiento de datos para la ruta
        const fillRuta = (ruta) => {
            scope.ruta = ruta;
            console.log(ruta);
            
        }
        

    }]);