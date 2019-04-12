angular.module('app', ['ngRoute', 'ngResource'])
.config(function ($routeProvider) {
	$routeProvider
	.when('/addProduct', {
		templateUrl: 'admin/addProduct.html',
		controller: 'AddProductController',
		controllerAs: 'aProductCtrl'
	})
		.when('/addProducer', {
		templateUrl: 'admin/addProducer.html',
		controller: 'AddProducerController',
		controllerAs: 'aProducerCtrl'
	})
		.when('/addCategory', {
		templateUrl: 'admin/addCategory.html',
		controller: 'AddCategoryController',
		controllerAs: 'aCategoryCtrl'
	})
	.otherwise({
		redirectTo: '/addProduct'
	});
})


.constant('CATEGORY_ENDPOINT', '/category')
.constant('PRODUCER_ENDPOINT', '/downloadFile')
.constant('PRODUCT_ENDPOINT', '/product')

.factory('NewCategory', function($resource, CATEGORY_ENDPOINT) {
	return $resource(CATEGORY_ENDPOINT);
})
.factory('NewProducer', function($resource, PRODUCER_ENDPOINT) {
	return $resource(PRODUCER_ENDPOINT);
})
.factory('NewProduct', function($resource, PRODUCT_ENDPOINT) {
	return $resource(PRODUCT_ENDPOINT);
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

.controller('AddProductController', function(Database, NewCategory, NewProducer, NewProduct) {
	var vm = this;
	vm.product = new NewProduct;
	
	vm.categories = Database.getAll(NewCategory);
	vm.producers = Database.getAll(NewProducer);

	
	vm.saveProduct = function() {
		
		
		
		vm.product.category_id = vm.product.category.id;
		console.log(vm.product.category.id);
		vm.product.producer_id = vm.product.producer.id;
		console.log(vm.product.producer);
		Database.add(vm.product);
		vm.product = new NewProduct;
	}
	
	
})
.controller('AddProducerController', function($scope,$http,Database, NewProducer) {
	var vm = this;
	vm.producer = Database.getAll(NewProducer);
	
	
	
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
        fd.append("name",this.producer.name);
        console.log(fd);
        console.log(name);
        
        
         $http.post(url, fd,{headers: {'Content-Type': undefined}}).then(function successCallback(response) {
        	 console.log(response);
        	 console.log("File Uploaded Successfully. DownloadUrl :" + response.data.fileDownloadUri);
        	  }, function errorCallback(response) {
        		  console.log(response);
        	  });

    };
}) 
.controller('AddCategoryController', function(Database, NewCategory) {
	
	var vm = this;
	vm.categories = Database.getAll(NewCategory);
	vm.category = new NewCategory;
	
	
	vm.saveCategory = function() {
		Database.add(vm.category);
		vm.category = new NewCategory;
	}
});