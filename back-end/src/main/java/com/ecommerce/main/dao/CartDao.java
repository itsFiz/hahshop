package com.ecommerce.main.dao;

import com.ecommerce.main.Model.Cart;
import com.ecommerce.main.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {

    List<Cart> findByUser(User user);

}