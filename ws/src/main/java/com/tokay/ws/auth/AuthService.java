package com.tokay.ws.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tokay.ws.user.User;
import com.tokay.ws.user.UserService;
import com.tokay.ws.user.vm.UserVM;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author tokay
 *
 */
@Service
public class AuthService {

	UserService userService;
	PasswordEncoder passwordEncoder;

	public AuthService(UserService userService, PasswordEncoder passwordEncoder) {
		super();
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
	}

	public AuthResponse authenticate(Credentials credentials) {
		User inDb = userService.getByUsername(credentials.getUsername());
		boolean matches = passwordEncoder.matches(credentials.getPassword(), inDb.getPassword());
		if (matches) {
			UserVM userVm = new UserVM(inDb);
			String token = Jwts.builder().setSubject("" + inDb.getId())
					.signWith(SignatureAlgorithm.HS512, "my-app-secret").compact();
			AuthResponse response = new AuthResponse();
			response.setUser(userVm);
			response.setToken(token);
			return response;
		}
		return null;
	}

}
