package com.ecommerce.main.Repositories;



import java.util.List;

import com.ecommerce.main.Model.Category;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CategoryRepo extends CrudRepository<Category, Integer> {

    List<Category> findByStatusIn(List<String> status);

    Long countByStatusIn(List<String> status);

}
