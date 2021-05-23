package com.shiftplan.ws.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "shiftplan")
public class AppConfiguration {
	private String uploadPath;
}
