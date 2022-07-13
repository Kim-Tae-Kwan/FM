package com.biz.fm.domain.dto;

import java.sql.Timestamp;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class FranchiseeImageDto {
	@Getter
	@Setter
	public static class FranchiseeimageCreate{
		private String id;
		private String businessNumber;
		private String path;
		private Integer size;
		private String name;
		private String type;
	}
	
	@Getter
	@Setter
	@Builder
	public static class FranchiseeimageRead{
		private String id;
		private String businessNumber;
		private String path;
		private Integer size;
		private String name;
		private String type;
		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
		private Timestamp createDate;
		
		// domain를 적용하지 않아 접속 마다 IP 달라짐.
		// 접속한 IP 를 추가
		public void setPath(String path) {
			this.path = ServletUriComponentsBuilder.fromCurrentContextPath()
													.path(path)
													.toUriString();
		}
	}
	
	@Getter
	@Setter
	public static class FranchiseeimageUpdate{
		private String path;
		private Integer size;
		private String name;
		private String type;
	}
}
