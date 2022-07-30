package com.biz.fm.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class AppTokenDto {

	@Getter
	@Setter
	public static class NewAccessToken1{
		private String appKey;
		private String accessToken;
	}
	
	@Getter
	@Setter
	@Builder
	public static class UpdateInfo{
		private String appId;
		private String accessToken;
	}
}
