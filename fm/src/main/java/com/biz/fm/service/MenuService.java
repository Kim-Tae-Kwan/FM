package com.biz.fm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.MenuDto.MenuCreate;
import com.biz.fm.domain.dto.MenuDto.MenuRead;
import com.biz.fm.domain.dto.MenuDto.MenuUpdate;
import com.biz.fm.domain.entity.Menu;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

	private final MenuRepository menuRepository;
	
	public List<MenuRead> getList() throws NotFoundException{
		List<Menu> menus = menuRepository.findAll();
		if(menus.size() == 0) throw new NotFoundException(null);
		
		List<MenuRead> menusReads = new ArrayList<>();
		for(Menu menu : menus) {
			menusReads.add(menu.toMenuRead());
		}
		return menusReads;
	}
	
	public MenuRead getMenu(String memberId) throws NotFoundException {
		Menu menu = menuRepository.findById(memberId);
		if(menu == null) throw new NotFoundException(null);
		return menu.toMenuRead();
	}
	
	public MenuRead insertMenu(MenuCreate menu) {
		menu.setId(UUID.randomUUID().toString().replace("-", ""));
		
		int result = menuRepository.insert(menu);
		if(result > 0) {
			return menuRepository.findById(menu.getId()).toMenuRead();
		}
		else throw new InsertFailException();
	}
	
	public MenuRead updateMenu(String menuId, MenuUpdate menu) {
		Menu oldMenu = menuRepository.findById(menuId);
		if(oldMenu == null) throw new UpdateFailException();
		
		Menu newMenu = oldMenu.patch(menu);
		
		int result = menuRepository.update(newMenu);
		if(result > 0) {
			return menuRepository.findById(menuId).toMenuRead();
		}
		else throw new UpdateFailException();
	}

	public MenuRead deleteMenu(String id) {
		Menu menu = menuRepository.findById(id);
		if(menu == null) throw new DeleteFailException();
		
		int result = menuRepository.delete(id);
		if(result > 0) {
			return menu.toMenuRead();
		}
		else throw new DeleteFailException();
	}

}
