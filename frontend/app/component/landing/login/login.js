'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'loginCtrl',
};

function SignupController($log, $location, authService){
  this.login = function(user){
    authService.login(user)
    .then( () => {
      $location.path('/home');
    })
    .catch ( () => {
      console.log('failed to login');
    });
  };
}
