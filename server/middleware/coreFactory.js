angular
    .module('appGolkii')
    .factory('coreFactory', ['httpHandler',(http)=>{
        var api = {}
        var factory = 'core';

//#region Busqueda completa
        api.getPersonaByCedula = (cedula,campaign,callback)=>{
            http.Get(factory,`/persona/cedula/${cedula}/campaign/${campaign}`,callback);
        }

        api.getPersonaByTelefono = (telefono,campaign,callback)=>{
            http.Get(factory,`/persona/telefono/${telefono}/campaign/${campaign}`, callback)
        }
//#endregion Busqueda completa

        return api;
    }])