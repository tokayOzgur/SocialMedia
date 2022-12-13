package com.tokay.ws.file;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {

	@Autowired
	FileService fileService;

	@PostMapping("api/1.0/gonderi-atachments")
	Map<String, String> saveGonderiAtachment(MultipartFile file) {
		return Collections.singletonMap("name", fileService.saveGonderiAtachment(file));
	}

}
