package com.tokay.ws.user;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author tokay
 *
 */
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);

	boolean existsByUsername(String username);

	Page<User> findByUsernameNot(String username, Pageable page);

	@Transactional
	void deleteByUsername(String usernmae);
}
