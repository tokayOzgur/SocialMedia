package com.tokay.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tokay.ws.shared.CurrentUser;
import com.tokay.ws.user.User;
import com.tokay.ws.user.UserRepository;
import com.tokay.ws.user.vm.UserVM;

/**
 * @author tokay
 *
 */
@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;

	@PostMapping("/api/1.0/auth")
	public UserVM handleAuthentication(@CurrentUser User user) {
		return new UserVM(user);
	}

}
