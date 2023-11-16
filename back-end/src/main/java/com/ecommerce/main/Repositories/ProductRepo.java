package com.ecommerce.main.Repositories;


import com.ecommerce.main.Model.Category;
import com.ecommerce.main.Model.Product;
import com.ecommerce.main.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    List<Product> findByStatusIn(List<String> status);

    List<Product> findBySellerAndStatusIn(User seller, List<String> status);

    List<Product> findBySellerAndCategoryAndAndStatusIn(User seller, Category category, List<String> status);

    List<Product> findByCategoryAndStatusIn(Category category, List<String> status);

    Long countByStatusIn(List<String> status);

    Long countByStatusInAndSeller(List<String> status, User seller);

    List<Product> findByNameContainingIgnoreCaseAndStatusIn(String productName, List<String> status);

    List<Product> findByNameContainingIgnoreCaseAndSellerAndStatusIn(String productName, User seller, List<String> status);

}