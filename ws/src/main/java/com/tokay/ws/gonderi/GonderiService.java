package com.tokay.ws.gonderi;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.tokay.ws.user.User;
import com.tokay.ws.user.UserService;

@Service
public class GonderiService {

	GonderiRepository gonderiRepository;

	UserService userService;

	public GonderiService(GonderiRepository gonderiRepository, UserService userService) {
		this.gonderiRepository = gonderiRepository;
		this.userService = userService;
	}

	public void save(Gonderi gonderi, User user) {
		gonderi.setTimestamp(new Date());
		gonderi.setUser(user);
		gonderiRepository.save(gonderi);
	}

	public Page<Gonderi> getGonderiler(Pageable page) {
		return gonderiRepository.findAll(page);
	}

	public Page<Gonderi> getGonderilerOfUser(String username, Pageable page) {
		return gonderiRepository.findByUser(userService.getByUsername(username), page);
	}

	public Page<Gonderi> getOldGonderiler(long id, String username, Pageable page) {
		Specification<Gonderi> specification = idLessThan(id);
		if (username != null) {
			specification = specification.and(userIs(userService.getByUsername(username)));
		}
		return gonderiRepository.findAll(specification, page);
	}

	public long getNewGonderiCount(long id, String username) {
		Specification<Gonderi> specification = idGreaterThan(id);
		if (username != null) {
			specification = specification.and(userIs(userService.getByUsername(username)));
		}
		return gonderiRepository.count(specification);
	}

	public List<Gonderi> getNewGonderiler(long id, String username, Sort sort) {
		Specification<Gonderi> specification = idGreaterThan(id);
		if (username != null) {
			specification = specification.and(userIs(userService.getByUsername(username)));
		}
		return gonderiRepository.findAll(specification, sort);
	}

	Specification<Gonderi> idLessThan(long id) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get("id"), id);
	}

	Specification<Gonderi> userIs(User user) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user"), user);
	}

	Specification<Gonderi> idGreaterThan(long id) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get("id"), id);
	}

}
