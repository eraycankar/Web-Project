package com.shiftplan.ws.shared;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.shiftplan.ws.file.FileService;

public class ProfileImageValidator implements ConstraintValidator<ProfileImage,String> {

	@Autowired
	FileService fileService;
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if(value == null || value.isEmpty()) {
			return true;
		}
		String fileType = fileService.detectType(value);
		if(fileType.equalsIgnoreCase("image/jpeg" )|| fileType.equalsIgnoreCase("image/png") || fileType.equalsIgnoreCase("image/jpg")){
			return true;
		}
		
		return false;
	}

}
