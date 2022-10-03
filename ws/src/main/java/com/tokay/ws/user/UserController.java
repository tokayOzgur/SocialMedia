package com.tokay.ws.user;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.tokay.ws.shared.GenericResponse;
import com.tokay.ws.shared.Views;

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
	@JsonView(Views.Base.class)
	public List<User> getUsersList() {
		return userService.getUsersList();
	}
}
