package com.biz.fm.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExceptionResponse {
	private String message;
	private Integer status;
	private String code;
	
	public ExceptionResponse(ErrorCode errorCode) {
		this.message = errorCode.getMessage();
		this.status = errorCode.getStatus().value();
		this.code = errorCode.getCode();
	}
	
	public ExceptionResponse(ErrorCode errorCode, String message) {
		this.message = message;
		this.status = errorCode.getStatus().value();
		this.code = errorCode.getCode();
	}
}
