package com.dareuda.givetree.common.utils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.HexFormat;

@Converter
public class ByteArrayToHexStringConverter implements AttributeConverter<String, byte[]> {

    @Override
    public String convertToEntityAttribute(byte[] bytes) {
        return bytes == null ? null : "0x"+HexFormat.of().formatHex(bytes);
    }

    @Override
    public byte[] convertToDatabaseColumn(String s) {
        return s == null ? null : HexFormat.of().parseHex(s.substring(2));
    }
}
