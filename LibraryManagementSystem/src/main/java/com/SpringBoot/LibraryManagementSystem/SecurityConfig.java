package com.SpringBoot.LibraryManagementSystem;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/", "/index.html", "/login.html", "/register.html", "/forgot.html",
                    "/Student.html", "/Admin.html",
                    "/Student.js", "/Admin.js", "/script.js",
                    "/Student.css", "/Admin.css", "/forgot.css", "/index.css",
                    "/image/**", "/static/**", "/api/auth/**"
                ).permitAll()
                .requestMatchers("/api/admin/**").hasAuthority("Admin")
                .requestMatchers("/api/student/**").hasRole("STUDENT")
                .anyRequest().authenticated()
            )
            // ❌ REMOVE THIS LINE TO DISABLE BASIC AUTH
            //.httpBasic(withDefaults()) 

            // ✅ ENABLE FORM LOGIN (use your own form)
            .formLogin(form -> form.disable()); // We disable Spring's default form to use our custom one

        return http.build();
    }
}
