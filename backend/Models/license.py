from sqlmodel import SQLModel, Field
from typing import Optional
from sqlalchemy import Column, Integer, ForeignKey
from Models.enums import LicenseType

class License(SQLModel, table=True):
    __tablename__ = "licenses"

    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    company_id: int = Field(sa_column=Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"), nullable=False))
    type: LicenseType = Field(default=LicenseType.PER_USER)
    max_users: Optional[int] = Field(default=1) # Usado si type == PER_USER
    is_active: bool = Field(default=True)
