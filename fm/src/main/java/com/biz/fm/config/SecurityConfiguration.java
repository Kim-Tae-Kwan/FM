package com.biz.fm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.biz.fm.filter.JwtAuthenticationFilter;
import com.biz.fm.repository.AppTokenRepository;
import com.biz.fm.repository.LoginTokenRepository;
import com.biz.fm.utils.AuthenticationEntryPointHandler;
import com.biz.fm.utils.JwtTokenProvider;
import com.biz.fm.utils.WebAccessDeniedHandler;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity	//Filter Chain 을 사용한다는 것을 매핑
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationEntryPointHandler authenticationEntryPointHandler;
	private final WebAccessDeniedHandler webAccessDeniedHandler;
	private final AppTokenRepository appTokenRepository;
	private final LoginTokenRepository loginTokenRepository;

	//passwordEncoder 을 위한 빈 등록
    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }
    
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
	//spring security 설정이 가능하다.
	//WebSecurity에 접근 혀용 설정을 해버리면 이 설정이 적용되지 않는다. 
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http			
			.httpBasic().disable() // rest api 이므로 기본설정 사용안함
			.cors().configurationSource(corsConfigurationSource())	//cors 모든 요청 허용
			.and()
//			.cors().disable()
			.csrf().disable() // rest api이므로 csrf 보안이 필요없으므로 disable처리.
			
			// jwt token으로 인증하므로 세션은 필요없으므로 생성안함.
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
			.and()
				.authorizeRequests() 					
				.antMatchers("/api/v1/sign/*").permitAll() //security가 URL prefix 설정 앞에 있기 때문에 문제가 생기지 않는다.  
				.antMatchers("/api/v1/auth/*").permitAll()
				.antMatchers(HttpMethod.GET, "/api/v1/franchisee/**").permitAll()
				.anyRequest().permitAll() 		
//				.anyRequest().authenticated()
			.and()
				.exceptionHandling()
				.authenticationEntryPoint(authenticationEntryPointHandler)
				.accessDeniedHandler(webAccessDeniedHandler)
	        .and()
	        	//spring security 적용 후에는 모든 리소스에 대한 접근이 제한되므로, API / swagger 관련 페이지에 대해서는 예외를 적용해야 한다. 
//	        	.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
						UsernamePasswordAuthenticationFilter.class); 
	}

	//spring security 앞단 설정이 가능하다.
	//원하는 url 접근을 허용이 가능하다.(swagger 관련 내용을 접근 가능!) 
	@Override 
	public void configure(WebSecurity web) {
		web.ignoring().antMatchers(PERMIT_URL_ARRAY);

	}
	
	private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };
	
	
}
