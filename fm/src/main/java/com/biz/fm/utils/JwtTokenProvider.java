package com.biz.fm.utils;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.biz.fm.domain.dto.Sign.In;
import com.biz.fm.service.CustomUserDetailService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider { // JWT 토큰을 생성 및 검증 모듈

	private String secretKey = "govlepel@$&";

	//  private long accessExpireTime = (60 * 60 * 1000L) * 1; // 1시간
    private final long accessExpireTime = 10 * 60 * 1000L;   // 10분
    //private long refreshExpireTime =  ((60 * 60 * 1000L) * 24) * 1; // 1일
    private final long refreshExpireTime = 120 * 60 * 1000L;   // 120분

	private final CustomUserDetailService userDetailsService;

	// 객체 초기화, secretKey를 Base64로 인코딩한다.
	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	// Access 토큰 생성
	public String createAccessToken(In signInfo) {
		Map<String, Object> headers = new HashMap<>();
        headers.put("type", "token");
		
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("email", signInfo.getEmail());
		
		Date expiration = new Date();
        expiration.setTime(expiration.getTime() + accessExpireTime);
		
		return Jwts.builder()
				.setHeader(headers)	// 헤더저장
				.setClaims(payloads) // 정보저장
				.setSubject("user")	//
				.setExpiration(expiration)						// set Expire Time
				.signWith(SignatureAlgorithm.HS256, secretKey) 	// 암호화 알고리즘, secret값 세팅
				.compact();
	}
	
	// Refresh 토큰 생성
	public Map<String, String> createRefreshToken(In signInfo) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("type", "token");

        Map<String, Object> payloads = new HashMap<>();
        payloads.put("email", signInfo.getEmail());

		Date expiration = new Date();
        expiration.setTime(expiration.getTime() + refreshExpireTime);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
        String refreshTokenExpirationAt = simpleDateFormat.format(expiration);

        String jwt = Jwts
                .builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setSubject("user")
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        Map<String, String> result = new HashMap<>();
        result.put("refreshToken", jwt);
        result.put("refreshTokenExpirationAt", refreshTokenExpirationAt);
        return result;
    }
	

	// Jwt 토큰으로 인증 정보를 조회
	public Authentication getAuthentication(String token) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserInfo(token));
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	// Jwt 토큰에서 회원 구별 정보 추출
	public String getUserInfo(String token) {
		
		return (String) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("email");
	}

	// Request의 Header에서 token 파싱 : "Authorization: 로그인 jwt토큰"
	public String resolveToken(HttpServletRequest req) {
		return req.getHeader("Authorization");
	}

	// Jwt 토큰의 유효성 + 만료일자 확인
	public boolean validateToken(ServletRequest request, String jwtToken) {
		try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return true;
        } catch (MalformedJwtException e) {
            request.setAttribute("exception", "MalformedJwtException");
        } catch (ExpiredJwtException e) {
            request.setAttribute("exception", "ExpiredJwtException");
        } catch (UnsupportedJwtException e) {
            request.setAttribute("exception", "UnsupportedJwtException");
        } catch (IllegalArgumentException e) {
            request.setAttribute("exception", "IllegalArgumentException");
        }
        return false;
	}
}