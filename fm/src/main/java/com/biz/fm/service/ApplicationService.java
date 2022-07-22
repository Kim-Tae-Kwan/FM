package com.biz.fm.service;

import java.util.UUID;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.ApplicationDto.AppCreate;
import com.biz.fm.domain.dto.ApplicationDto.AppDelete;
import com.biz.fm.domain.dto.ApplicationDto.AppUpdateKey;
import com.biz.fm.domain.dto.ApplicationDto.AppUpdateName;
import com.biz.fm.domain.entity.AppToken;
import com.biz.fm.domain.entity.Application;
import com.biz.fm.domain.entity.Member;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.InvalidEmailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.AppTokenRepository;
import com.biz.fm.repository.ApplicationRepository;
import com.biz.fm.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {
	
	private final ApplicationRepository applicationRepository;
	private final AppTokenRepository appTokenRepository;
	private final MemberRepository memberRepository;
	
	public Application getApp(String appId) throws NotFoundException{
		Application app = applicationRepository.findById(appId);
		if(app == null) throw new NotFoundException(null);
		return app;
	}
	
	public Application insert(AppCreate createAppInfo) {
		
		String email = createAppInfo.getEmail();
		Member member = memberRepository.findByEmail(email);
		
		if(member == null) throw new InvalidEmailException();
		
		Application insertApp = Application.builder()
											.id(UUID.randomUUID().toString().replace("-", ""))
											.name(createAppInfo.getName())
											.apiKey(UUID.randomUUID().toString().replace("-", ""))
											.memberId(member.getId())
											.build();
		
		int result = applicationRepository.insert(insertApp);
		if(result > 0) {
			return applicationRepository.findById(insertApp.getId());
		}
		else throw new InsertFailException();
	}
	
	public Application nameUpdate(AppUpdateName appName) {

		//수정하고자 하는 앱이 있는지?
		Application newApp = applicationRepository.findById(appName.getAppId());
		if(newApp == null) throw new UpdateFailException();
		
		Application updateApp = applicationRepository.findByName(appName.getCurrentName());
		if(updateApp == null) throw new UpdateFailException();
		
		updateApp.setName(appName.getNewName());
		int result = applicationRepository.nameUpdate(updateApp.toAppUpdate());
		if(result > 0) {
			return applicationRepository.findById(updateApp.getId());
		}
		else throw new UpdateFailException();
	}
	
	public Application keyUpdate(AppUpdateKey appUpdateKey) {
		//중복검사
		Application checkApp = applicationRepository.findById(appUpdateKey.getAppId());
		if(checkApp == null) throw new UpdateFailException();
			
		checkApp.setApiKey(UUID.randomUUID().toString().replace("-", ""));
		int result = applicationRepository.keyUpdate(checkApp.toAppUpdate());
		if(result > 0) {
			return applicationRepository.findById(checkApp.getId());
		}
		else throw new UpdateFailException();
	}

	public boolean delete(AppDelete appDelete) {
		Application deleteApplication = applicationRepository.findById(appDelete.getAppId());
		AppToken deleteAppToken = appTokenRepository.findByAppId(appDelete.getAppId());
		if(deleteApplication == null || deleteAppToken == null) throw new DeleteFailException();
		
		//외래키로 연결되어 있기 때문에, appToken 을 먼저 제거해야 한다.
		int appTokenDeleteResult = appTokenRepository.delete(appDelete.getAppId());
		int applicationDeleteResult = applicationRepository.delete(appDelete.getAppId());
		
		if(applicationDeleteResult > 0 && appTokenDeleteResult > 0) {
			return true;
		}
		else throw new DeleteFailException();
	}

}
