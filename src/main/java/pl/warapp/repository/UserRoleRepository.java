package pl.warapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.warapp.model.users.UserRole;


public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

}
