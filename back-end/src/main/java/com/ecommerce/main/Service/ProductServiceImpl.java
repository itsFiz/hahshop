package com.ecommerce.main.Service;

import com.ecommerce.main.Model.Category;
import com.ecommerce.main.Model.Product;
import com.ecommerce.main.Model.User;
import com.ecommerce.main.Repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Override
    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Product getProductById(int productId) {

        Optional<Product> optionalProduct = productRepo.findById(productId);

        if (optionalProduct.isPresent()) {
            return optionalProduct.get();
        } else {
            return null;
        }

    }

    @Override
    public List<Product> getAllProductByStatusIn(List<String> status) {
        return this.productRepo.findByStatusIn(status);
    }

    @Override
    public Long countByStatusIn(List<String> status) {
        return this.productRepo.countByStatusIn(status);
    }

    @Override
    public Long countByStatusInAndSeller(List<String> status, User seller) {
        return this.productRepo.countByStatusInAndSeller(status, seller);
    }

    @Override
    public List<Product> getAllProductBySellerAndStatusIn(User Seller, List<String> status) {
        return this.productRepo.findBySellerAndStatusIn(Seller, status);
    }

    @Override
    public List<Product> getAllProductBySellerAndCategoryAndStatusIn(User seller, Category category,
                                                                     List<String> status) {
        return this.productRepo.findBySellerAndCategoryAndAndStatusIn(seller, category, status);
    }

    @Override
    public List<Product> updateAllProduct(List<Product> products) {
        return this.productRepo.saveAll(products);
    }

    @Override
    public List<Product> getAllProductByCategoryAndStatusIn(Category category, List<String> status) {
        return this.productRepo.findByCategoryAndStatusIn(category, status);
    }

    @Override
    public List<Product> searchProductNameAndStatusIn(String productName, List<String> status) {

        return this.productRepo.findByNameContainingIgnoreCaseAndStatusIn(productName, status);
    }

    @Override
    public List<Product> searchProductNameAndSellerAndStatusIn(String productName, User seller, List<String> status) {
        return this.productRepo.findByNameContainingIgnoreCaseAndSellerAndStatusIn(productName, seller, status);
    }

}
