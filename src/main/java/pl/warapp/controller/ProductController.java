package pl.warapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.warapp.model.Product;
import pl.warapp.repository.ProductRepository;

@RestController
public class ProductController {
	
	private ProductRepository productRepository;
	
	@Autowired
	public void setProductRepository(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	
	//lista wszystkich produktów
	@GetMapping("/products")
	public List<Product> getProducts() {
		return productRepository.findAll();
	}
	

	
	

}





// wsyzstkie prodkuty show
// get i post mapping dla produktow
// post admin
// get strona glowna
// po zalogowaniu - dodanie do koszyka, dodanie opinie, oceny 
