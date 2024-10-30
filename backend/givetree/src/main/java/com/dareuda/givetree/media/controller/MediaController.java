package com.dareuda.givetree.media.controller;

import com.dareuda.givetree.media.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/media")
@RequiredArgsConstructor
@RestController
public class MediaController {

    private final StorageService storageService;

    @ValidExtension
    @PostMapping
    public ResponseEntity<String> store(
            @RequestPart MultipartFile file
    ) {
        return ResponseEntity.ok().body(storageService.store("test", file));
    }
}
