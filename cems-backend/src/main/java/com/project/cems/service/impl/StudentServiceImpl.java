package com.project.cems.service.impl;

import com.project.cems.dto.StudentLoginRequest;
import com.project.cems.dto.StudentLoginResponse;
import com.project.cems.dto.StudentProfileResponse;
import com.project.cems.dto.StudentRegisterRequest;
import com.project.cems.entity.Student;
import com.project.cems.repository.StudentRepository;
import com.project.cems.repository.UserRepository;
import com.project.cems.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;

    @Override
    public StudentProfileResponse registerStudent(StudentRegisterRequest request) {

        // check email duplicate
        if (studentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        // check PRN duplicate
        if (studentRepository.findByStudentPrn(request.getStudentPrn()).isPresent()) {
            throw new RuntimeException("PRN already registered");
        }
        Student student = modelMapper.map(request, Student.class);
        Student savedStudent = studentRepository.save(student);
        return modelMapper.map(savedStudent,StudentProfileResponse.class);
    }

    public StudentLoginResponse loginStudent(StudentLoginRequest request){

        Student student = studentRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if(!student.getPassword().equals(request.getPassword())){
            throw new RuntimeException(("Invalid email or password"));
        }

        return new StudentLoginResponse(student.getId(), "STUDENT");
    }

    @Override
    public StudentProfileResponse getProfile(Long id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        return modelMapper.map(student,StudentProfileResponse.class);
    }

    @Override
    public StudentProfileResponse updateProfile(Long id, StudentRegisterRequest request) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("student not found"));

        student.setName(request.getName());
        student.setDepartment(request.getDepartment());
        student.setYear(request.getYear());
        student.setGender(request.getGender());
        student.setMobile(request.getMobile());

        Student updated = studentRepository.save(student);

        return modelMapper.map(student, StudentProfileResponse.class);
    }

    @Override
    public List<StudentProfileResponse> getAllStudents() {
        return studentRepository.findAll().stream().map(student -> modelMapper.map(student, StudentProfileResponse.class)).toList();
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}