package com.ecommerce.main.Repositories;


import java.util.List;

import com.ecommerce.main.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    User findByEmailId(String email);

    User findByEmailIdAndStatus(String email, String status);

    User findByRoleAndStatusIn(String role, List<String> status);

    List<User> findByRole(String role);

    List<User> findBySellerAndRole(User seller, String role);

    List<User> findBySellerAndRoleAndStatusIn(User seller, String role, List<String> status);

    User findByEmailIdAndRoleAndStatus(String emailId, String role, String status);

    List<User> findByRoleAndStatus(String role, String status);

}
