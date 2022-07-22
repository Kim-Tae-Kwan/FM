package com.biz.fm.controller;

import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.biz.fm.domain.dto.FileDataDto.FileDataResponse;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeCreate;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeResponse;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeUpdate;
import com.biz.fm.domain.dto.MenuDto.MenuCreate;
import com.biz.fm.domain.dto.MenuDto.MenuResponse;
import com.biz.fm.service.FranchiseeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = {"2. Franchisee"})
@RestController
@RequestMapping("/api/v1/franchisee")
@RequiredArgsConstructor
@CrossOrigin
@Validated
public class FranchiseeController {
	
	private final FranchiseeService franchiseeService;
	
	@GetMapping(params = {"longitude", "latitude", "radius"})
	@ApiOperation(value = "반경으로 가맹점 조회", notes = "위도, 경도, 반경으로 가맹점을 조회한다.")
	public ResponseEntity<List<FranchiseeResponse>> findAllByDistance(@ApiParam(value = "경도", required = true) @RequestParam @Min(-180) @Max(180) Double longitude, 
																	@ApiParam(value = "위도", required = true) @RequestParam @Min(-90) @Max(90) Double latitude, 
																	@ApiParam(value = "반경") @RequestParam(required = false, defaultValue = "200") Integer radius) throws NotFoundException{
		 return ResponseEntity.ok(franchiseeService.findAllByDistance(longitude, latitude, radius));
	}
	
	@GetMapping("/{businessNumber}")
	@ApiOperation(value = "가맹점 조회", notes = "사업자 번호로 가맹점을 조회한다.")
	public ResponseEntity<FranchiseeResponse> findByBusinessNumber(@ApiParam(value = "사업자 번호( '-' 제외 )", required = true) @Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.")
													@PathVariable String businessNumber) throws NotFoundException{
		return ResponseEntity.ok(franchiseeService.findByBusinessNumber(businessNumber));
	}
	
	@GetMapping("/{businessNumber}/menus")
	@ApiOperation(value = "가맹점 메뉴 조회", notes = "사업자 번호를 통해 메뉴를 조회한다.")
	public ResponseEntity<List<MenuResponse>> findMenuAllByBusinessNumber(@ApiParam(value = "사업자 번호", required = true) @Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.")
													@PathVariable String businessNumber) throws NotFoundException{
		return ResponseEntity.ok(franchiseeService.findMenuByBusinessNumber(businessNumber));
	}
	
	@GetMapping("/{businessNumber}/images")
	@ApiOperation(value = "가맹점 이미지 조회", notes = "가맹점에 등록된 모든 이미지를 조회한다.")
	public ResponseEntity<List<FileDataResponse>> findImageByBusinessNumber(@ApiParam(value = "사업자 번호", required = true) @Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.")
																		  			@PathVariable String businessNumber) throws NotFoundException{
		return ResponseEntity.ok(franchiseeService.findImageAllByBusinessNumber(businessNumber));
	}
	
	@GetMapping("/{businessNumber}/schedule")
	@ApiOperation(value = "가맹점 영업시간 조회", notes = "사업자 번호로 영업시간을 조회한다.")
	public ResponseEntity<?> findHoursByBusinessNumber(@ApiParam(value = "사업자 번호", required = true) 
														@Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.")
														@PathVariable String businessNumber) throws JsonMappingException, JsonProcessingException, NotFoundException{
		return ResponseEntity.ok(franchiseeService.findHoursByBusinessNumber(businessNumber));
	}
	
	@GetMapping("/{businessNumber}/check")
	@ApiOperation(value = "사업자 번호 중복 체크", notes = "사업자 번호 중복 체크한다.")
	public ResponseEntity<?> checkBusinessNumber(@ApiParam(value = "사업자 번호", required = true) 
												  @Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.")
												  @PathVariable String businessNumber){
		return ResponseEntity.ok(franchiseeService.checkBusinessNumber(businessNumber));
	}
	
	@PostMapping
	@ApiOperation(value = "가맹점 등록", notes = "가맹점을 등록한다.")
	public ResponseEntity<FranchiseeResponse> createFranchisee(@ApiParam(value = "가맹점 정보", required = true)  
													  @Validated @RequestBody FranchiseeCreate franchiseeCreate) throws JsonMappingException, JsonProcessingException{
		return ResponseEntity.ok(franchiseeService.insertFranchisee(franchiseeCreate));
	}
	
	@PostMapping("/{businessNumber}/menu")
	@ApiOperation(value = "메뉴 등록", notes = "메뉴를 등록한다.")
	public ResponseEntity<?> insertMenu(@ApiParam(value = "사업자 번호", required = true) @Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.")
										 @PathVariable String businessNumber,
										 @ApiParam(value = "메뉴 정보", required = true) @Validated  
										 @RequestBody MenuCreate menuCreate){
		return ResponseEntity.ok(franchiseeService.insertMenu(businessNumber, menuCreate));
	}
	
	@PostMapping("/{businessNumber}/image/{imageId}")
	@ApiOperation(value = "가맹점 이미지 등록", notes = "가맹점 이미지를 등록한다.")
	public ResponseEntity<?> insertFranchiseeImage(@ApiParam(value = "사업자 번호", required = true) @Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.")
													@PathVariable String businessNumber,
													@ApiParam(value = "메뉴 정보", required = true) @Size(min = 32, max = 32, message = "이미지 아이디는 10 자리여야 합니다.")
													@PathVariable String imageId){
		return ResponseEntity.ok(franchiseeService.insertFranchiseeImage(businessNumber, imageId));
	}
	
	@PutMapping("/{businessNumber}")
	@ApiOperation(value = "가맹점 수정", notes = "가맹점을 수정한다.")
	public ResponseEntity<FranchiseeResponse> updateFranchisee(@ApiParam(value = "사업자 번호", required = true) @Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.") 
													  @PathVariable String businessNumber,
												      @ApiParam(value = "가맹점 수정 정보", required = true) @Validated  
													  @RequestBody FranchiseeUpdate franchiseeUpdate) throws JsonMappingException, JsonProcessingException{
		return ResponseEntity.ok(franchiseeService.update(businessNumber, franchiseeUpdate));
	}
	
	@DeleteMapping("/{businessNumber}")
	@ApiOperation(value = "가맹점 삭제", notes = "가맹점을 삭제한다.")
	public ResponseEntity<FranchiseeResponse> delete(@ApiParam(value = "사업자 번호", required = true) @Size(min = 10, max = 10, message = "사업자 번호는 10 자리여야 합니다.")
													  @PathVariable String businessNumber) {
		return ResponseEntity.ok(franchiseeService.delete(businessNumber));
	}
}
