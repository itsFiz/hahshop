package com.ecommerce.main.Config;





import com.ecommerce.main.Model.User;
import com.ecommerce.main.Service.UserService;
import com.ecommerce.main.Utility.Constants.UserStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;



@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = this.userService.getUserByEmailAndStatus(email, UserStatus.ACTIVE.value());

        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        return customUserDetails;

    }
}
