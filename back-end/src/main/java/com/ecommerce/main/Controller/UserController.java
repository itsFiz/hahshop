package com.ecommerce.main.Controller;

import com.ecommerce.main.Exception.UserSaveFailedException;
import com.ecommerce.main.Model.Address;
import com.ecommerce.main.Model.User;
import com.ecommerce.main.Repositories.UserRepo;
import com.ecommerce.main.Service.AddressService;
import com.ecommerce.main.Service.UserService;
import com.ecommerce.main.Utility.Constants.UserStatus;
import com.ecommerce.main.Utility.Constants.UserRole;
import com.ecommerce.main.Utility.JwtUtils;
import com.ecommerce.main.dto.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
@Transactional
public class UserController {

    private final Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/admin/register")
    public ResponseEntity<CommonApiResponse> registerAdmin(@RequestBody RegisterUserRequestDto request) {
        LOG.info("Request received for Register Admin");
        CommonApiResponse response = new CommonApiResponse();
        if (request == null || request.getEmailId() == null || request.getPassword() == null) {
            response.setResponseMessage("Invalid input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        User existingUser = this.userService.getUserByEmailAndStatus(request.getEmailId(), UserStatus.ACTIVE.value());

        if (existingUser != null) {
            response.setResponseMessage("User already registered with this Email");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        User user = RegisterUserRequestDto.toUserEntity(request);
        user.setRole(UserRole.ROLE_ADMIN.value());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(UserStatus.ACTIVE.value());

        existingUser = this.userService.addUser(user);

        if (existingUser == null) {
            response.setResponseMessage("Failed to register admin");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        response.setResponseMessage("Admin registered successfully");
        response.setSuccess(true);

        LOG.info("Response Sent!!!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<CommonApiResponse> registerUser(@RequestBody RegisterUserRequestDto request) {
        LOG.info("Received request for register user");
        CommonApiResponse response = new CommonApiResponse();
        if (request == null || request.getEmailId() == null) {
            response.setResponseMessage("Invalid input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        User existingUser = this.userService.getUserByEmailAndStatus(request.getEmailId(), UserStatus.ACTIVE.value());

        if (existingUser != null) {
            response.setResponseMessage("User with this Email Id already registered!!!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getRole() == null) {
            response.setResponseMessage("Bad request, Role is missing");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        User user = RegisterUserRequestDto.toUserEntity(request);
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setStatus(UserStatus.ACTIVE.value());
        user.setPassword(encodedPassword);

        if (user.getRole().equals(UserRole.ROLE_DELIVERY.value())) {
            User seller = this.userService.getUserById(request.getSellerId());
            if (seller == null) {
                response.setResponseMessage("Seller not found");
                response.setSuccess(false);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            user.setSeller(seller);
        }

        Address address = new Address();
        BeanUtils.copyProperties(request, address);
        Address savedAddress = this.addressService.addAddress(address);
        if (savedAddress == null) {
            throw new UserSaveFailedException("Registration failed because of a technical issue");
        }
        user.setAddress(savedAddress);

        existingUser = this.userService.addUser(user);

        if (existingUser == null) {
            throw new UserSaveFailedException("Registration failed because of a technical issue");
        }

        response.setResponseMessage("User registered successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
        LOG.info("Received request for User Login");
        UserLoginResponse response = new UserLoginResponse();
        if (userLoginRequest == null) {
            response.setResponseMessage("Missing input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        String jwtToken = null;
        User user = null;

        List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(userLoginRequest.getRole()));

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequest.getEmailId(),
                    userLoginRequest.getPassword(), authorities));
        } catch (Exception ex) {
            response.setResponseMessage("Invalid email or password");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        user = this.userService.getUserByEmailAndStatus(userLoginRequest.getEmailId(), UserStatus.ACTIVE.value());

        UserDto userDto = UserDto.toUserDtoEntity(user);

        if (user == null) {
            response.setResponseMessage("User not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        jwtToken = jwtUtils.generateToken(userLoginRequest.getEmailId());

        if (jwtToken != null) {
            response.setUser(userDto);
            response.setResponseMessage("Logged in sucessful");
            response.setSuccess(true);
            response.setJwtToken(jwtToken);
            return new ResponseEntity<UserLoginResponse>(response, HttpStatus.OK);
        }

        else {
            response.setResponseMessage("Failed to login");
            response.setSuccess(false);
            return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/fetch/role-wise")
    public ResponseEntity<UserResponseDto> fetchAllUsersByRole(@RequestParam("role") String role) {

        UserResponseDto response = new UserResponseDto();

        if (role == null) {
            response.setResponseMessage("missing role");
            response.setSuccess(false);
            return new ResponseEntity<UserResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        List<User> users = new ArrayList<>();

        users = this.userService.getUserByRoleAndStatus(role, UserStatus.ACTIVE.value());

        if (users.isEmpty()) {
            response.setResponseMessage("No Users Found");
            response.setSuccess(false);
        }

        List<UserDto> userDtos = new ArrayList<>();

        for (User user : users) {

            UserDto dto = UserDto.toUserDtoEntity(user);

            if (role.equals(UserRole.ROLE_DELIVERY.value())) {

                UserDto sellerDto = UserDto.toUserDtoEntity(user.getSeller());
                dto.setSeller(sellerDto);

            }

            userDtos.add(dto);

        }

        response.setUsers(userDtos);
        response.setResponseMessage("User Fetched Successfully");
        response.setSuccess(true);

        return new ResponseEntity<UserResponseDto>(response, HttpStatus.OK);
    }



    @PutMapping("/update/status")
    public ResponseEntity<CommonApiResponse> updateUserStatus(@RequestBody UserStatusUpdateRequestDto request) {
        LOG.info("Received request for updating the user status");

        CommonApiResponse response = new CommonApiResponse();

        if (request == null) {
            response.setResponseMessage("bad request, missing data");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getUserId() == 0) {
            response.setResponseMessage("bad request, user id is missing");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
        }

        User user = null;
        user = this.userService.getUserById(request.getUserId());

        user.setStatus(request.getStatus());

        User updatedUser = this.userService.updateUser(user);

        if (updatedUser == null) {
            throw new UserSaveFailedException("Failed to update the User status");
        }

        response.setResponseMessage("User " + request.getStatus() + " Successfully!!!");
        response.setSuccess(true);
        return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

    }

    @DeleteMapping("/delete/seller")
    public ResponseEntity<CommonApiResponse> deleteSeller(@RequestParam("sellerId") int sellerId) {
        LOG.info("Received request for Delete Seller");
        CommonApiResponse response = new CommonApiResponse();

        User seller = this.userService.getUserById(sellerId);

        if (seller == null) {
            response.setResponseMessage("Seller not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        if (!seller.getRole().equals(UserRole.ROLE_SELLER.value())) {
            response.setResponseMessage("Invalid seller");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Additional logic for deleting seller

        response.setResponseMessage("Seller deleted successfully");
        response.setSuccess(true);

        LOG.info("Response Sent!!!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Other methods can be added as needed

    // Helper methods can also be defined within this controller
}
