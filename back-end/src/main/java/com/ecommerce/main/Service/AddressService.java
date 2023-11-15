package com.ecommerce.main.Service;



import com.ecommerce.main.Model.Address;


public interface AddressService {

    Address addAddress(Address address);

    Address updateAddress(Address address);

    Address getAddressById(int addressId);

}
