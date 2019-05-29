angular
    .module('appGolkii')
    .factory('coreFactory', ['httpHandler',(http)=>{
        var api = {}
        var factory = 'core';

//#region Busqueda completa
        api.getPersonaByCedula = (cedula,campaign)=>{
            return http.Get(factory,`/persona/cedula/${cedula}/campaign/${campaign}`);
        }

        api.getPersonaByTelefono = (telefono,campaign)=>{
            return http.Get(factory,`/persona/telefono/${telefono}/campaign/${campaign}`)
        }
//#endregion Busqueda completa

        return api;
    }])