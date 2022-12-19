package com.tokay.ws.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "tokay")
public class AppConfiguration {

	private String uploadPath;

	private String profileStroge = "profile";

	private String attachmentStorage = "attachments";

	public String getProfileStoragePath() {
		return uploadPath + "/" + profileStroge;
	}

	public String getAttachmentStoragePath() {
		return uploadPath + "/" + attachmentStorage;
	}
}
