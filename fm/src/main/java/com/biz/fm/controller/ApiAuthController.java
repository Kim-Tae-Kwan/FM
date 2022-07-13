package com.biz.fm.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biz.fm.service.ApiAuthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@Api(tags = {"8. Api Auth"})
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class ApiAuthController{
private final ApiAuthService apiAuthService;
	
    @GetMapping("/check")
    @ApiOperation(value = "토큰 발급", notes = "앱 키를 통해서 토큰을 발급받는다.")
    public ResponseEntity<Object> check(@RequestBody String appKey) throws NotFoundException {
    	Map<String, String> accessToken = apiAuthService.requestToken(appKey);    	
        return ResponseEntity.ok(accessToken);
    }
}
	
