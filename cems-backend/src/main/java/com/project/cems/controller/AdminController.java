package com.project.cems.controller;

import com.project.cems.dto.CoordinatorResponse;
import com.project.cems.dto.CreateCoordinatorRequest;
import com.project.cems.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/coordinators")
    @ResponseStatus(HttpStatus.CREATED)
    public CoordinatorResponse createCoordinator(@RequestBody CreateCoordinatorRequest request){
        return adminService.createCoordinator(request);
    }

    @GetMapping("/coordinators")
    @ResponseStatus(HttpStatus.OK)
    public List<CoordinatorResponse> getAllCoordinators(){
        return adminService.getAllCoordinators();
    }

    @DeleteMapping("/coordinators/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteCoordinator(@PathVariable Long id){
        adminService.deleteCoordinator(id);
        return "Coordinator deleted";
    }

    @PutMapping("/coordinators/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CoordinatorResponse updateCoordinator(@PathVariable Long id, @RequestBody CreateCoordinatorRequest request){
        return adminService.updateCoordinator(id, request);
    }
}
