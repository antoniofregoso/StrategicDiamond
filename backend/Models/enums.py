from enum import Enum

class RoleType(str, Enum):
    ADMIN = "ADMIN"
    USER = "USER"

class LicenseType(str, Enum):
    PER_USER = "PER_USER"
    ENTERPRISE = "ENTERPRISE"
