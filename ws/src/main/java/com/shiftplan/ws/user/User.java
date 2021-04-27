package com.shiftplan.ws.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Transient;
import org.springframework.data.jpa.repository.Modifying;

import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue
	private long id;
	
	@NotNull(message = "{shiftplan.constraint.username.NotNull.message}")
	@Size(min = 4 ,max = 20)
	@UniqueUsername
	private String username;
	
	@Email
	@NotNull(message = "{shiftplan.constraint.email.NotNull.message}")
	private String email;
	
	@NotNull(message = "{shiftplan.constraint.password.NotNull.message}")
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$" ,message = "{shiftplan.constraint.password.Pattern.message}")
	private String password;
	
	@javax.persistence.Transient
	private String passwordRepeat;
	
	

}
