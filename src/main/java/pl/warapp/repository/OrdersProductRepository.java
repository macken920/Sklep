package pl.warapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.warapp.model.OrdersProduct;

public interface OrdersProductRepository extends JpaRepository<OrdersProduct, Long> {

}
