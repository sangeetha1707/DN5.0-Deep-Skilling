package com.cognizant.spring_learn;
import org.springframework.context.ApplicationContext;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@SpringBootApplication
public class SpringLearnApplication {
	private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(SpringLearnApplication.class, args);
		new SpringLearnApplication().displayCountry();
	}
	public void displayCountry() {
	    LOGGER.info("START");
	    ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
	    Country country = (Country) context.getBean("country", Country.class);
	    LOGGER.debug("Country : {}", country.toString());
	    LOGGER.info("END");
	}

}
