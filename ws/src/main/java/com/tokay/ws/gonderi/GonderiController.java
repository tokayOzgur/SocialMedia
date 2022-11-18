package com.tokay.ws.gonderi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tokay.ws.shared.GenericResponse;

@RestController
public class GonderiController {

	@Autowired
	GonderiService gonderiService;

	@PostMapping("/api/1.0/gonderi")
	GenericResponse saveGonderi(@RequestBody Gonderi gonderi) {
		gonderiService.save(gonderi);
		return new GenericResponse("Gonderi is saved.");
	}
}
