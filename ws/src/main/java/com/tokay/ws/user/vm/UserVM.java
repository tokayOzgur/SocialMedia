package com.tokay.ws.user.vm;

import com.tokay.ws.user.User;

import lombok.Data;

@Data
public class UserVM {

	private String username;
	private String displayName;
	private String image;

	public UserVM(User user) {
		this.setDisplayName(user.getDisplayName());
		this.setImage(user.getImage());
		this.setUsername(user.getUsername());
	}
}
