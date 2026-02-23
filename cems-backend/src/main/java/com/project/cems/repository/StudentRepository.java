package com.project.cems.repository;

import com.project.cems.dto.StudentProfileResponse;
import com.project.cems.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);

    Optional<Student> findByStudentPrn(String studentPrn);
}
