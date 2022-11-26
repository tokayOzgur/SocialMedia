package com.tokay.ws.gonderi;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tokay.ws.user.User;

public interface GonderiRepository extends JpaRepository<Gonderi, Long> {

	Page<Gonderi> findByUser(User user, Pageable page);

	Page<Gonderi> findByIdLessThan(long id, Pageable page);

	Page<Gonderi> findByIdLessThanAndUser(long id, User user, Pageable page);

}
