import strawberry
from typing import Optional, Any, Dict


@strawberry.type
class ErrorDetail:
    """Detalle de error estructurado."""

    field: Optional[str] = None
    message: str = ""
    value: Optional[str] = None


@strawberry.type
class ErrorResponse:
    """Respuesta de error estándar."""

    status_code: int
    error_code: str
    message: str
    details: Optional[Dict[str, Any]] = None
    timestamp: Optional[str] = None


@strawberry.type
class NoteType:
    id: int
    name: str
    description: str


@strawberry.input
class NoteInput:
    name: str
    description: str


@strawberry.input
class RegisterInput:
    name: str
    email: str
    password: str


@strawberry.input
class LoginInput:
    email: str
    password: str


@strawberry.type
class LoginType:
    email: str
    token: str
