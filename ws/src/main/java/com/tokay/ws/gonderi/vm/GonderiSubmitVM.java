package com.tokay.ws.gonderi.vm;

import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class GonderiSubmitVM {

	@Size(min = 1, max = 1000)
	private String content;

	private long attachmentId;

}
