package com.zealthy.onboardingflow.service;

import com.zealthy.onboardingflow.dto.OnboardingConfigurationDto;
import com.zealthy.onboardingflow.model.OnboardingConfiguration;
import com.zealthy.onboardingflow.repository.OnboardingConfigurationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
public class OnboardingConfigurationService {

    @Autowired
    private OnboardingConfigurationRepository configurationRepository;

    @PostConstruct
    public void initializeDefaultConfiguration() {
        // Check if configuration already exists
        if (configurationRepository.count() == 0) {
            // Default configuration: About Me and Birthdate on page 2, Address on page 3
            configurationRepository.save(new OnboardingConfiguration(2, "about_me"));
            configurationRepository.save(new OnboardingConfiguration(2, "birthdate"));
            configurationRepository.save(new OnboardingConfiguration(3, "address"));
        }
    }

    @Cacheable(value = "onboardingConfig", key = "'default'")
    public OnboardingConfigurationDto getConfiguration() {
        List<OnboardingConfiguration> allConfigs = configurationRepository.findAllByOrderByPageNumberAsc();
        
        List<String> page2Components = allConfigs.stream()
                .filter(config -> config.getPageNumber() == 2)
                .map(OnboardingConfiguration::getComponentType)
                .toList();
        
        List<String> page3Components = allConfigs.stream()
                .filter(config -> config.getPageNumber() == 3)
                .map(OnboardingConfiguration::getComponentType)
                .toList();

        return new OnboardingConfigurationDto(page2Components, page3Components);
    }

    @CacheEvict(value = "onboardingConfig", allEntries = true)
    public void updateConfiguration(OnboardingConfigurationDto configDto) {
        // Clear existing configuration
        configurationRepository.deleteAll();

        // Add new configuration for page 2
        for (String component : configDto.getPage2Components()) {
            configurationRepository.save(new OnboardingConfiguration(2, component));
        }

        // Add new configuration for page 3
        for (String component : configDto.getPage3Components()) {
            configurationRepository.save(new OnboardingConfiguration(3, component));
        }
    }

    public List<String> getComponentsForPage(Integer pageNumber) {
        return configurationRepository.findByPageNumberOrderById(pageNumber)
                .stream()
                .map(OnboardingConfiguration::getComponentType)
                .toList();
    }
}
