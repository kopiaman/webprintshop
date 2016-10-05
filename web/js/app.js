angular.module('myApp', [
  'ngSanitize',
  'truncate',
  'ui.router',
  'ui.bootstrap',
  'app.controller',
  'LocalStorageModule'
])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    //default route
    $urlRouterProvider.otherwise('main')

    $stateProvider
      .state('main', { // shpw main printshop page
        url: '/main',
        templateUrl: 'partials/printshop.html',
        controller: 'printshopCtrl'

      })
      .state('printshopCategory', { // show category 
        url: '/printshopCategory/:category',
        templateUrl: 'partials/printshop_category.html',
        controller: 'printshopCategoryCtrl'
      })

      .state('printshopDetail', { // State demonstrating Nested views
        url: '/printshopDetail/:category/:product',
        templateUrl: 'partials/printshop_detail.html',
        controller: 'printshopDetailCtrl'
      })
    
      // use the HTML5 History API (firendly URL to remove #)
      $locationProvider.html5Mode(true);
  }])
