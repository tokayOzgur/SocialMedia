package com.tokay.ws.gonderi;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tokay.ws.gonderi.vm.GonderiSubmitVM;
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
	GenericResponse saveGonderi(@Valid @RequestBody GonderiSubmitVM gonderi, @CurrentUser User user) {
		gonderiService.save(gonderi, user);
		return new GenericResponse("Gonderi is saved.");
	}

	@GetMapping("/gonderiler")
	Page<GonderiVM> getGonderiler(@PageableDefault(sort = "timestamp", direction = Direction.DESC) Pageable page) {
		return gonderiService.getGonderiler(page).map(GonderiVM::new);
	}

	@GetMapping({ "/gonderiler/{id:[0-9]+}", "/users/{username}/gonderiler/{id:[0-9]+}" })
	ResponseEntity<?> getGonderilerRealitve(
			@PageableDefault(sort = "timestamp", direction = Direction.DESC) Pageable page, @PathVariable long id,
			@PathVariable(required = false) String username,
			@RequestParam(name = "count", required = false, defaultValue = "false") boolean count,
			@RequestParam(name = "direction", defaultValue = "before") String direction) {
		if (count) {
			long newGonderiCount = gonderiService.getNewGonderiCount(id, username);
			Map<String, Long> response = new HashMap<>();
			response.put("count", newGonderiCount);
			return ResponseEntity.ok(response);
		}
		if (direction.equals("after")) {
			List<GonderiVM> newGonderiler = gonderiService.getNewGonderiler(id, username, page.getSort()).stream()
					.map(GonderiVM::new).collect(Collectors.toList());
			return ResponseEntity.ok(newGonderiler);
		}
		return ResponseEntity.ok(gonderiService.getOldGonderiler(id, username, page).map(GonderiVM::new));
	}

	@GetMapping("/users/{username}/gonderiler")
	Page<GonderiVM> getUserGonderiler(@PathVariable String username,
			@PageableDefault(sort = "timestamp", direction = Direction.DESC) Pageable page) {
		return gonderiService.getGonderilerOfUser(username, page).map(GonderiVM::new);
	}
	
	@DeleteMapping("/gonderiler/{id:[0-9+]}")
	@PreAuthorize("@gonderiSecurity.isAllowedToDelete(#id, principal)")
	GenericResponse deleteGonderi(@PathVariable long id) {
		gonderiService.delete(id);
		return new GenericResponse("Gonderi removed");
	}

}
