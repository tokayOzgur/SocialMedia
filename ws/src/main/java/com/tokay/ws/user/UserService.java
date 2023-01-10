package com.tokay.ws.user;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tokay.ws.error.NotFoundException;
import com.tokay.ws.file.FileService;
import com.tokay.ws.gonderi.GonderiService;
import com.tokay.ws.user.vm.UserUpdateVM;

/**
 * @author tokay
 *
 */
@Service
public class UserService {

	UserRepository userRepository;

	PasswordEncoder passwordEncoder;

	FileService fileService;

	GonderiService gonderiService;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.fileService = fileService;
	}

	@Autowired
	public void setGonderiService(GonderiService gonderiService) {
		this.gonderiService = gonderiService;
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
			String oldImageName = inDB.getImage();
			try {
				String storedFileName = fileService.writeBase64EncodeStringToFile(updatedUser.getImage());
				inDB.setImage(storedFileName);
				fileService.deleteProfileImage(oldImageName);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return userRepository.save(inDB);
	}

	public void deleteUser(String username) {
		gonderiService.deleteGonderilerOfUser(username);
		userRepository.delete(userRepository.findByUsername(username));
	}
}
