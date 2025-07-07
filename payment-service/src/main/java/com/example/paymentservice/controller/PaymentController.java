package com.example.paymentservice.controller;

import com.example.paymentservice.model.Payment;
import com.example.paymentservice.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    @Autowired
    private PaymentRepository repo;

    @GetMapping
    public List<Payment> getPayments() {
        return repo.findAll();
    }

    @PostMapping
    public Payment addPayment(@RequestBody Payment payment) {
        return repo.save(payment);
    }
}