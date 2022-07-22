package com.biz.fm.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class AppTokenDto {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class NewAccessToken{
		private String accessToken;
		private String refreshToken;
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class UpdateInfo{
		private String appId;
		private String accessToken;
		private String refreshToken;
	}
}
