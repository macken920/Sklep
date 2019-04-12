angular.module('app', ['ngRoute', 'ngResource'])
.config(function ($routeProvider) {
	$routeProvider
	.when('/promotions', {
		templateUrl: 'main/promotions.html',
		controller: 'PromotionsController',
		controllerAs: 'promotionsCtrl'
	})
		.when('/products', {
		templateUrl: 'main/products.html',
		controller: 'ProductsController',
		controllerAs: 'productsCtrl'
	})
		.when('/producers', {
		templateUrl: 'main/producers.html',
		controller: 'ProducersController',
		controllerAs: 'producersCtrl'
	})
		.when('/contact', {
		templateUrl: 'main/contact.html',
		controller: 'ContactController',
		controllerAs: 'contactCtrl'
	})
		.when('/register', {
		templateUrl: 'main/register.html',
		controller: 'RegisterController',
		controllerAs: 'registerCtrl'
	})
		.when('/login', {
		templateUrl: 'main/login.html',
		controller: 'LoginController',
		controllerAs: 'loginCtrl'
	})
	.otherwise({
		redirectTo: '/products'
	});
})

.config(function(StorageProvider)  {
    StorageProvider.setSourceIdentifier('cart');
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

.provider('Storage', function ()  {
    
    var identifier;
    
    return {
      setSourceIdentifier : function(id) {
        identifier = id;
      },
      
      $get : ['$rootScope', '$window', function($rootScope, $window) {
        
        angular.element($window).on('storage', function (event) {
          if (event.key === identifier) {
            $rootScope.$broadcast('onStorageModify');
          }
        });
        
        return {
          save : function(data)  {
            localStorage.setItem(identifier, JSON.stringify(data));
          },
      
          fetch : function() {
            return JSON.parse(localStorage.getItem(identifier));
          },
      
          remove : function()  {
            localStorage.removeItem(identifier);
          }
        };
      }]
    }
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

.service('Cart', function ($rootScope, Storage) { 
      var vm = this;
    
      $rootScope.$on('onStorageModify', function()  {
        vm.refresh();
      });
    
      this._cart = {};
    
      this._cartLookUp = function(id)  {
        return this._cart.hasOwnProperty(id) ? true : false;
      }
    
      this.getCart = function(){
        this._cart = Storage.fetch();
        if(!this._cart) { this._cart = {}; }
        
        return this._cart;
      };
  
      this.addItem = function(product){
        if(this._cartLookUp(product.id))  {
          this.changeQuantity(product.id);
        }else {
          this._newItem(product);
        }
        
        this.save();
      };
      
      this._newItem = function(product)  {
        product.quantity = 1;
        this._cart[product.id] = product;
      };
  
      this.addItems = function(products) {
        angular.forEach(products, function(product) {
          this.addItem(product);
        }, this);
      };
  
      this.save = function() {
        Storage.save(this._cart);
      };
  
      this.remove = function (id) {
        if(!--this._cart[id].quantity) { delete this._cart[id]; }
        this.save();
      };
  
      this.clear = function() {
        this._cart = {};
        Storage.remove();
      };
  
      this.persist = function() {};
  
      this.changeQuantity = function (id){
        this._cart[id].quantity++;
      };
  
      this.refresh = function() {
        $rootScope.$broadcast('onCartUpdate')
      };
  })

.controller('PromotionsController', function() {

})

.controller('ProductsController', function(Database, NewProduct) {
	var vm = this;
	vm.products = Database.getAll(NewProduct);
	console.log(vm.products);
	console.log(vm.products.producer);
	

})

.controller('ProducersController', function() {

})

.controller('ContactController', function() {

})

.controller('RegisterController', function() {

})

.controller('LoginController', function() {

})

.controller('ItemListController',function($rootScope, $scope, Cart, Database, NewProduct) {
      
      $scope.cart = Cart.getCart();
      $scope.products = Database.getAll(NewProduct);
      $scope.addProduct = function(index)  {
        Cart.addItem($scope.products[index]);
      };
      $scope.removeProduct = function(index)  {
        Cart.remove(index);
      };
      
      $rootScope.$on('onCartUpdate', function() {
        $scope.$apply(function()  {
          $scope.cart = Cart.getCart();
        });
      });
    }
  );