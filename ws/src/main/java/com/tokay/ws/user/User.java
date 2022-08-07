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
	
	@NotNull(message = "{tokay.constraints.username.NotNull.message}")
	@Size(min = 4, max = 50, message = "{tokay.constraints.username.Size.message}")
	@UniqueUsername(message = "{tokay.constraints.username.UniqueUsername.message}")
	private String username;

	@NotNull(message = "{tokay.constraints.displayName.NotNull.message}")
	@Size(min = 4, max = 30, message = "{tokay.constraints.displayName.Size.message}")
	private String displayName;

	@NotNull(message = "{tokay.constraints.password.NotNull.message}")
	@Size(min = 8, message = "{tokay.constraints.password.Size.message}")
	@Pattern(regexp = "^(?=.*[az])(?=.*[AZ])(?=.*\\d).*$",message = "{tokay.constraints.password.Pattern.message}")
	private String password;

}
