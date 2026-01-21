package com.project.cems.service;

import com.project.cems.dto.StudentLoginRequest;
import com.project.cems.dto.StudentLoginResponse;
import com.project.cems.dto.StudentProfileResponse;
import com.project.cems.dto.StudentRegisterRequest;
import com.project.cems.entity.Student;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {

    StudentProfileResponse registerStudent(StudentRegisterRequest request, MultipartFile image);

    StudentLoginResponse loginStudent(StudentLoginRequest request);

    StudentProfileResponse getProfile(Long id);

    StudentProfileResponse updateProfile(Long id, StudentRegisterRequest request, MultipartFile image);

    List<StudentProfileResponse> getAllStudents();

    void deleteStudent(Long id);
}
