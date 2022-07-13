package com.biz.fm.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class RefreshTokenDto {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class newAccessToken{
		private String RefreshToken;
	}
	
}
