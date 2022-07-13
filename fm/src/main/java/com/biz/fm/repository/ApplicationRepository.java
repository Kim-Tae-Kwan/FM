package com.biz.fm.repository;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.dto.ApplicationDto.AppDelete;
import com.biz.fm.domain.dto.ApplicationDto.AppIn;
import com.biz.fm.domain.dto.ApplicationDto.AppUpdate;
import com.biz.fm.domain.entity.Application;

@Mapper
public interface ApplicationRepository {
	
	@Select("SELECT * FROM application WHERE id = #{id}")
	public Application findById(String id);

	@Select("SELECT * FROM application WHERE name = #{name}")
	public Application findByName(String name);
	
	@Select("SELECT * FROM application WHERE api_key = #{Key}")
	public Application findByKey(String Key);

	@Insert("INSERT INTO application VALUES "
			+ "(#{id}, #{name}, #{apiKey}, #{memberId})")
	public int insert(AppIn appIn);
	
//	@Update("UPDATE application SET name = #{name} WHERE api_key = #{key}")
//	public int nameUpdate(AppUpdate updateInfo);
	
	@Update("UPDATE application SET name = #{name} WHERE member_id = #{memberId}")
	public int nameUpdate(AppUpdate updateName);
	
	@Update("UPDATE application SET api_key = #{key} WHERE name = #{name}")
	public int keyUpdate(AppUpdate updateInfo);

	@Delete("DELETE FROM application WHERE name = #{name}")
	public int delete(String name);

}
