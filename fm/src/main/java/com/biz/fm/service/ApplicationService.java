package com.biz.fm.service;

import java.util.UUID;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.ApplicationDto.AppCreate;
import com.biz.fm.domain.dto.ApplicationDto.AppDelete;
import com.biz.fm.domain.dto.ApplicationDto.AppIn;
import com.biz.fm.domain.dto.ApplicationDto.AppRead;
import com.biz.fm.domain.dto.ApplicationDto.AppUpdateKey;
import com.biz.fm.domain.dto.ApplicationDto.AppUpdateName;
import com.biz.fm.domain.entity.Application;
import com.biz.fm.domain.entity.Member;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.ApplicationRepository;
import com.biz.fm.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {
	
	private final ApplicationRepository appRepository;
	private final MemberRepository memberRepository;
	
	public AppRead getApp(String name) throws NotFoundException{
		Application app = appRepository.findByName(name);
		if(app == null) throw new NotFoundException(null);
		return app.toAppRead();
	}
	
	public AppRead insert(AppCreate createAppInfo) {
		
		String email = createAppInfo.getEmail();
		System.out.println(email);
		
		Member member = memberRepository.findByEmail(email);
		System.out.println(member.toString());
		
		AppIn insertApp = new AppIn();
		
		
		insertApp.setId(UUID.randomUUID().toString().replace("-", ""));
		insertApp.setName(createAppInfo.getName());
		insertApp.setApiKey(UUID.randomUUID().toString().replace("-", ""));
		insertApp.setMemberId(member.getId());
		
		int result = appRepository.insert(insertApp);
		if(result > 0) {
			return appRepository.findById(insertApp.getId()).toAppRead();
		}
		else throw new InsertFailException();
	}
	
	public AppRead nameUpdate(AppUpdateName appName) {
		
		//중복검사
		Application newApp = appRepository.findByName(appName.getNewName());
		if(newApp != null) throw new UpdateFailException();
		
		Application updateApp = appRepository.findByName(appName.getCurrentName());
		updateApp.setName(appName.getNewName());
		int result = appRepository.nameUpdate(updateApp.toAppUpdate());
		if(result > 0) {
			return appRepository.findByName(updateApp.getName()).toAppRead();
		}
		else throw new UpdateFailException();
	}
	
	public AppRead keyUpdate(AppUpdateKey appName) {
		//중복검사
		Application checkApp = appRepository.findByName(appName.getName());
		if(checkApp == null) throw new UpdateFailException();
			
		checkApp.setApiKey(UUID.randomUUID().toString().replace("-", ""));
		int result = appRepository.keyUpdate(checkApp.toAppUpdate());
		if(result > 0) {
			return appRepository.findByName(checkApp.getName()).toAppRead();
		}
		else throw new UpdateFailException();
	}

	public AppRead delete(AppDelete appDelete) {
		Application deleteApp = appRepository.findByName(appDelete.getName());
		System.out.println(deleteApp);
		if(deleteApp == null) throw new DeleteFailException();
		
		int result = appRepository.delete(appDelete.getName());
		if(result > 0) {
			return deleteApp.toAppRead();
		}
		else throw new DeleteFailException();
	}

}
