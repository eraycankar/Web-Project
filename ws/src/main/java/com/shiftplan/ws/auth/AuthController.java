package com.shiftplan.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.shiftplan.ws.shared.CurrentUser;

import com.shiftplan.ws.user.User;
import com.shiftplan.ws.user.UserRepository;
import com.shiftplan.ws.user.vm.UserVM;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;


	@PostMapping("/api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user) {
		return new UserVM(user);
	}

}
