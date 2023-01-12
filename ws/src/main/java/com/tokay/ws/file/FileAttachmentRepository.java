package com.tokay.ws.file;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tokay.ws.user.User;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long> {

	List<FileAttachment> findByDateBeforeAndGonderiIsNull(Date date);
	
	List<FileAttachment> findByGonderiUser(User user);
	
}
