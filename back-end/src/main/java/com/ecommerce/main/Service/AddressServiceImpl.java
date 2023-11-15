package com.ecommerce.main.Service;



import java.util.Optional;

import com.ecommerce.main.Model.Address;
import com.ecommerce.main.Repositories.AddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepo;

    @Override
    public Address addAddress(Address address) {
        return addressRepo.save(address);
    }

    @Override
    public Address updateAddress(Address address) {
        return addressRepo.save(address);
    }


    @Override
    public Address getAddressById(int addressId) {
        Optional<Address> optionalAddress = addressRepo.findById(addressId);

        if (optionalAddress.isPresent()) {
            return optionalAddress.get();
        } else {
            return null;
        }

    }

}
