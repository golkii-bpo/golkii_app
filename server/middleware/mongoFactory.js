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
            return http.Get(factory, `/colaborador/general/`);
        }
// #endregion Colaboradores
// #region Rutas
        api.postRuta = (data) => {
            return http.Post(factory, '/rutas',data);
        }
        api.getRutesCount = () =>{
            return http.Get(factory,`/rutas/registros`);
        }
        api.getRutas = (page,itemsPerPage) => {
            let defaultSize = 20,
                defaultPage = 1;
            if (!page && !itemsPerPage) return http.Get(factory,'/rutas/');
            if (page && !itemsPerPage) return http.Get(factory, `/rutas?page=${page}&size=${defaultSize}`);
            if (!page && itemsPerPage) return http.Get(factory, `rutas?page=${defaultPage}&size=${itemsPerPage}`);
            if (page && itemsPerPage) return http.Get(factory, `/rutas?page=${page}&size=${itemsPerPage}`);
        }
        api.getRuta = (id) => {
            return http.Get(factory,`/rutas/${id}`);
        }
// #endregion Rutas
        return api;
    }])