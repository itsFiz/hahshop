package com.ecommerce.main.dto;

import com.ecommerce.main.Model.Cart;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class CartResponseDto extends CommonApiResponse {

    private List<Cart> carts = new ArrayList<>();

    private BigDecimal totalCartAmount = BigDecimal.ZERO;

}
