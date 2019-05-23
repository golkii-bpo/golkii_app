angular
.module('appGolkii')
    .controller('Busqueda', ['$scope','coreFactory',function(scope,factory){
    
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
            salarioInss:0,
            statusCredex: "",
            isWorking: false
        },
        phones:[],
        cards:[]
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

    //métodos para ser ejecutados
    scope.buscar=()=>{
        // Se inicia el espinner de CARGANDO
        scope.Loading(true);
        // Parametros de busqueda
        const Tipo = scope.TipoBusqueda.toString();
        const Busqueda = scope.Busqueda.toString();
        const Campaign = 'EFNI';
        // Se valida que se haya ingresado el texto a buscar
        if (!Busqueda) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `Se debe llenar el campo de ${Tipo} para poder continuar`
            })
            return;
        }
        // Segun el tipo de busqueda establecido se valida que llamado al API se realizará
        if (Tipo === 'Cedula' || Tipo === 'Telefono'){
            var P = Tipo === 'Cedula'?
                factory.getPersonaByCedula(Busqueda,Campaign):
                factory.getPersonaByTelefono(Busqueda,Campaign);
            P.then((result) => {
                fillPersona(result.data);
            }).catch((err) => {
                throwError(err);
            });
            scope.Loading(false);
        }
        else{
            Swal.fire({
                type: 'error',
                title: 'Fatal Error',
                text: `Document Selector Unrecognized`
            })
            return;
        }
    }
    
    const fillPersona = (data) => {
        // Binding de informacion
        // Informacion General
        scope.info.general.nombre = titleCase(data.value.datosGenerales.nombre);
        scope.info.general.cedula = data.value.datosGenerales.cedula;
        scope.info.general.edad = data.value.datosGenerales.edad;
        scope.info.general.sexo = data.value.datosGenerales.sexo;
        // Informacion Demografica
        scope.info.demografia.departamento = data.value.datosGenerales.departamento
        scope.info.demografia.municipio = data.value.datosGenerales.municipio
        scope.info.demografia.domicilio = data.value.datosGenerales.domicilio
        // Informacion Financiera
        scope.info.ingresos.salario = data.value.datosGenerales.salario
        scope.info.ingresos.salarioInss = data.value.datosGenerales.salarioINSS
        scope.info.ingresos.statusCredex = data.value.datosGenerales.statusCredex
        scope.info.ingresos.isWorking = data.value.datosGenerales.isWorking
        // Numeros de Telefono
        scope.info.phones = [];
        
        for (i in data.value.telefonos) {
            let _obj = data.value.telefonos[i];
            console.log(_obj);
            
            scope.info.phones.push({
                Telefono: _obj.telefono,
                Operadora: titleCase(_obj.operadora)
            })
        }
        scope.info.cards = [];
        for (j in data.value.tarjetas) {
            let _obj = data.value.tarjetas[j];
            scope.info.cards.push({ bank: _obj.banco })
        }
    }

    const throwError = (error) => {
        console.log(error);
        
        Swal.fire({
            type: 'error',
            title: 'Cliente no encontrado',
            text: error.Message
        })
    }

    

}]);