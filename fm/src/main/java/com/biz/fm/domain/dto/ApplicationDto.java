package com.biz.fm.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class ApplicationDto {

	@Getter
	@Setter
	public static class AppCreate{
		private String name;
		private String email;
	}
	
	@Getter
	@Setter
	public static class AppIn{
		private String id;
		private String name;
		private String apiKey;
		private String memberId;
	}
	
	@Getter
	@Setter
	public static class AppUpdateName{
		private String currentName;
		private String newName;
	}
	
	@Getter
	@Setter
	public static class AppUpdateKey{
		private String name;
	}
	
	@Getter
	@Setter
	@Builder
	public static class AppUpdate{
		private String memberId;
		private String name;
		private String key;
		
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@Builder
	public static class AppRead{
		private String appName;
		private String appKey;
	}
	
	@Getter
	@Setter
	public static class AppDelete{
		private String name;
	}
	
}
