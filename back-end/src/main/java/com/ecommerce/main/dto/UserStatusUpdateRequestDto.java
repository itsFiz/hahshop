package com.ecommerce.main.Dto;



import lombok.Data;

@Data
public class UserStatusUpdateRequestDto {

    private int userId;

    private String status;

}
