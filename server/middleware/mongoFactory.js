angular
    .module('appGolkii')
    .factory('mongoFactory',['httpHandler',(http)=>{
        var api = {}
        var factory = 'mongo'
// #region Login
        api.tryLogin = (Usr, Pwd, callback) => {
            data = {
                User: Usr,
                Password: Pwd
            };
            http.Post(factory, data, callback);
        }
// #endregion Login
// #region Colaboradores
        api.getColaboradores = () =>{
            return http.Get(factory, `/colaborador/general/`)
        }
// #endregion COlaboradores
        return api;
    }])