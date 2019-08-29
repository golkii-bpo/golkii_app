angular
    .module('appGolkii')
    .controller('EndToEnd_CC_Ctrl', ["$scope", 'coreFactory', '$interval', (scope, factory, interval) => {




        // Modelo de resultado 
        scope.res = {};
        scope.Headers = [];
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
                    // Promesa de cargado de Reporte End To End
                    factory.getEndToEnd_CC()
                ])
                .then((data) => {
                    // Llenado de modelo de datos de Reporte End To End
                    fillEndToEnd(data[0].data.value);
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

        // SE ACTUALIZA INFORMACION AUTOMATICAMENTE CADA 5 MINUTOS
        interval(scope.Init, 5 * 60 * 1000);

        // Metodo de tratamiento de datos para la ruta
        const fillEndToEnd = (Data) => {
            scope.res = Data;
            scope.Headers = Object.keys(Data[0]);
        }
    }]);