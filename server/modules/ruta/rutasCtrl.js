angular
    .module('appGolkii')
    .controller('rutasCtrl', ['$scope', 'mongoFactory',(scope, factory) => {
        // Variables
        // Variables de paginacion
        scope.ITEMS_PER_PAGE = 10;
        scope.CURRENT_PAGE = 1;
        scope.NUMBER_OF_ITEMS = 0;
        scope.NUMBER_OF_PAGES = 1;
        // Scope Global Constants
        scope.dateFormat = dateFormat;
        // Variables de Rutas
        scope.listRutas = [];
        scope.selectRuta = {};
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
        // Inicio del formulario
        scope.Fill = async () => {
            // Se activa el Spinner de "CARGANDO"
            scope.Loading(true);
            // Ejecucion de una lista de promesas
            await Promise
            .all([
                // Promesa para saber cuantos registros hay
                factory.getRutesCount(),
                // Promesa de cargado de colaboradores
                factory.getRutas(scope.CURRENT_PAGE,scope.ITEMS_PER_PAGE)
            ])
            .then((data) => {
                scope.NUMBER_OF_ITEMS = data[0].data.value;
                scope.NUMBER_OF_PAGES = Math.ceil(scope.NUMBER_OF_ITEMS/scope.ITEMS_PER_PAGE);

                // Llenado de listas 
                fillRutas(data[1])
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
        // Metodo de tratamiento de datos para el llenado de la lista de rutas
        const fillRutas = (rutas) => {
            scope.listRutas = rutas.data.value;
        }
        scope.$watch('CURRENT_PAGE + ITEMS_PER_PAGE', () => {
            scope.Fill();
        });

        // Validacion de Fecha
        scope.validDate = (date) => {
            try {
                _ = toDate(date, '/').getTime();
            }
            catch (error) {
                console.log(`Ocurrió un error al convertir fecha ${date}`, error);
            }
        }
        scope.log = (e) =>{console.log(e);
        }
    }]);