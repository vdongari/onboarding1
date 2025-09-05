package com.zealthy.onboardingflow.dto;

import java.util.List;

public class OnboardingConfigurationDto {
    private List<String> page2Components;
    private List<String> page3Components;

    public OnboardingConfigurationDto() {}

    public OnboardingConfigurationDto(List<String> page2Components, List<String> page3Components) {
        this.page2Components = page2Components;
        this.page3Components = page3Components;
    }

    public List<String> getPage2Components() {
        return page2Components;
    }

    public void setPage2Components(List<String> page2Components) {
        this.page2Components = page2Components;
    }

    public List<String> getPage3Components() {
        return page3Components;
    }

    public void setPage3Components(List<String> page3Components) {
        this.page3Components = page3Components;
    }
}
