package com.tokay.ws.auth;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
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

	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@PostMapping("/login")
	@JsonView(Views.Base.class)
	public ResponseEntity<?> handleAuthentication(
			@RequestHeader(name = "Authorization", required = false) String authorization) {
		if (authorization == null) {
			ApiError apiError = new ApiError(401, "UnAuthorization request", "/api/1.0/auth/login");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
		}
		String base64encoded = authorization.split("Basic ")[1];
		String base64decoded = new String(Base64.getDecoder().decode(base64encoded));// username : password
		String[] parts = base64decoded.split(":");// [username,password]
		User userInDb = userRepository.findByUsername(parts[0]);

		if (userInDb == null) {// username db'de yoksa
			ApiError apiError = new ApiError(401, "UnAuthorization request", "/api/1.0/auth/login");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
		}

		if (!passwordEncoder.matches(parts[1], userInDb.getPassword())) {// şifre doğru değilse
			ApiError apiError = new ApiError(401, "UnAuthorization request", "/api/1.0/auth/login");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
		}

		return ResponseEntity.ok().body(userInDb);
	}

}
