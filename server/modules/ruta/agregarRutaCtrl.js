angular
.module('appGolkii')
.controller('agregarRutaCtrl',['$scope',(scope)=>{
    
    scope.checked = true;
    scope.togglesidebar = () => {
        scope.checked = !scope.checked;
    }

}])