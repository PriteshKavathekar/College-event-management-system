package com.project.cems.dto;

import lombok.Data;

@Data
public class CreateCoordinatorRequest {
    private String name;
    private String email;
    private String password;
    private String department;
}
