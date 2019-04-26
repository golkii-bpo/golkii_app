angular
    .module('appGolkii')
    .factory('apiFactory', ['httpHandler',(http)=>{
        var api = {}

//#region Busqueda completa
        api.getPersonaByCedula = (cedula,campaign,callback)=>{
            http.Get(`/persona/cedula/${cedula}/campaign/${campaign}`,callback);
        }

        api.getPersonaByTelefono = (telefono,campaign,callback)=>{
            http.Get(`/persona/telefono/${telefono}/campaign/${campaign}`, callback)
        }

        api.test=(callback) => { 
            console.log("probando")
            http.test(callback)}
//#endregion Busqueda completa

        return api;
    }])