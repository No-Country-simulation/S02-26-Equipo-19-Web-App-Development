package com.team19.CareConnect.billing.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(
            IllegalArgumentException ex
    ) {
        return buildResponse(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalState(
            IllegalStateException ex
    ) {
        // Usado para conflictos de negocio o recursos inexistentes
        return buildResponse(
                ex.getMessage(),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(
            Exception ex
    ) {
        return buildResponse(
                "Error interno del servidor",
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    private ResponseEntity<ErrorResponse> buildResponse(
            String message,
            HttpStatus status
    ) {
        return ResponseEntity
                .status(status)
                .body(new ErrorResponse(
                        message,
                        status.value(),
                        LocalDateTime.now()
                ));
    }
}