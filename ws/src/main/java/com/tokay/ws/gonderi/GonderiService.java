package com.tokay.ws.gonderi;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	public Page<Gonderi> getGonderiler(Pageable page) {
		return gonderiRepository.findAll(page);
	}
}
