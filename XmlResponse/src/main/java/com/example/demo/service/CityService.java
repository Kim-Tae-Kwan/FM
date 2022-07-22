package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Cities;
import com.example.demo.model.City;
import com.example.demo.repository.CityRepository;

import java.util.List;

@Service
public class CityService {

    @Autowired
    private CityRepository repository;

    public Cities findAll() {

    	List<City> cities = (List<City>) repository.findAll();
    	Cities mycities = new Cities();
        mycities.setCities(cities);

        return mycities;
    }

    public City findById(Long id) {

        return repository.findById(id).orElse(new City());
    }
}
