package com.zealthy.onboardingflow.repository;

import com.zealthy.onboardingflow.model.OnboardingConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OnboardingConfigurationRepository extends JpaRepository<OnboardingConfiguration, Long> {
    List<OnboardingConfiguration> findByPageNumberOrderById(Integer pageNumber);
    List<OnboardingConfiguration> findAllByOrderByPageNumberAsc();
}
