package com.project.cems.controller;

import com.project.cems.dto.UserProfileResponse;
import com.project.cems.entity.User;
import com.project.cems.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public UserProfileResponse getUserById(@PathVariable Long id){

        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .department(user.getDepartment())
                .role(user.getRole())
                .build();
    }
}
