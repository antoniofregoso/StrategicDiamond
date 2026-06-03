import strawberry
from enum import Enum
from Models.enums import RoleType, LicenseType

# Register Enums to Strawberry
strawberry.enum(RoleType)
strawberry.enum(LicenseType)

@strawberry.type
class CompanyType:
    id: int
    name: str

@strawberry.type
class LicenseTypeSchema:
    id: int
    type: LicenseType
    max_users: int | None
    is_active: bool

@strawberry.type
class UserType:
    id: int
    name: str
    email: str
    role: RoleType

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
    company_name: str # Nombre de la empresa a registrar

@strawberry.input
class AddCompanyUserInput:
    name: str
    email: str
    password: str
    role: RoleType = RoleType.USER

@strawberry.input
class LoginInput:
    email: str
    password: str

@strawberry.type
class LoginType:
    email: str
    token: str

