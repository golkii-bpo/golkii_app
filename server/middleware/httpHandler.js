angular
    .module('appGolkii')
    .factory('httpHandler', ['$http', (http)=>{

        handler = {};

        getApiUrl = (Factory)=>{
            console.log(Factory);
            return Factory === 'core' ? coreApiUrl : mongoApiUrl;
        }

        /**
         * Este es un middleware para HTTP Post Request
         * @param {Endpoint llamado a traves del http request} url
         * @param {Informacion del POST en formato JSON} data
         * @param {Funcion de retorno del middleware} callback
         */
        handler.Post = (Factory,url,data,callback)=>{
            try{
                APIUrl = getApiUrl(Factory);
                // Vamos a asumir que el usuario ya esta logeado
                //TODO: Validar Login de usuario
                http(
                    {
                        method: 'POST',
                        url: APIUrl + url,
                        data: data,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        timeout: TimeOut
                    }
                )
                .then(
                    (response)  => callback(null, response),
                    (error)     => callback(error, null)
                )
            }
            catch(error){
                callback(error,null)
            }
        }
        /**
        * Este es un middleware para HTTP Post Request
        * @param {Endpoint llamado a traves del http request} url
        * @param {Funcion de retorno del middleware} callback
        */
        handler.Get = (Factory,url, callback)=>{
            try {
                APIUrl = getApiUrl(Factory);
                http({
                    "method": "GET",
                    "url": APIUrl+url,
                    "headers": {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }).then(
                    (response)  => callback(null, response),
                    (error)     => callback(error, null)
                )
            }
            catch(error){
                callback(error,null)
            }
        }

        handler.test = (Factory,callback)=>{
            try {
                APIUrl = getApiUrl(Factory);
                http({
                    "method": "GET",
                    "url": "http://192.168.1.227:8084/api/area/",
                    "headers": {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }).then((response) => {
                    callback(null, response)
                }).catch((error) => {
                    callback(error, null);
                })
            }
            catch (error) {
                callback(error, null)
            }
        }
        return handler;
    }])
        

    