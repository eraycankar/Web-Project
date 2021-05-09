package com.shiftplan.ws.user;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonView;
import com.shiftplan.ws.shared.Views;

import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3888498990698134524L;

	@Id
	@GeneratedValue
	private long id;
	
	@NotNull(message = "{shiftplan.constraint.username.NotNull.message}")
	@Size(min = 4 ,max = 20)
	@UniqueUsername
	@JsonView(Views.Base.class)
	private String username;
	
	@Email
	@NotNull(message = "{shiftplan.constraint.email.NotNull.message}")
	@JsonView(Views.Base.class)
	private String email;
	
	@NotNull(message = "{shiftplan.constraint.password.NotNull.message}")
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$" ,message = "{shiftplan.constraint.password.Pattern.message}")
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
