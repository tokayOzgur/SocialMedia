package com.tokay.ws.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tokay.ws.error.NotFoundException;
import com.tokay.ws.user.vm.UserUpdateVM;

/**
 * @author tokay
 *
 */
@Service
public class UserService {

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

	public Page<User> getUsersList(Pageable page, User user) {
		if (user != null) {
			return userRepository.findByUsernameNot(user.getUsername(), page);
		}
		return userRepository.findAll(page);
	}

	public User getByUsername(String username) {
		if (userRepository.findByUsername(username) == null) {
			throw new NotFoundException();
		}
		return userRepository.findByUsername(username);
	}

	public User updateUser(String username, UserUpdateVM updatedUser) {
		User inDB = getByUsername(username);
		inDB.setDisplayName(updatedUser.getDisplayName());
		if (updatedUser.getImage() != null) {
			inDB.setImage(updatedUser.getImage());
		}
		return userRepository.save(inDB);
	}

}
