package com.biz.fm.domain.dto;

import java.util.Date;

import com.biz.fm.domain.entity.Address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class SignDto {
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
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
		private Date birth;
		private String gender;
		private Address address;
	}

}
