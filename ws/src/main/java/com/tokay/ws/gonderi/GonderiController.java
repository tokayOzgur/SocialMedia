package com.tokay.ws.gonderi;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tokay.ws.gonderi.vm.GonderiVM;
import com.tokay.ws.shared.CurrentUser;
import com.tokay.ws.shared.GenericResponse;
import com.tokay.ws.user.User;

@RestController
@RequestMapping("/api/1.0")
public class GonderiController {

	@Autowired
	GonderiService gonderiService;

	@PostMapping("/gonderi")
	GenericResponse saveGonderi(@Valid @RequestBody Gonderi gonderi, @CurrentUser User user) {
		gonderiService.save(gonderi, user);
		return new GenericResponse("Gonderi is saved.");
	}

	@GetMapping("/gonderiler")
	Page<GonderiVM> getGonderiler(@PageableDefault(sort = "timestamp", direction = Direction.DESC) Pageable page) {
		return gonderiService.getGonderiler(page).map(GonderiVM::new);
	}

	@GetMapping("/gonderiler/{id:[0-9]+}")
	Page<GonderiVM> getGonderilerRealitve(
			@PageableDefault(sort = "timestamp", direction = Direction.DESC) Pageable page, @PathVariable long id) {
		return gonderiService.getOldGonderiler(id, page).map(GonderiVM::new);
	}

	@GetMapping("/users/{username}/gonderiler")
	Page<GonderiVM> getUserGonderiler(@PathVariable String username,
			@PageableDefault(sort = "timestamp", direction = Direction.DESC) Pageable page) {
		return gonderiService.getGonderilerOfUser(username, page).map(GonderiVM::new);
	}

	@GetMapping("/users/{username}/gonderiler/{id:[0-9]+}")
	Page<GonderiVM> getUserGonderilerRelative(@PathVariable long id, @PathVariable String username,
			@PageableDefault(sort = "timestamp", direction = Direction.DESC) Pageable page) {
		return gonderiService.getOldGonderilerOfUser(id, username, page).map(GonderiVM::new);
	}

}
