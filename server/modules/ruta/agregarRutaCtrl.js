angular
.module('appGolkii')
.controller('agregarRutaCtrl',['$scope','mongoFactory',(scope, factory)=>{
   
    // Pageslide
    scope.showPageslide = true;
    // DatePicker
    scope.now = Now.toLocaleDateString();
    scope.minDate = MinDate.toISOString();
    scope.maxDate = Now.toISOString();
    scope.dateFormat = dateFormat;
    // Listas de seleccion
    scope.listColaboradores = [];
    scope.listDepartamentos = {};
    scope.listTiposInsumo = [];
    scope.listAuxTiposInsumo = [];
    scope.listInsumos = []
    // Variable auxiliar de colaborador
    scope.selectColaborador = {};
    // Variables auxiliares para Tipos Insumo
    scope.insumo = {
        k: "", // kind
        v: ""  // value
    }
    // Modelo de resultado 
    scope.res = {
        Colaborador : "",
        Descripcion : "",
        Casos : [],    
        Departamento : "",
        Municipio : "",
        Kilometraje : 0,
        Gasolina : 0.0,
        Pasaje : 0.0,
        Viatico : 0.0,
        FechaSalida : Now
    };

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
            // Promesa de cargado de colaboradores
            factory.getColaboradores()
        ])
        .then((data)=>{
            // Llenado de listas de seleccion
            // Llenado de lista de colaboradores desde la base de datos
            fillColaboradores(data[0].data.value);
            // Llenado de lista de departamentos desde una variable Global
            fillDepartamentos(Departamentos);
            // Llenado de lista de Insumos
            fillTiposInsumo(TiposInsumo);
            // Seleccion de valores por defecto seleccionados
            // Seleccion de departamento por defecto
            scope.res.Departamento = "Managua";
            // Seleccion de municipio por defecto basado en departamento seleccionado
            scope.res.Municipio = scope.listDepartamentos[scope.res.Departamento].Municipios[0];
            // Seleccion de tipo de insumo por defecto        
            k = Object.keys(scope.listTiposInsumo)[0];
            scope.insumo.k = k;
            scope.insumo.l = scope.listTiposInsumo[k].label;
            scope.insumo.db = scope.listTiposInsumo[k].dbVal;
            scope.insumo.v = 0;
            // Se aplican todos los cambios al DOM
            scope.$apply();
            // Se desactiva el Spinner de "CARGANDO"
            scope.Loading(false);
        })
        .catch((error)=>{
            // log error
            console.log(error);
        })
    }
    // Metodo de tratamiento de datos para el llenado de la lista de colaboradores
    const fillColaboradores = (colaboradores) =>{
        scope.listColaboradores = colaboradores;
    }
    // Metodo del tratamiento de datos para el llenado de la lista de departamentos
    const fillDepartamentos = (departamentos) => {
        scope.listDepartamentos = departamentos;
    }
    // Metodo del tratamiento de datos para el llenado de la lista de tipos de insumo
    const fillTiposInsumo = (tiposInsumo) => {
        scope.listTiposInsumo = tiposInsumo;
        scope.listAuxTiposInsumo = Object.keys(scope.listTiposInsumo);
    }
    // Metodo para mostrat u ocultar sidebar de seleccion de colaborador
    scope.togglesidebar = () => {
        scope.showPageslide = !scope.showPageslide;
    }

    scope.select = (colaborador) => {
        scope.selectColaborador = colaborador;  
        scope.res.Colaborador = colaborador._id
        scope.togglesidebar();
    }
    scope.departamentoChange = () => {
        const d = scope.res.Departamento;
        if (d){
            if (scope.listDepartamentos.hasOwnProperty(d)){
                scope.res.Municipio = scope.listDepartamentos[d].Municipios[0];
                return;
            }
        }
        scope.res.Municipio = listDepartamentos[scope.res.Departamento].Municipios[0];
    }
    scope.kInsumoChange = (insumo) => {
        var i = scope.listTiposInsumo[insumo.k];
        scope.insumo.l = i.label;
        scope.insumo.db = i.dbVal;
    }

    scope.addInsumo = () => {
        const aux = Object.assign({},scope.insumo);
        scope.listInsumos.push(aux);
    }
    scope.delInsumo = (insumo) => {
        scope.listInsumos = scope.listInsumos.filter(ele => {
            return ele != insumo;
        });
    }
}])