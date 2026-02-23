package com.project.cems.controller;

import com.project.cems.dto.LoginResponse;
import com.project.cems.dto.StudentLoginRequest;
import com.project.cems.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse login(@RequestBody StudentLoginRequest request){
        return userService.login(request);
    }
}
