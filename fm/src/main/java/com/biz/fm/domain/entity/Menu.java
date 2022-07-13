package com.biz.fm.domain.entity;

import java.sql.Timestamp;

import com.biz.fm.domain.dto.MenuDto.MenuRead;
import com.biz.fm.domain.dto.MenuDto.MenuUpdate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Menu {
	
	private String id;
	private String name;
	private String description; 
	private String imagePath;
	private String businessNumber;
	private Integer price;
	private Timestamp createDate;
	private Timestamp deleteDate;
	
	public Menu patch(MenuUpdate requestMenu) {
		
		if(requestMenu.getName() != null) this.setName(requestMenu.getName());
		if(requestMenu.getPrice() != null) this.setPrice(requestMenu.getPrice());
		if(requestMenu.getDescription() != null) this.setDescription(requestMenu.getDescription());
		if(requestMenu.getImagePath() != null) this.setImagePath(requestMenu.getImagePath());
		
		return this;
	}

	public MenuRead toMenuRead() {
		return MenuRead.builder()
				.id(id)
				.name(name)
				.description(description)
				.imagePath(imagePath)
				.businessNumber(businessNumber)
				.price(price)
				.build();
	}
}
