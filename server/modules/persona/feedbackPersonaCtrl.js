angular
    .module('appGolkii')
    .controller('feedbackPersonaCtrl', ['$scope','$location', 'coreFactory', (scope,$location, factory)=>{
        
        scope.list = 0;
        scope.lead = 0;
        scope.phone = 0;
        scope.name = "";

        scope.phoneAlert = false;
        scope.info = {
            general: {
                nombre: "",
                cedula: ""
            },
            phones: []
        }
        const isValidPhone = (phone) => {
            var res = true;
            if (!phone) {
                return false;
            }
            res = !scope.info.phones.includes(phone);
            if(res){
                var regex = /^\d{8}$/;
                const match = regex.exec(phone);
                res = match ? true : false;
            }
            return res;
        }
        const isValidID = (cedula) => {
            var regex = /^\d{13}[a-zA-ZñÑ]$/;
            const match = regex.exec;
            return match ? true : false;
        }
        scope.addPhone = (phone) => {
                scope.phoneAlert = !isValidPhone(phone);
                if (!scope.phoneAlert){
                    scope.info.phones.push(phone);
                } 
                scope.phone = "";
        }
        scope.save = () => {
            const validID = isValidID(scope.info.general.cedula);
            const validPhones = scope.info.phones.length > 1;
            if(scope.info.general.nombre){
                if(!cedula || validID){
                    if(validPhones){
                        // TODO: Realizar ingreso de datos en la BD
                    }
                }
            }
        }
        
        scope.Init = () => {
            console.log('====================================');
            console.log("lead: ", scope.lead);
            console.log('====================================');
            console.log("list: ", scope.list);
            console.log('====================================');
            console.log("phone: ", scope.phone);
            console.log('====================================');
            console.log("name: ", scope.info.general.nombre);
            console.log('====================================');
            // set Calling Phone
            scope.c_phone = scope.phone;
        }
    }])