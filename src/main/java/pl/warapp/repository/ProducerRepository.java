package pl.warapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.warapp.model.Producer;

@Repository
public interface ProducerRepository extends JpaRepository<Producer, String> {

}
