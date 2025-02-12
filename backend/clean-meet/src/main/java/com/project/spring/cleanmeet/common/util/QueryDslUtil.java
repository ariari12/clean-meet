package com.project.spring.cleanmeet.common.util;


import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import org.springframework.data.domain.Pageable;


public class QueryDslUtil {

    // 동적 정렬 메서드 (기본 정렬 조건 제거)
    public static OrderSpecifier<?> getOrderSpecifier(Pageable pageable, PathBuilder<?> entityPath) {
        return pageable.getSort().stream()
                .filter(order -> isAllowedSortField(order.getProperty())) // 허용된 정렬 필드만 사용
                .map(order -> order.isAscending() ?
                        entityPath.getComparable(order.getProperty(), Comparable.class).asc()
                        : entityPath.getComparable(order.getProperty(), Comparable.class).desc())
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("올바른 정렬 필드가 필요합니다."));
    }

    /**
     * 허용된 정렬 필드인지 확인하는 메서드
     * 인덱싱 처리하자
     */
    private static boolean isAllowedSortField(String field) {
        return field.equals("createdAt");  // 허용 필드 추가 가능
    }
}
