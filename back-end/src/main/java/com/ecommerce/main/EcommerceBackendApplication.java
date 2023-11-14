package com.ecommerce.main;

import com.ecommerce.main.Model.User;
import com.ecommerce.main.Service.UserService;
import com.ecommerce.main.Utility.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class EcommerceBackendApplication implements CommandLineRunner {

	private final Logger LOG = LoggerFactory.getLogger(EcommerceBackendApplication.class);

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(EcommerceBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		User admin = this.userService.getUserByEmailIdAndRoleAndStatus("demo.admin@demo.com",
				Constants.UserRole.ROLE_ADMIN.value(), Constants.UserStatus.ACTIVE.value());

		if (admin == null) {

			LOG.info("Admin not found in system, so adding default admin");

			User user = new User();
			user.setEmailId("demo.admin@demo.com");
			user.setPassword(passwordEncoder.encode("123456"));
			user.setRole(Constants.UserRole.ROLE_ADMIN.value());
			user.setStatus(Constants.UserStatus.ACTIVE.value());

			this.userService.addUser(user);

		}

	}

}