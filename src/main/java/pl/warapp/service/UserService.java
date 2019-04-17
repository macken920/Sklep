package pl.warapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.warapp.model.users.User;
import pl.warapp.model.users.UserRole;
import pl.warapp.repository.UserRepository;
import pl.warapp.repository.UserRoleRepository;



@Service
public class UserService {

	private static final String DEFAULT_ROLE = "ROLE_USER";
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserRoleRepository roleRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	

	public void addWithDefaultRole(User user) {

		UserRole userRole = new UserRole();
		userRole.setRole(DEFAULT_ROLE);
		userRole.setUsername(user.getEmail());
		
		user.setEnabled(1);
		user.getRoles().add(userRole);//Many to many
		String passwordHash = passwordEncoder.encode(user.getPassword());
		user.setPassword(passwordHash);
		
		roleRepository.save(userRole);
		userRepository.save(user);
	}

	
	
}
