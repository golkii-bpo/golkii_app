angular
.module('appGolkii')
.controller('agregarRutaCtrl',['$scope','mongoFactory',(scope, factory)=>{
    scope.first_name_model = "";
    scope.showPageslide = true;
    scope.colaboradores = [];
    scope.selectColaborador = null;
    scope.Departamentos = Departamentos;
    scope.togglesidebar = () => {
        scope.showPageslide = !scope.showPageslide;
    }

    scope.getColaboradores = () =>{
        factory.getColaboradores(getColaboradoresCallback);
        // INICIAR SWAL DE LOADING
    }

    getColaboradoresCallback = (error, res) =>{
        // TERMINAR SWAL DE LOADING
        if(res){
            scope.colaboradores = res.data.value;
        }
        else { 
            // colocar SWAL de error
        }
    }

    scope.select = (colaborador) => {
        console.log(colaborador);
        scope.selectColaborador = colaborador;  
        scope.showPageslide = !scope.showPageslide;
    }

}])