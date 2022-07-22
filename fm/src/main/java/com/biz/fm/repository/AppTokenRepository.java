package com.biz.fm.repository;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.dto.AppTokenDto.UpdateInfo;
import com.biz.fm.domain.entity.AppToken;

@Mapper
public interface AppTokenRepository {
	
	@Select("SELECT * FROM app_token WHERE app_id = #{appId}")
	public AppToken findByAppId(String appId);
	
	@Select("SELECT * FROM app_token WHERE access_token = #{accessToken}")
	public AppToken findByAccessToken(String accessToken);
	
	@Select("SELECT * FROM app_token WHERE refresh_token = #{refreshToken}")
	public AppToken findByRefreshToken(String refreshToken);
	
//	@Select("SELECT * FROM app_token WHERE accessToken = #{accessToken} AND refreshToken = #{refreshToken}")
//	public AppToken findByToken(String accessToken, String refreshToken);

	@Insert("INSERT INTO app_token VALUES (#{appId}, #{accessToken}, #{refreshToken})")
	public int insert(AppToken token);
	
	@Update("UPDATE app_token SET access_token = #{accessToken}, refresh_token = #{refreshToken} WHERE app_id = #{appId}")
	public int update(UpdateInfo updateInfo);
	
	@Delete("DELETE FROM app_token WHERE app_id = #{appId}")
	public int delete(String appId);
	
}