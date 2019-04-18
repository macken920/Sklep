package pl.warapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pl.warapp.model.Product;
import pl.warapp.model.users.Orders;
import pl.warapp.model.users.User;
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
	
	
	@PostMapping("/orders")
	public ResponseEntity<?> save(@RequestParam("product") int[] product, @RequestParam("quantity") int[] quantity){
			
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    	String currentPrincipalName = authentication.getName();
	    	System.out.println(currentPrincipalName);
	    	User user = userRepository.findByEmail(currentPrincipalName);
	    	
	    	for(int i = 0; i < product.length; i++) {
	    		System.out.println("Zamowienie na: " + product[i] + " w ilosci: " + quantity[i] );
	    		Orders orders;
	    		//orders.getProduct().add(product[i]);
	    		//orders.setQuantity(quantity[1]);

	    	}
	    	

	    	
	    	
	    	
	    	return  ResponseEntity.ok(null);

	}
	

}
