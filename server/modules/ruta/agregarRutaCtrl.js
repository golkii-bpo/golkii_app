angular
.module('appGolkii')
.controller('agregarRutaCtrl',['$scope','mongoFactory',(scope, factory)=>{
    // Filtro
    scope.first_name_model = "";
    // Pageslide
    scope.showPageslide = true;
    // DatePicker
    scope.now = Now.toLocaleDateString();
    scope.minDate = MinDate.toISOString();
    scope.maxDate = Now.toISOString();
    scope.dateFormat = dateFormat;

    scope.colaboradores = [];
    scope.selectColaborador = null;
    scope.selectDepartamento = "Managua";
    scope.selectMunicipio = "";
    scope.Departamentos = Departamentos;
    scope.Municipios = {};


    scope.Init = async () => {
        await Promise
            .all([colaboradores, productos])
        .then((data)=>{
            //tu codigo va aqui.
            console.log(data)
        })
        .catch((error)=>{
            //Tu codigo de error va aqui.
        })
    }
    
    const colaboradores = new Promise((res,rej) => {
        try {
            res([1,2,3,4]);
        } catch (error) {
            rej(error);
        }
    })
    const productos = new Promise((res, rej) => {
        try {
            res(['a','b','c']);
        } catch (error) {
            rej(error);
        }
    })

    getColaboradores = () => {
        factory.getColaboradores(getColaboradoresCallback);
    }

    scope.departamentoChange = () => {
        console.log(scope.selectDepartamento);
        
        const d = scope.selectDepartamento;
        scope.Municipios = scope.Departamentos[d].Municipios;
        if (d)
            if (scope.Departamentos.hasOwnProperty(d))
                scope.selectMunicipio = scope.Departamentos[d].Municipios[0];
    }

    scope.togglesidebar = () => {
        scope.showPageslide = !scope.showPageslide;
    }

    

    getColaboradoresCallback = (error, res) =>{
        if(res){
            scope.colaboradores = res.data.value;
        }
        else { 
            // colocar SWAL de error
        }
    }

    scope.select = (colaborador) => {
        scope.selectColaborador = colaborador;  
        scope.showPageslide = !scope.showPageslide;
    }

}])