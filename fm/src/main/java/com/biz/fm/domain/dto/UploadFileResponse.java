package com.biz.fm.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UploadFileResponse {
	private String fileName;
    private String fileDownloadPath;
    private String fileType;
    private Long size;
}
