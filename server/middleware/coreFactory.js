angular
    .module('appGolkii')
    .factory('coreFactory', ['httpHandler',(http)=>{
        var api = {}
        var factory = 'core';

//#region Busqueda completa
        api.getPersonaByCedula = (cedula)=>{
            return http.Get(factory,`/persona/cedula/${cedula}`);
        }

        api.getPersonaByTelefono = (telefono)=>{
            return http.Get(factory,`/persona/telefono/${telefono}`)
        }
//#endregion Busqueda completa

// #region ReportViews
        api.getEndToEnd_CC = (from, to) => {
            return http.Get(factory, `/Views/EndToEnd/CalledCount/${from}/${to}`)
        }
        api.getEndToEnd_CT = (from, to) => {
            return http.Get(factory, `/views/endtoend/CalledTime/${from}/${to}`)
        }
// #endregion ReportViews

        return api;
    }])