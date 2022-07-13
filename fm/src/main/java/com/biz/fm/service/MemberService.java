package com.biz.fm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeSummary;
import com.biz.fm.domain.dto.MemberDto.MemberRead;
import com.biz.fm.domain.dto.MemberDto.MemberUpdate;
import com.biz.fm.domain.dto.MemberDto.SignIn;
import com.biz.fm.domain.entity.Franchisee;
import com.biz.fm.domain.entity.Member;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.FranchiseeRepository;
import com.biz.fm.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberRepository memberRepository;
	private final FranchiseeRepository franchiseeRepository;
	
	public List<MemberRead> getList() throws NotFoundException{
		List<Member> members = memberRepository.findAll();
		if(members.size() == 0) throw new NotFoundException(null);
		
		List<MemberRead> memberReads = new ArrayList<>();
		for(Member member : members) {
			memberReads.add(member.toMemberRead());
		}
		return memberReads;
	}
	
	public MemberRead getMemberById(String memberId) throws NotFoundException {
		Member member = memberRepository.findById(memberId);
		if(member == null) throw new NotFoundException(null);
		return member.toMemberRead();
	}
	
	public MemberRead getMemberByEmail(String email) throws NotFoundException {
		Member member = memberRepository.findByEmail(email);
		if(member == null) throw new NotFoundException(null);
		return member.toMemberRead();
	}
	
	public List<FranchiseeSummary> findFranchiseeByMemberId(String memberId) throws NotFoundException{
		List<Franchisee> franchisees = franchiseeRepository.findByMemberId(memberId);
		
		if(franchisees == null) throw new NotFoundException(null);
		
		else {
			List<FranchiseeSummary> franchiseeSummaries = new ArrayList<>();
			for(Franchisee franchisee : franchisees) {
				franchiseeSummaries.add(franchisee.toFranchiseeSummary());
			}
			return franchiseeSummaries;
		}
	}
	
	public MemberRead insert(SignIn member) {
		member.setId(UUID.randomUUID().toString().replace("-", ""));
		
		int result = memberRepository.insert(member);
		if(result > 0) {
			return memberRepository.findById(member.getId()).toMemberRead();
		}
		else throw new InsertFailException();
	}
	
	public MemberRead update(String memberId, MemberUpdate memberUpdate) {
		Member oldMember = memberRepository.findById(memberId);
		if(oldMember == null) throw new UpdateFailException();
		
		memberUpdate.patch(oldMember);
		
		int result = memberRepository.update(memberId, memberUpdate);
		if(result > 0) {
			return memberRepository.findById(memberId).toMemberRead();
		}
		else throw new UpdateFailException();
	}

	public MemberRead delete(String memberId) {
		Member member = memberRepository.findById(memberId);
		if(member == null) throw new DeleteFailException();
		
		int result = memberRepository.delete(memberId);
		if(result > 0) {
			return member.toMemberRead();
		}
		else throw new DeleteFailException();
	}
}
