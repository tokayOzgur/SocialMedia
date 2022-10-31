package com.tokay.ws.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tokay.ws.shared.CurrentUser;
import com.tokay.ws.shared.GenericResponse;
import com.tokay.ws.user.vm.UserUpdateVM;
import com.tokay.ws.user.vm.UserVM;

/**
 * @author tokay
 *
 */
@RestController
@RequestMapping("/api/1.0")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/users")
	public GenericResponse createUser(@Valid @RequestBody User user) {
		userService.addUser(user);
		return new GenericResponse("user created");
	}

	@GetMapping("/users")
	public Page<UserVM> getUsersList(Pageable page, @CurrentUser User user) {
		return userService.getUsersList(page, user).map(UserVM::new);
	}

	@GetMapping("/users/{username}")
	UserVM getUser(@PathVariable String username) {
		User user = userService.getByUsername(username);
		return new UserVM(user);
	}

	@PutMapping("/users/{username}")
	@PreAuthorize("#username == #principal.username")
	UserVM updateUser(@RequestBody UserUpdateVM updatedUser, @PathVariable String username) {
		User user = userService.updateUser(username, updatedUser);
		return new UserVM(user);
	}

}
