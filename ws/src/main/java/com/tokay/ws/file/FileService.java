package com.tokay.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
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
import com.tokay.ws.user.User;

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
		File target = new File(appConfiguration.getProfileStoragePath() + "/" + fileName);
		OutputStream os = new FileOutputStream(target);

		byte[] base64encoded = Base64.getDecoder().decode(image);

		os.write(base64encoded);
		os.close();
		return fileName;
	}

	public String generateRandomName() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	public void deleteProfileImage(String oldImageName) {
		if (oldImageName == null) {
			return;
		}
		deleteFile(Paths.get(appConfiguration.getProfileStoragePath(), oldImageName));
	}

	public void deleteAttachmentFile(String oldImageName) {
		if (oldImageName == null) {
			return;
		}
		deleteFile(Paths.get(appConfiguration.getAttachmentStoragePath(), oldImageName));
	}

	private void deleteFile(Path path) {
		try {
			Files.deleteIfExists(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String detectType(byte[] arr) {
		return tika.detect(arr);
	}

	public String detectType(String value) {
		byte[] base64encoded = Base64.getDecoder().decode(value);
		return tika.detect(base64encoded);
	}

	public FileAttachment saveGonderiAtachment(MultipartFile multipartFile) {
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getAttachmentStoragePath() + "/" + fileName);
		OutputStream os;
		String fileType = null;
		try {
			byte[] arr = multipartFile.getBytes();
			os = new FileOutputStream(target);
			os.write(arr);
			os.close();
			fileType = detectType(arr);
		} catch (IOException e) {
			e.printStackTrace();
		}
		FileAttachment attachment = new FileAttachment();
		attachment.setName(fileName);
		attachment.setName(fileType);
		attachment.setDate(new Date());
		return repo.save(attachment);
	}

	@Scheduled(fixedRate = 24 * 60 * 60 * 1000)
	public void cleanupStorage() {
		Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));
		List<FileAttachment> filesToBeDeleted = repo.findByDateBeforeAndGonderiIsNull(twentyFourHoursAgo);
		for (FileAttachment file : filesToBeDeleted) {
			deleteAttachmentFile(file.getName());
			repo.deleteById(file.getId());
		}

	}

	public void deleteAllStoredFilesForUser(User user) {
		deleteProfileImage(user.getImage());
		List<FileAttachment> filesToBeRemoved = repo.findByGonderiUser(user);
		for (FileAttachment file : filesToBeRemoved) {
			deleteAttachmentFile(file.getName());
		}
	}
}
