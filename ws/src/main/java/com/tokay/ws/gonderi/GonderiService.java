package com.tokay.ws.gonderi;

import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class GonderiService {

	GonderiRepository gonderiRepository;

	public GonderiService(GonderiRepository gonderiRepository) {
		this.gonderiRepository = gonderiRepository;
	}

	public void save(Gonderi gonderi) {
		gonderi.setTimestamp(new Date());
		gonderiRepository.save(gonderi);

	}
}
