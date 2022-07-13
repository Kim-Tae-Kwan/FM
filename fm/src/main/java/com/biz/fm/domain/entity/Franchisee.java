package com.biz.fm.domain.entity;

import java.sql.Timestamp;

import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeRead;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeSummary;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeUpdate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Franchisee {
	private String businessNumber;
	private String name;
	private String firstImg;
	private Address address;
	private Double x;
	private Double y;
	private String tel;
	private Member owner;
	private String intro;
	private String hours;
	private Timestamp createDate;
	private Timestamp deleteDate;
	
	public Franchisee patch(FranchiseeUpdate newFranchisee) {
		
		if(newFranchisee.getName() != null) this.setName(newFranchisee.getName());
		if(newFranchisee.getFirstImg() != null) this.setFirstImg(newFranchisee.getFirstImg());
		if(newFranchisee.getTel() != null) this.setTel(newFranchisee.getTel());
		if(newFranchisee.getIntro() != null) this.setIntro(newFranchisee.getIntro());
		if(newFranchisee.getHours() != null) this.setHours(newFranchisee.getHours());
		
		return this;
	}
	
	public FranchiseeRead toFranchiseeRead() {
		return FranchiseeRead.builder()
				.businessNumber(businessNumber)
				.name(name)
				.firstImg(firstImg)
				.address(address)
				.x(x)
				.y(y)
				.tel(tel)
				.owner(owner.toMemberRead())
				.intro(intro)
				.createDate(createDate)
				.build();
	}
	
	public FranchiseeSummary toFranchiseeSummary() {
		return FranchiseeSummary.builder()
				.businessNumber(businessNumber)
				.name(name)
				.firstImg(firstImg)
				.roadAddress(address.getRoad())
				.jibunAddress(address.getJibun())
				.x(x)
				.y(y)
				.tel(tel)
				.ownerName(owner.getName())
				.intro(intro)
				.build();
	}
}
