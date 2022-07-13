package com.biz.fm.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.Sign.In;
import com.biz.fm.domain.entity.Application;
import com.biz.fm.repository.ApplicationRepository;
import com.biz.fm.repository.MemberRepository;
import com.biz.fm.utils.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApiAuthService {
	
	private final ApplicationRepository applicationRepository;
	private final SignService signService;
	private final MemberRepository memberRepository;
	
	public Map<String, String> requestToken(String appKey) throws NotFoundException {
		
		Map<String, String> result = new HashMap<>();
		
		//null 값 처리
		Application app = applicationRepository.findByKey(appKey);
		if(app == null) throw new NotFoundException(null);
		
		//멤버 아이디를 이용해 Sign.In DTO 로 변환  
		In signInInfo = memberRepository.findById(app.getMemberId()).toMemberSignIn();
		
		//토큰을 만들어 반환
		Map<String, String> createToken = signService.createTokenReturn(signInInfo);
		result.put("accessToken", createToken.get("accessToken"));
		result.put("refreshToken", createToken.get("refreshToken"));
				
		return result;
	}
	
	

}
