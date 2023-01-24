package com.tokay.ws.auth;

import javax.transaction.Transactional;

import org.hibernate.proxy.HibernateProxy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tokay.ws.user.User;
import com.tokay.ws.user.UserRepository;
import com.tokay.ws.user.vm.UserVM;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
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

	@Transactional
	public UserDetails getUserDetails(String token) {
		JwtParser parser = Jwts.parser().setSigningKey("my-app-secret");
		try {
			parser.parse(token);
			Claims claims = parser.parseClaimsJws(token).getBody();
			long userId = new Long(claims.getSubject());
			User user = userRepository.getOne(userId);
			return (User) ((HibernateProxy) user).getHibernateLazyInitializer().getImplementation();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
