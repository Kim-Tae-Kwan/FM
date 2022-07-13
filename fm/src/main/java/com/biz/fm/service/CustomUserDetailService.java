package com.biz.fm.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.entity.Member;
import com.biz.fm.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

//DB에서 유저의 정보를 조회하는 역할을 수행합니다.
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

	private final MemberRepository memberRepository;
	
	@Override
	public UserDetails loadUserByUsername(String memberName) throws UsernameNotFoundException {
		Member member = memberRepository.findByEmail(memberName);
		
		if(member == null) {
			throw new UsernameNotFoundException(memberName);
		}
		
		return member;
	}

}
