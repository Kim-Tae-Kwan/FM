package com.biz.fm.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class EmailPasswordValicationDto {
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class UpdatePassword {
		private String email;
		private String password;
	}

}
