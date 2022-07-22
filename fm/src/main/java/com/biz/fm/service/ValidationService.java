package com.biz.fm.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.EmailPasswordValicationDto.UpdatePassword;
import com.biz.fm.domain.dto.MemberDto.MemberResponse;
import com.biz.fm.repository.MemberRepository;
import com.biz.fm.repository.ValidationRepository;

import lombok.RequiredArgsConstructor;

import com.biz.fm.domain.entity.Member;
import com.biz.fm.domain.entity.Validation;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.InvalidEmailException;
import com.biz.fm.exception.custom.InvalidPasswordException;
import com.biz.fm.exception.custom.UpdateFailException;

@Service
@RequiredArgsConstructor
public class ValidationService {

	private final JavaMailSender mailSender;
	private final ValidationRepository validationRepository;
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	// 회원가입 시 이메일 인증
	public boolean sendToEmailForSignUp(String email) throws Exception {
		Validation emailPaswordValidation = validationRepository.findByEmail(email);
		if (emailPaswordValidation != null) {
			
			throw new NotFoundException("이미 인증코드가 발급 되었습니다. 이메일을 확인하세요.");
		}
		boolean result = mailSend(email);
		return result;
	}

	// 비밀번호 찾을 시 이메일 인증
	public boolean sendToEmailForPassword(String email) throws Exception {
		Member checkResult = memberRepository.findByEmailForPassword(email);
		if (checkResult == null)
			throw new NotFoundException("등록된 이메일이 존재하지 않습니다.");

		boolean result = mailSend(email);
		return result;
	}

	public boolean checkCode(String email, String code) throws NotFoundException {
		Validation findResultByEmail = validationRepository.findByEmail(email);
		Validation findResultByCode = validationRepository.findByCode(code);
		
		if(findResultByEmail == null) throw new NotFoundException("등록된 이메일이 존재하지 않습니다.");
		if(findResultByCode == null) throw new NotFoundException("인증 코드가 일치하지 않습니다.");

		Timestamp createDateExpiration = findResultByEmail.getCreateDateExpiration();
		boolean expirationCheckResult = expirationCheck(createDateExpiration);
		
		if(expirationCheckResult) {
			int deleteResult = validationRepository.delete(findResultByCode.getEmail());
			if (deleteResult > 0)
				return true;
		}
		throw new NotFoundException("3분 제한시간을 초과했습니다. 새롭게 인증코드를 발급 받으세요.");
		
	}

	// 유효한 정보인지 확인
	public boolean checkInfoIsValid(String email, String password) {
		// 아이디 중복 확인
		Member member = memberRepository.findByEmail(email);
		if (member == null)
			throw new InvalidEmailException();

		// 패스워드를 확인.
		if (!passwordEncoder.matches(password, member.getPassword()))
			throw new InvalidPasswordException();

		return true;
	}

	// 비밀번호 변경
	public MemberResponse changePassword(UpdatePassword updatePassword) {
		updatePassword.setPassword(passwordEncoder.encode(updatePassword.getPassword()));
		int updatePasswordResult = memberRepository.updatePassword(updatePassword);
		if (updatePasswordResult > 0) {
			Member memberResult = memberRepository.findByEmail(updatePassword.getEmail());
			MemberResponse memberResponseResult = memberResult.toMemberRead();
			return memberResponseResult;
		}
		throw new UpdateFailException();
	}

