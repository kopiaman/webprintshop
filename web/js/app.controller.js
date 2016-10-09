 // var API_URL = "http://localhost:8000/"
  var API_URL = 'https://api.dropp.photo/';

angular.module('app')
.controller('printshopMainCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: API_URL + 'merchandise/?order=sort',
      cache: true
    }).then(function mySuccess (response) {
      $scope.products = response.data
    }, function myError (response) {
      $scope.products = response.status + response.statusText
    })
  })
.controller('printshopProductCtrl', function ($scope, $stateParams, $http) {
    $http({
      method: 'GET',
      url: API_URL + 'merchandise/' + $stateParams.category,
      cache: true
    }).then(function mySuccess (response) {
      $scope.products = response.data
    }, function myError (response) {
      $scope.products = response.status + response.statusText
    })
    $scope.category = $stateParams.category
  })
 .controller('printshopDetailCtrl', function ($scope, $sce,
  $stateParams, $http, $state, $rootScope, localStorageService) {
  $scope.getMerchandize = function () {
    $http({
      method: 'GET',
      url: API_URL + 'merchandise/' + $stateParams.category + '/' + $stateParams.product,
      cache: true
    }).then(function mySuccess (response) {
      $scope.product = response.data[0]
      $scope.imageList = $scope.product.images
      $scope.currentSize = $scope.product.sizes[Object.keys($scope.product.sizes)[0]]
      $scope.activeImage = $scope.product.images[0]
      localStorageService.set('selectedItemDimensions', $scope.currentSize[0].dimensions)
      localStorageService.set('selectedItem', $scope.product)
    })
  }

  $scope.setCurrentSize = function (item, index) {
    
    localStorageService.set('selectedItemPk', $scope.currentSize[index].pk)

    if (item) {
      $scope.imageList = $scope.product.images
      $scope.activeImage = $scope.product.images[0]
      $scope.currentSize = item
      $scope.selectedItem = item[0]
      localStorageService.set('selectedItemDimensions', item[0].dimensions)
      localStorageService.set('selectedItem', $scope.product.images)
    } else {
      localStorageService.set('selectedItemDimensions', $scope.currentSize[index].dimensions)
      $scope.selectedItem = $scope.currentSize[index]
      $scope.imageList = $scope.selectedItem.images;      
      $scope.activeImage = $scope.selectedItem.template_image
      localStorageService.set('selectedItem', $scope.selectedItem)
    }
  }

  $scope.getColor = function (color) {
    return {
      'background-color': color
    }
  }

  $scope.deliberatelyTrustDangerousSnippet = function (htmlString) {
    return $sce.trustAsHtml(htmlString)
  }

  $scope.setActiveImage = function (img) {
    $scope.activeImage = img
  }
})
