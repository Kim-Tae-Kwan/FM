package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.dto.MenuDto.MenuCreate;
import com.biz.fm.domain.entity.Menu;

@Mapper
public interface MenuRepository {
	@Select("SELECT * FROM menu WHERE delete_date is null")
	public List<Menu> findAll();
	
	@Select("SELECT * FROM menu WHERE id = #{id} and delete_date is null")
	public Menu findById(String id);
	
	@Select("SELECT * FROM menu WHERE business_number = #{businessNumber} and delete_date is null")
	public List<Menu> findBybusinessNumber(String businessNumber);
	
	@Insert("INSERT INTO menu VALUES (#{id}, #{name}, #{price}, #{description}, #{imagePath}, #{businessNumber}, now(), null)")
	public int insert(MenuCreate menu);
	
	@Update("UPDATE menu SET name = #{name}, price = #{price}, description = #{description}, image_path = #{imagePath} WHERE id = #{id}")
	public int update(Menu menu);
	
	@Update("UPDATE menu SET delete_Date = now() WHERE id = #{id}")
	public int delete(String id);
}
