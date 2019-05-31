angular
    .module('appGolkii')
    .controller('rutasCtrl', ['$scope', 'mongoFactory',(scope, factory) => {
        // Constantes de Controlador
        ITEMS_PER_PAGE = 20;
        // Variables
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
        scope.Init = async () => {
            scope.showPageslide = false;
            // Se activa el Spinner de "CARGANDO"
            scope.Loading(true);
            // Ejecucion de una lista de promesas
            await Promise
            .all([
                // Promesa de cargado de colaboradores
                factory.getRutas()
            ])
            .then((data) => {
                // Llenado de listas 
                fillRutas(data[0])
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
            scope.listRutas = rutas;
        }

    }]);