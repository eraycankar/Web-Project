package com.shiftplan.ws.user;



import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shiftplan.ws.error.NotFoundException;
import com.shiftplan.ws.file.FileService;
import com.shiftplan.ws.user.vm.UserUpdateVM;

@Service
public class UserService {

	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder;
	
	FileService fileService;
	
	
	//Bir class da sadece 1 tane constructor varsa '@Autowired' yazmaya gerek yok
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,FileService fileService) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
		this.fileService=fileService;
	}

	public void save(User user) {
		String encyrptedPassword = this.passwordEncoder.encode(user.getPassword());
		user.setPassword(encyrptedPassword);
		userRepository.save(user);
		
	}

	public Page<User> getUsers(Pageable page, User user) {
		if(user != null) {
			return userRepository.findByUsernameNot(user.getUsername(), page);
		}
		return userRepository.findAll(page);
	}

	public User getByUsername(String username) {
		User inDB = userRepository.findByUsername(username);
		if(inDB == null) {
			throw new NotFoundException();
		}
		return inDB;
	}

	public User updateUser(String username, UserUpdateVM updatedUser) throws IOException {
		User inDB = getByUsername(username);
		inDB.setEmail(updatedUser.getEmail());
		if(updatedUser.getImage() != null) {
			String oldImageName = inDB.getImage();
			try {
				String storedFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
				inDB.setImage(storedFileName);
			} catch (FileNotFoundException e) {
				
				e.printStackTrace();
			}
			fileService.deleteFile(oldImageName);
		}
		
		return userRepository.save(inDB);
		
	}

	

	
}
