package com.tokay.ws.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tokay.ws.user.User;
import com.tokay.ws.user.UserRepository;
import com.tokay.ws.user.vm.UserVM;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author tokay
 *
 */
@Service
public class AuthService {

	UserRepository userRepository;
	PasswordEncoder passwordEncoder;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public AuthResponse authenticate(Credentials credentials) {
		User inDb = userRepository.findByUsername(credentials.getUsername());
		if (inDb == null) {
			throw new AuthException();
		}

		if (!passwordEncoder.matches(credentials.getPassword(), inDb.getPassword())) {
			throw new AuthException();
		}

		UserVM userVm = new UserVM(inDb);
		String token = Jwts.builder().setSubject("" + inDb.getId()).signWith(SignatureAlgorithm.HS512, "my-app-secret")
				.compact();
		AuthResponse response = new AuthResponse();
		response.setUser(userVm);
		response.setToken(token);
		return response;
	}

}
