package com.tokay.ws.user;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tokay.ws.error.ApiError;
import com.tokay.ws.shared.GenericResponse;

@RestController
@RequestMapping("/api/1.0/users")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/add")
	public GenericResponse createUser(@Valid @RequestBody User user) {
		userService.addUser(user);
		return new GenericResponse("user created");
	}
}
