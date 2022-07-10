package com.lucas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.lucas.model.Course;
import com.lucas.repository.CourseRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Validated
public class CourseService {
    
    //private final static CourseRepository courseRepository;

    private static CourseRepository courseRepository;


    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    public static Optional<Course> findById( Long id) {
        return courseRepository.findById(id);
    }

    public Course create( Course course) {
        return courseRepository.save(course);
    }

    public static Course update(Long id,  Course course) {
        return courseRepository.findById(id).map(actual -> {
            actual.setName(course.getName());
            actual.setCategory(course.getCategory());
            return courseRepository.save(actual);
        })
        .orElseThrow();
    }

    public static void delete(Long id) {
        courseRepository.delete(courseRepository.findById(id)
            .orElseThrow());
    }
}
