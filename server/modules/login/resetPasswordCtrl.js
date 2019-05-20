angular
.module('appGolkii')
.controller('resetPasswordCtrl',['$scope','mongoFactory',(scope,factory)=>{
    // Variables del controlador
    scope.lastPwd = "";
    scope.newPwd = "";
    scope.confirmNewPwd = "";
    // Metodo de cambio de contraseña
    scope.setNewPwd = () => {

    }
    // Callback del metodo de cambio de contraseña
    const setNewPwdCallback = (error,response) => {

    }
}])