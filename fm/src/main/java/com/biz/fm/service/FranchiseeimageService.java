package com.biz.fm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageCreate;
import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageRead;
import com.biz.fm.domain.dto.FranchiseeImageDto.FranchiseeimageUpdate;
import com.biz.fm.domain.entity.Franchiseeimage;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.FranchiseeimageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FranchiseeimageService {
	
	private final FranchiseeimageRepository fimageRepository;
	
	public List<FranchiseeimageRead> findAll() throws NotFoundException{
		List<Franchiseeimage> fimages = fimageRepository.findAll();
		if(fimages.size() == 0) throw new NotFoundException(null);
		
		List<FranchiseeimageRead> fimageReads = new ArrayList<>();
		for(Franchiseeimage fimage : fimages) {
			fimageReads.add(fimage.toFimageRead());
		}
		
		return fimageReads;
	}
	
	public FranchiseeimageRead findByFimageId(String fimageId) throws NotFoundException {
		Franchiseeimage fimage = fimageRepository.findById(fimageId);
		if(fimage == null) throw new NotFoundException(null);
		return fimage.toFimageRead();
	}
	
	public FranchiseeimageRead insert(FranchiseeimageCreate fimageCreate) {
		fimageCreate.setId(UUID.randomUUID().toString().replace("-", ""));
		
		int result = fimageRepository.insert(fimageCreate);
		if(result > 0) {
			return fimageRepository.findById(fimageCreate.getId()).toFimageRead();
		}
		else throw new InsertFailException();
	}
	
	public FranchiseeimageRead update(String fimageId, FranchiseeimageUpdate fimage) {
		
		Franchiseeimage oldFimage = fimageRepository.findById(fimageId);
		if(oldFimage == null) throw new UpdateFailException();
		
		Franchiseeimage newFimage = oldFimage.patch(fimage);
		
		int result = fimageRepository.update(newFimage);
		if(result > 0) {
			return fimageRepository.findById(fimageId).toFimageRead();
		}
		else throw new UpdateFailException();
	}
	
	public FranchiseeimageRead delete(String fimageId) {
		Franchiseeimage fimage = fimageRepository.findById(fimageId);
		if(fimage == null) throw new DeleteFailException();
		
		int result = fimageRepository.delete(fimageId);
		if(result > 0) {
			return fimage.toFimageRead();
		}
		else throw new DeleteFailException();
	}

	
	

}
