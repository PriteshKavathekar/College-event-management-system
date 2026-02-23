package com.project.cems.dto;

import lombok.Data;

@Data
public class RegisteredStudentResponse {
    private Long id;
    private String name;
    private String studentPrn;
    private String department;
    private String year;
    private String gender;
    private String email;
    private String mobile;
}
