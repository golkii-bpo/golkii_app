angular
    .module('appGolkii')
    .controller('agregarPerfilCtrl', ['$scope', 'coreFactory', (scope, factory) => {
        
        scope.activeDepartments = [];
        scope.Init = async () => {
            // Llenado de lista de departamentos desde una variable Global
            fillDepartamentos(Departamentos);
        }
        // Metodo del tratamiento de datos para el llenado de la lista de departamentos
        const fillDepartamentos = (departamentos) => {
            scope.listDepartamentos = departamentos;
        }

        scope.log = (k,value) => {
            scope.activeDepartments[scope.listDepartamentos[k.k].MAP_KEY]=value;
        }
    }])