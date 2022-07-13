package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageCreate;
import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageUpdate;
import com.biz.fm.domain.entity.Franchiseeimage;

@Mapper
public interface FranchiseeimageRepository{
	@Select("SELECT * FROM franchisee_image WHERE delete_date is null")
	public List<Franchiseeimage> findAll();
	
	@Select("SELECT * FROM franchisee_image WHERE business_number = #{businessNumber} AND delete_date is null")
	public List<Franchiseeimage> findAllByBusinessNumber(String businessNumber);
	
	@Select("SELECT * FROM franchisee_image WHERE id = #{id} AND delete_date is null")
	public Franchiseeimage findById(String id);
	
	@Insert("INSERT INTO franchisee_image VALUES (#{id}, #{businessNumber}, #{path}, #{size}, #{name}, #{type}, now(), null)")
	public int insert(FranchiseeimageCreate fimage);
	
	@Update("UPDATE franchisee_image SET path = #{path}, size = #{size}, name = #{name}, type = #{type} WHERE id = #{id}")
	public int update(Franchiseeimage fimage);
	
	@Update("UPDATE franchisee_image SET delete_date = now() WHERE id = #{id}")
	public int delete(String id);
}
