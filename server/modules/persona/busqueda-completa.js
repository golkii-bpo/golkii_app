angular
.module('appGolkii')
    .controller('Busqueda', ['$scope','apiFactory',function(scope,factory){
    
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
            statusCredex:""
        },
        phones:[],
        cards:[]
    }

    //métodos para ser ejecutados
    scope.buscar=()=>{
        const Busqueda = scope.Busqueda.toString();
        const Tipo = scope.TipoBusqueda.toString();
        const Campaign = 'EFNI';

        if (!Busqueda) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `Se debe llenar el campo de ${Tipo} para poder continuar`
            })
            return;
        }

        switch(Tipo){
            case 'Cedula':{
                factory.getPersonaByCedula(Busqueda,Campaign,isFound);
                break;
            }
            case 'Telefono': {
                factory.getPersonaByTelefono(Busqueda,Campaign, isFound);
                break;
            }
            default:{
                Swal.fire({
                    type: 'error',
                    title: 'Fatal Error',
                    text: `Document Selector Unrecognized`
                })
                return;
            }
        }
    }

    

    const isFound = (error, response) =>{
        try{
            if (response) {
                console.log(response.data)
                // Binding de informacion
                // Informacion General
                scope.info.general.nombre = titleCase(response.data.value.datosGenerales.nombre);
                scope.info.general.cedula = response.data.value.datosGenerales.cedula;
                scope.info.general.edad = response.data.value.datosGenerales.edad;
                scope.info.general.sexo = response.data.value.datosGenerales.sexo;
                // Informacion Demografica
                scope.info.demografia.departamento = response.data.value.datosGenerales.departamento
                scope.info.demografia.municipio = response.data.value.datosGenerales.municipio
                scope.info.demografia.domicilio = response.data.value.datosGenerales.domicilio
                // Informacion Financiera
                scope.info.ingresos.salario = response.data.value.datosGenerales.salario
                scope.info.ingresos.salarioInss = response.data.value.datosGenerales.salarioINSS
                scope.info.ingresos.statusCredex = response.data.value.datosGenerales.statusCredex
                // Numeros de Telefono
                scope.info.phones = [];
                for( i in response.data.value.telefonos){
                    let _obj = response.data.value.telefonos[i];
                    scope.info.phones.push({
                        Telefono: _obj.telefono,
                        Operadora: _obj.operadora
                    })
                }
                scope.info.cards = [];
                for(j in response.data.value.tarjetas){
                    let _obj = response.data.value.tarjetas[j];
                    scope.info.cards.push({ bank: _obj.banco})
                }


                console.log(scope.info.phones);

            } else if (error){
                console.log(error)
                Swal.fire({
                    type: 'error',
                    title: 'Cliente no encontrado',
                    text: error.Message
                })
            }else{
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Error inesperado en getPersonaByCedula!'
                })
            }
        }
        catch(error){
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Error en formato recibido!'
            })
        }
    }

}]);