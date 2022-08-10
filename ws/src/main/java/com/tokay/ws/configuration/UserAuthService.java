package com.tokay.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tokay.ws.user.User;
import com.tokay.ws.user.UserRepository;

/**
 * @author tokay
 *
 */
@Service
public class UserAuthService implements UserDetailsService{
	
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User userInDb = userRepository.findByUsername(username);
		if (userInDb==null) {
			throw new UsernameNotFoundException("User not fount!");
		}
		return new TokayUserDetails(userInDb);
	}

}
