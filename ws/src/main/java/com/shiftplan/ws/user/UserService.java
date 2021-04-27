package com.shiftplan.ws.user;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder;
	
	
	//Bir class da sadece 1 tane constructor varsa '@Autowired' yazmaya gerek yok
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	public void save(User user) {
		String encyrptedPassword = this.passwordEncoder.encode(user.getPassword());
		user.setPassword(encyrptedPassword);
		userRepository.save(user);
		
	}

	
}
