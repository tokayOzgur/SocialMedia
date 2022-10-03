package com.tokay.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.tokay.ws.shared.CurrentUser;
import com.tokay.ws.shared.Views;
import com.tokay.ws.user.User;
import com.tokay.ws.user.UserRepository;

/**
 * @author tokay
 *
 */
@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;

	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class)
	public ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
		return ResponseEntity.ok(user);
	}
	
	
}
