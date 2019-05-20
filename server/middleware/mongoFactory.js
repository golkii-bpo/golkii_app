angular
    .module('appGolkii')
    .factory('mongoFactory',['httpHandler',(http)=>{
        var api = {}
        var factory = 'mongo'
//#region Login
        api.tryLogin = (Usr, Pwd, Callback) => {
            data = {
                User: Usr,
                Password: Pwd
            };
            http.Post(factory, data, Callback);
        }
//#endregion Login

        return api;
    }])