package com.tokay.ws.auth;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author tokay
 *
 */
public interface TokenRepository extends JpaRepository<Token, String>{

}
