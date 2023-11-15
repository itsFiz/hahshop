package com.ecommerce.main.dto;


import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDetailUpdateRequest {

    private int id;

    private String name;

    private String description;

    private BigDecimal price;

    private int categoryId;

    private int quantity;

}
