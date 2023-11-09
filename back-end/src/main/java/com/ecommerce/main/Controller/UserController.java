package com.ecommerce.main.Controller;

import com.ecommerce.main.Model.User;
import com.ecommerce.main.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/user-list")
    public Iterable<User> personList() {
        return userRepository.findAll();
    }

    @PostMapping("/user-save")
    public User save(@RequestBody User newUser) {
        userRepository.save(newUser);
        return newUser;
    }

    // http://localhost:8080/person-update/10
    @PatchMapping("/user-update/{id}")
    public User update(@RequestBody User newUser, @PathVariable Integer id) {
        Optional<User> opt = userRepository.findById(id); // this return a Person Object in Optional Object
        if (opt.isPresent()) {
            User p = opt.get(); // return the person obj
           p.setFirstName(newUser.getFirstName());
           p.setLastName(newUser.getLastName());
           p.setEmail(newUser.getEmail());
           p.setPassword((newUser.getPassword()));
           p.setAddress(newUser.getAddress());
           p.setPhoneNum(newUser.getPhoneNum());
           p.setRole(newUser.getRole());
            userRepository.save(p);
            return p;
        } else {
            return new User();
        }
    }

    @DeleteMapping("/user-delete/{id}")
    public String delete(@PathVariable Integer id) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isPresent()) {
            // person exist in DB
            User p = opt.get();
            userRepository.delete(p);
            return "ok";
        } else {
            return "user does not exist";
        }
    }

    @GetMapping("/user/{id}")
    public User find(@PathVariable Integer id) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return new User();
        }
    }
}
