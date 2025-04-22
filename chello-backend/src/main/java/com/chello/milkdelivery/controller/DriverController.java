package com.chello.milkdelivery.controller;

import com.chello.milkdelivery.dto.DriverAssignmentDto;
import com.chello.milkdelivery.dto.OrderStatusUpdateDto;
import com.chello.milkdelivery.dto.PlaceOrderDto;
import com.chello.milkdelivery.model.Order;
import com.chello.milkdelivery.repository.OrderRepository;
import com.chello.milkdelivery.service.OrderStatisticsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {



}