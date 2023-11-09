package com.ecommerce.main.Repositories;

import com.ecommerce.main.Model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Integer> {
}
