package com.project.cems.service.impl;

import com.project.cems.dto.CoordinatorResponse;
import com.project.cems.dto.CreateCoordinatorRequest;
import com.project.cems.entity.User;
import com.project.cems.repository.UserRepository;
import com.project.cems.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public CoordinatorResponse createCoordinator(CreateCoordinatorRequest request) {
//        User coordinator = userRepository
//                .findByEmailAndPassword(request.getEmail(), request.getPassword())
//                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if(userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword()).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        User coordinator = new User();
        coordinator.setName(request.getName());
        coordinator.setEmail(request.getEmail());
        coordinator.setPassword(request.getPassword());
        coordinator.setRole("COORDINATOR");
        coordinator.setDepartment(request.getDepartment());

//        User coordinator = new User();
//        coordinator.setName(request.getName());
//        coordinator.setEmail(request.getEmail());
//        coordinator.setPassword(request.getPassword());
//        coordinator.setRole("COORDINATOR");
//        coordinator.setDepartment(request.getDepartment());

        return modelMapper.map(
                userRepository.save(coordinator),
                CoordinatorResponse.class
        );
    }

    @Override
    public List<CoordinatorResponse> getAllCoordinators() {
        return userRepository.findByRole("COORDINATOR")
                .stream()
                .map(user -> modelMapper.map(user, CoordinatorResponse.class))
                .toList();
    }

    @Override
    public void deleteCoordinator(Long coordinatorId) {
        User user = userRepository.findById(coordinatorId).orElseThrow(() -> new RuntimeException("Coordinator not found"));

        if (!user.getRole().equals("COORDINATOR")) {
            throw new RuntimeException("User is not a coordinator");
        }

        userRepository.deleteById(coordinatorId);
    }
}
