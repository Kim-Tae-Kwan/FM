package com.biz.fm.service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.AppTokenDto.NewAccessToken;
import com.biz.fm.domain.dto.AppTokenDto.UpdateInfo;
import com.biz.fm.domain.entity.AppToken;
import com.biz.fm.domain.entity.Application;
import com.biz.fm.domain.entity.Member;
import com.biz.fm.exception.custom.ExpiredJwtException;
import com.biz.fm.exception.custom.IssudToken;
import com.biz.fm.exception.custom.ReissudToken;
import com.biz.fm.repository.AppTokenRepository;
import com.biz.fm.repository.ApplicationRepository;
import com.biz.fm.repository.MemberRepository;
import com.biz.fm.utils.JwtTokenProvider;
import com.biz.fm.utils.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApiAuthService {

	private final ApplicationRepository applicationRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final AppTokenRepository appTokenRepository;
	private final MemberRepository memberRepository;

	public Map<String, String> requestToken(String appKey) throws NotFoundException, ParseException {

		Map<String, String> resultToken = new HashMap<>();

		// 유효하지 않은 키 값 정리
		Application app = applicationRepository.findByKey(appKey);
		if (app == null) throw new NotFoundException("유효한 키값이 아닙니다.");
		
		// 이미 토큰이 발급되었는지 확인
		AppToken appToken = appTokenRepository.findByAppId(app.getId());
		if(appToken != null) throw new IssudToken();

		Application application = applicationRepository.findByKey(appKey);
		Member member = memberRepository.findById(application.getMemberId());
		
		String accessToken = jwtTokenProvider.ApiAuthCreateAccessToken(app.getId(), member.getEmail()).get("accessToken");
		String refreshToken = jwtTokenProvider.ApiAuthCreateRefreshToken(app.getId(), member.getEmail()).get("refreshToken");

		AppToken resultInfo = AppToken
								.builder()
								.appId(application.getId()).accessToken(accessToken)
								.refreshToken(refreshToken).build();

		// 토큰 데이터베이스에 토큰 정보를 입력하고
		appTokenRepository.insert(resultInfo);
		// member role 추가
		memberRepository.updateRole(member.getId(), Role.ROLE_USER.toString() + "," + Role.ROLE_DEVELOPER.toString());

		// 액세스 토큰에 대한 정보를 리턴해준다.
		resultToken.put("accessToken", resultInfo.getAccessToken());
		resultToken.put("refreshToken", resultInfo.getRefreshToken());

		return resultToken;
	}

	// 새로운 토큰 반환
	public Map<String, String> newAccessToken(NewAccessToken newAccessToken, HttpServletRequest request)
			throws ParseException {

		Map<String, String> result = new HashMap<>();
		
		AppToken appTokenByAccessToken = appTokenRepository.findByAccessToken(newAccessToken.getAccessToken());
		AppToken appTokenByRefreshToken = appTokenRepository.findByRefreshToken(newAccessToken.getRefreshToken());
		
		Application application = applicationRepository.findById(appTokenByRefreshToken.getAppId());
		Member member = memberRepository.findById(application.getMemberId());

		// 토큰이 테이블에 정보가 있지 않은 경우, 올바른 요청이 아니다.
		// 두개의 쿼리를 묶고 싶었지만, 그럴 경우 코드가 죽어버린다.
		if (appTokenByAccessToken == null || appTokenByAccessToken == null) throw new ReissudToken();

		// AccessToken은 만료되었지만 RefreshToken은 만료되지 않은 경우
		if (jwtTokenProvider.validateToken(request, appTokenByRefreshToken.getRefreshToken())) {
			String appId = jwtTokenProvider.getUserInfo(appTokenByRefreshToken.getRefreshToken(), "appId");

			// 엑세스 토큰, 리프레쉬 토큰 모두 발급
			String accessToken = jwtTokenProvider.ApiAuthCreateAccessToken(appId, member.getEmail()).get("accessToken");
			String refreshToken = jwtTokenProvider.ApiAuthCreateRefreshToken(appId, member.getEmail()).get("refreshToken");
			
			UpdateInfo updateInfo = UpdateInfo
										.builder()
										.appId(appId)
										.accessToken(accessToken)
										.refreshToken(refreshToken)
										.build();
			
			appTokenRepository.update(updateInfo);
			
			result.put("accessToken", accessToken);
			result.put("refreshToken", refreshToken);

		// RefreshToken 또한 만료된 경우는 테이블을 날리야 한다.
		} else throw new ExpiredJwtException();
		
		return result;
	}

}
