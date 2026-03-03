package com.team19.CareConnect.config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.UserCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

@Configuration
public class GoogleServicesConfig {

    @Value("${google.drive.client-id}")
    private String clientId;

    @Value("${google.drive.client-secret}")
    private String clientSecret;

    @Value("${google.drive.refresh-token}")
    private String refreshToken;

    private GoogleCredentials getCredentials() throws IOException {
        Resource resource = new ClassPathResource("service-account.json");
        return GoogleCredentials.fromStream(resource.getInputStream())
                .createScoped(Arrays.asList(
                        SheetsScopes.SPREADSHEETS,
                        DriveScopes.DRIVE_FILE
                ));
    }

    @Bean
    public Sheets getSheetsService() throws IOException, GeneralSecurityException {
        return new Sheets.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(getCredentials()))
                .setApplicationName("CareConnect")
                .build();
    }

    @Bean
    public Drive getDriveService() throws IOException, GeneralSecurityException {
        // Importante: Usamos UserCredentials para actuar en tu nombre
        UserCredentials credentials = UserCredentials.newBuilder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setRefreshToken(refreshToken)
                .build();

        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credentials))
                .setApplicationName("CareConnect")
                .build();
    }
}