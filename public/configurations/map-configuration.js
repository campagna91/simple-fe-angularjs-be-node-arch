(function() {

  angular
    .module('myApp.configurations', [])
    .config(MapConfiguration);

  MapConfiguration.$inject = [
    "$routeProvider"
  ];
  function MapConfiguration(
    $routeProvider
  ) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController',
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: '/'
      });

  }
})();