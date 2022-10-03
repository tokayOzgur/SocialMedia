package com.tokay.ws.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author tokay
 *
 */
@Service
public class UserService {

//	@Autowired // Kullanımına gerek yok, tek bir field olduğu için spring hallediyor
	UserRepository userRepository;

	PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public void addUser(User entity) {
		entity.setPassword(this.passwordEncoder.encode(entity.getPassword()));
		userRepository.save(entity);
	}

	public Page<User> getUsersList(Pageable page) {
		return userRepository.findAll(page);

	}

}
