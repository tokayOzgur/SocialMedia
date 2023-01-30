package com.tokay.ws.auth;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.tokay.ws.user.User;

import lombok.Data;

/**
 * @author tokay
 *
 */

@Entity
@Data
public class Token {
	
	@Id
	private String token;
	
	@ManyToOne
	private User user;

}
