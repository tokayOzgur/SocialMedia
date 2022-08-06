package com.tokay.ws.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	@Size(min = 4, max = 50)
	private String username;

	@NotNull
	@Size(min = 4, max = 30)
	private String displayName;

	@NotNull
	@Size(min = 8, max = 16)
	@Pattern(regexp = "^(?=.*[az])(?=.*[AZ])(?=.*\\d).*$")
	private String password;

}
