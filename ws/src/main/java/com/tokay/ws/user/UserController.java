package com.tokay.ws.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tokay.ws.error.ApiError;
import com.tokay.ws.shared.GenericResponse;

@RestController
@RequestMapping("/api/1.0/users")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/add")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		ApiError apiError = new ApiError(400, "Validation error!", "/api/1.0/users");
		Map<String, String> validationErrors = new HashMap<>();

		if (user.getUserName() == null || user.getUserName().isEmpty()) {
			validationErrors.put("username", "Username can not be null");
		}
		if (user.getDisplayName() == null || user.getDisplayName().isEmpty()) {
			validationErrors.put("displayName", "Display name can not be null");
		}
		if (validationErrors.size() > 0) {
			apiError.setValidationErrors(validationErrors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
		}

		userService.addUser(user);
		return ResponseEntity.ok(new GenericResponse("user created"));
	}

}
