package com.biz.fm.exception.custom;

public class FileNotFoundException extends RuntimeException{
	public FileNotFoundException(String message) {
        super(message);
    }

    public FileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
