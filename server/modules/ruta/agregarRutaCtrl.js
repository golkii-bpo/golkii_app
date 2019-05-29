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
    // Param Insumos
    scope.insumoMinVal = 0;
    scope.insumoMaxVal = 5000;
    scope.insumoMinKmVal = 0;
    scope.insumoMaxKmVal = 2000;
    // Listas de seleccion
    scope.listColaboradores = [];
    scope.listDepartamentos = {};
    scope.listTiposInsumo = [];
    // Variable auxiliar de colaborador
    scope.selectColaborador = {};
    // Variables auxiliares para Tipos Insumo
    scope.insumo = {
        db: "",        // Llave dek objeto
        l: "",         // Label
        d: "",         // Description
        v: 0,          // input Value
        km: undefined, // input Km -> Only when k = "Gasolina"
        o: ""          // input Observacion
    }
    // Modelo de resultado 
    scope.res = {
        Colaborador: "",
        Descripcion: "",
        Casos: [],    
        Departamento: "",
        Municipio: "",
        Insumos: [],
        FechaSalida: Now.toLocaleDateString()
    };

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
    // Reinicia insumo a valores por defecto
    const initInsumo = () => {
        const k = Object.keys(scope.listTiposInsumo)[0];
        // variable auxiliar de la vista
        scope.auxinsumo = scope.listTiposInsumo[k];
        // variable de modelo
        scope.insumo.db = k;
        scope.insumo.l = scope.listTiposInsumo[k].label;
        scope.insumo.d = scope.listTiposInsumo[k].description;
        scope.insumo.v = 0;
        // optional param -> scope.insumo.km 
        // optional param -> scope.insumo.o
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
            scope.res.Municipio = scope.listDepartamentos[scope.res.Departamento].Municipios[0].Nombre;
            // Reinicia el valor de insumo por defecto
            initInsumo();
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
    }
    // Metodo para mostrar u ocultar sidebar de seleccion de colaborador
    scope.togglesidebar = () => {
        scope.showPageslide = !scope.showPageslide;
    }
    // Metodo para seleccion de colaborador desde el sidebar
    scope.select = (colaborador) => {
        scope.selectColaborador = colaborador;  
        scope.res.Colaborador = colaborador._id
        scope.togglesidebar();
    }
    // Este metodo se dispara cada ves que el Options de Departamentos cambia de valor,
    // realiza el llenado de la lista de municipios correspondiente al departamento seleccionado
    scope.departamentoChange = () => {
        const d = scope.res.Departamento;
        if (d){
            if (scope.listDepartamentos.hasOwnProperty(d)){
                scope.res.Municipio = scope.listDepartamentos[d].Municipios[0].Nombre;
                return;
            }
        }
        scope.res.Municipio = listDepartamentos[scope.res.Departamento].Municipios[0].Nombre;
    }
    // Este metodo se dispara cada ves que el input del model insumo.key cambia de valor
    // realiza el cambio del label y dbVal del modelo de insumo
    scope.kInsumoChange = (insumo) => {
        var i = scope.listTiposInsumo[insumo.key];
        scope.insumo.l = i.label;
        scope.insumo.db = i.key;
        if(scope.insumo.db == "Gasolina")
            scope.insumo.km = 0;
        else
            delete scope.insumo.km;
        if(scope.insumo.db == "Alimento")
            delete scope.insumo.o;
        else
            scope.insumo.o = ""        
    }
    // Metodo que realiza una copia el modelo insumo y lo agrega a la tabla de Insumos
    scope.addInsumo = () => {
        // validaciones generales para cada tipo de insumo
        if (typeof scope.insumo.v === 'undefined') {
            errorSWAL("Debe ingresar un valor para el insumo")
            return;
        }
        else if (isNaN(scope.insumo.v)) {
            errorSWAL("El valor del insumo debe ser numerico");
            return;
        }
        else if (scope.insumo.v < scope.insumoMinVal || scope.insumo.v > scope.insumoMaxVal){
            errorSWAL(`El valor del insumo debe ser mayor que ${scope.insumoMinVal} y menor que ${scope.insumoMaxVal}`);
            return;
        }        
        // validaciones especificas para el insumo de tipo Gasolina
        if(scope.insumo.key =="Gasolina"){
            if (typeof scope.insumo.km === 'undefined') {
                errorSWAL("Debe ingresar un valor para el kilometraje")
                return;
            }
            else if (isNaN(scope.insumo.km)) {
                errorSWAL("El valor del kilometraje debe ser numerico");
                return;
            }
            else if (scope.insumo.km <= scope.insumoMinKmVal || scope.insumo.km > scope.insumoMaxKmVal) {
                errorSWAL(`El valor del kilometraje del insumo debe ser mayor que ${scope.insumoMinKmVal} y menor que ${scope.insumoMaxKmVal}`);
                return;
            }
        }

        let aux = {
            Tipo: scope.insumo.db,
            Valor: scope.insumo.v
        }
        console.log("scope insumo",scope.insumo);

        if(scope.insumo.db == 'Gasolina')
            aux.Kilometro = scope.insumo.km;
        if (scope.insumo.db != 'Alimento')
            aux.Observacion = scope.insumo.o;
        

            console.log("aux",aux);
            


        scope.res.Insumos.push(aux);
        initInsumo();
    }
    // Metodo que realiza una copia del caso y lo agrega a la lista de casos
    scope.addCaso = (caso) => {
        if(!caso || caso=='undefined' || caso == '')
        {
            errorSWAL("Debe de llenar el campo del caso para poder continuar");
            return;
        }
        scope.res.Casos.push(caso.toUpperCase());   
        scope.nCaso = "";    
    }
    scope.delCaso = (index)=>{
        scope.res.Casos.splice(index,1);
    }

    // Metodo que elimina un valor de la tabla de Insumos
    scope.delInsumo = (insumo) => {
        scope.res.Insumos = scope.res.Insumos.filter(ele => {
            return ele != insumo;
        });
    }

    scope.submit = () => {
        scope.Loading(true);
        factory
        .postRuta(scope.res)
        .then(data => {
            console.log("DATA",data);
            
            scope.Loading(false);
        })
        .catch(error => {
            console.log('ERROR',error);

            scope.Loading(false);
        });
    }

    // Metodo para la carga del SWAL de error
    errorSWAL = (text) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: text
        })
        return;
    }
}])