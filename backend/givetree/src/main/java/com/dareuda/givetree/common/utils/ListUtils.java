package com.dareuda.givetree.common.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ListUtils {

    public static <T, U> List<U> applyFunctionToElements(List<T> list, Function<T, U> func) {
        return list.stream().map(func).collect(Collectors.toList());
    }
}
