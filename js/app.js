var myApp=angular.module('myApp',['ui.router','ui.bootstrap']);

myApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/product');
    $stateProvider
        .state('product',{
            url:'/product',
            templateUrl:'product.html',
            controller:'productController'  
            }
        )
        .state('details',{
            url:'/details/:detailsId',
            templateUrl:'details.html',
            controller:'detailsController'
            }
        )
})
myApp.controller('productController',function($scope,productData,$state){
    $scope.productData=productData;
    $scope.orderType='';
    $scope.order='';
    $scope.changeOrder=function(type){
        $scope.orderType=type;
        if($scope.order===''){
            $scope.order='-';
        }else{
            $scope.order='';
        }
    }
    $scope.toDetails=function(detailsId){
        $state.go('details',{detailsId:detailsId});
    }
})
myApp.controller('detailsController',function($scope,$state,productData,$stateParams){
    var detailsId=$stateParams.detailsId;
    $scope.detailsData=productData[detailsId-1];
})

myApp.controller('carouselCtrl', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides =[];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'img/0'+(currIndex+1)+'.jpg',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
});