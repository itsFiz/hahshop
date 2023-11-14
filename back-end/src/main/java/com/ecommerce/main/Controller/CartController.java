package com.ecommerce.main.Controller;

import com.ecommerce.main.Resource.CartResource;
import com.ecommerce.main.dto.CommonApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartResource cartResource;

    @PostMapping("/add")
    @Operation(summary = "Api to add cart")
    public ResponseEntity<CommonApiResponse> addCategory(@RequestBody CartRequestDto request) {
        return cartResource.addToCart(request);
    }

    @PutMapping("/update")
    @Operation(summary = "Api to update cart")
    public ResponseEntity<CartResponseDto> updateCart(@RequestBody CartRequestDto request) {
        return cartResource.updateCart(request);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Api to delete cart")
    public ResponseEntity<CartResponseDto> deleteCart(@RequestBody CartRequestDto request) {
        return cartResource.deleteCart(request);
    }

    @GetMapping("/fetch")
    @Operation(summary = "Api to fetch the user cart")
    public ResponseEntity<CartResponseDto> fetchUserCart(@RequestParam("userId") int userId) {
        return cartResource.fetchUserCartDetails(userId);
    }

}
