package com.biz.fm.exception;

import java.text.ParseException;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.EmailDuplicationException;
import com.biz.fm.exception.custom.ExpiredJwtException;
import com.biz.fm.exception.custom.ForbiddenException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.InvalidEmailException;
import com.biz.fm.exception.custom.InvalidPasswordException;
import com.biz.fm.exception.custom.ReLogin;
import com.biz.fm.exception.custom.UnAuthorizationException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.exception.custom.UsernameOrPasswordNotFoundException;

@RestControllerAdvice
public class FmExceptionHandler {
	
	@ExceptionHandler(value = NotFoundException.class)
	public ResponseEntity<?> notFoundException(NotFoundException ex){
		return getResponseEntity(ErrorCode.NOT_FOUND);
	}
	
	@ExceptionHandler(value = EmailDuplicationException.class)
	public ResponseEntity<?> emailDuplicationException(EmailDuplicationException ex){
		return getResponseEntity(ErrorCode.EMAIL_DUPLICATION);
	}
	
	@ExceptionHandler(value = InvalidPasswordException.class)
	public ResponseEntity<?> invalidPasswordException(InvalidPasswordException ex){
		return getResponseEntity(ErrorCode.INVALID_PASSWORD);
	}
	@ExceptionHandler(value = InvalidEmailException.class)
	public ResponseEntity<?> invalidIdException(InvalidEmailException ex){
		return getResponseEntity(ErrorCode.INVALID_EMAIL);
	}
	
	@ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<?> httpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex){
		return getResponseEntity(ErrorCode.METHOD_NOT_ALLOW);
	}
	
	@ExceptionHandler(value = ParseException.class)
	public ResponseEntity<?> parseException(ParseException ex){
		return getResponseEntity(ErrorCode.DATE_PARSE);
	}
	
	@ExceptionHandler(value = InsertFailException.class)
	public ResponseEntity<?> insertFailException(InsertFailException ex){
		return getResponseEntity(ErrorCode.INSERT_FAIL);
	}
	
	@ExceptionHandler(value = UpdateFailException.class)
	public ResponseEntity<?> updateFailException(UpdateFailException ex){
		return getResponseEntity(ErrorCode.UPDATE_FAIL);
	}
	
	@ExceptionHandler(value = DeleteFailException.class)
	public ResponseEntity<?> deleteFailException(DeleteFailException ex){
		return getResponseEntity(ErrorCode.DELETE_FAIL);
	}
	
	@ExceptionHandler(value = UsernameOrPasswordNotFoundException.class)
	public ResponseEntity<?> deleteFailException(UsernameOrPasswordNotFoundException ex){
		return getResponseEntity(ErrorCode.UsernameOrPasswordNotFoundException);
	}
	
	@ExceptionHandler(value = ForbiddenException.class)
	public ResponseEntity<?> deleteFailException(ForbiddenException ex){
		return getResponseEntity(ErrorCode.ForbiddenException);
	}
	
	@ExceptionHandler(value = UnAuthorizationException.class)
	public ResponseEntity<?> deleteFailException(UnAuthorizationException ex){
		return getResponseEntity(ErrorCode.UNAUTHORIZEDException);
	}
	
	@ExceptionHandler(value = ExpiredJwtException.class)
	public ResponseEntity<?> deleteFailException(ExpiredJwtException ex){
		return getResponseEntity(ErrorCode.ExpiredJwtException);
	}
	
	@ExceptionHandler(value = ReLogin.class)
	public ResponseEntity<?> deleteFailException(ReLogin ex){
		return getResponseEntity(ErrorCode.ReLogin);
	}
	
	private ResponseEntity<?> getResponseEntity(ErrorCode errorCode){
		ExceptionResponse exceptionResponse = new ExceptionResponse(errorCode);
		return ResponseEntity.status(exceptionResponse.getStatus()).body(exceptionResponse);
	}
}
