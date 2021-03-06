package com.shiftplan.ws.shared;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;


@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { ProfileImageValidator.class })
public @interface ProfileImage {
	
	String message() default "{shiftplan.constraint.ProfileImage.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };


}
