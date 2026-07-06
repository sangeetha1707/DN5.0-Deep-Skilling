package com.cognizant.spring_learn.controller;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader) {
        LOGGER.info("Start");
        LOGGER.debug("authHeader: {}", authHeader);

        String user = getUser(authHeader);
        LOGGER.debug("user: {}", user);

        String token = generateJwt(user);
        LOGGER.debug("token: {}", token);

        Map<String, String> map = new HashMap<>();
        map.put("token", token);

        LOGGER.info("End");
        return map;
    }

    private String getUser(String authHeader) {
        LOGGER.info("Start");
        LOGGER.debug("authHeader: {}", authHeader);

        String encodedCredentials = authHeader.replace("Basic ", "");
        byte[] decodedBytes = Base64.getDecoder().decode(encodedCredentials);
        String decodedString = new String(decodedBytes);

        String user = decodedString.substring(0, decodedString.indexOf(":"));

        LOGGER.debug("user: {}", user);
        LOGGER.info("End");
        return user;
    }

    private String generateJwt(String user) {
        LOGGER.info("Start");
        LOGGER.debug("user: {}", user);

        String token = Jwts.builder()
                .setSubject(user)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(Keys.hmacShaKeyFor("secretkeysecretkeysecretkeysecretkeysecretkey1".getBytes()))
                .compact();

        LOGGER.debug("token: {}", token);
        LOGGER.info("End");
        return token;
    }
}