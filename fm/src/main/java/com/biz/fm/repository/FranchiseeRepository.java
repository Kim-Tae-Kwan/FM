package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
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
import com.biz.fm.domain.entity.Franchisee;

@Mapper
public interface FranchiseeRepository{
	
	@Select("SELECT *, member.name as member_name FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "WHERE ST_DISTANCE_SPHERE(POINT(#{longitude}, #{latitude}), POINT(x, y)) <= #{radius};")
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
			@Result(property = "owner", column = "owner_id", one = @One(resultMap = "com.biz.fm.repository.MemberRepository.MemberEntityMap")),
			@Result(property = "address", column = "address_id", one = @One(resultMap = "com.biz.fm.repository.AddressRepository.AddressEntityMap"))
		})
	public List<Franchisee> findAllByDistance(double longitude, double latitude, int radius);
	
	@Select("SELECT *, member.name as member_name FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "WHERE owner_id = #{memberId} ")
	@ResultMap("FranchiseeEntityMap")
	public List<Franchisee> findAllByMemberId(String memberId);
	
	@Select("SELECT *, member.name as member_name FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "ORDER BY franchisee.name "
			+ "LIMIT #{offset}, #{rowsNum} ")
	@ResultMap("FranchiseeEntityMap")
	public List<Franchisee> findAllByPage(int offset, int rowsNum);
	
	@Select("SELECT *, member.name as member_name FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "WHERE franchisee.name like CONCAT('%', #{bsnsNm}, '%') "
			+ "ORDER BY franchisee.name "
			+ "LIMIT #{offset}, #{rowsNum} ")
	@ResultMap("FranchiseeEntityMap")
	public List<Franchisee> findAllByPageWithBusinessName(int offset, int rowsNum, String bsnsNm);
	
	@Select("SELECT *, member.name as member_name FROM franchisee "
			+ "JOIN address ON franchisee.address_id = address.id "
			+ "JOIN member ON franchisee.owner_id = member.id "
			+ "WHERE business_number = #{businessNumber} ")
	@ResultMap("FranchiseeEntityMap")
	public Franchisee findByBusinessNumber(String businessNumber);
	
	@Select("SELECT hours FROM franchisee WHERE business_number = #{businessNumber}")
	public String findHoursByBusinessNumber(String businessNumber);
	
	
	@Select("SELECT EXISTS(SELECT 1 FROM franchisee WHERE business_number = #{businessNumber})")
	public boolean checkBusinessNumberExists(String businessNumber);
	
	@Insert("INSERT INTO franchisee VALUES (#{fc.businessNumber}, #{fc.name}, #{fc.firstImg}, "
			+ "#{fc.address.id}, #{fc.x}, #{fc.y}, #{fc.tel}, #{fc.ownerId}, #{fc.intro}, #{hours}, "
			+ "now(), null)")
	public int insert(@Param("fc") FranchiseeCreate franchiseeCreate, @Param("hours") String hours);
	
	@Update("UPDATE franchisee SET name = #{name}, first_img = #{firstImg}, "
			+ "x = #{x}, y = #{y}, tel = #{tel}, intro = #{intro}, "
			+ "hours = #{hours} WHERE business_number = #{businessNumber}")
	public int update(Franchisee franchisee);
	
	@Delete("Delete FROM franchisee WHERE business_number = #{businessNumber}")
	public int delete(String businessNumber);
}
