package com.ecommerce.main.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNum;
    private String address;
    private String role;

}
