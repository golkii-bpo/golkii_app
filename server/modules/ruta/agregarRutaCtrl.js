angular
.module('appGolkii')
    .controller('agregarRutaCtrl', ['$scope', '$window', 'mongoFactory', 'agregarRutaSrv', 'generalValidationSrv', (scope, window, factory, service,gValidate)=>{
   
    // Pageslide
    scope.showPageslide = true;
    // DatePicker
    scope.now = Now.toLocaleDateString();
    scope.minDate = MinDate.toISOString();
    scope.maxDate = Now.toISOString();
    scope.dateFormat = dateFormat;
    // Variables auxiliares de la vista
    scope.enableDelCase = false; // indica validez para eliminar casos
    scope.auxDate;
    // Listas de seleccion
    scope.listColaboradores = [];
    scope.listDepartamentos = {};
    scope.listTiposInsumo = [];
    // Variable auxiliar de colaborador
    scope.selectColaborador = {};
    // Variables auxiliares para Tipos Insumo
    scope.insumo = {
        db: "",        // Llave del objeto
        l: "",         // Label
        p: "",         // Label Position
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
        Demografia: { 
            Departamento: "",
            Municipio: ""
        },
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
        scope.insumo.p = scope.listTiposInsumo[k].lpos;
        scope.insumo.v = 0;
        // optional param -> scope.insumo.km 
        // optional param -> scope.insumo.o
        delete scope.insumo.km;
        delete scope.insumo.o;
    }

    scope.Init = async () => {
        scope.showPageslide = false;
        // Se activa el Spinner de "CARGANDO"
        scope.Loading(true);
        // Ejecucion de una lista de promesas
        await Promise
        .all([
            // Promesa de cargado de colaboradores
            factory.getColaboradores()
        ])
        .then((data)=>{
            console.log("data",data);
            
            // Llenado de listas de seleccion
            // Llenado de lista de colaboradores desde la base de datos
            fillColaboradores(data[0].data.value);
            // Llenado de lista de departamentos desde una variable Global
            fillDepartamentos(Departamentos);
            // Llenado de lista de Insumos
            fillTiposInsumo(TiposInsumo);
            // Seleccion de valores por defecto seleccionados
            // Seleccion de departamento por defecto
            scope.res.Demografia.Departamento = "Managua";
            // Seleccion de municipio por defecto basado en departamento seleccionado
            scope.res.Demografia.Municipio = scope.listDepartamentos[scope.res.Demografia.Departamento].Municipios[0].Nombre;
            // Selecciona la fecha de salida por defecto
            scope.auxDate = scope.now;
            scope.res.FechaSalida = new Date();
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
        const d = scope.res.Demografia.Departamento;
        if (d){
            if (scope.listDepartamentos.hasOwnProperty(d)){
                scope.res.Demografia.Municipio = scope.listDepartamentos[d].Municipios[0].Nombre;
                return;
            }
        }
    }
    // Este metodo se dispara cada ves que el input del model insumo.key cambia de valor
    // realiza el cambio del label y dbVal del modelo de insumo
    scope.kInsumoChange = (insumo) => {
        var i = scope.listTiposInsumo[insumo.key];
        scope.insumo.l = i.label;
        scope.insumo.db = i.key;
        scope.insumo.p = i.lpos;
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
        let err = service.generalInsumoValidation(scope.insumo);
        if(err){
            errorSWAL(err);
            return;
        }
        let aux = {
            Tipo: scope.insumo.db,
            Valor: scope.insumo.v
        }
        if(scope.insumo.db == 'Gasolina')
            aux.Kilometro = scope.insumo.km;
        if (scope.insumo.db != 'Alimento')
            aux.Observacion = scope.insumo.o;
        scope.res.Insumos.push(aux);
        initInsumo();
    }
    // Metodo que realiza una copia del caso y lo agrega a la lista de casos
    scope.addCaso = (caso) => {
        let err = gValidate.notNullValue(caso,'caso');
        if(err) {
            errorSWAL(err);
            return;
        }
        scope.res.Casos.push(caso.toUpperCase());   
        scope.nCaso = "";    
    }
    scope.delCaso = (index)=>{
        if(scope.enableDelCase)
            scope.res.Casos.splice(index,1);

        if (scope.res.Casos.length == 0)
            scope.enableDelCase = false;
    }

    // Metodo que elimina un valor de la tabla de Insumos
    scope.delInsumo = (insumo) => {
        scope.res.Insumos = scope.res.Insumos.filter(ele => {
            return ele != insumo;
        });
    }

    scope.validDate = () =>{
        try {
            scope.res.FechaSalida = toDate(scope.auxDate, '/').getTime();
        }
        catch (error) {
            console.log("Ocurrio un error al convertir fecha",error);
            scope.res.FechaSalida = new Date();
        }        
    }

    scope.submit = () => {
        scope.Loading(true);
        let err = gValidate.notNullValue(scope.res.Colaborador, 'persona');
        if (!gValidate.minLength(scope.res.Insumos, 1) && !err)
            err = "Debe de ingresar al menos un Insumo antes de continuar";
        else if (!gValidate.minLength(scope.res.Casos,1) && !err)
            err = "Debe de ingresar al menos un Caso antes de continuar";
        else if(!err){
            err = gValidate.notNullValue(scope.res.Descripcion, 'Descripción');
            if (!gValidate.minLength(scope.res.Descripcion,10) && !err)
                err = "La Descripción de la ruta es demasiado corta."
        }
        if (err) {
            errorSWAL(err);
            return;
        }

        factory
        .postRuta(scope.res)
        .then(data => {
            // console.log("DATA",data);
            scope.Loading(false);
            Swal.fire({
                type: 'success',
                title: 'Datos Ingresados exitosamente',
                text: "Los datos han sido registrados exitosamente",
                backdrop: `
                            rgba(0,0,123,0.4)
                            url("/resources/img/nyan-cat.gif")
                            center left
                            no-repeat
                        `
            }).then((result) => {
                if (result.value) {
                    window.location.href = '/app/ruta/';
                }
            })
        })
        .catch(error => {
            console.log('ERROR',error);
            scope.Loading(false);
            errorSWAL("Ha ocurrido un error durante la insercion de los datos, contactese con soporte del sistema!");
        });
    }

    
    // Metodo para activar o desactivar la eliminacion de casos
    scope.toggleDelCase = () => {
        if (scope.res.Casos.length == 0 && scope.enableDelCase == false)
            errorSWAL("No ha ingresado ningun caso aun.");
        else
            scope.enableDelCase = !scope.enableDelCase;
    }
}]);