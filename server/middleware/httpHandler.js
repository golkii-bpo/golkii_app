angular
    .module('appGolkii')
    .factory('httpHandler', ['$http', (http)=>{

        handler = {};

        const getApiUrl = (Factory,url)=>{
            var f = Factory === 'core' ? coreApiUrl : mongoApiUrl;
            f += url;
            console.log("GET REQUEST TO:",f);
            
            return f;
        }

        /**
         * Este es un middleware para HTTP Post Request
         *
        * @param {Establece cual de las API's sera utilizada durante este llamado al procedimiento
         * @param {Endpoint llamado a traves del http request} url
         * @param {Informacion del POST en formato JSON} data
         */
        handler.Post = (Factory,url,data)=>{
            
            // Vamos a asumir que el usuario ya esta logeado
            //TODO: Validar Login de usuario
            return http(
                {
                    method: 'POST',
                    url: getApiUrl(Factory, url),
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    timeout: TimeOut
                }
            )
        }
        /**
        * Este es un middleware para HTTP Post Request
        * @param {Establece cual de las API's sera utilizada durante este llamado al procedimiento}
        * @param {Endpoint llamado a traves del http request} url
        */
        handler.Get = (Factory,url)=>{
            return http({
                "method": "GET",
                url: getApiUrl(Factory, url),
                "headers": {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
        }
        return handler;
    }])
        

    