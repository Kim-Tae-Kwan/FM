package com.biz.fm.domain.dto;

import java.sql.Timestamp;
import java.util.Date;

import com.biz.fm.domain.entity.Address;
import com.biz.fm.domain.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class MemberDto {
	
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class SignIn{
		private String id;
		private String name;
		private String email;
		private String password;
		private String role;
		private Integer phoneNumber;
		@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
		private Date birth;
		private String gender;
		private String addressId;
	}
	
	@Getter
	@Setter
	public static class safeinfo{
		private String id;
		private String name;
		private String email;
		private Integer phoneNumber;
	}
	
	@Getter
	@Setter
	@Builder
	public static class MemberRead{
		private String id;
		private String name;
		private String email;
		private Integer phoneNumber;
		private String gender;
		private Address address;
		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
		private Timestamp createDate;
	}
	
	@Getter
	@Setter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class MemberUpdate{
		private String role;
		private Integer phoneNumber;
		private String addressId;
		
		public MemberUpdate patch(Member Member) {
			
			if(this.getRole() != null) this.setRole(Member.getRole());
			if(this.getPhoneNumber() != null) this.setPhoneNumber(Member.getPhoneNumber());
			if(this.getAddressId() != null) this.setAddressId(Member.getAddress().getId());
			
			return this;
		}
	}
}
