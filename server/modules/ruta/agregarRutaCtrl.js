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

    // Modelos
    scope.listColaboradores = [];
    scope.listDepartamentos = {};

    scope.res = {
        colaborador: "",
        departamento: "",
        municipios: "",
        kilometraje: 0,
        gasolina: 0.0,
        pasaje: 0.0,
        fechaSalida: Now,
        descripcion: "",
        casos: []
    }

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
        scope.Loading(true);
        await Promise
        .all([
            factory.getColaboradores()
        ])
        .then((data)=>{
            console.log(data[0].data.value);
            
            fillColaboradores(data[0].data.value);
            fillDepartamentos(Departamentos);

            scope.$apply();

            scope.res.departamento = "Managua";
            scope.res.municipio = Departamentos[scope.res.departamento].Municipios[0];
            scope.Loading(false);
        })
        .catch((error)=>{
            console.log(error);
            
        })

    }
    
    const fillColaboradores = (colaboradores) =>{
        scope.colaboradores = colaboradores;
    }
    const fillDepartamentos = (departamentos) => {
        scope.Departamentos = departamentos;
    }
    
    scope.togglesidebar = () => {
        scope.showPageslide = !scope.showPageslide;
    }

    scope.select = (colaborador) => {
        scope.res.colaborador = colaborador;  
        scope.togglesidebar();
    }

    scope.departamentoChange = () => {
        const d = scope.selectDepartamento;
        scope.Municipios = scope.Departamentos[d].Municipios;
        if (d)
            if (scope.Departamentos.hasOwnProperty(d))
                scope.selectMunicipio = scope.Departamentos[d].Municipios[0];
    }


    



}])