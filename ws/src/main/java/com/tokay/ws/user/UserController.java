package com.tokay.ws.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tokay.ws.shared.CurrentUser;
import com.tokay.ws.shared.GenericResponse;
import com.tokay.ws.user.vm.UserVM;

/**
 * @author tokay
 *
 */
@RestController
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/api/1.0/users")
	public GenericResponse createUser(@Valid @RequestBody User user) { 
		userService.addUser(user);
		return new GenericResponse("user created");
	}

	@GetMapping("/api/1.0/users")
	public Page<UserVM> getUsersList(Pageable page, @CurrentUser User user) {
		return userService.getUsersList(page, user).map(UserVM::new);
	}
}
