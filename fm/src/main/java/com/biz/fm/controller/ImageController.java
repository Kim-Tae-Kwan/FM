package com.biz.fm.controller;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageCreate;
import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageRead;
import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageUpdate;
import com.biz.fm.service.FranchiseeimageService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = {"3. Image"})
@RestController
@RequestMapping("/api/Image")
@RequiredArgsConstructor
public class ImageController {
	
	private final FranchiseeimageService fimageService;
	
//	@GetMapping("/{fimageId}")
//	@ApiOperation(value = "이미지 조회", notes = "이미지 id를 통해 이미지를 조회한다.")
//	public ResponseEntity<FranchiseeimageRead> getByFimageId(@ApiParam(value = "이미지 id", required = true) @PathVariable String fimageId) throws NotFoundException{
//		return ResponseEntity.ok(fimageService.findByFimageId(fimageId));
//	}
//	
//	@PostMapping
//	@ApiOperation(value = "이미지 등록", notes = "이미지를 등록한다.")
//	public ResponseEntity<FranchiseeimageRead> create(@ApiParam(value = "이미지 정보", required = true) @RequestBody FranchiseeimageCreate fimageCreate){
//		return ResponseEntity.ok(fimageService.insert(fimageCreate));
//	}
//	
//	@PutMapping("/{fimageId}")
//	public ResponseEntity<FranchiseeimageRead> update(@PathVariable String fimageId, @RequestBody FranchiseeimageUpdate fimageUpdate){
//		return ResponseEntity.ok(fimageService.update(fimageId, fimageUpdate));
//	}
//	
//	@DeleteMapping("/{fimageId}")
//	@ApiOperation(value = "이미지 삭제", notes = "이미지를 삭제한다.")
//	public ResponseEntity<FranchiseeimageRead> delete(@ApiParam(value = "이미지 id", required = true) @PathVariable String fimageId){
//		return ResponseEntity.ok(fimageService.delete(fimageId));
//	}
	
}
