package com.biz.fm.repository;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.entity.RefreshToken;

@Mapper
public interface TokenRepository {

//	@Select("select * from token")
//	public List<RefreshToken> findAll();
//	
	@Select("select * from token where refreshToken = #{refreshToken}")
	public RefreshToken findByrefreshToken(String refreshToken);
	
	@Select("select * from token where accessToken = #{accessToken}")
	public RefreshToken findByaccessToken(String accessToken);
	
	@Select("select * from token where email = #{email}")
	public RefreshToken findByEmail(String email);
	
	@Insert("insert into token values (#{email}, #{accessToken}, #{refreshToken}, #{refreshTokenExpirationAt})")
	public int insert(RefreshToken token);
	
	@Update("delete from token where email = #{email}")
	public int delete(String email);
	
}
