package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeCreate;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeRead;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeSummary;
import com.biz.fm.domain.entity.Franchisee;

@Mapper
public interface FranchiseeRepository{
	
	@Select("SELECT * FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "WHERE franchisee.delete_date is null")
	@Results(id="FranchiseeEntityMap", value = {
		@Result(property = "businessNumber", column = "business_number"),
		@Result(property = "name", column = "name"),
		@Result(property = "firstImg", column = "first_img"),
		@Result(property = "x", column = "x"),
		@Result(property = "y", column = "y"),
		@Result(property = "tel", column = "tel"),
		@Result(property = "intro", column = "intro"),
		@Result(property = "hours", column = "hours"),
		@Result(property = "createDate", column = "create_date"),
		@Result(property = "deleteDate", column = "delete_date"),
		@Result(property = "owner", column = "owner_id", one = @One(resultMap = "com.biz.fm.repository.MemberRepository.MemberEntityMap")),
		@Result(property = "address", column = "address_id", one = @One(resultMap = "com.biz.fm.repository.AddressRepository.AddressEntityMap"))
	})
	public List<Franchisee> findAll();
	
	@Select("SELECT * FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "WHERE ST_DISTANCE_SPHERE(POINT(#{longitude}, #{latitude}), POINT(x, y)) <= #{radius};")
	@ResultMap("FranchiseeEntityMap")
	public List<Franchisee> findAllByDistance(double longitude, double latitude, int radius);
	
	@Select("SELECT * FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "WHERE business_number = #{businessNumber} "
			+ "AND franchisee.delete_date is null")
	@ResultMap("FranchiseeEntityMap")
	public Franchisee findByBusinessNumber(String businessNumber);
	
	@Select("SELECT *, member.name as member_name FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "WHERE owner_id = #{memberId} "
			+ "AND franchisee.delete_date is null")
	@ResultMap("FranchiseeEntityMap")
	public List<Franchisee> findByMemberId(String memberId);
	
	@Select("SELECT hours FROM franchisee WHERE business_number = #{businessNumber} AND delete_date is null")
	public String findHoursByBusinessNumber(String businessNumber);
	
	@Insert("INSERT INTO franchisee VALUES (#{businessNumber}, #{name}, #{firstImg}, "
			+ "#{address.id}, #{x}, #{y}, #{tel}, #{ownerId}, #{intro}, #{hours}, now(), null)")
	public int insert(FranchiseeCreate franchiseeCreate);
	
	@Update("UPDATE franchisee SET name = #{name}, first_img = #{firstImg}, "
			+ "x = #{x}, y = #{y}, tel = #{tel}, intro = #{intro}, "
			+ "hours = #{hours} WHERE business_number = #{businessNumber}")
	public int update(Franchisee franchisee);
	
	@Update("UPDATE franchisee SET delete_date = now() WHERE business_number = #{businessNumber}")
	public int delete(String businessNumber);
}
