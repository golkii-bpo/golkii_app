import { log } from "winston";

angular
    .module('appGolkii')
    .controller('rutaCtrl', ["$routeParams", "$scope", (routeParams, scope)=>{
        scope.Init = () => {
            console.log(routeParams.id);
            
        }
    }])