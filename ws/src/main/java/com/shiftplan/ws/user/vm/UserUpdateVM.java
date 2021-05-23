package com.shiftplan.ws.user.vm;

import javax.validation.constraints.Email;

import com.shiftplan.ws.shared.ProfileImage;

import lombok.Data;

@Data
public class UserUpdateVM
{
	@Email
	private String email;
	@ProfileImage
	private String image;

}
