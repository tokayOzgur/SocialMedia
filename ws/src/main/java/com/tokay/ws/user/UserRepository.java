package com.tokay.ws.user;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author tokay
 *
 */
public interface UserRepository extends JpaRepository<User, Long>{

	User findByUsername(String username);
	
	boolean existsByUsername(String username);
}
