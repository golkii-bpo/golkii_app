angular
.module('appGolkii')
.controller('loginCtrl', ['$scope','mongoFactory',function(scope,factory){

    // Variables de login
    scope.User = "";
    scope.validUsr = true;
    scope.Pwd = "";
    scope.validPwd = true;

    const swLoading = Swal.mixin({
        html: '<div class="text-center"><i class="fas fa-spinner fa-5x fa-spin text-white"></i></div>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        background: 'trasparent'
    });

    scope.LoadingState = false;
    
    scope.Loading = function (state){
        if(scope.LoadingState != state){
            scope.LoadingState = state;
            if(state){
                swLoading.fire({});
            } else {
                swLoading.close();
            }
        }
    }

    scope.tryLogin=()=>{
        scope.Loading(true);

        const U = scope.User.toString();
        const P = scope.Pwd.toString();

        console.log(`User: ${U}`);
        console.log(`Password: ${P}`);
        validUsr = !U;
        validPwd = !P;

        factory.tryLogin(U,P,loginCallback);
    }

    const loginCallback = (error, response) => {
        scope.Loading(false);
        try{
            if(response){

            }else if (error){ 

            }else{
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Error inesperado en login!'
                })
            }
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Error en formato recibido!'
            })
        }
    }
}]);