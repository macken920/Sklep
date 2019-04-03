package pl.warapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.warapp.model.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {

}
