package com.dareuda.givetree.notification.infrastructure;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.util.List;

@Component
public class FcmCaller {

    @Value("${firebase.file-path}")
    private String FIREBASE_CONFIG_PATH;

    @Value("${firebase.uri}")
    private String FIREBASE_API_URI;

    @Value("${firebase.google-uri}")
    private String GOOGLE_API_URI;

    public void call(String jsonFcmMessage) {
        RestClient restClient = RestClient.create();
        RestClient.ResponseSpec result = restClient.post()
                .uri(FIREBASE_API_URI)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonFcmMessage)
                .header("Authorization", "Bearer " + getAccessToken())
                .header("Accept", "application/json; UTF-8")
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (fcmRequest, fcmResponse) -> {
                    throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
                })
                .onStatus(HttpStatusCode::is5xxServerError, (fcmRequest, fcmResponse) -> {
                    throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
                });

        result.toBodilessEntity();
    }

    private String getAccessToken() {
        try {
            GoogleCredentials googleCredentials = GoogleCredentials
                    .fromStream(new ClassPathResource(FIREBASE_CONFIG_PATH).getInputStream())
                    .createScoped(List.of(GOOGLE_API_URI));
            googleCredentials.refreshIfExpired();

            return googleCredentials.getAccessToken().getTokenValue();
        } catch (IOException e) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
