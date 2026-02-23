package com.project.cems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentLoginResponse {
    private Long Id;
    private String role;
}
