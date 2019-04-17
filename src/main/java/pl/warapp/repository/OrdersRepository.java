package pl.warapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.warapp.model.users.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

}
