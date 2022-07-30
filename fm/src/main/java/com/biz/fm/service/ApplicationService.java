package com.biz.fm.service;

import java.util.List;
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
import com.biz.fm.exception.custom.ApplicationNameDuplicationException;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.InvalidEmailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.AppTokenRepository;
import com.biz.fm.repository.ApplicationRepository;
import com.biz.fm.repository.MemberRepository;
import com.biz.fm.utils.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {
	
	private final ApplicationRepository applicationRepository;
	private final AppTokenRepository appTokenRepository;
	private final MemberRepository memberRepository;
	
	public List<Application> getAppList(String memberId) throws NotFoundException{
		List<Application> appList = applicationRepository.findByIdList(memberId);
		if(appList == null) throw new NotFoundException(null);
		return appList;
	}
	
	public Application insert(AppCreate createAppInfo) {
		Member member = memberRepository.findByEmail(createAppInfo.getEmail());
		Application app = applicationRepository.findByName(createAppInfo.getName());
		
		if(member == null) throw new InvalidEmailException();
		if(app != null) throw new ApplicationNameDuplicationException();
		
		Application insertApp = Application.builder()
											.id(UUID.randomUUID().toString().replace("-", ""))
											.name(createAppInfo.getName())
											.apiKey(UUID.randomUUID().toString().replace("-", ""))
											.memberId(member.getId())
											.build();
		
		int result = applicationRepository.insert(insertApp);
		if(result > 0) {
			return applicationRepository.findById(insertApp.getId());
		} else throw new InsertFailException();
		
	}
	
	public Application nameUpdate(AppUpdateName appName) {
		Application newApp = applicationRepository.findById(appName.getAppId());
		if(newApp == null) throw new UpdateFailException();
		
		Application updateApp = applicationRepository.findByName(appName.getCurrentName());
		if(updateApp == null) throw new UpdateFailException();
		
		updateApp.setName(appName.getNewName());
		int result = applicationRepository.nameUpdate(updateApp.toAppUpdate());
		if(result > 0) {
			return applicationRepository.findById(updateApp.getId());
		} else throw new UpdateFailException();
		
	}
	
	public Application keyUpdate(AppUpdateKey appUpdateKey) {
		Application checkApp = applicationRepository.findById(appUpdateKey.getAppId());
		if(checkApp == null) throw new UpdateFailException();
			
		checkApp.setApiKey(UUID.randomUUID().toString().replace("-", ""));
		int result = applicationRepository.keyUpdate(checkApp.toAppUpdate());
		if(result > 0) {
			return applicationRepository.findById(checkApp.getId());
		} else throw new UpdateFailException();
		
	}

	public boolean delete(AppDelete appDelete) {
		Application deleteApplication = applicationRepository.findById(appDelete.getAppId());
		AppToken deleteAppToken = appTokenRepository.findByAppId(appDelete.getAppId());
		
		if(deleteApplication != null && deleteAppToken == null) {
			int applicationDeleteResult = applicationRepository.delete(appDelete.getAppId());
			if(applicationDeleteResult > 0) {
				return true;
			} else throw new DeleteFailException();
		}
		
		if(deleteApplication != null && deleteAppToken != null) {
			//외래키로 연결되어 있기 때문에, appToken 을 먼저 제거해야 한다.
			int appTokenDeleteResult = appTokenRepository.delete(appDelete.getAppId());
			int applicationDeleteResult = applicationRepository.delete(appDelete.getAppId());
			
			//member 권한 ROLE_USER 변경
			memberRepository.updateRole(deleteApplication.getMemberId(), Role.ROLE_USER.toString());
			
			if(applicationDeleteResult > 0 && appTokenDeleteResult > 0) {
				return true;
			} else throw new DeleteFailException();
		}
		
		return false;
	}

}
