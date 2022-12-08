package com.tokay.ws.gonderi;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tokay.ws.user.User;

public interface GonderiRepository extends JpaRepository<Gonderi, Long>, JpaSpecificationExecutor<Gonderi> {

	Page<Gonderi> findByUser(User user, Pageable page);

}
