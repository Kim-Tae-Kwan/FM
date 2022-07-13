package com.biz.fm.controller;

import java.util.List;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeSummary;
import com.biz.fm.domain.dto.MemberDto.MemberRead;
import com.biz.fm.domain.dto.MemberDto.MemberUpdate;
import com.biz.fm.service.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = {"4. Member"})
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberContoller {

	private final MemberService memberService;
	
//	@GetMapping("/{memberId}")
//	@ApiOperation(value = "유저 조회", notes = "유저 id를 통해 유저 조회한다.")
//	public ResponseEntity<MemberRead> get(@ApiParam(value = "유저 id", required = true) @PathVariable String memberId) throws NotFoundException{
//		return ResponseEntity.ok(memberService.getMemberById(memberId));
//	}
	
	@GetMapping("/{memberId}/franchisee")
	@ApiOperation(value = "가맹점 조회", notes = "사용자 id로 가맹점을 조회한다.")
	public ResponseEntity<List<FranchiseeSummary>> getByMemberId(@ApiParam(value = "유저 아이디", required = true) @PathVariable String memberId) throws NotFoundException{
		return ResponseEntity.ok(memberService.findFranchiseeByMemberId(memberId));
	}
	
	@PutMapping("/{memberId}")
	@ApiOperation(value = "유저 수정", notes = "유저 정보를 수정한다.")
	public ResponseEntity<MemberRead> update(@ApiParam(value = "유저 id", required = true) @PathVariable String memberId, 
											  @ApiParam(value = "유저 수정 정보", required = true) @RequestBody MemberUpdate memberUpdate){
		return ResponseEntity.ok(memberService.update(memberId, memberUpdate)); 
	}
	
	@DeleteMapping("/{memberId}")
	@ApiOperation(value = "유저 삭제", notes = "유저를 삭제한다.")
	public ResponseEntity<MemberRead> delete(@ApiParam(value = "유저 id", required = true) @PathVariable String memberId){
		return ResponseEntity.ok(memberService.delete(memberId));
	}
}
