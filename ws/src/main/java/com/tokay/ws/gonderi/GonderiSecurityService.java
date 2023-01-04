package com.tokay.ws.gonderi;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tokay.ws.user.User;

/**
 * @author tokay
 *
 */

@Service(value = "gonderiSecurity")
public class GonderiSecurityService {

	@Autowired
	GonderiRepository gonderiRepository;

	public boolean isAllowedToDekete(long id, User loggedInUser) {
		Optional<Gonderi> optionalGonderi = gonderiRepository.findById(id);
		if (!optionalGonderi.isPresent()) {
			return false;
		}

		Gonderi gonderi = optionalGonderi.get();
		if (gonderi.getUser().getId() != loggedInUser.getId()) {
			return false;
		}
		return true;
	}
}
