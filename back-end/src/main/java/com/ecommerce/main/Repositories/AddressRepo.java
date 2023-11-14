package com.ecommerce.main.Repositories;


import com.ecommerce.main.Model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AddressRepo extends JpaRepository<Address, Integer> {

}
