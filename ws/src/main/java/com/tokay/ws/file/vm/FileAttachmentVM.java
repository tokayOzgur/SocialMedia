package com.tokay.ws.file.vm;

import com.tokay.ws.file.FileAttachment;

import lombok.Data;

@Data
public class FileAttachmentVM {

	private String name;

	public FileAttachmentVM(FileAttachment fileAttachment) {
		this.setName(fileAttachment.getName());
	}

}