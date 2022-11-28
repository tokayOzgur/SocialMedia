package com.tokay.ws.gonderi;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

	public Page<Gonderi> getOldGonderiler(long id, Pageable page) {
		return gonderiRepository.findByIdLessThan(id, page);
	}

	public Page<Gonderi> getOldGonderilerOfUser(long id, String username, Pageable page) {
		return gonderiRepository.findByIdLessThanAndUser(id, userService.getByUsername(username), page);
	}

	public long getNewGonderiCount(long id) {
		return gonderiRepository.countByIdGreaterThan(id);
	}

	public long getNewGonderiCountOfUser(long id, String username) {
		return gonderiRepository.countByIdGreaterThanAndUser(id, userService.getByUsername(username));
	}

	public List<Gonderi> getNewGonderi(long id, Sort sort) {
		return gonderiRepository.findByIdGreaterThan(id, sort);
	}

	public List<Gonderi> getNewGonderilerOfUser(long id, String username, Sort sort) {
		return gonderiRepository.findByIdGreaterThanAndUser(id, userService.getByUsername(username), sort);
	}
}
