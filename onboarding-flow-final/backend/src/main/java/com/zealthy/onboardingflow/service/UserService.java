package com.zealthy.onboardingflow.service;

import com.zealthy.onboardingflow.dto.UserRegistrationDto;
import com.zealthy.onboardingflow.dto.UserUpdateDto;
import com.zealthy.onboardingflow.model.User;
import com.zealthy.onboardingflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Register a new user
     * @param registrationDto user registration data
     * @return saved user
     */
    public User registerUser(UserRegistrationDto registrationDto) {
        // Check if user already exists
        if (userRepository.findByEmail(registrationDto.getEmail()).isPresent()) {
            throw new RuntimeException("User with email " + registrationDto.getEmail() + " already exists");
        }

        User user = new User(registrationDto.getEmail(), registrationDto.getPassword());
        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Update user information
     * TODO: Add validation for zip code format
     */
    public User updateUser(String email, UserUpdateDto updateDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Update fields if provided
        if (updateDto.getAboutMe() != null) {
            user.setAboutMe(updateDto.getAboutMe());
        }
        if (updateDto.getStreetAddress() != null) {
            user.setStreetAddress(updateDto.getStreetAddress());
        }
        if (updateDto.getCity() != null) {
            user.setCity(updateDto.getCity());
        }
        if (updateDto.getState() != null) {
            user.setState(updateDto.getState());
        }
        if (updateDto.getZip() != null) {
            user.setZip(updateDto.getZip());
        }
        if (updateDto.getBirthdate() != null) {
            user.setBirthdate(updateDto.getBirthdate());
        }
        if (updateDto.getCurrentStep() != null) {
            user.setCurrentStep(updateDto.getCurrentStep());
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
