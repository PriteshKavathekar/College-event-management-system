package com.project.cems.service.impl;

import com.project.cems.dto.StudentLoginRequest;
import com.project.cems.dto.StudentLoginResponse;
import com.project.cems.dto.StudentProfileResponse;
import com.project.cems.dto.StudentRegisterRequest;
import com.project.cems.entity.Student;
import com.project.cems.repository.StudentRepository;
import com.project.cems.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;

    @Override
    public StudentProfileResponse registerStudent(StudentRegisterRequest request, MultipartFile image) {

        // check email duplicate
        if (studentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        // check PRN duplicate
        if (studentRepository.findByStudentPrn(request.getStudentPrn()).isPresent()) {
            throw new RuntimeException("PRN already registered");
        }

        Student student = modelMapper.map(request, Student.class);

        validateImage(image);

        // optional image
        try {
            if (image != null && !image.isEmpty()) {
                student.setImage(image.getBytes());
            }
        } catch (Exception e) {
            throw new RuntimeException("Image upload failed");
        }

        Student saved = studentRepository.save(student);

        return toProfileResponse(saved);
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
        StudentProfileResponse response =  modelMapper.map(student,StudentProfileResponse.class);
        // convert image bytes to base64 for frontend
        if (student.getImage() != null) {
            String base64 = Base64.getEncoder().encodeToString(student.getImage());
            response.setImageUrl("data:image/jpeg;base64," + base64);
        }
        return response;
    }

    @Override
    public StudentProfileResponse updateProfile(Long id,
                                                StudentRegisterRequest request,
                                                MultipartFile image) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("student not found"));

        // update fields
        student.setName(request.getName());
        student.setDepartment(request.getDepartment());
        student.setYear(request.getYear());
        student.setGender(request.getGender());
        student.setMobile(request.getMobile());

        validateImage(image);

        // update image if provided
        try {
            if (image != null && !image.isEmpty()) {
                student.setImage(image.getBytes());
            }
        } catch (Exception e) {
            throw new RuntimeException("Image update failed");
        }

        Student updated = studentRepository.save(student);
        return toProfileResponse(updated);
    }

    @Override
    public List<StudentProfileResponse> getAllStudents() {
        return studentRepository.findAll().stream().map(student -> modelMapper.map(student, StudentProfileResponse.class)).toList();
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    //  helper method
    private StudentProfileResponse toProfileResponse(Student student) {
        StudentProfileResponse res = modelMapper.map(student, StudentProfileResponse.class);

        if (student.getImage() != null) {
            res.setImageUrl(
                    Base64.getEncoder().encodeToString(student.getImage())
            );
        }
        return res;
    }

    // validate image
    private void validateImage(MultipartFile image) {
        if (image == null || image.isEmpty()) return;

        String contentType = image.getContentType();

        if (contentType == null ||
                !(contentType.equals("image/jpeg") ||
                        contentType.equals("image/png") ||
                        contentType.equals("image/jpg"))) {

            throw new RuntimeException("Only image files (JPG, JPEG, PNG) are allowed");
        }
    }

    // converting to upper case
    private String toUpper(String value) {
        return value == null ? null : value.trim().toUpperCase();
    }

}