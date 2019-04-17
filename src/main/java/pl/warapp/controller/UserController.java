package pl.warapp.controller;


import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import pl.warapp.model.users.User;
import pl.warapp.service.UserService;


@Controller
public class UserController {

	@Autowired
	private UserService userService;


	@PostMapping("/register")
	public ResponseEntity<?> save(@RequestBody User user){
		if(user.getId() == null) {
			
			userService.addWithDefaultRole(user);

			return ResponseEntity.ok(null);
		}else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } 
		
	}
	
    @PostMapping("/login")
    @ResponseBody
    public Principal login(Principal user) {
    	System.out.println("proba logowania: " + user.getName());
        return user;
    }
	
	

	
}
