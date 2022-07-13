package com.biz.fm.domain.entity;

import java.sql.Timestamp;

import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageRead;
import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageUpdate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Franchiseeimage {
	private String id;
	private String businessNumber;
	private String path;
	private Integer size;
	private String name;
	private String type;
	private Timestamp createDate;
	private Timestamp deleteDate;
	
	public Franchiseeimage patch(FranchiseeimageUpdate newFimage) {
		
		if(newFimage.getPath() != null) this.setPath(newFimage.getPath());
		if(newFimage.getSize() != null) this.setSize(newFimage.getSize());
		if(newFimage.getName() != null) this.setName(newFimage.getName());
		if(newFimage.getType() != null) this.setType(newFimage.getType());
		
		return this;
	}
	
	public FranchiseeimageRead toFimageRead() {
		return FranchiseeimageRead.builder()
				.id(id)
				.businessNumber(businessNumber)
				.path(path)
				.size(size)
				.name(name)
				.type(type)
				.createDate(createDate)
				.build();
	}
}
