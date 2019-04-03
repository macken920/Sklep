package pl.warapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.warapp.model.users.User;


public interface UserRepository extends JpaRepository<User, Long> {

}
