package com.project.spring.cleanmeet.domain.user.dto.company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyTagsRequestDto {
    private List<String> tags;
}
