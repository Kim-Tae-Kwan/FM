package com.biz.fm.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Address {
	@JsonProperty(access = Access.READ_ONLY)
	private String id;
	private String postalCode;
	private String road;
	private String jibun;
	private String detail;
}
