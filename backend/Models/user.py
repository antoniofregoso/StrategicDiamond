from sqlmodel import SQLModel, Field
from typing import Optional
from pydantic import EmailStr, constr
from sqlalchemy import Column, Integer, ForeignKey
from Models.enums import RoleType

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    email: EmailStr = Field(unique=True, index=True)
    name: constr(min_length=2, max_length=100)
    password: constr(min_length=8)
    disabled: bool = Field(default=False)
    company_id: int = Field(sa_column=Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"), nullable=False))
    role: RoleType = Field(default=RoleType.USER)
