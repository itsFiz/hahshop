package com.ecommerce.main.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class CartRequestDto {

    private int id;

    private int userId;

    private int productId;

    private int quantity;

}
