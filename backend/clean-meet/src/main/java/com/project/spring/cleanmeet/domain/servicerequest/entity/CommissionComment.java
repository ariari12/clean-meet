package com.project.spring.cleanmeet.domain.servicerequest.entity;

import com.project.spring.cleanmeet.common.entity.BaseEntity;
import com.project.spring.cleanmeet.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class CommissionComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    @JoinColumn(name = "service_commission_id")
    private ServiceCommission serviceCommission;

    // 각 대댓글은 하나의 부모 댓글을 가짐 (ManyToOne)
    // null 값인 경우 자기가 부모댓글
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    @JoinColumn(name = "parent_comment_id")
    private CommissionComment parentComment;

    // 여러 개의 대댓글을 가질 수 있음
    @ToString.Exclude
    @OrderBy("id ASC")
    @OneToMany(mappedBy = "parentComment")
    private List<CommissionComment> childComments = new ArrayList<>();
}
