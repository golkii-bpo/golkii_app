angular
    .module('appGolkii')
    .controller('EndToEnd_CC_Ctrl', ["$scope", 'coreFactory', (scope, factory) => {


        // DatePicker
        scope.now = Now.toLocaleDateString();
        scope.minDate = MinDate.toISOString();
        scope.maxDate = Now.toISOString();
        scope.dateFormat = dateFormat;
        scope.startDate = scope.now;
        scope.endDate = scope.now;
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
        // Carga inicial
        scope.Init = async () => {
            var start = new Date();
            start.setDate(Now.getDate() - 1);
            const [fd, fm, fy] = start.toLocaleDateString().split("/");
            start = `${fy}-${fm}-${fd - 1}`;
            var end = `${fy}-${fm}-${fd}`;
            load(start, end);
        }

        scope.submitDate = () => {
            const [fd, fm, fy] = scope.startDate.split("/");
            const start = `${fy}-${fm}-${fd}`;
            const [td, tm, ty] = scope.endDate.split("/");
            const end = `${ty}-${tm}-${td}`;
            load(start, end);
        }

        const load = async (from, to) => {
            // Se activa el Spinner de "CARGANDO"
            scope.Loading(true);

            // Ejecucion de una lista de promesas
            await Promise
                .all([
                    // Promesa de cargado de Reporte End To End
                    factory.getEndToEnd_CC(from, to)
                ])
                .then((data) => {
                    // Llenado de modelo de datos de Reporte End To End
                    fillEndToEnd(data[0].data.value);

                })
                .catch((error) => {
                    // log error
                    console.log(error);
                })

            // Se aplican todos los cambios al DOM
            scope.$apply();
            // Se desactiva el Spinner de "CARGANDO"
            scope.Loading(false);
        }

        // Metodo de tratamiento de datos para la ruta
        const fillEndToEnd = (Data) => {
            scope.res = Data;
            scope.Headers = Object.keys(Data[0]);
        }

        scope.validDate = (date) => {
            try {
                date = toDate(date, '/').getTime();
            }
            catch (error) {
                console.log("Ocurrio un error al convertir fecha", error);
                date = new Date();
            }
        }
    }]);