package com.ecommerce.main.dto;



import com.ecommerce.main.Model.Address;
import com.ecommerce.main.Model.User;
import org.springframework.beans.BeanUtils;



import lombok.Data;

@Data
public class UserDto {

    private int id;

    private String firstName;

    private String lastName;

    private String emailId;

    private String phoneNo;

    private String role;

    private Address address;

    private UserDto seller;

    private String status;

    public static UserDto toUserDtoEntity(User user) {
        UserDto userDto =new UserDto();
        BeanUtils.copyProperties(user, userDto, "seller");
        return userDto;
    }

}
