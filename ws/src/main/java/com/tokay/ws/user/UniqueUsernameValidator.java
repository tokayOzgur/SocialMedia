package com.tokay.ws.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

	@Autowired
	UserRepository userRepository;

	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {
		if (this.userRepository == null) {
			return true;
		} else {
			if (userRepository.existsByUsername(username)) {
				return false;
			}
			return true;
		}
	}
}
