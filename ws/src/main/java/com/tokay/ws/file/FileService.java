package com.tokay.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tokay.ws.configuration.AppConfiguration;

@Service
@EnableScheduling
public class FileService {

	AppConfiguration appConfiguration;
	Tika tika;
	FileAttachmentRepository repo;

	public FileService(AppConfiguration appConfiguration, FileAttachmentRepository repo) {
		super();
		this.appConfiguration = appConfiguration;
		this.tika = new Tika();
		this.repo = repo;
	}

	public String writeBase64EncodeStringToFile(String image) throws IOException {
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getUploadPath() + "/" + fileName);
		byte[] base64encoded = Base64.getDecoder().decode(image);
		OutputStream os = new FileOutputStream(target);
		os.write(base64encoded);
		os.close();
		return fileName;
	}

	public String generateRandomName() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	public void deleteFile(String oldImageName) {
		if (oldImageName == null) {
			return;
		}
		try {
			Files.deleteIfExists(Paths.get(appConfiguration.getUploadPath(), oldImageName));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String detectType(String value) {
		byte[] base64encoded = Base64.getDecoder().decode(value);
		return tika.detect(base64encoded);
	}

	public FileAttachment saveGonderiAtachment(MultipartFile multipartFile) {
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getUploadPath() + "/" + fileName);
		OutputStream os;
		try {
			os = new FileOutputStream(target);
			os.write(multipartFile.getBytes());
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		FileAttachment attachment = new FileAttachment();
		attachment.setName(fileName);
		attachment.setDate(new Date());
		return repo.save(attachment);
	}

	@Scheduled(fixedRate = 24 * 60 * 60 * 1000)
	public void cleanupStorage() {
		Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));
		List<FileAttachment> filesToBeDeleted = repo.findByDateBeforeAndGonderiIsNull(twentyFourHoursAgo);
		for (FileAttachment file : filesToBeDeleted) {
			deleteFile(file.getName());
			repo.deleteById(file.getId());
		}

	}
}
