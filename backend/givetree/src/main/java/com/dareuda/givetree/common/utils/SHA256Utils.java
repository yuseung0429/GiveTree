package com.dareuda.givetree.common.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@RequiredArgsConstructor
public class SHA256Utils {

    private final AtomicInteger value = new AtomicInteger(0);

    public String generate() {
        int num  = value.getAndIncrement();
        return generateHash(String.valueOf(num+System.nanoTime()));
    }
    public String generate(String input) {
        return generateHash(input);
    }

    private String generateHash(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes());
            return "0x" + HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not found.", e);
        }
    }
}
