package com.tokay.ws.error;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

/**
 * @author tokay
 *
 */
@RestController
@RequestMapping("/error")
public class ErrorHandler implements ErrorController {

	@Autowired
	private ErrorAttributes errorAttributes;

	ApiError handlerError(WebRequest webRequest) {
		@SuppressWarnings("deprecation")
		Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest, true);
		String message = (String) attributes.get("message");
		String path = (String) attributes.get("path");
		int status = (Integer) attributes.get("status");
		return new ApiError(status, message, path);
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}

}
