package com.project.cems.service;

import com.project.cems.dto.LoginResponse;
import com.project.cems.dto.StudentLoginRequest;

public interface UserService {
    LoginResponse login(StudentLoginRequest request);
}
