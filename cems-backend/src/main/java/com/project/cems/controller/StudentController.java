package com.project.cems.controller;

import com.project.cems.dto.StudentLoginRequest;
import com.project.cems.dto.StudentLoginResponse;
import com.project.cems.dto.StudentProfileResponse;
import com.project.cems.dto.StudentRegisterRequest;
import com.project.cems.service.StudentService;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentService studentService;

    // student register
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public StudentProfileResponse registerStudent(@RequestBody StudentRegisterRequest request){
        return studentService.registerStudent(request);
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
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public StudentProfileResponse updateProfile(@PathVariable Long id, @RequestBody StudentRegisterRequest request){
        return studentService.updateProfile(id, request);
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
