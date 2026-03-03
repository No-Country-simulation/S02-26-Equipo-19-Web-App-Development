package com.team19.CareConnect.onboarding.service;

import com.google.api.client.http.InputStreamContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class GoogleDriveService {

    private final Drive driveService;

    public String subirArchivo(MultipartFile file, String folderId) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(file.getOriginalFilename());
        fileMetadata.setParents(Collections.singletonList(folderId));

        InputStreamContent mediaContent = new InputStreamContent(
                file.getContentType(),
                file.getInputStream()
        );

        return driveService.files().create(fileMetadata, mediaContent)
                .setSupportsAllDrives(true)
                .setFields("id")
                .execute()
                .getId();
    }

    public byte[] obtenerContenidoArchivo(String fileId) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        driveService.files().get(fileId)
                .executeMediaAndDownloadTo(outputStream);

        return outputStream.toByteArray();
    }
}