package com.biz.fm.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.biz.fm.domain.dto.UploadFileResponse;
import com.biz.fm.exception.custom.FileNotFoundException;
import com.biz.fm.exception.custom.FileStorageException;

import lombok.AllArgsConstructor;
import net.coobird.thumbnailator.Thumbnailator;

@Service
@AllArgsConstructor
public class FileService {
	private final Path path;

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(this.path);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public List<UploadFileResponse> saveFiles(MultipartFile[] files){
    	
    	// foreach 사용.
    	List<UploadFileResponse> responseList = new ArrayList<>();
    	for(MultipartFile file : files) {
    		responseList.add(this.save(file));
        }
    	
    	return responseList;
    	
    	// stream 사용.
//    	return Arrays.asList(files)
//                .stream()
//                .map(this::save)
//                .collect(Collectors.toList());
    }

    private UploadFileResponse save(MultipartFile file){
    	
    	String uuid = UUID.randomUUID().toString().replace("-", "");
        String fileName = StringUtils.cleanPath(uuid + "-" + file.getOriginalFilename());

        try {
        	// 파일명에 유효하지 않는 문자 검사.
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // 파일 저장 (파일 명이 같을 경우, 덮어씌기)
            Path targetLocation = this.path.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            if (this.checkImageType(file)){
                Path thumbnailPath = this.path.resolve("thumb-" + fileName);
                FileOutputStream thumbnail = new FileOutputStream(new File(thumbnailPath.toString()));
                Thumbnailator.createThumbnail(file.getInputStream(), thumbnail, 100, 100);
            }
            
            String fileDownloadPath = "/api/file/" + fileName;

            return UploadFileResponse.builder()
                    .fileName(fileName)
                    .fileDownloadPath(fileDownloadPath)
                    .fileType(file.getContentType())
                    .size(file.getSize()) //byte;
                    .build();

        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    private boolean checkImageType(MultipartFile file){
        String contentType = file.getContentType();
        return contentType.startsWith("image");
    }
    
    public ResponseEntity<Resource> loadThumbnail(String fileName) {
    	return this.loadFile("thumb-" + fileName);
    }

    public ResponseEntity<Resource> loadFile(String fileName) {
        try {
            Path filePath = this.path.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if(!resource.exists()) {
                throw new FileNotFoundException("File not found " + fileName);
            }

            String contentType = this.getContentType(resource);
            String originFileName = fileName.substring(fileName.lastIndexOf("-") + 1);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + originFileName + "\"")
                    .body(resource);

        } catch (MalformedURLException exception) {
            throw new FileNotFoundException("File not found " + fileName, exception);
        }
    }

    private String getContentType(Resource resource){
        try{
            String contentType = Files.probeContentType(resource.getFile().toPath());
            return contentType == null ? "application/octet-stream" : contentType;
        }catch (IOException exception){
            return "application/octet-stream";
        }
    }
}
