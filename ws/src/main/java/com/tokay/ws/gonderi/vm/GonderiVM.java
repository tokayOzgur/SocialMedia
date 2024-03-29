package com.tokay.ws.gonderi.vm;

import com.tokay.ws.file.vm.FileAttachmentVM;
import com.tokay.ws.gonderi.Gonderi;
import com.tokay.ws.user.vm.UserVM;

import lombok.Data;

@Data
public class GonderiVM {

	private long id;

	private String content;

	private Long timestamp;

	private UserVM user;

	private FileAttachmentVM fileAttachment;

	public GonderiVM(Gonderi gonderi) {
		this.setId(gonderi.getId());
		this.setContent(gonderi.getContent());
		this.setTimestamp(gonderi.getTimestamp().getTime());
		this.setUser(new UserVM(gonderi.getUser()));
		if (gonderi.getFileAttachment() != null) {
			this.fileAttachment = new FileAttachmentVM(gonderi.getFileAttachment());
		}
	}
}
