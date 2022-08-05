package com.tokay.ws.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


@Service
public class UserService {

//	@Autowired //Kullanımına gerek yok, tek bir field olduğu için spring otomatik olarak hallediyor
	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder; 
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}


	public void addUser(@RequestBody User entity) {
		entity.setPassword(this.passwordEncoder.encode(entity.getPassword()));
		userRepository.save(entity);
	}
}
