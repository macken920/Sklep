package pl.warapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


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
	public ResponseEntity<?> save(@RequestBody List<Orders> orders){
			
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    	String currentPrincipalName = authentication.getName();
	    	System.out.println(currentPrincipalName);
	    	User user = userRepository.findByEmail(currentPrincipalName);
	    	
	    	
	    	System.out.println(orders.size());
	    	System.out.println(orders.get(1));
	    	System.out.println(orders.get(1).getId());
	    	
	    	
	    	
	    	return ResponseEntity.ok(null);

	}
	

}
