package com.tokay.ws.user;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonView;
import com.tokay.ws.shared.Views;

import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8550603168502571274L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "{tokay.constraints.username.NotNull.message}")
	@Size(min = 4, max = 50, message = "{tokay.constraints.username.Size.message}")
	@UniqueUsername
	@JsonView(Views.Base.class)
	private String username;

	@NotNull(message = "{tokay.constraints.displayName.NotNull.message}")
	@Size(min = 4, max = 30, message = "{tokay.constraints.displayName.Size.message}")
	@JsonView(Views.Base.class)
	private String displayName;

	@NotNull(message = "{tokay.constraints.password.NotNull.message}")
	@Size(min = 8, message = "{tokay.constraints.password.Size.message}")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message = "{tokay.constraints.password.Pattern.message}")
	private String password;

	@JsonView(Views.Base.class)
	private String image;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
