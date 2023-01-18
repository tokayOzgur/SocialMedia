package com.tokay.ws.auth;

import com.tokay.ws.user.vm.UserVM;

import lombok.Data;

/**
 * @author tokay
 *
 */
@Data
public class AuthResponse {
	
	private String token;
	
	private UserVM user;
	
}
