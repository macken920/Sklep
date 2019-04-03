package pl.warapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.warapp.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
