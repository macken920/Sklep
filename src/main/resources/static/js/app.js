angular.module('app', ['ngRoute', 'ngResource'])
.config(function ($routeProvider) {
	$routeProvider
	.when('/addProduct', {
		templateUrl: 'addProduct.html',
		controller: 'AddProductController',
		controllerAs: 'aProductCtrl'
	})
		.when('/addProducer', {
		templateUrl: 'addProducer.html',
		controller: 'AddProducerController',
		controllerAs: 'aProducerCtrl'
	})
		.when('/addCategory', {
		templateUrl: 'addCategory.html',
		controller: 'AddCategoryController',
		controllerAs: 'aCategoryCtrl'
	})
	.otherwise({
		redirectTo: '/addProduct'
	});
})

.constant('CATEGORY_ENDPOINT', '/category')
.constant('PRODUCER_ENDPOINT', '/uploadFile')

.factory('NewCategory', function($resource, CATEGORY_ENDPOINT) {
	return $resource(CATEGORY_ENDPOINT);
})
.factory('NewProducer', function($resource, PRODUCER_ENDPOINT) {
	return $resource(PRODUCER_ENDPOINT);
})

.service('Database', function() {
	this.getAll = function(db) {
		return db.query();
	}
	this.get = function(index,db) {
		return db.get({id: index});
	}
	this.add = function(db) {
		db.$save();
	}
})

.controller('AddProductController', function() {
	var vm = this;
})
.controller('AddProducerController', ['$scope','$http',function($scope,$http) {
    $scope.attachedFile = function(element) {
        $scope.$apply(function($scope) {
            $scope.file = element.files[0];   
        });     
        console.log('file attached');
    };

    $scope.addFile = function() {
        var url = '/uploadFile';
        var fd = new FormData();        
        fd.append("file",$scope.file);
        
        
         $http.post(url, fd,{headers: {'Content-Type': undefined}}).then(function successCallback(response) {
        	 console.log(response);
        	 console.log("File Uploaded Successfully. DownloadUrl :" + response.data.fileDownloadUri);
        	  }, function errorCallback(response) {
        		  console.log(response);
        	  });

    };
}]) 
.controller('AddCategoryController', function(Database, NewCategory) {
	var vm = this;
	vm.category = new NewCategory;
	vm.saveCategory = function() {
		Database.add(vm.category);
		vm.category = new NewCategory;
	}
});