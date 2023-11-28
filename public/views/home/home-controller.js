(function() {

  angular
    .module('myApp.controllers', [])
    .controller('HomeController', HomeController);

  HomeController.$inject = [];
  function HomeController() {
    var vm = this;
    vm.hello = "Hello Dev";
  }
})();