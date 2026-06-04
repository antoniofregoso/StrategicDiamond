"""
Excepciones personalizadas para la aplicación.
"""

from typing import Optional, Any, Dict


class AppException(Exception):
    """Excepción base para la aplicación."""

    def __init__(
        self,
        message: str,
        status_code: int = 500,
        error_code: str = "INTERNAL_ERROR",
        details: Optional[Dict[str, Any]] = None,
    ):
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        self.details = details or {}
        super().__init__(self.message)


class ValidationException(AppException):
    """Excepción para errores de validación."""

    def __init__(
        self,
        message: str,
        error_code: str = "VALIDATION_ERROR",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            message, status_code=422, error_code=error_code, details=details
        )


class AuthenticationException(AppException):
    """Excepción para errores de autenticación."""

    def __init__(
        self,
        message: str = "Invalid credentials",
        error_code: str = "AUTHENTICATION_ERROR",
    ):
        super().__init__(message, status_code=401, error_code=error_code)


class AuthorizationException(AppException):
    """Excepción para errores de autorización."""

    def __init__(
        self, message: str = "Access denied", error_code: str = "AUTHORIZATION_ERROR"
    ):
        super().__init__(message, status_code=403, error_code=error_code)


class ResourceNotFoundException(AppException):
    """Excepción cuando un recurso no es encontrado."""

    def __init__(
        self,
        resource: str = "Resource",
        resource_id: Optional[Any] = None,
        error_code: str = "NOT_FOUND",
    ):
        message = f"{resource} not found"
        if resource_id:
            message += f" (ID: {resource_id})"
        super().__init__(message, status_code=404, error_code=error_code)


class ConflictException(AppException):
    """Excepción para conflictos de datos."""

    def __init__(
        self,
        message: str,
        error_code: str = "CONFLICT",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            message, status_code=409, error_code=error_code, details=details
        )


class DuplicateEntryException(ConflictException):
    """Excepción cuando se intenta crear un registro duplicado."""

    def __init__(self, field: str, value: Any, error_code: str = "DUPLICATE_ENTRY"):
        message = f"A record with {field} '{value}' already exists"
        details = {field: value}
        super().__init__(message, error_code=error_code, details=details)


class DatabaseException(AppException):
    """Excepción para errores de base de datos."""

    def __init__(
        self, message: str = "Database error", error_code: str = "DATABASE_ERROR"
    ):
        super().__init__(message, status_code=500, error_code=error_code)


class ExternalServiceException(AppException):
    """Excepción para errores de servicios externos."""

    def __init__(
        self,
        service: str,
        message: str = "External service error",
        error_code: str = "EXTERNAL_SERVICE_ERROR",
    ):
        full_message = f"{service}: {message}"
        super().__init__(full_message, status_code=502, error_code=error_code)
