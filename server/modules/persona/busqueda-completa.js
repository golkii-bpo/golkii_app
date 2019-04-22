angular
.module('appGolkii')
.controller('Busqueda',['$scope',function(scope){
    
    //variables de Busqueda
    scope.TipoBusqueda = "Cedula";
    scope.Busqueda = "";
    
    //variables de Formulario
    scope.info = {
        general:{
            nombre: "",
            cedula: "",
            edad: "",
            sexo: ""
        },
        demografia:{
            departamento:"",
            municipio:"",
            domicilio:""
        },
        ingresos:{
            salario:0,
            salarioInss:0
        }
    }

    //métodos para ser ejecutados
    scope.buscar=()=>{
        const Busqueda = scope.Busqueda.toString();
        const Tipo = scope.TipoBusqueda.toString();

        console.log(Busqueda,Tipo);
    }

    //Funciones para realizar la busqueda
    function Busqueda(busqueda,tipo){
        
    }

}]);