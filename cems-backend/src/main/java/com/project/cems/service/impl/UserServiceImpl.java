package com.project.cems.service.impl;

import com.project.cems.dto.LoginResponse;
import com.project.cems.dto.StudentLoginRequest;
import com.project.cems.entity.User;
import com.project.cems.repository.UserRepository;
import com.project.cems.service.UserService;
import jdk.jfr.Registered;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public LoginResponse login(StudentLoginRequest request) {
        User user = userRepository
                .findByEmailAndPassword(request.getEmail(), request.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Only ADMIN & COORDINATOR allowed here
        if(!user.getRole().equals("ADMIN") && !user.getRole().equals("COORDINATOR")){
            throw new RuntimeException("Unauthorized role");
        }

        LoginResponse response = new LoginResponse();
        response.setId(user.getId());
        response.setRole(user.getRole());
        return response;
    }
}
