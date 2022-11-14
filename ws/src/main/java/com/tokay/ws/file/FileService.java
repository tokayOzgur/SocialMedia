package com.tokay.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tokay.ws.configuration.AppConfiguration;

@Service
public class FileService {

	@Autowired
	AppConfiguration appConfiguration;

	public String writeBase64EncodeStringToFile(String image) throws IOException {
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getUploadPath() + "/" + fileName);
		OutputStream os = new FileOutputStream(target);
		try {
			byte[] base64encoded = Base64.getDecoder().decode(image);
			os.write(base64encoded);
		} finally {
			os.close();
		}

		return fileName;
	}

	public String generateRandomName() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public void deleteOldImage(String oldImageName) {
		if (oldImageName == null) {
			return;
		}
		try {
			Files.deleteIfExists(Paths.get(appConfiguration.getUploadPath(), oldImageName));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
