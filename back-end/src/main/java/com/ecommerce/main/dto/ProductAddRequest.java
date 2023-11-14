package com.ecommerce.main.dto;

import com.ecommerce.main.Model.Product;
import lombok.Data;
import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
public class ProductAddRequest {

    private int id;

    private String name;

    private String description;

    private BigDecimal price;

    private int quantity;

    private int categoryId;

    private int sellerId;

    private MultipartFile image1;


    public static Product toEntity(ProductAddRequest dto) {
        Product entity = new Product();
        BeanUtils.copyProperties(dto, entity, "image1", "categoryId", "sellerId");
        return entity;
    }

}