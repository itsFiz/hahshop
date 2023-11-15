package com.ecommerce.main.dto;

import com.ecommerce.main.Model.Product;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProductResponseDto extends CommonApiResponse {

    private List<Product> products = new ArrayList<>();

}
