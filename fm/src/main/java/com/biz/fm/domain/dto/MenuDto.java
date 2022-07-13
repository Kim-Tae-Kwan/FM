package com.biz.fm.domain.dto;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MenuDto {
	
	@Getter
	@Setter
	@Builder
	public static class MenuRead{
		private String id;
		private String name;
		private String description; 
		private String imagePath;
		private String businessNumber;
		private Integer price;
	}
	
	@Getter
	@Setter
	public static class MenuUpdate{
		private String name;
		private String description; 
		private String imagePath;
		private Integer price;
		
	}
	
	@Getter
	@Setter
	public static class MenuCreate{
		private String id;
		private String name;
		private String description; 
		private String imagePath;
		private String businessNumber;
		private Integer price;
	}
	
	
}
 