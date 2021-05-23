package com.shiftplan.ws.user.vm;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.shiftplan.ws.user.User;

import lombok.Data;

@Data
public class UserVM {
	
	private String username;
	
	private String email;
	
	private String image;
	
	public UserVM(User user) {
		this.setUsername(user.getUsername());
		this.setEmail(user.getEmail());
		this.setImage(user.getImage());
	}

}
