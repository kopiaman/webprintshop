angular.module('myApp', [
  'ngSanitize',
  'truncate',
  'ui.router',
  'ui.bootstrap',
  'app.controller',
  'app.directive',
  'LocalStorageModule'
])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    //default route
    $urlRouterProvider.otherwise('printshopMain')

    $stateProvider
      .state('printshopMain', { // shpw main printshop page
        url: '/printshopMain',
        templateUrl: 'partials/printshop_main.html',
        controller: 'printshopMainCtrl'

      })
      .state('printshopProduct', { // show category 
        url: '/printshopProduct/:category',
        templateUrl: 'partials/printshop_product.html',
        controller: 'printshopProductCtrl'
      })

      .state('printshopDetail', { // State demonstrating Nested views
        url: '/printshopDetail/:category/:product',
        templateUrl: 'partials/printshop_detail.html',
        controller: 'printshopDetailCtrl'
      })
    
      // use the HTML5 History API (firendly URL to remove #)
      $locationProvider.html5Mode(true);
  }])
