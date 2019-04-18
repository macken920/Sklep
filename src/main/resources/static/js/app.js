angular.module('app', ['ngRoute', 'ngResource'])
.config(function ($routeProvider, $httpProvider) {
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
		.when('/cart', {
		templateUrl: 'main/cart.html',
		controller: 'CartController',
		controllerAs: 'cartCtrl'
	})
	.otherwise({
		redirectTo: '/products'
	});
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
})

.config(function(StorageProvider)  {
    StorageProvider.setSourceIdentifier('cart');
  })


.constant('CATEGORY_ENDPOINT', '/category')
.constant('PRODUCER_ENDPOINT', '/downloadFile')
.constant('PRODUCT_ENDPOINT', '/product')
.constant('REGISTRATION_ENDPOINT', '/register')
.constant('LOGIN_ENDPOINT', '/login')
.constant('ORDERS_ENDPOINT', '/orders')


.factory('NewCategory', function($resource, CATEGORY_ENDPOINT) {
	return $resource(CATEGORY_ENDPOINT);
})
.factory('NewProducer', function($resource, PRODUCER_ENDPOINT) {
	return $resource(PRODUCER_ENDPOINT);
})
.factory('NewProduct', function($resource, PRODUCT_ENDPOINT) {
	return $resource(PRODUCT_ENDPOINT);
})
.factory('User', function($resource, REGISTRATION_ENDPOINT) {
	return $resource(REGISTRATION_ENDPOINT);
})
.factory('Login', function($resource, LOGIN_ENDPOINT) {
	return $resource(LOGIN_ENDPOINT);
})
.factory('NewOrder', function($resource, ORDERS_ENDPOINT) {
	return $resource(ORDERS_ENDPOINT);
})


.run(function ($rootScope, $location, $http, $window){
	var userData = $window.localStorage.getItem('userData');
    if (userData) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + JSON.parse(userData).authData;
        $rootScope.authenticated = true;
    }
	

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
      var sumAll = 0;
    
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
          this.sum(product.price);
        }else {
          this._newItem(product);
          this.sum(product.price);
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
    	if( this._cart[id].quantity >=1){this.sum(-this._cart[id].price)}
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
      this.sum = function(price){
    	  sumAll = sumAll + price;
    	  console.log(sumAll); 	  
      };
  })
  
.service('AuthenticationService', function($http, LOGIN_ENDPOINT, $window) {
	
	
	
	
	this.authenticate = function(credentials, successCallback) {
		var authHeader = {Authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password)};
		var config = {headers: authHeader};
		$http
		.post(LOGIN_ENDPOINT, {}, config)
		.then(function success(value) {
			
			var token = $window.btoa(credentials.username+':'+credentials.password);
			
            var userData = {
                userName: credentials.username,
                authData: token
            }
            
            $window.localStorage.setItem('userData', JSON.stringify(userData));
             
            $http.defaults.headers.common.Authorization = 'Basic ' + token;
            successCallback();
            
	
		}, function error(reason) {
			console.log('Login error');
			console.log(reason);
		});
	}
	this.logout = function(successCallback) {
		delete $http.defaults.headers.post.Authorization;
		localStorage.removeItem('userData');
		successCallback();
	}
})

.controller('PromotionsController', function() {

})

.controller('ProductsController', function(Database, NewProduct) {
	var vm = this;
	vm.products = Database.getAll(NewProduct);
	console.log(vm.products);
	

})

.controller('ProducersController', function() {

})

.controller('ContactController', function() {

})

.controller('RegisterController', function(Database, User) {
	var vm = this;
	vm.user = new User();
	vm.saveUser = function() {
		Database.add(vm.user);
		vm.user = new User();
	}

})

.controller('LoginController', function(AuthenticationService, $rootScope, $scope, $location, $window) {
	var vm = this;
	vm.credentials = {};
	
	
	
    
	var loginSuccess = function() {
		$rootScope.authenticated = true;
		$location.path('/products');
	}
	var logoutSuccess = function() {
		$rootScope.authenticated = false;
		$location.path('/');
	}
	vm.login = function() {
		AuthenticationService.authenticate(vm.credentials, loginSuccess);
	}
	vm.logout = function() {
		AuthenticationService.logout(logoutSuccess);
	}
	
	

})

.controller('CartController', function(Cart, $http) {
	var vm = this;
	var i = 0;
	cart = Cart.getCart();
	
	
	

	vm.order = function(){
		var fd = new FormData(); 
		
		console.log("wywolanie nowy order");
		
	    angular.forEach(cart, function(product) {
	    	fd.append("product",product.id);
	    	fd.append("quantity",product.quantity);
     
	    });
	        
	    console.log(fd);
	    
	    var url = '/orders';
	    
        $http.post(url, fd,{headers: {'Content-Type': undefined}}).then(function successCallback(response) {
       	console.log(response);
       	localStorage.removeItem('cart');
       	console.log("Cart Removed");
       	  }, function errorCallback(response) {
       		  console.log(response);
       	  });
	
	}
	

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