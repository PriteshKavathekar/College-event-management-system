package com.project.cems.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.cems.dto.StudentLoginRequest;
import com.project.cems.dto.StudentLoginResponse;
import com.project.cems.dto.StudentProfileResponse;
import com.project.cems.dto.StudentRegisterRequest;
import com.project.cems.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/students")
@CrossOrigin("*")
public class StudentController {

    private final StudentService studentService;
    private final ObjectMapper objectMapper;

    // student register
    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public StudentProfileResponse registerStudent(
            @RequestParam("student") String studentJson,
            @RequestParam(value = "image", required = false) MultipartFile image
    ){
        try {
            StudentRegisterRequest request = objectMapper.readValue(studentJson, StudentRegisterRequest.class);
            return studentService.registerStudent(request, image);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    // student login
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public StudentLoginResponse loginStudent(@RequestBody StudentLoginRequest request){
        return studentService.loginStudent(request);
    }

    // get a student profile
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public StudentProfileResponse getProfile(@PathVariable Long id){
        return studentService.getProfile(id);
    }

    // update a student profile
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public StudentProfileResponse updateProfile(@PathVariable Long id,
                                                @RequestPart("student") String studentJson,
                                                @RequestPart(value = "image", required = false) MultipartFile image){
        try {
            StudentRegisterRequest request = objectMapper.readValue(studentJson, StudentRegisterRequest.class);
            return studentService.updateProfile(id, request, image);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    // get all students (COORDINATOR)
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<StudentProfileResponse> getAllStudents(){
        return studentService.getAllStudents();
    }

    // delete a student (COORDINATOR)
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
}