	public boolean mailSend(String email) throws Exception {
		String code = createCode(); // 인증번호

		MimeMessage message = mailSender.createMimeMessage();
		message.addRecipients(RecipientType.TO, email); // 보내는 대상
		message.setSubject("FM 회원정보 인증번호 : " + code); // 제목

		String msg = "";
		msg += "<table align=\"center\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#efeff0\" style=\"border-collapse:collapse\"><tbody><tr><td width=\"100%\" height=\"100\"/></tr><tr><td><table align=\"center\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#ffffff\" style=\"max-width:640px;margin:0 auto\">";
		msg += "<tbody><tr><td width=\"100%\" height=\"45\" colspan=\"3\" bgcolor=\"#4287f5\"/></tr><tr><td width=\"6%\" height=\"25\" bgcolor=\"#4287f5\"/><td width=\"88%\" height=\"25\" bgcolor=\"#4287f5\"><img src=\"https://www.bizplaypr.co.kr/bizv3/img/bg/logoW.png\" width=\"100\" height=\"30\" alt=\"kakao 계정\" border=\"0\" style=\"display:block\" loading=\"lazy\">";
		msg += "</td><td width=\"6%\" height=\"25\" bgcolor=\"#4287f5\"/></tr><tr><td width=\"100%\" height=\"45\" colspan=\"3\" bgcolor=\"#4287f5\"/></tr><tr><td width=\"100%\" height=\"35\" colspan=\"3\"/></tr><tr><td width=\"6%\"/><td width=\"88%\" style=\"font-size:18px;line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'굴림',gulim;letter-spacing:-1px;font-weight:bold;color:#1e1e1e\">";
		msg += "회원정보 인증을 위한 인증번호입니다.</td><td width=\"6%\"/></tr><tr><td width=\"100%\" height=\"25\" colspan=\"3\"/></tr><tr><td width=\"6%\"/><td width=\"88%\" style=\"font-size:14px;line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'굴림',gulim;letter-spacing:-1px;color:#1e1e1e\">아래의 인증번호를 입력하여 인증을 진행하실 수 있습니다.";
		msg += "</td><td width=\"6%\"/></tr><tr><td width=\"100%\" height=\"18\" colspan=\"3\"/></tr><tr><td width=\"6%\"/><td width=\"88%\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'굴림',gulim;letter-spacing:-1px;color:#1e1e1e\">";
		msg += "<tbody><tr><td width=\"100%\" height=\"1\" colspan=\"5\" bgcolor=\"#bebebe\"/></tr><tr><td width=\"100%\" height=\"25\" colspan=\"5\"/></tr><tr><td width=\"3%\"/><td width=\"3%\"/></tr><tr><td width=\"3%\"/><th align=\"left\" colspan=\"1\" rowspan=\"1\" valign=\"top\" width=\"22%\" style=\"font-size:14px;font-weight:normal\">인증 요청 이메일</th><td width=\"2%\"/><td valign=\"top\" width=\"70%\" style=\"font-size:14px;font-weight:bold;word-break:break-all\">";
		// 이메일
		msg += email;
		msg += "</td><td width=\"3%\"/></tr><tr><td width=\"100%\" height=\"8\" colspan=\"5\"/></tr><tr><td width=\"3%\"/><th align=\"left\" colspan=\"1\" rowspan=\"1\" valign=\"top\" width=\"22%\" style=\"font-size:14px;font-weight:normal\">인증번호</th><td width=\"2%\"/></td><td valign=\"top\" width=\"70%\" style=\"font-size:14px;font-weight:bold;word-break:break-all\">";
		// 인증코드
		msg += code;
		msg += "</td><td width=\"3%\"/></tr><tr><td width=\"100%\" height=\"27\" colspan=\"5\"/></tr><tr><td width=\"100%\" height=\"1\" colspan=\"5\" bgcolor=\"#bebebe\"/></tr></tbody></table></td><td width=\"6%\"/></tr><tr><td width=\"100%\" height=\"30\" colspan=\"3\"/></tr><tr><td width=\"6%\"/><td width=\"88%\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#f8f8f8\" style=\"line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'굴림',gulim;letter-spacing:-1px;color:#1e1e1e\">";
		msg += "<tbody><tr><td width=\"100%\" height=\"15\" colspan=\"3\"/></tr><tr><td width=\"3%\"/><td width=\"94%\" style=\"font-size:14px;font-weight:bold\">요청하지 않은 인증번호 메일을 받으셨나요?</td><td width=\"3%\"/></tr><tr><td width=\"100%\" height=\"7\" colspan=\"3\"/></tr><tr><td width=\"3%\"/><td width=\"94%\" style=\"font-size:12px;line-height:18px\">내 계정이 맞다면, 누군가 오타로 메일을 잘못 발송했을 수 있습니다.<br>계정이 도용된 것은 아니니 안심하세요.";
		msg += "</td><td width=\"3%\"/></tr><tr><td width=\"100%\" height=\"18\" colspan=\"3\"/></tr></tbody></table></td><td width=\"6%\"/></tr><tr><td width=\"100%\" height=\"58\" colspan=\"3\"/></tr><tr><td width=\"100%\" height=\"1\" colspan=\"3\" bgcolor=\"#e6e6e6\"/></tr><tr><td width=\"100%\" height=\"16\" colspan=\"3\"/></tr>";
		msg += "<tr><td width=\"6%\"/><td width=\"88%\" style=\"font-size:12px;line-height:18px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'돋움',Dotum;letter-spacing:-1px;color:#767676\">본 메일은 발신전용입니다.<br>Copyright © FM Corp. All rights reserved.</td><td width=\"6%\"/></tr><tr><td width=\"100%\" height=\"18\" colspan=\"3\"/></tr></table></tr><tr><td width=\"100%\" height=\"100\"/></tr></tbody></table>";

		message.setText(msg, "utf-8", "html"); // 내용
		message.setFrom(new InternetAddress(email)); // 보내는 사람

		mailSender.send(message);

		Validation result = Validation.builder().email(email).code(code).build();
		if (result != null) {
			int insertResult = validationRepository.insert(result);
			if (insertResult > 0)
				return true;
		}
		throw new InsertFailException();
	}

	public static String createCode() {
		StringBuffer key = new StringBuffer();
		Random rnd = new Random();

		for (int i = 0; i < 6; i++) { // 인증코드 6자리
			key.append((rnd.nextInt(10)));
		}
		return key.toString();
	}
	
	public boolean expirationCheck(Timestamp expirationTime) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss.SSS");
		Date currentTime = new Date();
		currentTime.setTime(System.currentTimeMillis());
		String simpleDateFormatCurrentTime = simpleDateFormat.format(currentTime);
		Timestamp timeStampCurrentTime = Timestamp.valueOf(simpleDateFormatCurrentTime);
		
		boolean result = timeStampCurrentTime.before(expirationTime);
		return result;
	}

}
