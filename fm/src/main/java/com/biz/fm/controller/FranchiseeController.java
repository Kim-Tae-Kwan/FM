package com.biz.fm.controller;

import java.util.List;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageRead;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeCreate;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeRead;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeSummary;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeUpdate;
import com.biz.fm.service.FranchiseeimageService;
import com.biz.fm.service.FranchiseeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = {"2. Franchisee"})
@RestController
@RequestMapping("/api/franchisee")
@RequiredArgsConstructor
public class FranchiseeController {
	
	private final FranchiseeService franchiseeService;
	
	@GetMapping
	@ApiOperation(value = "반경으로 가맹점 조회", notes = "위도, 경도, 반경으로 가맹점을 조회한다.")
	public ResponseEntity<List<FranchiseeRead>> getListByDistance(@ApiParam(value = "경도", required = true) @RequestParam Double longitude, 
																	@ApiParam(value = "위도", required = true) @RequestParam Double latitude, 
																	@ApiParam(value = "반경") @RequestParam Integer radius) throws NotFoundException{
		 return ResponseEntity.ok(franchiseeService.findAllByDistance(longitude, latitude, radius));
	}
	
	@GetMapping("/{businessNumber}/images")
	@ApiOperation(value = "가맹점 이미지 조회", notes = "가맹점에 등록된 모든 이미지를 조회한다.")
	public ResponseEntity<List<FranchiseeimageRead>> getByBusinessNumber(@ApiParam(value = "사업자 번호", required = true) @PathVariable String businessNumber) throws NotFoundException{
		return ResponseEntity.ok(franchiseeService.findAllByBusinessNumber(businessNumber));
	}
	
	@GetMapping("/{businessNumber}")
	@ApiOperation(value = "가맹점 조회", notes = "사업자 번호로 가맹점을 조회한다.")
	public ResponseEntity<FranchiseeRead> get(@ApiParam(value = "사업자 번호", required = true) @PathVariable String businessNumber) throws NotFoundException{
		return ResponseEntity.ok(franchiseeService.findByBusinessNumber(businessNumber));
	}
	
	@GetMapping("/{businessNumber}/menus")
	@ApiOperation(value = "가맹점 메뉴 조회", notes = "사업자 번호를 통해 메뉴를 조회한다.")
	public ResponseEntity<?> list(@ApiParam(value = "사업자 번호", required = true) @PathVariable String businessNumber) throws NotFoundException{
		return ResponseEntity.ok(franchiseeService.findMenuByBusinessNumber(businessNumber));
	}
	
	@GetMapping("/{businessNumber}/hours")
	@ApiOperation(value = "가맹점 영업시간 조회", notes = "사업자 번호로 영업시간을 조회한다.")
	public ResponseEntity<?> getHours(@ApiParam(value = "사업자 번호", required = true) @PathVariable String businessNumber) throws JsonMappingException, JsonProcessingException, NotFoundException{
		return ResponseEntity.ok(franchiseeService.findHoursByBusinessNumber(businessNumber));
	}
	
	@PostMapping
	@ApiOperation(value = "가맹점 등록", notes = "가맹점을 등록한다.")
	public ResponseEntity<FranchiseeRead> create(@ApiParam(value = "가맹점 정보", required = true) @RequestBody FranchiseeCreate franchiseeCreate){
		return ResponseEntity.ok(franchiseeService.insert(franchiseeCreate));
	}
	
	@PutMapping("/{businessNumber}")
	@ApiOperation(value = "가맹점 수정", notes = "가맹점을 수정한다.")
	public ResponseEntity<FranchiseeRead> update(@ApiParam(value = "사업자 번호", required = true) @PathVariable String businessNumber,
												  @ApiParam(value = "가맹점 수정 정보", required = true) @RequestBody FranchiseeUpdate franchiseeUpdate){
		return ResponseEntity.ok(franchiseeService.update(businessNumber, franchiseeUpdate));
	}
	
	@DeleteMapping("/{businessNumber}")
	@ApiOperation(value = "가맹점 삭제", notes = "가맹점을 삭제한다.")
	public ResponseEntity<FranchiseeRead> delete(@ApiParam(value = "사업자 번호", required = true) @PathVariable String businessNumber){
		return ResponseEntity.ok(franchiseeService.delete(businessNumber));
	}
}
