package com.ecommerce.main.Service;


import com.ecommerce.main.Model.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category);

    Category updateCategory(Category category);

    Category getCategoryById(int category);

    List<Category> getCategoriesByStatusIn(List<String> status);

}