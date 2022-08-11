package com.tokay.ws.auth;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.tokay.ws.error.ApiError;
import com.tokay.ws.shared.Views;
import com.tokay.ws.user.User;
import com.tokay.ws.user.UserRepository;

/**
 * @author tokay
 *
 */
@RestController
@RequestMapping("/api/1.0/auth")
public class AuthController {

	@Autowired
	UserRepository userRepository;

	@PostMapping("/login")
	@JsonView(Views.Base.class)
	public ResponseEntity<?> handleAuthentication(
			@RequestHeader(name = "Authorization") String authorization) { 
		String base64encoded = authorization.split("Basic ")[1];
		String base64decoded = new String(Base64.getDecoder().decode(base64encoded));// username : password
		String[] parts = base64decoded.split(":");// [username,password]
		User userInDb = userRepository.findByUsername(parts[0]);
		return ResponseEntity.ok().body(userInDb);
	}
}
