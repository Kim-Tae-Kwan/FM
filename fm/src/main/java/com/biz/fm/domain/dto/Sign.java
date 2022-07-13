package com.biz.fm.domain.dto;

import java.sql.Date;

import com.biz.fm.domain.entity.Address;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class Sign {
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class In {

		private String email;
		private String password;
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Out {

		private String email;
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Up {

		private String name;
		private String email;
		private String password;
		private String phoneNumber;
		@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
		private Date birth;
		private String gender;
		private Address address;
	}

}
