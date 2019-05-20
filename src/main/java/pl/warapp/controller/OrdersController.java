package pl.warapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pl.warapp.model.OrdersProduct;
import pl.warapp.model.Product;
import pl.warapp.model.users.Orders;
import pl.warapp.model.users.User;
import pl.warapp.repository.OrdersProductRepository;
import pl.warapp.repository.OrdersRepository;
import pl.warapp.repository.ProductRepository;
import pl.warapp.repository.UserRepository;

@RestController
public class OrdersController {
	
	@Autowired
	ProductRepository productRepository;
	@Autowired
	OrdersRepository ordersRepsoitory;
	@Autowired
	UserRepository userRepository;
	@Autowired
	OrdersProductRepository ordersProductRepository;
	
	
	@PostMapping("/orders")
	public ResponseEntity<?> save(@RequestParam("product") int[] product, @RequestParam("quantity") int[] quantity){
			
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    	String currentPrincipalName = authentication.getName();
	    	System.out.println(currentPrincipalName);
	    	User user = userRepository.findByEmail(currentPrincipalName);
	    	
	    	Orders orders = new Orders();
	    	
	    	
	    	
	    	double suma = 0;
	    	
	    	for(int i = 0; i<product.length; i++) {
	    		Product productToSum = new Product();
	    		productToSum = productRepository.getOne((long) product[i]);
	    		suma = suma + (productToSum.getPrice() * quantity[i]);
	    		
	    		
	    		
	    	}
	    	
	    	

	    	orders.setPrice(suma);
	    	user.getOrders().add(orders);
	    	
	    	
	    	ordersRepsoitory.save(orders);
	    	userRepository.save(user);
	    	

	    	
	    	for(int i = 0; i<product.length; i++) {
	    		OrdersProduct ordersProduct = new OrdersProduct();

	    		
	    		ordersProduct.setProduct(productRepository.getOne((long) product[i]));
	    		ordersProduct.setProductQuantity(quantity[i]);
	    		
	    		ordersProductRepository.save(ordersProduct);

	    		
	    		orders.getOrdersProduct().add(ordersProduct);
	    		
	    		
	    	}
	    	
	    	
	    	
	    	
	    
	    	
	    	
	    	
	    	
	    	
	    	
	    	
	    	
	    	/*Orders orders = ordersRepsoitory.getOne((long) 31);
	    	OrdersProduct ordersProduct = new OrdersProduct();
	    	
	    	
	    	
	    	
	    	
	    	
	    	for(int i = 0; i < product.length; i++) {
	    		System.out.println("Zamowienie na: " + product[i] + " w ilosci: " + quantity[i] );
	    		
	    		
	    		ordersProduct.setProduct(productRepository.getOne((long) product[i]));
	    		ordersProduct.setProductQuantity(quantity[i]);
	    		

	    		
	    		ordersProductRepository.save(ordersProduct);
	    		
	    		orders.getOrdersProduct().add(ordersProduct);
	    		
	    		
	    		
	    		
	    		System.out.println(ordersProduct.getProduct().getId() + "xxxxxxxxxxxxxxxxxxx " + ordersProduct.getProductQuantity());

	    		

	    	}
	    	
	    	
	    	
	    	
	    	
	    	
	    	
	    	user.getOrders().add(orders);
	    	ordersRepsoitory.save(orders);
	    	userRepository.save(user);
	    	*/
	    	
	    	
	    	return  ResponseEntity.ok(null);

	}
	

}
