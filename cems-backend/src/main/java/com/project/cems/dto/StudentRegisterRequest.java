package com.project.cems.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class StudentRegisterRequest {
    private String name;
    private String studentPrn;
    private String department;
    private String year;
    private String gender;
    private String email;
    private String mobile;
    private String password;
}
