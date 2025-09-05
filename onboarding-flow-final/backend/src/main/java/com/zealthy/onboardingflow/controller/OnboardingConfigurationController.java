package com.zealthy.onboardingflow.controller;

import com.zealthy.onboardingflow.dto.OnboardingConfigurationDto;
import com.zealthy.onboardingflow.service.OnboardingConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/onboarding-config")
@CrossOrigin(origins = {"http://localhost:3000", "https://*.vercel.app"})
public class OnboardingConfigurationController {

    @Autowired
    private OnboardingConfigurationService configurationService;

    @GetMapping
    public ResponseEntity<OnboardingConfigurationDto> getConfiguration() {
        OnboardingConfigurationDto config = configurationService.getConfiguration();
        return ResponseEntity.ok(config);
    }

    @PutMapping
    public ResponseEntity<?> updateConfiguration(@RequestBody OnboardingConfigurationDto configDto) {
        try {
            configurationService.updateConfiguration(configDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/page/{pageNumber}")
    public ResponseEntity<List<String>> getComponentsForPage(@PathVariable Integer pageNumber) {
        List<String> components = configurationService.getComponentsForPage(pageNumber);
        return ResponseEntity.ok(components);
    }
}
