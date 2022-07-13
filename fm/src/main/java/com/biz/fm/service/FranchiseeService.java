package com.biz.fm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeCreate;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeRead;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeSummary;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeUpdate;
import com.biz.fm.domain.dto.FranchiseeDto.Hours;
import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageRead;
import com.biz.fm.domain.dto.MenuDto.MenuRead;
import com.biz.fm.domain.entity.Address;
import com.biz.fm.domain.entity.Franchisee;
import com.biz.fm.domain.entity.Franchiseeimage;
import com.biz.fm.domain.entity.Menu;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.AddressRepository;
import com.biz.fm.repository.FranchiseeRepository;
import com.biz.fm.repository.FranchiseeimageRepository;
import com.biz.fm.repository.MenuRepository;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FranchiseeService {
	
	private final ObjectMapper objectMapper;
	private final MenuRepository menuRepository;
	private final AddressRepository addressRepository;
	private final FranchiseeRepository franchiseeRepository;
	private final FranchiseeimageRepository franchiseeimageRepository;
	
	public List<FranchiseeRead> findAll() throws NotFoundException{
		List<Franchisee> franchisees = franchiseeRepository.findAll();
		
		if(franchisees.size() == 0) throw new NotFoundException(null);
		else {
			List<FranchiseeRead> franchiseeReads = new ArrayList<>();
			for(Franchisee franchisee : franchisees) {
				franchiseeReads.add(franchisee.toFranchiseeRead());
			}
			return franchiseeReads;
		}
	}
	
	public List<FranchiseeRead> findAllByDistance(Double longitude, Double latitude, Integer radius) throws NotFoundException{
		
		
		List<Franchisee> franchisees = franchiseeRepository.findAllByDistance(longitude, latitude, radius);
		
		
		if(franchisees.size() == 0) throw new NotFoundException(null);
		else {
			List<FranchiseeRead> franchiseeReads = new ArrayList<>();
			for(Franchisee franchisee : franchisees) {
				franchiseeReads.add(franchisee.toFranchiseeRead());
			}
			return franchiseeReads;
		}
	}
	
	public FranchiseeRead findByBusinessNumber(String businessNumber) throws NotFoundException{
		Franchisee franchisee = franchiseeRepository.findByBusinessNumber(businessNumber);
		
		if(franchisee == null) throw new NotFoundException(null);
		
		return franchisee.toFranchiseeRead();
	}
	
	public List<MenuRead> findMenuByBusinessNumber(String businessNumber) throws NotFoundException{
		List<Menu> menus = menuRepository.findBybusinessNumber(businessNumber);
		if(menus.size() == 0) throw new NotFoundException(null);
		
		List<MenuRead> menusReads = new ArrayList<>();
		for(Menu menu : menus) {
			menusReads.add(menu.toMenuRead());
		}
		return menusReads;
	}
	
	public List<FranchiseeimageRead> findAllByBusinessNumber(String businessNumber) throws NotFoundException {
		List<Franchiseeimage> fimages = franchiseeimageRepository.findAllByBusinessNumber(businessNumber);
		if(fimages.size() == 0) throw new NotFoundException(null);
		
		List<FranchiseeimageRead> fimageReads = new ArrayList<>();
		for(Franchiseeimage fimage : fimages) {
			fimageReads.add(fimage.toFimageRead());
		}
		
		return fimageReads;
	}
	
//	public List<FranchiseeSummary> findByMemberId(String memberId) throws NotFoundException{
//		List<Franchisee> franchisees = franchiseeRepository.findByMemberId(memberId);
//		
//		if(franchisees == null) throw new NotFoundException(null);
//		
//		else {
//			List<FranchiseeSummary> franchiseeSummaries = new ArrayList<>();
//			for(Franchisee franchisee : franchisees) {
//				franchiseeSummaries.add(franchisee.toFranchiseeSummary());
//			}
//			return franchiseeSummaries;
//		}
//	}
	
	public Hours findHoursByBusinessNumber(String businessNumber) throws JsonMappingException, JsonProcessingException, NotFoundException {
		String hours =  franchiseeRepository.findHoursByBusinessNumber(businessNumber);
		if(hours == null) throw new NotFoundException(null);
		
		return objectMapper.readValue(franchiseeRepository.findHoursByBusinessNumber(businessNumber), Hours.class);
	}
	
	public FranchiseeRead insert(FranchiseeCreate franchiseeCreate) {
		// validatoin Controller로 이동 해야함.
		if(!isJson(franchiseeCreate.getHours())) throw new InsertFailException();
		
		Address address = franchiseeCreate.getAddress();
		address.setId(UUID.randomUUID().toString().replace("-", ""));
		addressRepository.insert(address);
		
		int result = franchiseeRepository.insert(franchiseeCreate);
		if(result > 0) {
			return franchiseeRepository.findByBusinessNumber(franchiseeCreate.getBusinessNumber()).toFranchiseeRead();
		}
		else throw new InsertFailException(); 
	}
	
	private boolean isJson(String jsonSting) {
		try {
			objectMapper.readTree(jsonSting);
	    } catch (JacksonException e) {
	        return false;
	    }
	    return true;
	}
	
	public FranchiseeRead update(String businessNumber, FranchiseeUpdate franchisee) {
		
		Franchisee oldFranchisee = franchiseeRepository.findByBusinessNumber(businessNumber);
		if(oldFranchisee == null) throw new UpdateFailException();
		
		Franchisee newFranchisee = oldFranchisee.patch(franchisee);
		
		int result = franchiseeRepository.update(newFranchisee);
		if(result > 0) {
			return franchiseeRepository.findByBusinessNumber(businessNumber).toFranchiseeRead();
		}
		else throw new UpdateFailException();
		
	}
	
	public FranchiseeRead delete(String businessNumber) {
		
		Franchisee franchisee = franchiseeRepository.findByBusinessNumber(businessNumber);
		if(franchisee == null) throw new DeleteFailException();
		
		int result = franchiseeRepository.delete(businessNumber);
		if(result > 0) {
			return franchisee.toFranchiseeRead();
		}
		else throw new DeleteFailException();
	}
}
