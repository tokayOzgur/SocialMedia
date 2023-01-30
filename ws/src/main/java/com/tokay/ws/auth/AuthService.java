package com.tokay.ws.auth;

import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tokay.ws.user.User;
import com.tokay.ws.user.UserRepository;
import com.tokay.ws.user.vm.UserVM;

/**
 * @author tokay
 *
 */
@Service
public class AuthService {

	UserRepository userRepository;
	PasswordEncoder passwordEncoder;
	TokenRepository tokenRepository;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			TokenRepository tokenRepository) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.tokenRepository = tokenRepository;
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
		String token = generateRandomToken();

		Token tokenEntity = new Token();
		tokenEntity.setToken(token);
		tokenEntity.setUser(inDb);
		tokenRepository.save(tokenEntity);

		AuthResponse response = new AuthResponse();
		response.setUser(userVm);
		response.setToken(token);
		return response;
	}

	@Transactional
	public UserDetails getUserDetails(String token) {
		Optional<Token> optionalToken = tokenRepository.findById(token);
		if (!optionalToken.isPresent()) {
			return null;
		}
		return optionalToken.get().getUser();
	}

	public String generateRandomToken() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

}
